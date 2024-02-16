import { useState, useMemo } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  console.log(filter);

  function addContact({ name, number }) {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts({ contacts: [newContact, ...contacts] });
  }

  function deleteContact(contactId) {
    setContacts(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  }

  function findContact(e) {
    setFilter({ filter: e.currentTarget.value });
  }

  function contactExists(currentName) {
    return contacts.find(({ name }) => name === currentName) !== undefined;
  }

  const visibleContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter)
    );
  }, [filter, contacts]);

  return (
    <div className="Container">
      <h1 className="title">Phonebook</h1>
      <ContactForm onSubmit={addContact} contains={contactExists} />
      <h2 className="subtitle">Contacts</h2>
      <Filter value={filter} onChange={findContact} />
      <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
    </div>
  );
}

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   addContact = ({ name, number }) => {
//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     this.setState(({ contacts }) => ({ contacts: [newContact, ...contacts] }));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//     }));
//   };

//   findContact = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   contactExists = currentName => {
//     const { contacts } = this.state;

//     return contacts.find(({ name }) => name === currentName) !== undefined;
//   };

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
//     return (
//       <div className="Container">
//         <h1 className="title">Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} contains={this.contactExists} />
//         <h2 className="subtitle">Contacts</h2>
//         <Filter value={filter} onChange={this.findContact} />
//         <ContactList
//           contacts={visibleContacts}
//           deleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }

// export default App;
