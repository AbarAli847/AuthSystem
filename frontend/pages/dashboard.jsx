
import { useEffect, useState } from "react";
// import API from "../lib/axios";
// import ProtectedRoute from "../components/ProtectedRoute";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="bg-gray-100 p-4 rounded shadow">
        <p className="mb-2">
          <span className="font-semibold">Name:</span> {user.name}
        </p>

        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
}

// export default ProtectedRoute(Dashboard);
export default Dashboard;
