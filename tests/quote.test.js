import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { handleQuote } from '../src/lib/quote.js';

const req = (body) => new Request('http://x/api/quote', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body) });
const good = { name: 'Pat Lee', phone: '(248) 555-0100', email: 'pat@example.com', service: 'Asphalt Paving', city: 'Milford', found: 'Google Search', page: '/milford-mi/', message: 'Long\ndriveway' };
const env = { key: 'k', to: 'asphaltexpresspaving7@gmail.com', from: 'site@x.com' };
const POST = (request, config = env) => handleQuote(request, config);
const realFetch = globalThis.fetch;
const realError = console.error;
let sent;

beforeEach(() => {
  sent = [];
  console.error = () => {};
  globalThis.fetch = async (url, init) => { sent.push({ url, body: JSON.parse(init.body) }); return new Response('{}', { status: 200 }); };
});
afterEach(() => { globalThis.fetch = realFetch; console.error = realError; });

test('sends a valid request to the company inbox only', async () => {
  const res = await POST(req(good));
  assert.equal(res.status, 200);
  assert.deepEqual(sent[0].body.to, ['asphaltexpresspaving7@gmail.com']);
  assert.equal(sent[0].body.reply_to, 'pat@example.com');
  assert.match(sent[0].body.text, /Phone: \(248\) 555-0100/);
  assert.match(sent[0].body.text, /Town \/ city: Milford/);
  assert.match(sent[0].body.text, /Sent from: \/milford-mi\//);
  assert.match(sent[0].body.text, /Long\ndriveway/);
});

test('rejects bad input without sending', async () => {
  for (const body of [{ ...good, name: ' ' }, { ...good, phone: '12345' }, { ...good, email: 'nope' }, { ...good, email: '' }, 'not json', 'null']) {
    assert.equal((await POST(req(body))).status, 400);
  }
  assert.equal(sent.length, 0);
});

test('drops honeypot submissions silently', async () => {
  const res = await POST(req({ ...good, website: 'spam.example' }));
  assert.equal(res.status, 200);
  assert.equal(sent.length, 0);
});

test('strips line breaks from the subject', async () => {
  await POST(req({ ...good, name: 'Pat\r\nBcc: x@y.com' }));
  assert.ok(!/[\r\n]/.test(sent[0].body.subject));
});

test('reports failure when email is not configured', async () => {
  for (const missing of ['key', 'to', 'from']) {
    assert.equal((await POST(req(good), { ...env, [missing]: undefined })).status, 503);
  }
  assert.equal(sent.length, 0);
});

test('reports failure when the email provider rejects or is unreachable', async () => {
  globalThis.fetch = async () => new Response('nope', { status: 422 });
  assert.equal((await POST(req(good))).status, 502);
  globalThis.fetch = async () => { throw new Error('down'); };
  assert.equal((await POST(req(good))).status, 502);
});
