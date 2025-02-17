import React, { useState } from "react";
import "../../scss/app.scss";
import { useDispatch, useSelector } from "react-redux";
import { CartProduct, addProduct } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

import { RootState } from "../../redux/store";

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
  rating,
}) => {
  const dispatch = useDispatch();

  const typesDough = ["тонкое", "традиционное"];
  const [activeSize, setActiveSize] = useState(0);
  const [activeDough, setActiveDough] = useState(0);

  const countProduct = useSelector((state: RootState) =>
    state.cart.products.find((prod) => prod.id === id)
  );

  const addedToCart = countProduct ? countProduct.count : 0;

  const addToCart = () => {
    const product: CartProduct = {
      id,
      title,
      price,
      imageUrl,
      type: typesDough[activeDough],
      size: sizes[activeSize],
      count: 0,
    };

    dispatch(addProduct(product));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizzas/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((t, index) => (
            <li
              onClick={() => setActiveDough(index)}
              className={activeDough === index ? "active" : ""}
              key={index}
            >
              {typesDough[t]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((s, index) => (
            <li
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? "active" : ""}
              key={index}
            >
              {s} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div onClick={addToCart} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedToCart > 0 && <i>{addedToCart}</i>}
        </div>
      </div>
    </div>
  );
};
