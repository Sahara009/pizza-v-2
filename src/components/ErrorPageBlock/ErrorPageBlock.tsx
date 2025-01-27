import React from "react";
import s from "./ErrorPageBlock.module.scss";

export const ErrorPageBlock: React.FC = () => {
  return (
    <div className={s.root}>
      <h1>
        <span>😫</span>
        <br />
        Ничего не найдено
      </h1>
      <p>Произошла ошибка загрузки либо страница отсутствует</p>
    </div>
  );
};
