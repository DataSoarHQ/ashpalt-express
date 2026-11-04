// Validates a free estimate request and emails it to the company through Resend.
const json = (body, status) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const clean = (value, max) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

export async function handleQuote(request, { key, to, from }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'The request could not be read.' }, 400);
  }
  if (!data || typeof data !== 'object') return json({ error: 'The request could not be read.' }, 400);

  // Bots fill the hidden field. Report success so they don't retry.
  if (clean(data.website, 200)) return json({ ok: true }, 200);

  const name = clean(data.name, 120);
  const phone = clean(data.phone, 30);
  const email = clean(data.email, 200);
  const service = clean(data.service, 120);
  const city = clean(data.city, 120);
  const found = clean(data.found, 120);
  const page = clean(data.page, 200);
  const message = String(data.message ?? '').trim().slice(0, 4000);

  if (!name) return json({ error: 'Enter your name so we know who to ask for.' }, 400);
  if (phone.replace(/\D/g, '').length < 10) return json({ error: 'Enter a 10-digit phone number so we can reach you.' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Enter a valid email address.' }, 400);

  if (!key || !to || !from) {
    console.error('Estimate form is not configured: missing email settings.');
    return json({ error: 'not_configured' }, 503);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Free estimate request: ${service || 'Website'}${city ? ` in ${city}` : ''} from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Service: ${service || 'not given'}`,
        `Town / city: ${city || 'not given'}`,
        `Found us: ${found || 'not given'}`,
        `Sent from: ${page || 'website'}`,
        '',
        message || '(no message)',
      ].join('\n'),
    }),
  }).catch((err) => {
    console.error('Estimate email request failed:', err);
    return null;
  });

  if (!res || !res.ok) {
    if (res) console.error('Resend rejected the estimate email:', res.status, await res.text());
    return json({ error: 'send_failed' }, 502);
  }
  return json({ ok: true }, 200);
}
