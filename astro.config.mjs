import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zhiqun17.com',
  output: 'static',
  integrations: [sitemap()],
});
