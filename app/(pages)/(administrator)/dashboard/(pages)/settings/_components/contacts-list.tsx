"use client";
import { Contact } from "@/app/(pages)/(geral)/contact/_service/contact-service";
import { useContact } from "@/app/(pages)/(geral)/contact/_viewmodel/useContact";
import { Card, CardContent, CardTitle } from "@/app/_components/ui/card";
import ContactItem from "./contact-item";

const ContactsList = () => {
  const { contacts, sortedContacts, isLoading } = useContact();

  if (isLoading) return <div>Loading...</div>;
  console.log(contacts);

  return (
    <Card className="p-2 flex flex-col gap-4 bg-transparent shadow-none">
      <CardTitle className="text-2xl font-bold">Contatos</CardTitle>
      <CardContent className="grid grid-cols-3 gap-2 p-0">
        {sortedContacts.map((contact: Contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactsList;
