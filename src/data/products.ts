import type { Product } from "../types";

export const PRODUCTS: Product[] = [
  { id: 'trucks',  title:'Trucks',  desc:'Anchos, estables y diseñados para grindar más y mejor.', image:'/images/trucks.jpg',  alt:'Trucks Majorani', sectionId:'trucks',  category:'hardware',   status:'proximamente' },
  { id: 'gorros',  title:'Gorros',  desc:'Ediciones limitadas con identidad Majorani. Fabricación local.', image:'/images/hats.jpg',    alt:'Gorros Majorani', sectionId:'gorros',  category:'merch',      status:'en_stock' },
  { id: 'kingpin', title:'Set de tornillos (Kingpin)', desc:'Adaptá trucks de quad skate a planchas de artístico.', image:'/images/kingpin.jpg', alt:'Set de tornillos Kingpin', sectionId:'kingpin', category:'accesorios', status:'en_stock' },
];
