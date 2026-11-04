import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { handleQuote } from '../../lib/quote.js';
import { business } from '../../data/site';

export const prerender = false;

// The recipient is fixed in code so every form delivers to the company inbox only.
export const POST: APIRoute = ({ request }) =>
  handleQuote(request, {
    key: getSecret('RESEND_API_KEY'),
    to: business.email,
    from: getSecret('QUOTE_FROM_EMAIL'),
  });
