import { JournalArticle } from '../types';
import { craftImg, laceBlouseImg, plaidBlazerImg, redTeeImg } from './products';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'the-art-of-simplicity',
    title: 'THE ART OF SIMPLICITY',
    category: 'PHILOSOPHY',
    date: 'MARCH 2026',
    readTime: '4 MIN READ',
    image: craftImg,
    excerpt: 'True simplicity is never the absence of thought; it is the absolute culmination of relentless editing.',
    content: [
      'In a fashion landscape saturated with ephemeral graphics, hurried micro-trends, and loud logos vying for fleeting screen attention, restraint becomes a radical creative act.',
      'When we founded ÉLANE, the foundational imperative was straightforward: create clothing that never shouts over the human wearing it. We stripped away decorative hardware, extraneous stitch lines, and transient badges.',
      'What remains is geometry, weight, and the way cloth behaves when an arm rises, when a foot steps forward, when the body rests. Simplicity requires an uncompromising standard of raw materials: when there are no decorative distractions, every millimeter of seam construction and textile texture is laid bare.',
      'We design garments that invite familiarity through repeated use. They do not age out of relevance; they settle into the contours of your daily rhythm.'
    ]
  },
  {
    id: 'why-we-design-in-black',
    title: 'WHY WE DESIGN IN BLACK',
    category: 'COLOUR STUDY',
    date: 'FEBRUARY 2026',
    readTime: '5 MIN READ',
    image: laceBlouseImg,
    excerpt: 'Obsidian is not an absence of colour, but a master canvas that elevates shadow, silhouette, and movement.',
    content: [
      'Black absorbs light, but more importantly, it forces the eye to notice edge, proportion, and form. In black, the silhouette of a coat cut with high shoulders and sweeping drape is instantly legible against any urban backdrop.',
      'For ÉLANE, Obsidian is our foundational anchor. It creates continuity across changing seasons and allows pieces purchased years apart to integrate seamlessly into a cohesive, enduring wardrobe.',
      'Yet black is never singular. Across our collection, you encounter the deep matte absorption of 480gsm unbrushed cotton fleece, the subtle sheen of virgin tropical wool, and the architectural density of double-faced wool-cashmere.',
      'In movement, Obsidian captures highlights along natural folds, turning shadow into a living, responsive element.'
    ]
  },
  {
    id: 'the-new-silhouette',
    title: 'THE NEW SILHOUETTE',
    category: 'DESIGN ARCHITECTURE',
    date: 'JANUARY 2026',
    readTime: '6 MIN READ',
    image: plaidBlazerImg,
    excerpt: 'How modern tailoring departed from rigid constriction to embrace fluid anatomical motion.',
    content: [
      'Traditional tailoring was historically conceived around rigidity: canvas chest pieces, padded shoulders that masked the body, and tight waists that demanded static posture. It was built for standing still.',
      'The modern condition is fluid. We move between creative studios, transit terminals, intimate dinners, and long pedestrian walks. The garment must support this rhythm without friction.',
      'Our approach to tailoring begins with internal softness. We drop the shoulder point by three centimeters, open the sleeve pitch to mirror natural arm resting angles, and craft trousers with generous double pleats that expand effortlessly as you sit or stride.',
      'The result is a presence that feels both sharp and completely unencumbered.'
    ]
  },
  {
    id: 'elane-johannesburg',
    title: 'ÉLANE / JOHANNESBURG',
    category: 'PLACE & PERSPECTIVE',
    date: 'DECEMBER 2025',
    readTime: '5 MIN READ',
    image: redTeeImg,
    excerpt: 'The raw architectural energy and golden highveld light that anchor our creative studio.',
    content: [
      'Johannesburg is a city of visceral contrast: brutalist concrete towers standing beneath expansive blue skies, intense midday shadows, and the brisk, sharp chill of winter mornings.',
      'Designing in Johannesburg means understanding transitional dressing. The high altitude demands breathable daylight fabrics that can seamlessly transform into protective thermal layers when dusk descends.',
      'The city’s kinetic spirit infuses our pattern cutting. There is a fearless sense of space, scale, and individuality here that rejects timid conformity.',
      'ÉLANE was born here, but designed for wherever movement takes you.'
    ]
  }
];
