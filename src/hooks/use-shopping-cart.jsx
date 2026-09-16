import { useState } from "react";

const useShoppingCart = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const addCartProduct = (newProduct) => {
    const newCart = [...cartProducts];

    for (let product of newCart) {
      if (product.id === newProduct.id) {
        product.quantity++;
        setCartProducts(newCart);
        return;
      }
    }

    newCart.push(newProduct);
    setCartProducts(newCart);
  };

  const removeCartItem = (idToRemove) => {
    const newCart = cartProducts.filter((product) => product.id !== idToRemove);

    setCartProducts(newCart);
  };

  return {
    cartProducts,
    addCartProduct,
    removeCartItem,
  };
};

export default useShoppingCart;
