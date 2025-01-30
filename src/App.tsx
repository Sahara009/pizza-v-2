import React, { createContext } from "react";
import "./scss/app.scss";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";

//components
import { HomePage } from "./pages/HomePage";
import { Errorpage } from "./pages/Errorpage";
import { CartPage } from "./pages/CartPage";
import { FullPizza } from "./components/FullPizza/FullPizza";
import { Layout } from "./layouts/Layout";

export const ContextInput = createContext("");

function App() {
  if (window.location.pathname === "/") {
    return <Navigate to="/home" />;
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<Errorpage />} />
        <Route path="pizzas/:id" element={<FullPizza />} />
      </Route>
    </Routes>
  );
}

export default App;
