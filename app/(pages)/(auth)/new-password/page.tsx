import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import Image from "next/image";

const NewPasswordPage = () => {
  return (
    <>
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
          <h2 className="font-bold text-lg text-primary">Defina sua nova senha</h2>
          <form className="flex flex-col gap-2">
            <Input name="password" placeholder="Senha" />
            <Input name="confirmPassword" placeholder="Confirmar senha" />
            <Button type="submit" variant={"secondary"} className="font-semibold">Salvar</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPasswordPage;
