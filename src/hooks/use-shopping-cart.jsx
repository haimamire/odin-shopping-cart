import { useState } from "react";

const useShoppingCart = () => {
  const [cartProducts, setSelectedProducts] = useState([]);

  const addCartProduct = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  return {
    cartProducts,
    addCartProduct,
  };
};

export default useShoppingCart;
