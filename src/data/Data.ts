interface Product {
  color: string;
  type: string;
  title: string;
  price: string;
}

export const Data: Product[] = [
  {
    color: 'bg-green/20',
    type: '95',
    title: 'Gasoline AI-95',
    price: '$1.63',
  },
  {
    color: 'bg-primary/20',
    type: '92',
    title: 'Gasoline AI-92',
    price: '$1.56',
  },
  {
    color: 'bg-[#D97B7B]/20',
    type: 'DF',
    title: 'Diesel fuel',
    price: '$1.24',
  },
  {
    color: 'bg-blue/20',
    type: '98',
    title: 'Gasoline AI-98',
    price: '$1.89',
  },
  {
    color: 'bg-[#7764EC]/20',
    type: 'LG',
    title: 'Liguefied gas',
    price: '$1.50',
  },
  {
    color: 'bg-[#ffff]/20',
    type: 'CG',
    title: 'Compressed gas',
    price: '$1.80',
  },
];

export const iconToColorMap: Record<string, string> = {
  DF: 'bg-[#D97B7B]/20',
  LG: 'bg-[#7764EC]/20',
  CG: 'bg-[#ffff]/20',
  '95': 'bg-green/20',
  '92': 'bg-primary/20',
  '98': 'bg-blue/20',
  '100': 'bg-[#8888]/20',
  '/cookies.svg': 'bg-primary/20',
  '/apple.svg': 'bg-primary/20',
  '/carrot.svg': 'bg-primary/20',
  '/drink-default.svg': 'bg-[#6492EC]/20',
  '/hot-dog.svg': 'bg-primary/20',
  '/burger.svg': 'bg-primary/20',
  '/sandwich.svg': 'bg-primary/20',
}
