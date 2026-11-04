import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const secret = () => envField.string({ context: 'server', access: 'secret', optional: true });

export default defineConfig({
  site: 'https://asphaltexpressllc.com',
  trailingSlash: 'always',
  adapter: vercel(),
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  env: {
    schema: {
      RESEND_API_KEY: secret(),
      QUOTE_FROM_EMAIL: secret(),
    },
  },
});
