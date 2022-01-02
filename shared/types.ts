export type Products = Product[];

export type Product = {
  id: string;
  image: {
    alt: string;
    src: string;
    width: number;
    height: number;
    blurDataURL: string;
  };
  category: string;
  title: string;
  description: string;
  tags: [
    {
      id: string;
      title: string;
    }
  ];
  price: string;
};
