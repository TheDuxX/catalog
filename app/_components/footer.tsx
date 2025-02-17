import FooterSection from "./footersection";

const Footer = () => {
  const sections = [
    {
      title: "Seção",
      items: ["Link"],
      width: "w-[214px]",
    },
  ];

  return (
    <>
      <footer className="w-full h-auto bg-secondary flex flex-col justify-start items-center py-2 gap-4">
        <div className="max-w-[1150px] w-full h-auto grid grid-cols-5">
          {sections.map((section, index) => (
            <div key={index} className={section.width}>
              <FooterSection title={section.title} items={section.items} />
            </div>
          ))}
        </div>
        <div className="text-sm uppercase w-full max-w-[1150px] flex flex-row justify-center">
            <p>Alameda Washington Luiz, 799 Telêmaco Borba - PR - Brasil - xx.xxx.xxx/xxxx-xx</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
