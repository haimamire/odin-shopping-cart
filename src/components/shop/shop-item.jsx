import { useOutletContext } from "react-router";

const ShopItem = ({ id, title, price, description, image }) => {
  const addCartProduct = useOutletContext();

  const addCurrentProduct = () => {
    addCartProduct({ id, title, price, image });
  };

  return (
    <div>
      <img src={image} alt={description} />
      <div>
        <h2>{title}</h2>
        <div>{price}</div>
        <button onClick={addCurrentProduct}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ShopItem;
