import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setFilter(filter);
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredContacts(filteredContacts);
  }, [filter, contacts]);

  function addContact({ name, number }) {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([newContact, ...contacts]);
  }

  function deleteContact(contactId) {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  }

  function contactExists(currentName) {
    return contacts.find(({ name }) => name === currentName) !== undefined;
  }

  return (
    <div className="Container">
      <h1 className="title">Phonebook</h1>
      <ContactForm onSubmit={addContact} contains={contactExists} />
      <h2 className="subtitle">Contacts</h2>
      <Filter value={filter} onChange={e => setFilter(e.target.value)} />
      {
        <ContactList
          contacts={filter.length > 0 ? filteredContacts : contacts}
          deleteContact={deleteContact}
        />
      }
    </div>
  );
}
