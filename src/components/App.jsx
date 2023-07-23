import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = formData => {
    const { name, number } = formData;
    const existingContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert('This contact already exists!');
    } else {
      this.setState(prevState => ({
        contacts: [formData, ...prevState.contacts],
      }));
    }
  };

  handleSearh = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="wrapper">
        <h1 className="main__heading">Phonebook</h1>
        <ContactForm onFormSubmit={this.addContact} />

        <h2 className="secondary__heading">Contacts</h2>
        <Filter value={filter} onChange={this.handleSearh} />
        {filter === '' ? (
          <ContactList
            contacts={contacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <ContactList contacts={filteredContacts} />
        )}
      </div>
    );
  }
}
