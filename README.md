# Asphalt Express website

Marketing site for Asphalt Express LLC (Highland, MI). Static [Astro](https://astro.build) site with one Vercel function for the free estimate forms. Rebuilt from the original asphaltexpressllc.com with the changes in `docs/Asphalt_Express_Website_Instructions_v2.pdf`.

```sh
npm install
npm run dev     # local site
npm test        # estimate form endpoint tests
npm run build   # output for Vercel
```

## Editing content

- `src/data/site.ts`: business facts, nav, service card text, stats, ticker messages and reviews.
- `src/data/towns.json`: every service area page (one entry per town). Adding an entry creates the page at `/<slug>/`, adds it to the county lists, the "Do we cover your town?" checker, the sitemap, and every "N communities" count.
- `src/data/services.json`: the eight service pages.
- `src/data/gallery.json`: gallery photos. Photos live in `src/assets/img/` and are referenced by file name.

Town and service pages both live at the site root (`/novi-mi/`, `/asphalt-paving/`), matching the original web addresses.

## SEO notes

Heading structure follows the Loom review: one H1, services as H2s, no skipped levels, selling points and step titles as plain text, footer labels as plain text, and US spelling. The home page H1 is intentionally unchanged ("Michigan’s Trusted Asphalt Paving Contractor").

## Estimate forms

Every form (home, contact and each town page) posts to `src/pages/api/quote.ts`, which emails the request through [Resend](https://resend.com). The recipient is fixed in code to `asphaltexpresspaving7@gmail.com` (`business.email` in `src/data/site.ts`) and nothing else. The email notes which page the request came from.

Until both settings below exist, the form tells visitors their request was not sent and asks them to call. For local use, copy `.env.example` to `.env`. In production, add them in the Vercel project's environment variables.

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `QUOTE_FROM_EMAIL` | Sender on a domain verified in Resend, e.g. `Asphalt Express Website <estimates@asphaltexpressllc.com>` |

## Launch

The site is canonical to `https://asphaltexpressllc.com`. To go live, add the domain to the Vercel project and point only the web records (`A` for the root, `CNAME` for `www`) at Vercel. Leave any `MX` and email records alone.
