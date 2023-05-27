import React, { Component } from 'react';
import capitalizeEachWord from 'utils/capitalizeEachWord';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import css from './App.module.css';

const INITIAL_STATE = {
  contacts: [
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  addContactToState = newContact => {
    const { contacts } = this.state;
    this.setState({
      contacts: [...contacts, newContact],
    });
  };

  deleteContactFromState = e => {
    e.preventDefault();

    const { id } = e.target;
    const { contacts } = this.state;

    this.setState({
      contacts: contacts.filter(c => c.id !== id),
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { contacts } = this.state;
    const formDOM = e.currentTarget;
    const newContactId = nanoid();
    const newContactName = capitalizeEachWord(formDOM.elements.name.value);
    const newContactNumber = formDOM.elements.number.value;

    const newContact = {
      id: newContactId,
      name: newContactName,
      number: newContactNumber,
    };
    contacts.find(c => c.name.toLowerCase() === newContact.name.toLowerCase())
      ? window.alert(`${newContact.name} is already in contacts.`)
      : this.addContactToState(newContact);

    formDOM.reset();
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <main>
        <h1 className={css.phonebookHeader}>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />

        <h2 className={css.contactsHeader}>Contacts</h2>
        <Filter filter={filter} onChange={this.handleChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onClick={this.deleteContactFromState}
        />
      </main>
    );
  }
}
