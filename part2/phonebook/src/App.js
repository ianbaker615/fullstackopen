import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// components
const NewUserForm = (props) => {
  return (
    <form onSubmit={props.addContact}>
      <div>
        name:{" "}
        <input value={props.newContact} onChange={props.handleContactChange} />
      </div>
      <div>
        phone number:{" "}
        <input value={props.newPhone} onChange={props.handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const Contacts = ({ contacts, search }) => {
  // filtering for contacts
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <ul>
      {filteredContacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
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

  // the html that is returned
  return (
    <div>
      <h2>Phonebook</h2>
      <hr />
      <div>
        Search: <input value={search} onChange={handleSearchChange} />
      </div>
      <hr />
      <NewUserForm
        addContact={addContact}
        newContact={newContact}
        handleContactChange={handleContactChange}
        handlePhoneChange={handlePhoneChange}
      />
      <hr />
      <h2>Contacts</h2>
      <Contacts contacts={contacts} search={search} />
    </div>
  );
};

export default App;
