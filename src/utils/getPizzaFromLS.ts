import { calcTotalPrice } from "./calcTotalPrice";
import { CartProduct } from "../redux/slices/cartSlice";

export const getPizzaFromLS = () => {
  // достаем продукты
  const data = localStorage.getItem("cart");
  // парсим в нужный формат лиюо если их нет пустой массив
  const products = data ? (JSON.parse(data) as CartProduct[]) : [];
  console.log(products);
  // вычисляем общую сумму
  const totalPrice = calcTotalPrice(products);

  return {
    products,
    totalPrice,
  };
};
