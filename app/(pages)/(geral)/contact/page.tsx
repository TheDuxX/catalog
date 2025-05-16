import ContactForm from "./_components/contact-form";

const Contact = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center p-2">
      <div className="max-w-[1150px] w-full md:grid md:grid-cols-2 flex flex-col gap-4">
        {/* Bloco Esquerdo */}
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="font-bold text-2xl up text-center">
              Entre em Contato
            </h2>
            <p className="text-center">
              Tem alguma dúvida, sugestão ou precisa de mais informações?
              Estamos aqui para ajudar!
            </p>
          </div>
          <ContactForm />
          <div className="grid grid-cols-4 gap-2 md:p-4">
            <h2 className="font-semibold italic">Endereço: </h2>
            <p className="text-center col-span-3">
              Alameda Washington Luiz, 799 - Socomim - Telêmaco Borba - Paraná
            </p>
            <span className="col-span-4 border-b border-solid"></span>
            <h2 className="font-semibold italic">Telefone: </h2>
            <div className="flex flex-col justify-center items-center col-span-3">
              <p>(42) 99989-8418 ou (42) 3272-6809</p>
            </div>
            <span className="col-span-4 border-b border-solid"></span>
            <h2 className="font-semibold italic">E-mail: </h2>{" "}
            <p className="col-span-3 w-full text-center">Tratorino@live.com</p>
            <span className="col-span-4 border-b border-solid"></span>
            <h2 className="font-semibold italic ">
              Horário de Atendimento:{" "}
            </h2>{" "}
            <div className="w-full text-center col-span-3">
              <p>De segunda a sexta das 8h às 12h e das 13h às 18h</p>{" "}
              <p>Aos sábados das 8h às 12h</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full aspect-square bg-secondary rounded-md overflow-hidden shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d849.6117277210931!2d-50.63369328488266!3d-24.33202522254648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e983e99b66fd33%3A0xc34cf4b6c0b9ba1c!2sTratorino!5e0!3m2!1spt-BR!2sbr!4v1740533317824!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
          ></iframe>{" "}
        </div>
      </div>
    </div>
  );
};

export default Contact;
