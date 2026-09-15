import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "/src/styles/reset.css";
import "/src/styles/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
