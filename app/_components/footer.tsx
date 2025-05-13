import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-card py-4">
      <div className="max-w-[1150px] mx-auto flex flex-col items-center gap-4">
        <p className="text-xs text-center">
          Alameda Washington Luiz, 799 - Telêmaco Borba - PR - Brasil
        </p>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-xs">&copy; 2025 Tratorino. Todos os direitos reservados.</p>
          <Link href="/privacy" className="text-xs">Política de Privacidade</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
