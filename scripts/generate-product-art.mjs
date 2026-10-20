import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import blueprints from "../src/features/products/data/product.blueprints.json" with { type: "json" };

const outputDirectory = path.join(process.cwd(), "public/products/catalog");
const finishes = [
  ["graphite", "#202a2d", "#c8d1ca", "#f3ede2"],
  ["sand", "#8d735d", "#ead9c2", "#f7f1e7"],
  ["sage", "#315c50", "#b9d2c4", "#edf2ec"],
  ["clay", "#8d4939", "#e2aa8e", "#f5e6dd"],
  ["ocean", "#173e57", "#91b9c9", "#e7f0f2"],
  ["plum", "#553448", "#c7a5b5", "#f1e6eb"],
  ["mist", "#536166", "#ccd4d4", "#f2f4f2"],
  ["amber", "#6d4a16", "#e2b55e", "#f8edcf"],
];

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const categoryShape = {
  Audio: (x, accent, soft) => `<circle cx="600" cy="410" r="205" fill="${soft}"/><path d="M430 435v-75c0-115 75-195 170-195s170 80 170 195v75" fill="none" stroke="${accent}" stroke-width="54" stroke-linecap="round"/><rect x="355" y="385" width="145" height="210" rx="62" fill="${accent}"/><rect x="700" y="385" width="145" height="210" rx="62" fill="${accent}"/><path d="M500 530q100 55 200 0" fill="none" stroke="#fff" stroke-width="10" opacity=".65"/>`,
  Computing: (x, accent, soft) => `<rect x="270" y="190" width="660" height="390" rx="28" fill="${accent}"/><rect x="305" y="225" width="590" height="315" rx="8" fill="${soft}"/><path d="M180 610h840l75 95H105z" fill="${accent}" opacity=".88"/><circle cx="${430 + (x % 5) * 80}" cy="365" r="82" fill="#fff" opacity=".45"/>`,
  Home: (x, accent, soft) => `<path d="M600 150C420 150 315 285 315 450s105 265 285 265 285-100 285-265S780 150 600 150z" fill="${soft}"/><path d="M390 595h420" stroke="${accent}" stroke-width="34" stroke-linecap="round"/><path d="M465 570V330q0-95 95-95h120" fill="none" stroke="${accent}" stroke-width="42" stroke-linecap="round"/><path d="M620 205h190l-44 120H664z" fill="${accent}"/>`,
  Lifestyle: (x, accent, soft) => `<rect x="390" y="120" width="420" height="650" rx="190" fill="${soft}"/><circle cx="600" cy="445" r="205" fill="#fff" stroke="${accent}" stroke-width="30"/><path d="M600 445l-12-125M600 445l105 72" stroke="${accent}" stroke-width="18" stroke-linecap="round"/><circle cx="600" cy="445" r="18" fill="${accent}"/>`,
  Photography: (x, accent, soft) => `<rect x="225" y="260" width="750" height="420" rx="62" fill="${accent}"/><path d="M350 260l65-85h220l65 85" fill="${accent}"/><circle cx="610" cy="470" r="175" fill="${soft}" stroke="#fff" stroke-width="30"/><circle cx="610" cy="470" r="105" fill="${accent}"/><circle cx="655" cy="425" r="30" fill="#fff" opacity=".55"/><circle cx="865" cy="345" r="25" fill="#fff" opacity=".7"/>`,
  Wellness: (x, accent, soft) => `<circle cx="600" cy="430" r="280" fill="${soft}"/><rect x="330" y="300" width="175" height="350" rx="55" fill="#fff"/><rect x="385" y="230" width="65" height="90" rx="12" fill="${accent}"/><rect x="525" y="215" width="190" height="435" rx="70" fill="${accent}" opacity=".88"/><rect x="750" y="355" width="135" height="295" rx="60" fill="#fff"/>`,
};

function artwork(product, productIndex, finish, view) {
  const [key, accent, soft, background] = finish;
  const shape = categoryShape[product.category](productIndex, accent, soft);
  const title = escapeXml(product.title);
  const offset = view === 1 ? 0 : view === 2 ? -55 : 45;
  const rotation = view === 1 ? 0 : view === 2 ? -4 : 4;
  return {
    key,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="${background}"/><stop offset="1" stop-color="${soft}"/></linearGradient><filter id="shadow"><feDropShadow dy="20" stdDeviation="18" flood-opacity=".18"/></filter></defs>
      <rect width="1200" height="900" fill="url(#bg)"/><circle cx="${1040 - productIndex * 9}" cy="${120 + (productIndex % 4) * 35}" r="190" fill="${accent}" opacity=".12"/>
      <g transform="translate(${offset} 0) rotate(${rotation} 600 430)" filter="url(#shadow)">${shape}</g>
      <text x="72" y="790" font-family="Arial,sans-serif" font-size="24" font-weight="700" letter-spacing="5" fill="${accent}">${escapeXml(product.category.toUpperCase())}</text>
      <text x="72" y="835" font-family="Georgia,serif" font-size="34" fill="${accent}">${title}</text>
      <text x="1090" y="820" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="${accent}" opacity=".7">VIEW ${view}</text>
    </svg>`,
  };
}

await mkdir(outputDirectory, { recursive: true });

const jobs = [];
for (const [productIndex, product] of blueprints.entries()) {
  for (const finish of finishes) {
    for (const view of [1, 2, 3]) {
      const { key, svg } = artwork(product, productIndex, finish, view);
      const target = path.join(outputDirectory, `${product.slug}-${key}-${view}.webp`);
      jobs.push(sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(target));
    }
  }
}

await Promise.all(jobs);
console.log(`Generated ${jobs.length} optimized WebP product illustrations.`);
