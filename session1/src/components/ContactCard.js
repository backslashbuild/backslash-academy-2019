import React from "react";

function ContactCard({ name, email, phone }) {
  return (
    <div style={{ border: "1px solid black", margin: 10, padding: 10 }}>
      <h1>{name}</h1>
      <p>{phone}</p>
      <p>{email}</p>
    </div>
  );
}

export default ContactCard;
