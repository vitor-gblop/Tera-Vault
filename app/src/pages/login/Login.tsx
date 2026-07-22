import {useState} from "react";
import C_Login from "./C_Login";
import C_Verification from "./C_Verification";

function Login() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);

  const next = (): void => {
    setStep(2);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-warm-cream">
      {step == 1 ? (
        <C_Login next={next} defineEmail={setEmail} />
      ) : (
        <C_Verification email={email} />
      )}
    </main>
  );
}

export default Login;
