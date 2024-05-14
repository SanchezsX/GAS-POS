interface Product {
  color: string;
  type: string;
  title: string;
  price: string;
}

export const Data: Product[] = [
  {
    color: 'bg-green',
    type: '95',
    title: 'Gasoline AI-95',
    price: '$1.63',
  },
  {
    color: 'bg-primary',
    type: '92',
    title: 'Gasoline AI-92',
    price: '$1.56',
  },
  {
    color: 'bg-[#D97B7B]',
    type: 'DF',
    title: 'Diesel fuel',
    price: '$1.24',
  },
  {
    color: 'bg-blue',
    type: '98',
    title: 'Gasoline AI-98',
    price: '$1.89',
  },
  {
    color: 'bg-[#7764EC]',
    type: 'LG',
    title: 'Liguefied gas',
    price: '$1.50',
  },
  {
    color: 'bg-[#ffff]',
    type: 'CG',
    title: 'Compressed gas',
    price: '$1.80',
  },
];

export const iconToColorMap: Record<string, string> = {
  DF: 'bg-[#D97B7B]',
  LG: 'bg-[#7764EC]',
  CG: 'bg-[#ffff]',
  '95': 'bg-green',
  '92': 'bg-primary',
  '98': 'bg-blue',
  '100': 'bg-[#8888]',
  '/cookies.svg': 'bg-primary',
  '/apple.svg': 'bg-primary',
  '/carrot.svg': 'bg-primary',
  '/drink-default.svg': 'bg-[#6492EC]',
  '/hot-dog.svg': 'bg-primary',
  '/burger.svg': 'bg-primary',
  '/sandwich.svg': 'bg-primary',
}
