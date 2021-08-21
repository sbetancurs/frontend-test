export interface Price {
  type: string;
  price: number;
}

export interface Comic {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  prices: Price[];
  thumbnail: {
    path: string;
    extension: string;
  };
}
