const CartItem = ({ title, price, image }) => {
  return (
    <div>
      <div>
        <img src={image} alt="" width="70px" />
      </div>
      <div>
        <div>
          <div>
            <div>{title}</div>
            <button>Delete</button>
          </div>
          <div>
            <button>-</button>
            <input type="number" />
            <button>+</button>
          </div>
        </div>
        <div>${price}</div>
      </div>
    </div>
  );
};

export default CartItem;
