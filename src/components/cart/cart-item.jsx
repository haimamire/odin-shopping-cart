const CartItem = ({ id, title, quantity, price, image, removeItem }) => {
  return (
    <div>
      <div>
        <img src={image} alt="" width="70px" />
      </div>
      <div>
        <div>
          <div>
            <div>{title}</div>
            <button
              onClick={() => {
                removeItem(id);
              }}
            >
              Delete
            </button>
          </div>
          <div>
            <button>-</button>
            <input type="number" defaultValue={quantity} />
            <button>+</button>
          </div>
        </div>
        <div>${price}</div>
      </div>
    </div>
  );
};

export default CartItem;
