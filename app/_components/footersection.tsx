
interface FooterSectionProps {
  title: string;
  items: string[];
}

const FooterSection = ({ title, items }: FooterSectionProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-sm font-bold tracking-normal">{title}</div>
      {items.map((item, index) => (
        <div key={index} className="mt-2.5 text-sm leading-none">
          {item}
        </div>
      ))}
    </div>
  );
};

export default FooterSection;