import {useState} from "react";
import MainTitle from "../../component/MainTitle";
import type {User} from "../../interfaces/user";
import UsersService from "../../services/UsersService";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  //
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const newUser: User = {
      name: name,
      email: email,
    };

    try {
      const response = await UsersService().add(newUser);
      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "User already exists. Please try again with a different email.",
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-warm-cream">
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
                Name and Surname
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="input-field"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <span className="text-gray-400 text-sm">
                We'll never share your email with anyone else.
              </span>
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign Up
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Go back to{" "}
                <a href="/login" className="text-blue-500">
                  Login
                </a>
              </span>
            </div>
          </div>
          {/* <button className="btn-secondary w-full">
              <FcGoogle size={20} />
              <span>Continue with Google</span>
            </button> */}
        </div>
      </div>
    </div>
  );
}

export default Register;
