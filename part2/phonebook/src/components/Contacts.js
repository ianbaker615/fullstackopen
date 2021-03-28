import React from "react";
import Contact from "./Contact";

const Contacts = ({ contacts, search, handleDelete }) => {
  // filtering for contacts
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <ul>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          contacts={contacts}
          handleDelete={() => handleDelete(contact.id)}
        />
      ))}
    </ul>
  );
};

export default Contacts;
