export type Stock = {
  stock: number;
  simulatedDay: number;
};

export interface Product {
  id: string;
  title: string;
  description: string;
  stock: Stock [];
  price: number;
}

export const products: Product [] = [
  {
    id: 'solar',
    title: 'Solar Panel',
    description: 'Super duper Essent solar panel',
    stock: [ { stock: 10, simulatedDay: 0 }  ],
    price: 750,
  },
  {
    id: 'insulation',
    title: 'Insulation',
    description: 'Cavity wall insulation',
    stock: [ { stock: 10, simulatedDay: 0 }  ],
    price: 2500,
  },
  {
    id: 'heatpump',
    title: 'Awesome Heatpump',
    description: 'Hybrid heat pump',
    stock: [ { stock: 3, simulatedDay: 0 }  ],
    price: 5000,
  },
];
