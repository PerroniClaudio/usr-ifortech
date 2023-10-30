import { useAuth } from "../hooks/useAuth";
import Login from "./login";
import Dashboard from "../components/Dashboard";

function Root() {
  const { user } = useAuth({
    middleware: "guest",
  });

  return <>{user ? <Dashboard /> : <></>}</>;
}
export default Root;
