import React from "react";

const Contact = ({ contact, contacts, handleDelete }) => {
  return (
    <li>
      {contact.name} {contact.phone}{" "}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default Contact;
