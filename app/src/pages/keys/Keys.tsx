import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPlus, HiShieldCheck } from "react-icons/hi";
import { Link, Navigate } from "react-router-dom";
import Card from "../../component/Card";
import MainTitle from "../../component/MainTitle";
import NavBar from "../../component/NavBar";
import _routes from "../../config/routes";
import useAuth from "../../hooks/UseAuth";
import type { Key } from "../../interfaces/key";
import KeysService from "../../services/KeysService";
import useThemes from "../../services/ThemeMode";

function SecretKeys() {
  const [keys, setKeys] = useState<Key[]>([]);
  const data = useAuth().authData();
  const theme = useThemes();

  useEffect(() => {
    const fetch = async () => {
      // Garantia de integridade
      if (!data.id) {
        Navigate({to: "/"});
      }

      // prettier-ignore
      try {
        const response = await KeysService().get(data.id!);
        setKeys(response as Key[]);
      }
      catch (error) {
        console.error("Error fetching user keys:", error);
        toast.error("Loading error!")
      }
      finally {
        toast.success("Loaded!")
      }
    };
    fetch();
    theme.ThemeVerifyMode();
  }, [data.id]);

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-warm-cream">
      <NavBar />
      <main className="max-w-2xl mx-auto p-6">
        <header className="mb-8">
          <MainTitle text="Your Vault" className="mb-2" />
          <p className="text-vault-text">Manage your secure roots.</p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Keys active card */}
          <div className="bg-forest-green p-4 rounded-xl text-white">
            <div className="flex items-center gap-2 mb-2 opacity-80 dark:opacity-100">
              <HiShieldCheck size={20} />
              <span className="text-sm font-bold ">Active Keys</span>
            </div>
            <span className="text-3xl font-bold font-literata">
              {keys.length}
            </span>
          </div>
        </div>

        {/* Keys List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-vault-text font-literata px-1">
            All Secrets
          </h3>
          {keys.length > 0 ? (
            <div className="space-y-3">
              {keys.map((item) => (
                <Card
                  key={item.id}
                  link={`${_routes.key_details}${item.id}`}
                  title={item.title}
                  description={item.description || "No description provided."}
                  className="bg-vault-card"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/50 rounded-xl border border-dashed border-gray-300">
              <p className="text-vault-text italic">
                Your vault is empty. Plant your first secret.
              </p>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <Link
          to={_routes.key_add}
          className="fixed bottom-24 right-6 w-14 h-14 bg-forest-green text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform md:bottom-12 md:right-12"
        >
          <HiPlus size={32} />
        </Link>
      </main>
    </div>
  );
}

export default SecretKeys;
