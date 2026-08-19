import React, {useState} from "react";
import {HiChevronLeft} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import MainTitle from "../../component/MainTitle";
import NavBar from "../../component/NavBar";
import type {Key} from "../../interfaces/key";
import KeysService from "../../services/KeysService";
import useAuth from "../../hooks/UseAuth";

function AddKeyForm() {
  // Informaçãi do token do usuário autenticado
  const _useAuth = useAuth();
  const data = _useAuth.authData();

  const [formData, setFormData] = useState<Key>({
    title: "",
    password: "",
    description: "",
    secure: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!data.id) {
      navigate("/");
      _useAuth.deauthenticate();
    }

    try {
      const response = await KeysService().add(formData, data.id!);
      if (response) {
        setMessage("Secret key planted successfully.");
        setTimeout(() => navigate(-1), 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to plant secret key. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-warm-cream">
      <NavBar />
      <main className="max-w-2xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-vault-text hover:text-forest-green mb-6 transition-colors"
        >
          <HiChevronLeft size={20} />
          <span>Cancel</span>
        </button>

        <header className="mb-8">
          <MainTitle text="Plant a Secret" className="mb-2" />
          <p className="text-vault-text font-nunito">
            Add a new secure root to your vault.
          </p>
        </header>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm font-bold ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-vault-card p-8 rounded-2xl border border-gray-100 dark:border-emerald-500 shadow-sm"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-bold text-vault-text-bold mb-1 font-nunito"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g., Main API Key"
                className="input-field"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-vault-text-bold mb-1 font-nunito"
              >
                Secret Key
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter secret value"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-bold text-vault-text-bold mb-1 font-nunito"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="What is this key for?"
                rows={4}
                className="input-field resize-none"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`btn-primary w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Planting..." : "Plant Secret"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddKeyForm;
