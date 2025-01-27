import React, { useCallback } from "react";
import s from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "../../redux/slices/filterSlice";
import debounce from "lodash.debounce";

export const Search: React.FC = () => {
  const onChangeInput = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setInputValue(e.target.value));
    }, 500),
    []
  );

  const dispatch = useDispatch();
  const { inputValue } = useSelector((state: any) => state.filter.inputValue);

  return (
    <div className={s.search_input_container}>
      <input
        type="text"
        className={s.search_input}
        value={inputValue}
        placeholder="Найти пиццу"
        onChange={(e) => onChangeInput(e)}
      />
    </div>
  );
};
