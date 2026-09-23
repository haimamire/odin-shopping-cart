import { describe, expect, it, vi } from "vitest";
import ShopItem from "../shop-item";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Swal from "sweetalert2";

const props = {
  id: 0,
  title: "title0",
  price: 100,
  image: "https://example.com/",
};

const renderWithProps = () => {
  render(
    <ShopItem
      id={props.id}
      title={props.title}
      price={props.price}
      image={props.image}
    />,
  );
};

const addCartProductMock = vi.fn();
const navigateMock = vi.fn();
Swal.fire = vi.fn(() => Promise.resolve({ isConfirmed: true }));

vi.mock("react-router", () => {
  return {
    useOutletContext: () => ({ addCartProduct: addCartProductMock }),
    useNavigate: () => navigateMock,
  };
});

describe("Every prop passed displayed", () => {
  it("uses the correct url for the product image", () => {
    renderWithProps();
    const image = screen.getByTestId("shop-img");

    expect(image.src).toBe(props.image);
  });
  it("renders the correct product name and price", () => {
    renderWithProps();

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(props.price))).toBeInTheDocument();
  });
});

describe("Adding product to cart", () => {
  it("calls the addCartProduct function when the button is pressed and the navigate function on clicking the sweetalert confirm button", async () => {
    renderWithProps();
    const button = screen.getByTestId("add-to-cart");
    const user = userEvent.setup();

    await user.click(button);
    expect(addCartProductMock).toHaveBeenCalledOnce();
    expect(navigateMock).toHaveBeenCalledOnce();
  });
});
