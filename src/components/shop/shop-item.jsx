import { useNavigate, useOutletContext } from "react-router";
import Swal from "sweetalert2";

const ShopItem = ({ id, title, price, description, image }) => {
  const { addCartProduct } = useOutletContext();
  const navigate = useNavigate();

  const addCurrentProduct = () => {
    addCartProduct({ id, title, price, image });

    Swal.fire({
      title: `${title} was added to the cart!`,
      icon: "success",
      showCloseButton: true,
      confirmButtonText: "Go to shopping cart",
    }).then((result) => {
      if (result.isConfirmed) navigate("/cart");
    });
  };

  return (
    <div>
      <img src={image} alt={description} width="200px" />
      <div>
        <h2>{title}</h2>
        <div>${price}</div>
        <button onClick={addCurrentProduct}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ShopItem;
