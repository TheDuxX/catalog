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
      <footer className="w-full h-auto bg-primary flex flex-col justify-start items-center py-2 gap-4 bottom-0 relative">
        <div className="text-card max-w-[1150px] w-full h-auto grid grid-cols-5">
          {sections.map((section, index) => (
            <div key={index} className={section.width}>
              <div className="flex flex-col">
                <div className="text-sm font-bold tracking-normal">
                  {section.title}
                </div>
                {section.items.map((item, index) => (
                  <div key={index} className="mt-2.5 text-sm leading-none">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-card text-sm uppercase w-full max-w-[1150px] flex flex-row justify-center">
          <p>
            Alameda Washington Luiz, 799 Telêmaco Borba - PR - Brasil -
            xx.xxx.xxx/xxxx-xx
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
