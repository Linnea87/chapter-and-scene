import { Outlet } from "react-router";
import Header from "./components/layout/Header/Header";

// ===== App layout =====
// Shared layout for all pages. The footer is added in the next step.

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
