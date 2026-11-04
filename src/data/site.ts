import towns from './towns.json';
import services from './services.json';
import gallery from './gallery.json';

export type Town = (typeof towns)[number];
export type Service = (typeof services)[number];
export { towns, services, gallery };

export const business = {
  name: 'Asphalt Express',
  legalName: 'Asphalt Express LLC',
  url: 'https://asphaltexpressllc.com',
  phoneDisplay: '(248) 889-5357',
  phoneHref: 'tel:+12488895357',
  // Every form on the site delivers here and nowhere else.
  email: 'asphaltexpresspaving7@gmail.com',
  street: '236 Maple',
  city: 'Highland',
  region: 'MI',
  zip: '48357',
  geo: { lat: 42.644397, lng: -83.6292104 },
  years: 30,
  rating: '4.3',
  reviewCount: 60,
  owners: 'Debbie and Angelo',
  mapsUrl: 'https://maps.google.com/?cid=8178145555081298973',
  reviewsUrl: 'https://www.google.com/maps/place/Asphalt+Express/@42.644397,-83.6317853,17z/data=!4m8!3m7!1s0x8824a06c058ed41f:0x717e9c0d7c0f841d!8m2!3d42.644397!4d-83.6292104!9m1!1b1!16s%2Fg%2F1thd2f25',
  writeReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJH9SOBWygJIgRHYQPfA2cfnE',
  placeId: 'ChIJH9SOBWygJIgRHYQPfA2cfnE',
  facebook: 'https://www.facebook.com/asphaltexpressllc/',
  payments: ['Visa', 'Mastercard', 'Discover', 'American Express', 'Check', 'Cash', 'Cashier’s Check'],
};

export const href = (slug: string) => `/${slug}/`;

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Contact', href: '/contact/' },
];

// Short card text for each service, from the original home page.
export const serviceCards: Record<string, { text: string; img: string }> = {
  'asphalt-paving': { text: 'Professional asphalt paving for driveways, parking lots and private roads, using quality materials and expert installation.', img: 'paving_0' },
  'commercial-parking-lots': { text: 'Commercial parking lot paving, repair and maintenance for businesses of every size, scheduled around your operations.', img: 'commercial_0' },
  'sealcoating-maintenance': { text: 'Sealcoating and preventive maintenance that protects your asphalt and extends the life of the surface.', img: 'sealcoating_0-v2' },
  'asphalt-resurfacing': { text: 'Restore a worn or damaged surface to like-new condition without the cost of a full replacement.', img: 'resurfacing_0' },
  'residential-paving': { text: 'Driveways, walkways and private roads built for homes, adding curb appeal and lasting function.', img: 'residential_0' },
  'asphalt-millings': { text: 'Recycled asphalt pavement millings, a durable and affordable surface for drives, yards and private roads.', img: 'millings_0-v2' },
  'removal-replacement': { text: 'When a surface is past repair, we remove it completely and install new asphalt on a properly prepared base.', img: 'removal_0' },
  'parking-lot-repair': { text: 'Potholes, cracks and failed sections repaired quickly, so your lot stays safe and your business keeps running.', img: 'repair_0' },
};

export const counties = ['Oakland', 'Livingston', 'Wayne', 'Macomb', 'Washtenaw', 'Genesee'].map((name) => ({
  name,
  towns: towns.filter((t) => t.county === name),
}));

export const stats = [
  { value: `${business.years}+`, label: 'Years in Business' },
  { value: String(services.length), label: 'Asphalt Services' },
  { value: String(towns.length), label: 'Communities Served' },
  { value: business.rating, suffix: '★', label: `${business.reviewCount} Google Reviews` },
];

export const ticker = [
  { label: 'Free Estimates', href: '/contact/' },
  { label: 'Residential and Commercial', href: '/services/' },
  { label: `Call ${business.phoneDisplay}`, href: business.phoneHref },
  { label: `${business.years}+ Years in Business`, href: '/about/' },
];

export const reviews = [
  { name: 'Anthony M.', tag: 'Satisfied Customer', text: 'We just built a home in Milford after Covid hit and the cost to pave our driveway was astronomical. We have about 550+ feet of asphalt that needs to be done. I could not believe the cost of the bids I was getting until I met Debbie. Let me tell you, Debbie and Angelo are the owners and they are the kindest people you will EVER meet! The bid from them was spot on where I needed it to be! Highly recommend them!' },
  { name: 'Mark A.', tag: 'Happy Customer', text: 'My neighbor had a new driveway put in so I gave Asphalt Express a call for a quote on resealing my driveway. The quote was reasonable so I had them schedule the job. The guys came out and had it done in short order. They did a great job on my driveway and also left the place nice and clean. I will definitely be using them next time. I was also pleasantly surprised to find that they did my walkways going all the way up to the porch as well as the walkway to my basement. Thanks!' },
  { name: 'James C.', tag: 'Repeat Customer', text: 'Angelo not only gave me a fair price for my driveway, but his crew was as professional as it gets. The finished product was everything we expected. I highly recommend Angelo and Asphalt Express!' },
];

export const galleryCats = [
  { key: 'driveways', label: 'Driveways & Private Roads' },
  { key: 'commercial', label: 'Commercial Parking Lots' },
  { key: 'crew', label: 'Crew at Work' },
];
