import { Link, useOutletContext } from "react-router";
import CartItem from "../../../components/cart/cart-item";
import { useMemo } from "react";

const Cart = () => {
  const { cartProducts, removeCartItem, updateCartItem } = useOutletContext();

  const priceTotal = useMemo(
    () =>
      cartProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    [cartProducts],
  );

  if (cartProducts.length === 0)
    return (
      <div>
        <h2>Why aren't you buying anything?</h2>
        <p>
          Go to <Link to="/shop">our shop</Link> and give us money now! We can't
          afford rent anymore :(
        </p>
      </div>
    );

  return (
    <div>
      <section>
        <h2>Shopping Cart</h2>
        <hr />
        {cartProducts.map((product) => (
          <CartItem
            key={product.id}
            product={{
              id: product.id,
              title: product.title,
              quantity: product.quantity,
              price: product.price,
              image: product.image,
            }}
            removeItem={removeCartItem}
            updateItem={updateCartItem}
          />
        ))}
      </section>
      <section>
        <h2>Order Summary</h2>
        <hr />
        <div>
          <div>
            <div>Items</div>
            <div>${priceTotal}</div>
          </div>
          <div>
            <div>Shipping</div>
            <div>Free!</div>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <div>Total</div>
            <div>${priceTotal}</div>
          </div>
          <button>Checkout</button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
