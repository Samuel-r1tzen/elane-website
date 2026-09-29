import { Product, ProductCategory } from '../types';

import heroImg from '../assets/images/hero_fashion_movement_1790582144253.jpg';
import jacketImg from '../assets/images/product_structured_jacket_1790582155608.jpg';
import trouserImg from '../assets/images/product_wide_trouser_1790582769729.jpg';
import hoodieImg from '../assets/images/product_signature_hoodie_1790582784254.jpg';
import overshirtImg from '../assets/images/campaign_architectural_light_1790582798533.jpg';
import teeImg from '../assets/images/product_signature_tee_1790582828094.jpg';
import lookbookImg from '../assets/images/editorial_lookbook_form_1790582176450.jpg';
import craftImg from '../assets/images/journal_textile_craft_1790582188414.jpg';
import campaignMotionImg from '../assets/images/campaign_motion_editorial_1790582166222.jpg';
import atelierJhbImg from '../assets/images/journal_atelier_johannesburg_1790582810284.jpg';
import redTeeImg from '../assets/images/lookbook_red_tee_1790667294706.jpg';
import trenchCoatImg from '../assets/images/editorial_trench_coat_1790667326415.jpg';
import plaidBlazerImg from '../assets/images/editorial_plaid_blazer_1790667341215.jpg';
import laceBlouseImg from '../assets/images/editorial_lace_blouse_1790667354126.jpg';
import knitCardiganImg from '../assets/images/editorial_knit_cardigan_1790667367647.jpg';

export {
  heroImg,
  jacketImg,
  trouserImg,
  hoodieImg,
  overshirtImg,
  teeImg,
  lookbookImg,
  craftImg,
  campaignMotionImg,
  atelierJhbImg,
  redTeeImg,
  trenchCoatImg,
  plaidBlazerImg,
  laceBlouseImg,
  knitCardiganImg,
  campaignMotionImg as campaignImg,
  craftImg as journalImg
};

export const PRODUCTS: Product[] = [
  {
    id: 'e01-signature-tee',
    code: 'E01',
    name: 'SIGNATURE TEE',
    price: 1199,
    category: 'ESSENTIALS',
    color: '#0B0B0A',
    colorName: 'OBSIDIAN',
    description: 'Heavyweight organic cotton with a relaxed silhouette and subtle tone-on-tone ÉLANE embroidery along the left hem.',
    details: {
      material: '100% GOTS-certified combed cotton (280gsm). Dense compact jersey weave with preshrunk structure.',
      fit: 'Relaxed drop-shoulder silhouette with a structured ribbed crewneck collar designed to retain shape.',
      care: 'Machine wash cold at 30°C inside out. Reshape while damp. Do not tumble dry. Low iron.',
      shipping: 'Complimentary shipping across South Africa on orders above R2,500. Express global delivery in 3–5 business days.'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: teeImg,
    secondaryImage: redTeeImg,
    isNewArrival: true,
    isEssential: true
  },
  {
    id: 'e02-structured-jacket',
    code: 'E02',
    name: 'STRUCTURED JACKET',
    price: 2499,
    category: 'OUTERWEAR',
    color: '#0B0B0A',
    colorName: 'OBSIDIAN',
    description: 'A clean architectural silhouette designed for transitional layering, featuring dropped shoulders and concealed horn buttons.',
    details: {
      material: 'Bespoke double-faced wool-cashmere blend (420gsm) with subtle architectural drape and soft hand feel.',
      fit: 'Boxy architectural cut. Designed to accommodate structured knitwear underneath without tension.',
      care: 'Specialist dry clean only. Store on wide contoured hanger in a cool, ventilated closet.',
      shipping: 'Delivered in signature ÉLANE garment archive box with branded garment dust bag.'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    primaryImage: jacketImg,
    secondaryImage: plaidBlazerImg,
    isNewArrival: true,
    isEssential: false
  },
  {
    id: 'e03-wide-trouser',
    code: 'E03',
    name: 'WIDE TROUSER',
    price: 1799,
    category: 'TAILORING',
    color: '#0B0B0A',
    colorName: 'OBSIDIAN',
    description: 'Relaxed tailoring with a contemporary wide-leg profile, front pleating, and an internal adjustable tab waistband.',
    details: {
      material: 'Tropical virgin wool woven in northern Italy with natural stretch and fluid drape (240gsm).',
      fit: 'High-waisted, full-length silhouette with a deep double reverse pleat and generous hem sweep.',
      care: 'Dry clean only. Warm iron over pressing cloth if needed.',
      shipping: 'Complimentary alterations consultation available via concierge upon receipt.'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: trouserImg,
    secondaryImage: trenchCoatImg,
    isNewArrival: true,
    isEssential: true
  },
  {
    id: 'e04-signature-hoodie',
    code: 'E04',
    name: 'SIGNATURE HOODIE',
    price: 1699,
    category: 'ESSENTIALS',
    color: '#0B0B0A',
    colorName: 'OBSIDIAN',
    description: 'Heavyweight French terry fleece with an oversized silhouette, double-layered architectural hood, and blind seam construction.',
    details: {
      material: '100% heavyweight loopback organic cotton fleece (480gsm). Unbrushed interior for maximum breathability.',
      fit: 'Sculptural oversized block. Seamless kangaroo pocket seamlessly integrated into lateral body paneling.',
      care: 'Gentle cycle cold. Lay flat to dry away from direct sunlight.',
      shipping: 'Standard domestic dispatch within 24 hours. Global express tracked courier.'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: hoodieImg,
    secondaryImage: heroImg,
    isNewArrival: true,
    isEssential: true
  },
  {
    id: 'e05-utility-overshirt',
    code: 'E05',
    name: 'UTILITY OVERSHIRT',
    price: 1999,
    category: 'OUTERWEAR',
    color: '#77736D',
    colorName: 'STONE',
    description: 'Minimal utilitarian overshirt cut from brushed twill with twin bellows breast pockets and clean bar-tacked stress points.',
    details: {
      material: 'Heavy brushed cotton twill (320gsm) pre-washed for vintage softened texture and durability.',
      fit: 'Straight cut with square bottom hem and clean side split slits for unrestrained movement.',
      care: 'Wash cold at 30°C. Hang dry. Iron while slightly damp.',
      shipping: 'Complimentary shipping across South Africa on orders above R2,500.'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    primaryImage: overshirtImg,
    secondaryImage: jacketImg,
    isNewArrival: false,
    isEssential: false
  },
  {
    id: 'e06-essential-tank',
    code: 'E06',
    name: 'ESSENTIAL TANK',
    price: 799,
    category: 'ESSENTIALS',
    color: '#F3F0E9',
    colorName: 'IVORY',
    description: 'A finely ribbed muscle tank designed as a base layer for warm climates or layered beneath tailored outerwear.',
    details: {
      material: 'Micro-ribbed supima cotton with 3% elastane for contour memory and seamless movement.',
      fit: 'Close to body with squared neckline and clean cut armholes.',
      care: 'Delicate machine wash. Flat dry.',
      shipping: 'Standard domestic delivery in 2–3 business days.'
    },
    sizes: ['XS', 'S', 'M', 'L'],
    primaryImage: heroImg,
    secondaryImage: teeImg,
    isNewArrival: false,
    isEssential: true
  },
  {
    id: 'e07-relaxed-knit',
    code: 'E07',
    name: 'RELAXED KNIT',
    price: 1899,
    category: 'KNITWEAR',
    color: '#C9BDAA',
    colorName: 'WARM SAND',
    description: 'Open-gauge knit sweater spun from un-dyed merino wool featuring dropped shoulder seams and raw rolled edges.',
    details: {
      material: '100% fine micron merino wool (7-gauge knit). Naturally thermo-regulating and odor resistant.',
      fit: 'Relaxed, elongated torso with slightly extended sleeves designed to drape effortlessly over wrists.',
      care: 'Hand wash cold with wool detergent. Never wring. Dry flat on clean towel.',
      shipping: 'Delivered wrapped in archive acid-free tissue paper.'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    primaryImage: knitCardiganImg,
    secondaryImage: craftImg,
    isNewArrival: false,
    isEssential: false
  },
  {
    id: 'e08-studio-cap',
    code: 'E08',
    name: 'STUDIO CAP',
    price: 699,
    category: 'ACCESSORIES',
    color: '#0B0B0A',
    colorName: 'OBSIDIAN',
    description: 'Low-profile 6-panel cap crafted from water-resistant technical cotton with tonal ÉLANE monogram and brass clasp closure.',
    details: {
      material: 'Wax-coated technical cotton canvas with unstructured crown and moisture-wicking sweatband.',
      fit: 'Adjustable rear leather strap with custom matte burnished copper slider. Universal fit.',
      care: 'Spot clean only with damp microfiber cloth.',
      shipping: 'Standard delivery in 2–3 business days.'
    },
    sizes: ['ONE SIZE'],
    primaryImage: craftImg,
    secondaryImage: atelierJhbImg,
    isNewArrival: false,
    isEssential: true
  }
];

export const CATEGORIES_LIST: { id: ProductCategory; label: string; description: string; count: number; image: string }[] = [
  {
    id: 'ESSENTIALS',
    label: 'ESSENTIALS',
    description: 'Foundation garments cut for perpetual rotation and ease.',
    count: 3,
    image: teeImg
  },
  {
    id: 'OUTERWEAR',
    label: 'OUTERWEAR',
    description: 'Transitional architectural layers built to shield and define.',
    count: 2,
    image: trenchCoatImg
  },
  {
    id: 'TAILORING',
    label: 'TAILORING',
    description: 'Unstructured drapery bridging modern posture and poise.',
    count: 1,
    image: trouserImg
  },
  {
    id: 'KNITWEAR',
    label: 'KNITWEAR',
    description: 'Open-gauge organic natural fibres with tactile warmth.',
    count: 1,
    image: knitCardiganImg
  },
  {
    id: 'ACCESSORIES',
    label: 'ACCESSORIES',
    description: 'Subtle functional signatures to punctuate the uniform.',
    count: 1,
    image: craftImg
  }
];
