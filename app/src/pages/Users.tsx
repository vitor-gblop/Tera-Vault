import { useEffect, useState } from "react";
import UsersService from "../services/UsersService";
import Card from "../component/Card";
import MainTitle from "../component/MainTitle";
import NavBar from "../component/NavBar";
import type { User } from "../interfaces/user";

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await UsersService().get();
        if (response) {
          setUsers(response as User[]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-warm-cream">
      <NavBar />
      <main className="max-w-2xl mx-auto p-6">
        <header className="mb-8">
          <MainTitle text="Users" className="mb-2" />
          <p className="text-gray-600 font-nunito">Manage vault contributors.</p>
        </header>

        <div className="space-y-4">
          {users.length > 0 ? (
            <div className="space-y-3">
              {users.map((item) => (
                <Card
                  key={item.email}
                  link="#"
                  title={item.name}
                  description={item.email}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 italic">No users found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Users;
