const CartItem = ({ product, removeItem, updateItem }) => {
  const increaseQuantity = () => {
    updateQuantity(product.quantity + 1);
  };

  const decreaseQuantity = () => {
    updateQuantity(product.quantity - 1);
  };

  const handleInputQuantity = (e) => {
    let quantity = e.target.value;

    // Doesn't let you delete the item just from the input
    if (e.target.value === "") quantity = 1;

    updateQuantity(Number(quantity));
  };

  const updateQuantity = (quantity) => {
    if (quantity <= 0) {
      removeItem(product.id);
      return;
    }
    updateItem(product.id, quantity);
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div>
      <div>
        <img src={product.image} alt="" width="70px" />
      </div>
      <div>
        <div>
          <div>
            <div>{product.title}</div>
            <button onClick={handleRemove}>Delete</button>
          </div>
          <div>
            <button
              disabled={product.quantity === 1}
              onClick={decreaseQuantity}
            >
              -
            </button>
            <input
              type="number"
              value={product.quantity}
              onChange={handleInputQuantity}
            />
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
        <div>${product.price * product.quantity}</div>
      </div>
    </div>
  );
};

export default CartItem;
