import { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

const LS_KEY = 'contacts';
const initialContacts = JSON.parse(localStorage.getItem(LS_KEY));

export default function App() {
  const [contacts, setContacts] = useState(initialContacts ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    const savedContacts = JSON.stringify(contacts);
    localStorage.setItem(LS_KEY, savedContacts);
  }, [contacts]);

  const filteredContacts = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
  );

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
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      }
    </div>
  );
}

// commit for git init
