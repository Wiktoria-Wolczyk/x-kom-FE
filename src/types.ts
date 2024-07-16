export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  category: string;
  brand: string;
  available: number;
}

export interface IOrderValues {
  id: number;
  createDate: string;
  updateDate: string;
  couponCode: string;
  status: string;
  price: number;
  products: IProduct[];
  user: IUser;
}

export interface IProductsArray {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  available: number;
  brand: string;
  quantity?: number;
}
