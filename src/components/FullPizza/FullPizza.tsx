import axios from "axios";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type dataType = {
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
};

export const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<dataType>();
  const typesDough = ["тонкое", "традиционное"];
  const navigate = useNavigate();

  console.log(data?.sizes);

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/pizzas?id=${id}`
        );
        setData(data[0]);
      } catch (err) {
        alert("ошибка при загрузке пиццы :(");
        navigate("/", { replace: true });
      }
    }
    fetchPizza();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pizza-block">
      <Link to={`/pizzas/${id}`}>
        <img width={300} src={data.imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{data.title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {data.types.map((t, index) => (
            <li key={index}>{typesDough[t]}</li>
          ))}
        </ul>
        <ul>
          {data.sizes.map((s, index) => (
            <li key={index}>{s} см.</li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {data.price} ₽</div>
        <Link to={"/"}>
          <div className="button button--outline button--add">
            <span>Назад</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
