import { Outlet } from "react-router";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import useAuthListener from "./hooks/useAuthListener";

// ===== App layout =====
// Shared layout for all pages. Also keeps the signed-in user in sync with Supabase.

const App = () => {
  useAuthListener();
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
