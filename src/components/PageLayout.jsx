import { useAuth } from "../hooks/useAuth";
import Login from "../routes/login";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";

function PageLayout(props) {
  const { user, isLoading } = useAuth({
    middleware: "guest",
  });

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center text-primary">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="antialiased">
      {!user ? (
        <Login />
      ) : (
        <div className="drawer lg:drawer-open">
          <input id="drawer-main" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <div className="max-w-[100vw] px-6 pb-16">
              <label
                htmlFor="drawer-main"
                className="btn btn-primary drawer-button lg:hidden">
                Mostra sidenav
              </label>
              <Navbar />
              {props.children}
            </div>
          </div>
          <Sidenav />
        </div>
      )}
    </div>
  );
}
export default PageLayout;
