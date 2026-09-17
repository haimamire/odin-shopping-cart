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

  const removeCartItem = (id) => {
    const newCart = cartProducts.filter((product) => product.id !== id);

    setCartProducts(newCart);
  };

  const updateCartItem = (id, quantity) => {
    const newCart = [...cartProducts];

    for (let product of newCart) {
      if (product.id === id) {
        product.quantity = quantity;
        setCartProducts(newCart);
        return;
      }
    }
  };

  return {
    cartProducts,
    addCartProduct,
    removeCartItem,
    updateCartItem,
  };
};

export default useShoppingCart;
