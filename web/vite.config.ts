import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { HtmlTagDescriptor } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)), 'VITE_');
  const configuredUrl = process.env.VITE_SITE_URL || env.VITE_SITE_URL;
  let siteUrl: URL | undefined;
  if (configuredUrl) {
    siteUrl = new URL(configuredUrl);
    if (
      siteUrl.protocol !== 'https:' ||
      siteUrl.username ||
      siteUrl.password ||
      siteUrl.search ||
      siteUrl.hash
    ) {
      throw new Error(
        'VITE_SITE_URL must be a public HTTPS URL without credentials, query parameters or a fragment.',
      );
    }
    if (!siteUrl.pathname.endsWith('/')) siteUrl.pathname += '/';
  }
  return {
    plugins: [
      react(),
      {
        name: 'portfolio-sharing-metadata',
        transformIndexHtml() {
          // Keep metadata in the initial HTML so link crawlers do not need React.
          // The relative preview works locally; publishing requires VITE_SITE_URL.
          const imageUrl = siteUrl
            ? new URL('social-preview.png', siteUrl).href
            : '/social-preview.png';
          const tags: HtmlTagDescriptor[] = [
            {
              tag: 'meta',
              attrs: { property: 'og:image', content: imageUrl },
              injectTo: 'head-prepend',
            },
            {
              tag: 'meta',
              attrs: { name: 'twitter:image', content: imageUrl },
              injectTo: 'head-prepend',
            },
          ];
          if (siteUrl) {
            tags.push(
              {
                tag: 'meta',
                attrs: { property: 'og:url', content: siteUrl.href },
                injectTo: 'head',
              },
              { tag: 'link', attrs: { rel: 'canonical', href: siteUrl.href }, injectTo: 'head' },
            );
          }
          return tags;
        },
      },
    ],
  };
});
