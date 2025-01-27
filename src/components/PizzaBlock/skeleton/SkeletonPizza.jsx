import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonPizza = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f0f0f0"
    foregroundColor="#e3e3e3"
  >
    <rect x="0" y="279" rx="10" ry="10" width="280" height="20" />
    <rect x="1" y="321" rx="10" ry="10" width="280" height="87" />
    <rect x="11" y="437" rx="10" ry="10" width="90" height="27" />
    <rect x="129" y="425" rx="10" ry="10" width="150" height="45" />
    <circle cx="142" cy="131" r="125" />
  </ContentLoader>
);

export default SkeletonPizza;
