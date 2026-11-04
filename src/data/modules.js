// All course content lives here. Never change an existing item's `id`:
// progress is stored in localStorage by id.
export const MODULES = [
  {
    id: 'm1',
    num: '01',
    title: 'القرار بالبدء',
    subtitle: 'هل يجب أن تبني شركة ناشئة؟',
    videos: [
      { id: 'm1v1', label: 'هل يجب أن تبدأ شركة ناشئة؟', url: 'https://youtu.be/BUE-icVYRFU' },
    ],
    readings: [
      { id: 'm1r1', label: 'لماذا لا تمتنع عن البدء؟', url: 'https://www.paulgraham.com/notnot.html' },
      { id: 'm1r2', label: 'ما قبل الشركة الناشئة', url: 'https://www.paulgraham.com/before.html' },
    ],
  },
  {
    id: 'm2',
    num: '02',
    title: 'الفكرة وتقييمها',
    subtitle: 'كيف تجد فكرة تستحق البناء',
    videos: [
      { id: 'm2v1', label: 'كيف تجد وتقيّم أفكار الشركات الناشئة', url: 'https://youtu.be/Th8JoIan4dg' },
      { id: 'm2v2', label: 'كل شيء عن التحول (Pivoting)', url: 'https://youtu.be/8pNxKX1SUGE' },
    ],
    readings: [
      { id: 'm2r1', label: 'كيف تحصل على أفكار — بول غراهام', url: 'https://www.paulgraham.com/startupideas.html' },
    ],
  },
  {
    id: 'm3',
    num: '03',
    title: 'بناء الفريق المؤسس',
    subtitle: 'الشركاء والحصص والديناميكية',
    videos: [
      { id: 'm3v1', label: 'كل شيء عن الشركاء المؤسسين', url: 'https://youtu.be/A4SLDQDXdp0' },
      { id: 'm3v2', label: 'أخطاء المؤسسين التي تقتل الشركات', url: 'https://youtu.be/dlfjs_eEEzs' },
      { id: 'm3v3', label: 'كيف تقسم الحصص بين المؤسسين', url: 'https://youtu.be/9NhEBVPlJs4' },
      { id: 'm3v4', label: 'كيف تعملون معاً بفعالية', url: 'https://youtu.be/30a5yFBd7Fo' },
    ],
    readings: [],
  },
  {
    id: 'm4',
    num: '04',
    title: 'التخطيط للـ MVP',
    subtitle: 'من الفكرة إلى أول نسخة قابلة للاختبار',
    videos: [
      { id: 'm4v1', label: 'كيف تتحدث مع المستخدمين', url: 'https://youtu.be/z1iF1c8w5Lg' },
      { id: 'm4v2', label: 'كيف تبني منتجاً أولياً (MVP)', url: 'https://youtu.be/QRZ_l7cVzzU' },
    ],
    readings: [
      { id: 'm4r1', label: 'أساسيات دورة تطوير المنتج', url: 'https://www.ycombinator.com/library/4e-guide-to-product-development' },
    ],
  },
  {
    id: 'm5',
    num: '05',
    title: 'الإطلاق',
    subtitle: 'كيف تخرج للسوق وتكسب أول عملائك',
    videos: [
      { id: 'm5v1', label: 'كيف تطلق مشروعك', url: 'https://youtu.be/u36A-YTxiOw' },
      { id: 'm5v2', label: 'كيف تحصل على أول عملائك', url: 'https://youtu.be/hyYCn_kAngI' },
    ],
    readings: [
      { id: 'm5r1', label: 'افعل أشياءً لا تتقشر — Do Things That Don\'t Scale', url: 'https://paulgraham.com/ds.html' },
    ],
  },
  {
    id: 'm6',
    num: '06',
    title: 'النمو وتحديد المؤشرات',
    subtitle: 'المؤشرات والتسعير واستراتيجيات النمو',
    videos: [
      { id: 'm6v1', label: 'كيف تحدد المؤشرات (KPIs) وترتب أولوياتك', url: 'https://youtu.be/6DTK9yDP6p0' },
      { id: 'm6v2', label: 'نماذج العمل والتسعير', url: 'https://youtu.be/oWZbWzAyHAE' },
      { id: 'm6v3', label: 'استراتيجيات النمو', url: 'https://youtu.be/6lY9CYIY4pQ' },
    ],
    readings: [],
  },
];

export const STORAGE_KEY = 'yc_study_plan_v1';

export function loadChecked() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

export function saveChecked(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export const ALL_ITEMS = MODULES.flatMap((m) => [...m.videos, ...m.readings]);
export const TOTAL = ALL_ITEMS.length;
