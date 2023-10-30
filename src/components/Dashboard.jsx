import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const { user } = useAuth({
    middleware: "auth",
  });

  return (
    <div className="pt-8 flex flex-col gap-2">
      <h1 className="text-4xl font-bold">Benvenuto {user.name}</h1>
      <div className="divider" />
    </div>
  );
}
export default Dashboard;
