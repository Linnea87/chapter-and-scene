import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import ExplorePage from "../pages/ExplorePage/ExplorePage";
import MovieDetailPage from "../pages/MovieDetailPage/MovieDetailPage";
import TvDetailPage from "../pages/TvDetailPage/TvDetailPage";
import CartPage from "../pages/CartPage/CartPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProtectedRoute from "../components/auth/ProtectedRoute/ProtectedRoute";

// All pages render inside App, which provides the shared layout
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <HomePage /> },
      { path: "explore", element: <ExplorePage /> },
      { path: "movie/:id", element: <MovieDetailPage /> },
      { path: "tv/:id", element: <TvDetailPage /> },
      { path: "cart", element: <CartPage /> },
      // Pages that require a signed-in user
      {
        element: <ProtectedRoute />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "order/:id", element: <OrderPage /> },
        ],
      },

      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
