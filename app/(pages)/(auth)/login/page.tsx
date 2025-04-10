import Image from "next/image";
import { AuthForm } from "./_components/AuthForm";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <div className="relative flex items-center justify-center w-full h-12 mb-4">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-contain object-center"
          />
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
