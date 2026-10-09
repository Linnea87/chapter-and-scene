import { Outlet } from "react-router";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import useAuthListener from "./hooks/useAuthListener";
import useCartSync from "./hooks/useCartSync";

// ===== App layout =====
// Shared layout for all pages. Also keeps the signed-in user and their cart in sync with Supabase.

const App = () => {
  useAuthListener();
  useCartSync();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
