import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import capitalizeEachWord from 'utils/capitalizeEachWord';
import { Contact } from './Contact';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
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
    this.setState({
      contacts: [...this.state.contacts, newContact],
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const formDOM = e.currentTarget;
    const newUserId = nanoid();
    const newUserName = capitalizeEachWord(formDOM.elements.name.value);
    const newUserNumber = formDOM.elements.number.value;

    const newContact = {
      id: newUserId,
      name: newUserName,
      number: newUserNumber,
    };

    this.addContactToState(newContact);

    formDOM.reset();
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} onSubmit={this.handleSubmit} />
        {/* <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </form> */}

        <h2>Contacts</h2>
        <ul>
          {/* <ListItem /> */}
          <label>
            Find contacts by name
            <input type="text" name="filter" />
          </label>
          <Contact contacts={contacts} />
          {/* <>
            {contacts.map(({ id, name, number }) => (
              <li key={id}>
                {name}: {number}
              </li>
            ))}
          </> */}
        </ul>
      </div>
    );
  }
}
