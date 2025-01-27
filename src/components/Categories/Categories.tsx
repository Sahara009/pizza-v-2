import React from "react";
import "../../scss/app.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categoryId: number = useSelector(
    (state: RootState) => state.filter.categoryId
  );

  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryId(index))}
            className={categoryId === index ? "active" : ""}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
