import { CartProduct } from "../redux/slices/cartSlice";

export const calcTotalPrice = (products: CartProduct[]) => {
  return products.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
