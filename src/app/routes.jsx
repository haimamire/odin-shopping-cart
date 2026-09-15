import Layout from "../components/layouts/layout";
import Home from "./routes/app/home";
import Shop from "./routes/app/shop";
import Cart from "./routes/app/cart";
import NotFound from "./routes/not-found";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;
