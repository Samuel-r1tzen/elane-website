import { LookbookLook } from '../types';
import { trenchCoatImg, plaidBlazerImg, laceBlouseImg, redTeeImg } from './products';

export const LOOKBOOK_ITEMS: LookbookLook[] = [
  {
    id: 'look-01',
    number: 'LOOK 01',
    title: 'THE MONOLITHIC DRAPERY',
    subtitle: 'WINTER SOLSTICE / 2026',
    image: trenchCoatImg,
    aspect: 'portrait',
    quote: 'Volume ceases to be excess when every square centimetre respects the wearer’s stride.',
    featuredProducts: ['e02-structured-jacket', 'e03-wide-trouser'],
    notes: 'Styled with the double-breasted trench and high-rise tailored trousers in Italian wool. Emphasizes negative space and the architectural trajectory of fabric around the body during pedestrian movement.'
  },
  {
    id: 'look-02',
    number: 'LOOK 02',
    title: 'ARCHITECTURAL LAYERING',
    subtitle: 'STUDIO ENSEMBLE',
    image: plaidBlazerImg,
    aspect: 'tall',
    quote: 'Structured lines outside, effortless poise within.',
    featuredProducts: ['e02-structured-jacket', 'e06-essential-tank'],
    notes: 'The oversized checked blazer draped over a crisp collared poplin shirt and denim base. Juxtaposes heritage tailoring lines against relaxed contemporary city energy.'
  },
  {
    id: 'look-03',
    number: 'LOOK 03',
    title: 'TEXTURE & CONTRAST',
    subtitle: 'MONOCHROME DIALOGUE',
    image: laceBlouseImg,
    aspect: 'wide',
    quote: 'Color is stripped away so that shadow, contour, and tactile touch can finally speak.',
    featuredProducts: ['e06-essential-tank', 'e03-wide-trouser'],
    notes: 'Textured woven lace and breathable linen back-tied details captured in rich black and white editorial daylight. Focuses on artisanal craftsmanship and raw tactile presence.'
  },
  {
    id: 'look-04',
    number: 'LOOK 04',
    title: 'KINETIC SILHOUETTE',
    subtitle: 'URBAN TRANSIT',
    image: redTeeImg,
    aspect: 'portrait',
    quote: 'Nothing stays still. The garment is an ongoing conversation with wind, architecture, and stride.',
    featuredProducts: ['e01-signature-tee', 'e08-studio-cap'],
    notes: 'Rich terracotta oversized heavy-knit tee anchored by black dropped-shoulder tailoring and industrial footwear. A deliberate celebration of bold street proportions.'
  }
];
