import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Contacts = () => {
  return "unimplemented Contacts component for holding multiple Contact components";
};

const Contact = ({ contact }) => {
  return (
    <li>
      {contact.name} {contact.phone}
    </li>
  );
};

const App = () => {
  // state stuff
  const [contacts, setContacts] = useState([
    { name: "Ian Baker", phone: "6159574407", id: uuidv4() },
    { name: "Emily Martin", phone: "7744884701", id: uuidv4() },
    { name: "Tamara Baker", phone: "6158707720", id: uuidv4() },
    { name: "Mark Baker", phone: "6158707722", id: uuidv4() },
  ]);
  const [newContact, setNewContact] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

  // event handlers
  const addContact = (e) => {
    // prevent form submission on change
    e.preventDefault();
    // check if name already in phonebook
    if (contacts.some((contact) => contact.name === newContact)) {
      alert(`${newContact} is already in phonebook`);
    } else if (contacts.some((contact) => contact.phone === newPhone)) {
      alert(`${newPhone} is already in phonebook`);
    } else {
      // build contact object
      const contactObject = {
        name: newContact,
        phone: newPhone,
        id: uuidv4(),
      };

      // append contactObject to persons array in state
      setContacts(contacts.concat(contactObject));
      setNewContact("");
      setNewPhone("");
    }
  };
  const handleContactChange = (e) => {
    setNewContact(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  // the html that is returned
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search: <input value={search} onChange={handleSearchChange} />
      </div>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newContact} onChange={handleContactChange} />
        </div>
        <div>
          phone number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      <Contacts />
      <ul>
        {filteredContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
        {contacts.filter((contact) => contact.name.includes({ search }))}
      </ul>
    </div>
  );
};

export default App;
