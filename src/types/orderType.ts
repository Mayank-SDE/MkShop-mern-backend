export type OrderItemType = {
  title: string;
  price: number;
  quantity: number;
  productId: string;
  thumbnail: string;
};
export type ShippingInfoType = {
  address: string;
  city: string;
  country: string;
  state: string;
  pinCode: string;
  phoneNumber: string;
  email: string;
  billingName: string;
};
export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: string;
  status: 'placed' | 'picked' | 'packed' | 'shipped' | 'delivered';
  tax: number;
  shippingCharges: number;
  subTotal: number;
  total: number;
  discount: number;
  orderItems: OrderItemType[];
}
