import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";

//components
import { Categories } from "../components/Categories/Categories";
import { Sort } from "../components/Sort/Sort";
import SkeletonPizza from "../components/PizzaBlock/skeleton/SkeletonPizza";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Pagination } from "../components/Pagination/Pagination";
import { setPage } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState } from "../redux/store";

export type ItemsType = {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  // пиццы
  const { status } = useSelector((state: RootState) => state.pizza);
  const items: ItemsType[] = useSelector(
    (state: RootState) => state.pizza.items
  );

  // фильтрация
  const { categoryId, sort, inputValue, currentPage } = useSelector(
    (state: RootState) => state.filter
  );
  const sortType = sort.sort;

  // пагинация
  const onChangePage = (page: number) => {
    dispatch(setPage(page));
  };

  const fetchData = async () => {
    const descOrAsc = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const categories = categoryId > 0 ? `category=${categoryId}` : "";
    const search = inputValue ? `search=${inputValue}` : "";

    const url = `${process.env.REACT_APP_API_URL}/pizzas?`;

    dispatch(
      fetchPizzas({
        url,
        search,
        sortBy,
        descOrAsc,
        categories,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchData();
  }, [categoryId, sortType, inputValue, currentPage, dispatch]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status === "failed" ? (
            <div className="error">404 Not Found :(</div>
          ) : status === "loading" ? (
            [...new Array(6)].map((_, i) => <SkeletonPizza key={i} />)
          ) : (
            items.map((p) => <PizzaBlock key={p.id} {...p} />)
          )}
        </div>
        <Pagination onChangePage={onChangePage} />
      </div>
    </>
  );
};
