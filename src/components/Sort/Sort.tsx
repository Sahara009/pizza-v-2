import React, { useEffect, useRef, useState } from "react";
import "../../scss/app.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSortType } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";

type sortListType = {
  name: string;
  sort: string;
};

export const sortList: sortListType[] = [
  { name: "популярности (Desc)", sort: "rating" },
  { name: "популярности (Asc)", sort: "-rating" },
  { name: "цене (Desc)", sort: "price" },
  { name: "цене (Asc)", sort: "-price" },
  { name: "алфавиту (Desc)", sort: "title" },
  { name: "алфавиту (Asc)", sort: "-title" },
];

export const Sort = () => {
  const dispatch = useDispatch();
  const sortType: sortListType = useSelector(
    (state: RootState) => state.filter.sort
  );
  const sortRef = useRef<HTMLDivElement>(null);

  const [visiblePop, setVisiblePop] = useState(false);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setVisiblePop(false);
      }
    };
    document.body.addEventListener("click", clickOutside);

    //что бы функция не повторялась удаляем ее в конце
    return () => {
      document.body.removeEventListener("click", clickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setVisiblePop(!visiblePop)}>{sortType.name}</span>
      </div>
      {visiblePop && (
        <div className="sort__popup">
          <ul>
            {sortList.map((s, index) => (
              <li
                key={index}
                onClick={() => {
                  dispatch(setSortType(s));
                  setVisiblePop(false);
                }}
                className={sortType.sort === s.sort ? "active" : ""}
              >
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
