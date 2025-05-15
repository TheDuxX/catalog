export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: Date;
};

export const getContacts = async () => {
  const res = await fetch("/api/contacts");
  if (!res.ok) throw new Error("Erro ao buscar contatos");
  return res.json();
};

export const deleteContact = async (id: number) => {
  const res = await fetch("/api/contacts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Erro ao deletar contato");
  return res.json();
};

export const createContact = async (contact: Contact) => {
  const res = await fetch("/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!res.ok) throw new Error("Erro ao criar contato");
  return res.json();
};
