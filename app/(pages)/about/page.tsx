const About = () => {
  return (
    <div className="w-full flex items-center justify-center mt-2">
      <div className="max-w-[1150px] w-full grid grid-cols-2 grid-rows-2 gap-2">
        <div className="w-full h-full bg-gray-300 rounded-md">
          <span className=" rounded-md h-20"></span>
        </div>
        <div className="w-full h-full ">
          <p className="text-justify indent-10">
            Fundada em 2013 por José Casturino dos Santos, a Tratorino – Peças
            para Máquinas e Tratores nasceu com o propósito de oferecer soluções
            eficientes para o setor agrícola, florestal e industrial. Com mais
            de uma década de experiência no mercado, nos especializamos na venda
            de peças e acessórios para máquinas e tratores, garantindo
            qualidade, durabilidade e um excelente custo-benefício para nossos
            clientes.
          </p>
        </div>
        <div className="w-full h-full ">
          <p className="text-justify indent-10">
            Localizada em Telêmaco Borba, Paraná, a Tratorino se destaca pelo
            compromisso com o atendimento personalizado, buscando sempre
            oferecer as melhores opções para manutenção e reposição de
            componentes. Nosso catálogo conta com uma ampla variedade de peças
            das principais marcas do mercado, atendendo desde pequenos
            produtores rurais até grandes empresas do setor. Nosso objetivo é
            garantir que seu maquinário funcione com eficiência e segurança,
            reduzindo custos com manutenção e aumentando sua produtividade. Com
            uma equipe qualificada e pronta para atender, estamos sempre à
            disposição para ajudar você a encontrar as peças certas para suas
            necessidades.
          </p>
        </div>
        <div className="w-full h-full bg-gray-300 rounded-md">
        </div>
      </div>
    </div>
  );
};

export default About;
