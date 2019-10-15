import React from "react";
import Scrollbars from "react-custom-scrollbars";
import ContactCard from "./components/ContactCard";
import Header from "./components/Header";
import Main from "./components/Main";

const steven = {
  name: "Steven",
  phone: "121342342342",
  email: "steven@backslash.build"
};

function App() {
  const hello = "World!";

  const [contacts, setContacts] = React.useState([steven, steven]);
  const [count, setCount] = React.useState(0);

  const [name, setName] = React.useState("");

  return (
    <div style={{ height: "100%" }}>
      <Scrollbars>
        <Header>This is the page Hello={hello}</Header>
        <Main>
          {contacts.map(c => (
            <ContactCard name={c.name} phone={c.phone} email={c.email} />
          ))}
        </Main>

        <form
          onSubmit={event => {
            event.preventDefault();
            setContacts([...contacts, { ...steven, name }]);
          }}
        >
          <input placeholder="Name" value={name} onChange={event => setName(event.target.value.toUpperCase())} />
          <button>Submit.</button>
        </form>

        <footer>
          <button onClick={() => setContacts([...contacts, steven])}>Add another</button>
          <button onClick={() => setContacts(contacts.slice(0, contacts.length - 1))}>Delete one</button>
          <button onClick={() => setCount(count + 1)}>Clicked {count} times.</button>
        </footer>
      </Scrollbars>
    </div>
  );
}

export default App;
