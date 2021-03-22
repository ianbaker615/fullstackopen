import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Contacts = () => {
  return "unimplemented Contacts component for holding multiple Contact components";
};

const Contact = ({ contact }) => {
  return <li>{contact.name}</li>;
};

const App = () => {
  // state stuff
  const [contacts, setContacts] = useState([
    { name: "Ian Baker", id: uuidv4() },
  ]);
  const [newContact, setNewContact] = useState("");

  // event handlers
  const addContact = (e) => {
    // prevent form submission on change
    e.preventDefault();
    // build contact object
    const contactObject = {
      name: newContact,
      // number: ,
      id: uuidv4(),
    };

    // append contactObject to persons array in state
    setContacts(contacts.concat(contactObject));
    setNewContact("");
  };

  const handleContactChange = (e) => {
    setNewContact(e.target.value);
  };

  // the html that is returned
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newContact} onChange={handleContactChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      <Contacts />
      <ul>
        {contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

export default App;
