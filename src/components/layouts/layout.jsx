import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <nav>Nav</nav>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};
export default Layout;
