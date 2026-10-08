// ─────────────────────────────────────────────────────────────
//  All site content lives here — edit text, photos & links in one place
// ─────────────────────────────────────────────────────────────
export const site = {
  name: 'Swini Makeup Studio',
  owner: 'G. Manikeshwari',
  ownerFull: 'Mrs. Gangavarupu Manikeshwari',
  phone: '6281363841',
  phoneDisplay: '+91 62813 63841',
  whatsapp: '916281363841',
  address: 'Opp. Aravinda Hospital, Zaheerabad, Telangana',
  timings: 'Mon – Sun · 9:00 AM – 8:00 PM', // TODO confirm with client
  mapQuery: 'Aravinda Hospital Zaheerabad',
  social: {
    instagram: 'https://www.instagram.com/', // TODO client handle
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
  },
}

export const nav = [
  ['home', 'Home'],
  ['about', 'About'],
  ['portfolio', 'Portfolio'],
  ['services', 'Services'],
  ['academy', 'Academy'],
  ['testimonials', 'Testimonials'],
  ['contact', 'Contact'],
]

export const stats = [
  { n: 6, suffix: '+', label: 'Industry Awards' },
  { n: 5, suffix: '-Day', label: 'PMU Course' },
  { n: 3, suffix: '-Day', label: 'Masterclass' },
]

export const roles = ['Celebrity Makeup Artist', 'Pro Hair Stylist', 'Trainer & Mentor', 'Director, SBMS – Zaheerabad']

export const awards = [
  { img: 'award-telangana.jpg', by: 'SwiftNLift Media Group', title: 'Telangana Business Excellence Award', sub: 'Best Makeup Transformation' },
  { img: 'award-beauty-2024.jpg', by: '2024 · Saikala Enterprises', title: 'Beauty Business Excellence Awards', sub: 'Business Supply Chain Excellence' },
  { img: 'award-iba-2023.jpg', by: '2023 · Indian Beauty Association', title: 'Best Makeup Artist Zaheerabad', sub: 'Pro Makeup Artist & Pro Hair Stylist' },
  { img: 'award-siiba.jpg', by: '6th Award · SIIBA', title: 'Best Makeup Artist', sub: 'South India Influencer & Bloggers Awards' },
]

// cat: bridal | party | classic | pmu   size: '' | 'tall' | 'wide'
export const portfolio = [
  { img: 'bridal-2.jpg', cat: 'bridal', title: 'Traditional Bride', size: 'tall' },
  { img: 'bridal-1.jpg', cat: 'bridal', title: 'Veil & Matha Patti', size: '' },
  { img: 'look-classic-2.jpg', cat: 'classic', title: 'Classic Saree Glam', size: 'tall' },
  { img: 'bridal-4.jpg', cat: 'party', title: 'Engagement Glam', size: '' },
  { img: 'bridal-3.jpg', cat: 'bridal', title: 'Bridal Detailing', size: 'wide' },
  { img: 'pmu-brows.jpg', cat: 'pmu', title: 'Microblading', size: '' },
  { img: 'look-classic-1.jpg', cat: 'classic', title: 'Timeless Elegance', size: 'tall' },
  { img: 'pmu-lips.jpg', cat: 'pmu', title: 'Lip Tint', size: '' },
]

export const filters = [
  ['all', 'All'],
  ['bridal', 'Bridal'],
  ['party', 'Engagement & Party'],
  ['classic', 'Classic Glam'],
  ['pmu', 'Permanent Makeup'],
]

export const services = [
  { icon: 'crown', title: 'Bridal Makeup', text: 'Signature HD bridal looks for muhurtham and reception, crafted to last through every ritual.', points: ['Long-lasting HD finish', 'Hairstyling & saree draping', 'Jewellery & dupatta setting'] },
  { icon: 'rings', title: 'Engagement Makeup', text: 'Fresh, glowing, photo-ready looks for ring ceremony, haldi and mehendi.', points: ['Soft glam or bold looks', 'Trendy hairdos', 'Outfit-matched palette'] },
  { icon: 'camera', title: 'Pre-Wedding Makeup', text: 'Camera-perfect looks for pre-wedding and couple shoots, indoors or on location.', points: ['Look changes on location', 'Natural daylight finish', 'Touch-up support'] },
  { icon: 'glass', title: 'Party Makeup', text: 'Glamorous looks for receptions, sangeet, festivals and family functions.', points: ['Bridesmaids & family', 'Group bookings', 'Quick event styling'] },
  { icon: 'comb', title: 'Hairstyling', text: 'Bridal buns, flower braids, soft curls and modern updos to complete your look.', points: ['Traditional jada & poola jada', 'Messy buns & curls', 'Extensions styling'] },
  { icon: 'brow', title: 'Permanent Makeup', text: 'Wake up ready — semi-permanent brows and lips by a certified PMU artist.', points: ['Microblading & powder brows', 'Lip tint', 'Beauty spot creation'] },
]

export const courses = [
  {
    title: 'Permanent Makeup Course',
    tag: '5 Days · Lifetime Support',
    text: 'Complete PMU training from theory to hands-on practice, with lifetime support after the course.',
    modules: ['Introduction to PMU', 'Microblading', 'Ombre Brows', 'Powder Brows', 'Combination Brows', 'Lip Tint', 'Scalp Pigmentation', 'Beauty Spot Creation', 'Skin Theory', 'Product Knowledge', 'Practice on Fruits', 'Hands-on Practice'],
  },
  {
    title: 'Hair & Makeup Masterclass',
    tag: '3 Days · Hyderabad',
    text: 'Intensive masterclass on professional makeup, bridal hairstyling and beauty techniques — for beginners and upcoming artists.',
    modules: ['Skin Prep', 'Base & Contouring', 'Eye Makeup', 'Bridal Looks', 'Hairstyling', 'Live Demo'],
  },
]

// TODO: replace with real client reviews (with permission) or Google reviews
export const testimonials = [
  { name: '[Client Name]', role: 'Bride · [City]', text: '[Client review — what she loved about her bridal look and the experience on her wedding day.]' },
  { name: '[Client Name]', role: 'Engagement · [City]', text: '[Client review — engagement or reception makeup experience.]' },
  { name: '[Student Name]', role: 'Academy Student', text: '[Student review — experience in the PMU course or masterclass.]' },
  { name: '[Client Name]', role: 'Pre-Wedding Shoot', text: '[Client review — pre-wedding shoot makeup and hairstyling.]' },
]

export const marquee = ['Bridal Makeup', 'Engagement Looks', 'Pre-Wedding Shoots', 'Party Glam', 'Hairstyling', 'Microblading', 'Permanent Makeup Academy']
