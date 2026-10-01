import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import MovieDetailPage from "../pages/MovieDetailPage/MovieDetailPage";
import TvDetailPage from "../pages/TvDetailPage/TvDetailPage";
import CartPage from "../pages/CartPage/CartPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

// All pages render inside App, which provides the shared layout
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "explore", element: <CatalogPage /> },
      { path: "movie/:id", element: <MovieDetailPage /> },
      { path: "tv/:id", element: <TvDetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
