import Image from "next/image";

const About = () => {
  return (
    <div className="w-full flex items-center justify-center my-4 px-4">
      <div className="w-full max-w-full md:max-w-[1150px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
        {/* Imagem 1 */}
        <div className="w-full h-48 md:min-h-[320px] rounded-md order-1 md:order-none relative overflow-hidden shadow-sm">
          <Image
            src={"/about-image.png"}
            alt="about"
            fill
            className="object-fill"
          />
        </div>

        {/* Texto 1 */}
        <div className="w-full order-2 md:order-none">
          <p className="text-justify indent-10 p-2">
            Fundada em 2013 por José Casturino dos Santos, a Tratorino – Peças
            para Máquinas e Tratores nasceu com o propósito de oferecer soluções
            eficientes para o setor agrícola, florestal e industrial. Com mais
            de uma década de experiência no mercado, nos especializamos na venda
            de peças e acessórios para máquinas e tratores, garantindo
            qualidade, durabilidade e um excelente custo-benefício para nossos
            clientes.
          </p>
        </div>

        {/* Texto 2 */}
        <div className="w-full order-4 md:order-none">
          <p className="text-justify indent-10 p-2">
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

        {/* Imagem 2 */}
        <div className="w-full h-48 md:min-h-[320px] rounded-md order-3 md:order-none relative overflow-hidden shadow-sm">
          <Image
            src={"/about-image.png"}
            alt="about"
            fill
            className="object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
