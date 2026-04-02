import { useEffect } from "react";
import { supabase } from "../../config/supbase.client";

const HomePage = () => {
  useEffect(() => {
    const execute = async () => {
      const session = await supabase.auth.getSession();
      console.log("session is: ", session);
    };

    execute();
  }, [supabase.auth.getSession()]);

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Home</h1>
      <div className="h-5"></div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
