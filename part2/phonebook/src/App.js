import React, { useState, useEffect } from "react";
import contactService from "./services/contacts";
import { v4 as uuidv4 } from "uuid";
import Notification from "./components/Notification";

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
const Contact = ({ contact, contacts, handleDelete }) => {
  return (
    <li>
      {contact.name} {contact.phone}{" "}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};
const App = () => {
  // state
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  // hooks
  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setContacts(initialContacts);
    });
  }, []);

  // event handlers
  const handleDelete = (id) => {
    const contact = contacts.find((contact) => contact.id === id);
    if (window.confirm(`Delete ${contact.name}? from phonebook?`)) {
      contactService.remove(contact.id).then(() => {
        setContacts(contacts.filter((c) => c.id !== contact.id));
      });
    }
  };
  const addContact = (e) => {
    // prevent form submission on change
    e.preventDefault();
    // check if name already in phonebook
    if (contacts.some((contact) => contact.name === newContact)) {
      const originalContact = contacts.find(
        (contact) => contact.name === newContact
      );
      if (
        window.confirm(
          `Contact ${originalContact.name} already in phonebook. Replace old number with new number?`
        )
      ) {
        const id = originalContact.id;
        const changedContact = { ...originalContact, phone: newPhone };
        contactService.update(id, changedContact).then((changedContact) => {
          setContacts(
            contacts.map((contact) =>
              contact.id !== id ? contact : changedContact
            )
          );
          setNewContact("");
          setNewPhone("");
          // show success message for a few seconds
          setSuccessMessage(
            `Successfully updated ${changedContact.name}'s number from ${originalContact.phone} to ${changedContact.phone}`
          );
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        });
      }
    } else {
      // build contact object
      const contactObject = {
        name: newContact,
        phone: newPhone,
        id: uuidv4(),
      };
      // add new contact to json-server and update state
      contactService.create(contactObject).then((createdContact) => {
        setContacts(contacts.concat(createdContact));
        setNewContact("");
        setNewPhone("");
        // show success message for a few seconds
        setSuccessMessage(`Added ${createdContact.name} to phonebook`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
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
      <Notification message={successMessage} />
      <hr />
      <div>
        Search: <input value={search} onChange={handleSearchChange} />
      </div>
      <hr />
      <NewUserForm
        addContact={addContact}
        newContact={newContact}
        newPhone={newPhone}
        handleContactChange={handleContactChange}
        handlePhoneChange={handlePhoneChange}
      />
      <hr />
      <h2>Contacts</h2>
      <Contacts
        contacts={contacts}
        search={search}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
