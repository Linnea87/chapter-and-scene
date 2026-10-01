import { Outlet } from "react-router";

// ===== App layout =====
// Shared layout for all pages. Header and footer are added in the next step.

const App = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default App;
