import { useState } from "react";
import ShopItem from "../../../components/shop/shop-item";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([
    {
      id: 0,
      title: "Balanza Digital Alta Precisión Personal 180kg Vidrio Templado LED Color Negro JD EB3483",
      price: 1,
      description: "description",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    },
  ]);

  return (
    <div>
      {allProducts.map((product) => (
        <ShopItem
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default Shop;
