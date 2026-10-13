// ===== App layout =====
// Shared layout for all pages. Also keeps the signed-in user and their cart in sync with Supabase.
// ScrollRestoration starts every new page at the top, and going back returns
// to where the user was on the page before.

import { Outlet, ScrollRestoration } from "react-router";
import useAuthListener from "./hooks/useAuthListener";
import useCartSync from "./hooks/useCartSync";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";

const App = () => {
  useAuthListener();
  useCartSync();

  return (
    <>
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
