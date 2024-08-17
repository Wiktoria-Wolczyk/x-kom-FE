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
  discountedPrice?: number | null;
  category: string;
  brand: string;
  available: number;
  tag?: string | null;
  isHotShot?: boolean | null;
  img: string;
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

export interface ICartProduct extends IProduct {
  quantity: number;
}
