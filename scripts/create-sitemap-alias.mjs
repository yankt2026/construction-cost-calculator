import { copyFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source=resolve('dist','sitemap-0.xml');
const target=resolve('dist','sitemap.xml');
const xml=await readFile(source,'utf8');
if(!xml.includes('<urlset')||!xml.includes('<loc>')){
  throw new Error('Generated sitemap-0.xml is not a valid URL sitemap.');
}
await copyFile(source,target);
console.log('Created dist/sitemap.xml from the generated canonical URL sitemap.');
