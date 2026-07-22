import {useEffect, useState} from "react";
import {
  HiOutlineFingerPrint,
  HiOutlineLogout,
  HiOutlineMoon,
  // HiOutlineShieldCheck,
  HiOutlineSun,
} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import MainTitle from "../component/MainTitle";
import NavBar from "../component/NavBar";
import SubTitle from "../component/SubTitle";
import useAuth from "../hooks/UseAuth";
import useThemes from "../services/ThemeMode";
import toast from "react-hot-toast";

function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const authHook = useAuth();
  const navigate = useNavigate();
  const theme = useThemes();

  const logout = () => {
    authHook.deauthenticate();
    theme.ThemeSetMode("light");
    navigate("/login");
  };

  useEffect(() => {
    const currTheme: string = theme.ThemeVerifyMode();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDarkMode(currTheme === "dark"); // se for dark ativa o botão
  }, []); // deve rodar uma vez no inicio

  const themeSwitch = () => {
    const currTheme: string = theme.ThemeVerifyMode();
    theme.ThemeSetMode(currTheme == "dark" ? "light" : "dark");

    setIsDarkMode(!isDarkMode);

    toast.success("Swichted");
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-warm-cream">
      <NavBar />
      <main className="max-w-2xl mx-auto p-6">
        <header className="mb-8">
          <MainTitle text="Settings" className="mb-2" />
          <p className="text-vault-text font-nunito">
            Customize your Terra Vault experience.
          </p>
        </header>

        <div className="space-y-8">
          {/* Appearance Section */}
          <section className="space-y-4">
            <SubTitle text="Appearance" />
            <div className="bg-vault-card rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3 ">
                  <div
                    className={`p-2 rounded-lg ${isDarkMode ? "bg-purple-100 text-purple-600" : "bg-amber-100 text-amber-600"}`}
                  >
                    {isDarkMode ? (
                      <HiOutlineMoon size={20} />
                    ) : (
                      <HiOutlineSun size={20} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-vault-text-bold">
                      Dark Mode
                    </p>
                    <p className="text-xs text-gray-400">
                      Reduce glare and save battery
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    themeSwitch();
                  }}
                  onLoad={() => {}}
                  className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? "bg-forest-green" : "bg-gray-200"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isDarkMode ? "left-7" : "left-1"}`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="space-y-4">
            <SubTitle text="Security" />
            <div className="bg-vault-card rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <HiOutlineFingerPrint size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-vault-text-bold">
                      Biometric Unlock
                    </p>
                    <p className="text-xs text-gray-400">
                      Use fingerprint or Face ID - SOON
                    </p>
                  </div>
                </div>
                <button
                  disabled
                  onClick={() => setBiometricEnabled(!biometricEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${biometricEnabled ? "bg-forest-green" : "bg-gray-200"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${biometricEnabled ? "left-7" : "left-1"}`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="pt-4">
            <button
              onClick={() => {
                logout();
              }}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-red-500 font-bold border border-red-100 hover:bg-red-50 transition-colors"
            >
              <HiOutlineLogout size={20} />
              <span>Log Out</span>
            </button>
            <p className="text-center text-xs text-vault-text mt-6">
              Terra Vault v1.0.0 • Rooted in Privacy
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Settings;
