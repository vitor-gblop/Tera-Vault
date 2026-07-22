import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import MainTitle from "../../component/MainTitle";
import LoginService from "../../services/LoginService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function C_Login({next, defineEmail}: {next: any; defineEmail: any}) {
  //
  const [email, setEmail] = useState("");

  const onSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    try {
      const response = await LoginService().login(email.toLocaleLowerCase());
      if (response) {
        defineEmail(email);
        next();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <MainTitle text="Terra Vault" className="mb-2" />
        <p className="text-gray-600 font-nunito">
          Securely rooted, organic vault for your secrets.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700 mb-1 font-nunito"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="nature@example.com"
              className="input-field"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Send Code
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button className="btn-secondary w-full">
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

export default C_Login;
