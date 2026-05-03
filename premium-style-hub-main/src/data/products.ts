export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "watches" | "shoes";
  subcategory?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  tag?: "New" | "Sale" | "Hot" | "Limited";
  colors?: string[];
};

const w = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const watchImgs = [
  "1523275335684-37898b6baf30","1547996160-81dfa63595aa","1524805444758-089113d48a6d",
  "1539874754764-5a96559165b0","1495856458515-0637185db551","1533139502658-0198f920d8e8",
  "1622434641406-a158123450f9","1606293459209-c7d6c47d3f8a","1611591437281-460bfbe1220a",
  "1620625515032-6ed0c1790c75","1548171915-e79a380a2a4b","1509048191080-d2984bad6ae5",
  "1612817159949-195b6eb9e31a","1542496658-e33a6d0d50f6","1434056886845-dac89ffe9b56",
  "1518131672697-613becd4fab5","1565440962783-f87efdea99fd","1587836374828-4dbafa94cf0e",
];
const shoeImgs = [
  "1542291026-7eec264c27ff","1606107557195-0e29a4b5b4aa","1595950653106-6c9ebd614d3a",
  "1551107696-a4b0c5a0d9a2","1600185365483-26d7a4cc7519","1525966222134-fcfa99b8ae77",
  "1600269452121-4f2416e55c28","1539185441755-769473a23570","1552346154-21d32810aba3",
  "1521223890158-f9f7c3d5d504","1460353581641-37baddab0fa2","1528701800489-20be3c2ea3ad",
  "1606107557084-3f7a04f6f8c0","1574338413574-2a31cae2a4d9","1606107557206-67e26a30dc88",
  "1491553895911-0055eca6402d","1556906781-9a412961c28c","1597248881519-db089d3744a5",
];

const watchBrands = ["Aurelian","Meridian","Noctis","Halden","Coraline","Vespera"];
const shoeBrands = ["Atelier","Ronin","Solene","Kestrel","Maison","Volta"];
const watchNames = ["Nocturne Chrono","Heritage 1908","Skeleton Sovereign","Marine Diver","Lunar Phase","Atelier Tourbillon","Field Captain","Royal Reserve","Voyager GMT","Onyx Automatic","Eclipse Pilot","Brass Mariner","Velvet Square","Iron Pursuit","Solstice Edition","Rive Gauche","Maritime Rose","Equinox Steel"];
const shoeNames = ["Runner Mono","Atelier Lo","Court Classic","Trail Forge","Velvet Mule","City Derby","Knit Glide","Court Hi","Suede Roamer","Studio Sneaker","Heritage Boot","Sand Dune","Marathon Pro","Slip-on Linen","Cloud Trainer","Equestrian Loafer","Field Chukka","Riviera Espadrille"];

const tags: Array<Product["tag"]> = [undefined, "New", "Sale", "Hot", "Limited", undefined, undefined];
const colors = ["#111111","#1f1b16","#c2956b","#d97a3b","#c9a84c","#e8e2d6","#5a4a3b"];

function rng(seed: number) { return () => (seed = (seed * 9301 + 49297) % 233280) / 233280; }

function build(): Product[] {
  const r = rng(42);
  const arr: Product[] = [];
  for (let i = 0; i < 60; i++) {
    const cat = i % 2 === 0 ? "watches" : "shoes";
    const idx = Math.floor(i / 2) % (cat === "watches" ? watchNames.length : shoeNames.length);
    const imgPool = cat === "watches" ? watchImgs : shoeImgs;
    const img = w(imgPool[i % imgPool.length]);
    const price = Math.round((cat === "watches" ? 220 + r() * 4800 : 90 + r() * 480) / 5) * 5;
    const hasSale = r() > 0.55;
    arr.push({
      id: `${cat[0]}-${i + 1}`,
      name: cat === "watches" ? watchNames[idx] : shoeNames[idx],
      brand: cat === "watches" ? watchBrands[i % watchBrands.length] : shoeBrands[i % shoeBrands.length],
      category: cat,
      subcategory: cat === "watches" ? ["Automatic","Chronograph","Diver","Dress"][i % 4] : ["Sneakers","Boots","Loafers","Runners"][i % 4],
      price,
      oldPrice: hasSale ? Math.round(price * 1.28 / 5) * 5 : undefined,
      rating: Math.round((3.8 + r() * 1.2) * 10) / 10,
      reviews: Math.floor(20 + r() * 980),
      image: img,
      images: [img, w(imgPool[(i + 3) % imgPool.length]), w(imgPool[(i + 5) % imgPool.length]), w(imgPool[(i + 7) % imgPool.length])],
      tag: tags[i % tags.length],
      colors: [colors[i % colors.length], colors[(i + 2) % colors.length], colors[(i + 4) % colors.length]],
    });
  }
  return arr;
}

export const PRODUCTS: Product[] = build();
export const WATCHES = PRODUCTS.filter(p => p.category === "watches");
export const SHOES = PRODUCTS.filter(p => p.category === "shoes");

export function pick(n: number, offset = 0): Product[] {
  const out: Product[] = [];
  for (let i = 0; i < n; i++) out.push(PRODUCTS[(i + offset) % PRODUCTS.length]);
  return out;
}

export function findProduct(id: string) {
  return PRODUCTS.find(p => p.id === id);
}
