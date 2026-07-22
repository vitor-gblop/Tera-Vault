import { useEffect, useState } from "react";
import { GoAlertFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import MainTitle from "../../component/MainTitle";
import Modal from "../../component/Modal";
import _routes from "../../config/routes";
import useAuth from "../../hooks/UseAuth";
import LoginService from "../../services/LoginService";

interface JWT {
  message: string;
  auth: boolean;
  token: string;
}

function C_Verification({email}: {email: string}) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const auth = useAuth();

  const [segundos, setSegundos] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const minuteLimit = 1;
  const secondLimit = 59;

  // logica de contagem de tempo
  useEffect(() => {
    // Executa a cada 1 segundo (1000 milissegundos)
    if (minutes < minuteLimit) {
      const intervalo = setInterval(() => {
        setSegundos((segundosAnteriores) => segundosAnteriores + 1);
        if (segundos >= secondLimit) {
          setSegundos(0);
          setMinutes(minutes + 1);
        }
      }, 1000);

      // Limpa o intervalo quando o componente for desmontado
      return () => clearInterval(intervalo);
    }
  }, [minutes, segundos]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto foco no próximo input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    console.log("Verifying code:", code.join(""), "from email:", email);
    const fineCode = code.join("");
    try {
      const response = (await LoginService().verifyCode(
        fineCode,
        email,
      )) as JWT;

      console.log(response);
      if (response) {
        auth.authenticate(response.token);
        navigate(_routes.keys);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onConfirm = () => {
    location.reload();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-warm-cream">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <MainTitle text="Verify Access" />
          <p className="text-gray-600 font-nunito">
            We've sent a 6-digit code to your email.
          </p>
          <p className="text-gray-600 font-nunito">
            Your code will expire in 3 minutes
          </p>

          <strong>
            <p className="text-gray-600 font-nunito">
              {" "}
              {minutes}:{segundos.toString().padStart(2, "0")}{" "}
            </p>
            {minutes == minuteLimit ? (
              <Modal onConfirm={onConfirm} confirmationText="Confirm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GoAlertFill size={32} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 font-literata">
                    Your code expired
                  </h3>

                  <p className="text-gray-600 mt-2">
                    You will be redirected to the login page
                  </p>
                </div>
              </Modal>
            ) : (
              <></>
            )}
          </strong>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8"
        >
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className="w-12 h-14 text-center text-2xl font-bold bg-white border border-gray-200 rounded-xl focus:border-forest-green focus:ring-2 focus:ring-forest-green/20 outline-none transition-all"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                required
              />
            ))}
          </div>

          <div className="space-y-4">
            <button type="submit" className="btn-primary w-full">
              Verify Code
            </button>

            <button
              type="button"
              onClick={() => {
                location.reload();
              }}
              className="text-forest-green font-bold text-sm hover:underline"
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default C_Verification;
