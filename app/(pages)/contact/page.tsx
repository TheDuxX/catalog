import { Facebook, Instagram } from "lucide-react";
import ContactForm from "./_components/contact-form";

const Contact = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center p-2">
      <div className="max-w-[1150px] w-full md:grid md:grid-cols-2 gap-4">
        {/* Bloco Esquerdo */}
        <div>
          <h2 className="font-bold text-2xl up text-center">
            Entre em Contato
          </h2>
          <p className="text-center">
            Tem alguma dúvida, sugestão ou precisa de mais informações? Estamos
            aqui para ajudar!
          </p>
          <ContactForm />
          <div className="flex justify-center items-start w-full">
            <h2 className="font-semibold italic">Endereço: </h2>
            <p className="text-center">
              Alameda Washington Luiz, 799 - Socomim - Telêmaco Borba - Paraná
            </p>
          </div>
          <div className="flex justify-center items-start gap-4 w-full">
            <h2 className="font-semibold italic">Telefone: </h2>
            <div className="flex flex-col justify-center items-center">
              <p>(42) 99989-8418 ou (42) 3272-6809</p>
            </div>
          </div>
          <div className="flex justify-center items-start gap-4 w-full">
            <h2 className="font-semibold italic">E-mail: </h2>{" "}
            <p>Tratorino@live.com</p>
          </div>
          <div className="flex justify-center items-start gap-4 w-full">
            <h2 className="font-semibold text-center italic">
              Horário de Atendimento:{" "}
            </h2>{" "}
            <div className="w-full text-center">
              <p>De segunda a sexta das 8h ao 12h e das 13h a 18h</p>{" "}
              <p>Aos sábados das 8h a 12h</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-black/20 rounded-md p-2">
          Adicionar aqui o mapa
        </div>
      </div>
    </div>
  );
};

export default Contact;
