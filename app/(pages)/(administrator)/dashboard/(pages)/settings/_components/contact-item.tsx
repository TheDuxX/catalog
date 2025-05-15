import { Contact } from "@/app/(pages)/(geral)/contact/_service/contact-service";
import { useContact } from "@/app/(pages)/(geral)/contact/_viewmodel/useContact";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { Textarea } from "@/app/_components/ui/textarea";
import { Mail, Phone } from "lucide-react";

interface ContactItemProps {
  contact: Contact;
}

const ContactItem = ({ contact }: ContactItemProps) => {
  const { formatDate } = useContact();
  return (
    <Card className="bg-white p-2">
      <CardContent className="p-2 space-y-2">
        <h2 className="font-semibold text-lg">{contact.name}</h2>
        <div className="flex gap-2 items-center text-sm italic text-gray-500">
          <div className="flex gap-2 items-center">
            <Mail size={14} />
            <p className="">{contact.email}</p>
          </div>
          <div className="flex gap-1 items-center">
            <Phone size={14} />
            <p className="">{contact.phone}</p>
          </div>
        </div>
        <br />
        <p className="border-none shadow-none p-0 text-gray-600">{contact.message}</p>
      </CardContent>
      <Separator className="opacity-20" />
      <CardFooter className="justify-end p-2 m-0">
        <p className="text-sm text-gray-500">
          {/* {formatDate(contact.created_at)} */}
          Insirir data
        </p>
      </CardFooter>
    </Card>
  );
};

export default ContactItem;
