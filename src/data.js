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
  address: 'Hyderabad, Telangana', // TODO add full studio address
  timings: 'Mon – Sun · 9:00 AM – 8:00 PM', // TODO confirm with client
  mapQuery: 'Swini Makeup Studio Hyderabad Telangana',
  instagramHandle: '@swini_salon_official',
  social: {
    instagram: 'https://www.instagram.com/swini_salon_official/',
    threads: 'https://www.threads.com/@swini_salon_official',
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

export const roles = ['Celebrity Makeup Artist', 'Pro Hair Stylist', 'Trainer & Mentor', 'Director, SBMS']

export const awards = [
  { img: 'award-telangana.jpg', by: '2024 · SwiftNLift Media Group', title: 'Telangana Business Excellence Award', sub: 'Best Makeup Transformation' },
  { img: 'award-beauty-2024.jpg', by: '2024 · Saikala Enterprises', title: 'Beauty Business Excellence Awards', sub: 'Business Supply Chain Excellence' },
  { img: 'award-iba-2023.jpg', by: '2023 · Indian Beauty Association', title: 'Best Makeup Artist', sub: 'Pro Makeup Artist & Pro Hair Stylist' },
  { img: 'award-siiba.jpg', by: '6th Award · SIIBA', title: 'Best Makeup Artist', sub: 'South India Influencer & Bloggers Awards' },
]

// Photos & videos from award nights (shown under the award cards)
export const awardMoments = [
  { type: 'video', src: 'videos/award-night.mp4', poster: 'videos/award-night.jpg', title: 'Telangana Business Excellence Awards 2024', sub: 'Award night · Hyderabad' },
  { type: 'image', img: 'award-telangana-stage.jpg', title: 'Receiving the Telangana Business Excellence Award', sub: 'Presented by SwiftNLift Media Group, 2024' },
  { type: 'image', img: 'award-stage.jpg', title: 'On stage at a beauty industry awards event', sub: 'Recognition for makeup artistry' },
]

// Press coverage — add new articles here
export const news = [
  {
    outlet: 'ANI News',
    date: 'July 4, 2024',
    title: 'Telangana Business Excellence Awards 2024: A Night of Celebration and Achievement',
    text: 'Coverage of the SwiftNLift Media Group awards evening honouring Telangana entrepreneurs — Mrs. Gangavarupu Manikeshwari of Swini Makeup Studio is among the awardees.',
    url: 'https://www.aninews.in/news/business/telangana-business-excellence-awards-2024-a-night-of-celebration-and-achievement20240704171054/',
  },
  {
    outlet: 'Business Standard',
    date: 'July 4, 2024',
    title: 'Telangana Business Excellence Awards 2024: A Night of Celebration and Achievement',
    text: 'The awards night held in Hyderabad, featured in Business Standard press releases, lists Swini Makeup Studio among the honoured businesses.',
    url: 'https://www.business-standard.com/content/press-releases-ani/telangana-business-excellence-awards-2024-a-night-of-celebration-and-achievement-124070400772_1.html',
  },
  {
    outlet: 'SwiftNLift',
    date: '2024',
    title: 'Business Excellence Awards 2024 — Awardees',
    text: 'The official awardee list from the organisers, including Swini Makeup Studio.',
    url: 'https://swiftnlift.com/business-excellence-awards-2024-2/',
  },
  {
    outlet: 'Threads',
    date: '',
    title: 'Swini Studio Academy — Secunderabad',
    text: 'Announcement from the studio about Swini Studio Academy in Secunderabad.',
    url: 'https://www.threads.com/@swini_salon_official/post/DcLfPtAiPXE/swini-studio-acedemy-secundrabad/',
  },
]

// Short videos (vertical reels)
export const videos = [
  { src: 'videos/training-session.mp4', poster: 'videos/training-session.jpg', title: 'Live Training Session', sub: 'Hands-on makeup class with students' },
  { src: 'videos/award-night.mp4', poster: 'videos/award-night.jpg', title: 'Award Night', sub: 'Telangana Business Excellence Awards 2024' },
]

// Instagram section.
// Paste real post links here (e.g. 'https://www.instagram.com/p/XXXXXXXX/') to show official embedded posts.
// While this list is empty, the section shows the studio photos below as an Instagram-style grid linking to the profile.
export const instagramPosts = []
export const instagramGrid = ['bridal-2.jpg', 'award-telangana-stage.jpg', 'bridal-4.jpg', 'founder.jpg', 'bridal-1.jpg', 'workshop-poster.jpg', 'bridal-3.jpg', 'award-stage.jpg']

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
  {
    title: 'Self Makeup Workshop',
    tag: 'Workshop · Hyderabad',
    text: 'Learn to do your own makeup with confidence — step-by-step guidance and hands-on practice. Be your own kind of beautiful.',
    modules: ['Learn — step-by-step guidance', 'Practice — hands-on experience', 'Empower — enhance your skills', 'Glow — boost your confidence'],
    poster: 'workshop-poster.jpg',
  },
]

// Ratings shown in the banner and testimonials header.
// logo: optional — drop the official logo file into public/images and put its name here (e.g. 'google-logo.png').
// url: optional — your Google / Justdial review page link.
export const ratings = [
  { platform: 'Justdial', score: 4.9, logo: '', url: '' },
  { platform: 'Google', score: 4.8, logo: '', url: 'https://www.google.com/maps/search/?api=1&query=Swini+Makeup+Studio+Hyderabad' },
]

// Shown in the Testimonials section until real reviews are added below.
// As soon as the first testimonial no longer starts with '[', the section switches to real reviews.
export const highlights = [
  { icon: 'award', title: 'Award-Winning Artistry', text: '6+ industry awards, including the Telangana Business Excellence Award 2024 and Best Makeup Artist from the Indian Beauty Association.' },
  { icon: 'star', title: 'Rated 4.9 on Justdial', text: 'Highly rated by brides and families on Justdial and 4.8 on Google.' },
  { icon: 'heart', title: 'Planned Around You', text: 'Every look is designed for your skin, your outfit, your jewellery and your story — never a copy-paste face.' },
  { icon: 'crown', title: 'Telugu Bridal Specialists', text: 'Traditional muhurtham looks with matha patti, nath and temple jewellery placed just right.' },
  { icon: 'comb', title: 'Complete Bridal Styling', text: 'Makeup, hairstyling, saree draping and jewellery setting — handled together, start to finish.' },
  { icon: 'camera', title: 'Photo-Ready Finish', text: 'Long-lasting HD makeup that holds through long ceremonies and looks flawless on camera.' },
  { icon: 'clock', title: 'Early Muhurtham Bookings', text: 'Early-morning bridal slots so you are ready on time, calm and camera-ready.' },
  { icon: 'brow', title: 'Certified PMU Artist', text: 'Microblading, powder brows and lip tint by a certified permanent makeup artist and trainer.' },
  { icon: 'cert', title: 'Trainer & Mentor', text: 'Academy courses with hands-on practice, a certificate and lifetime support for PMU students.' },
  { icon: 'news', title: 'Featured in the Press', text: 'Recognised in ANI and Business Standard coverage of the Telangana Business Excellence Awards 2024.' },
]

// TODO: paste 10 real reviews from Google / Justdial (with the client's permission).
// source: 'Google' | 'Justdial' | 'Instagram' | ''
export const testimonials = [
  { name: '[Client Name]', role: 'Bride', source: 'Google', text: '[Paste a real Google review here.]' },
  { name: '[Client Name]', role: 'Bride', source: 'Justdial', text: '[Paste a real Justdial review here.]' },
  { name: '[Client Name]', role: 'Engagement', source: 'Google', text: '[Paste a real Google review here.]' },
  { name: '[Client Name]', role: 'Reception', source: 'Justdial', text: '[Paste a real Justdial review here.]' },
  { name: '[Client Name]', role: 'Pre-Wedding Shoot', source: 'Google', text: '[Paste a real Google review here.]' },
  { name: '[Client Name]', role: 'Party Makeup', source: 'Justdial', text: '[Paste a real Justdial review here.]' },
  { name: '[Student Name]', role: 'PMU Course Student', source: 'Google', text: '[Paste a real Google review here.]' },
  { name: '[Student Name]', role: 'Masterclass Student', source: 'Justdial', text: '[Paste a real Justdial review here.]' },
  { name: '[Client Name]', role: 'Microblading', source: 'Google', text: '[Paste a real Google review here.]' },
  { name: '[Client Name]', role: 'Self Makeup Workshop', source: 'Justdial', text: '[Paste a real Justdial review here.]' },
]

export const marquee = ['Bridal Makeup', 'Engagement Looks', 'Pre-Wedding Shoots', 'Party Glam', 'Hairstyling', 'Microblading', 'Permanent Makeup Academy']
