import React, { Component } from 'react';
import { nanoid } from 'nanoid';
// import ContactForm from './ContactForm/ContactForm';

function capitalizeFirstLetterOfEachWord(str) {
  const stringToCorrect = str
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  return stringToCorrect;
}

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
  name: '',
  number: '',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleFilterChange = e => {
    const { name } = e.target;

    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const formDOM = e.currentTarget;
    const capitalizedInputNameValueOnSubmit = capitalizeFirstLetterOfEachWord(
      formDOM.elements.name.value
    );
    const inputNumberValueOnSubmit = formDOM.elements.number.value;
    const newUserId = nanoid();

    console.log(`Kontakty PO kliknięciu submit, PRZED dodaniem kontaktu:`);
    console.log(this.state.contacts);

    this.setState({
      contacts: this.state.contacts.push({
        id: newUserId,
        name: capitalizedInputNameValueOnSubmit,
        number: inputNumberValueOnSubmit,
      }),
    });

    console.log(`kontakty PO kliknięciu submit, PO dodaniem kontaktu:`);
    console.log(this.state.contacts);

    formDOM.reset();
  };

  render() {
    console.log(`kontakty przed submit:`);
    console.log(this.state.contacts);
    return (
      <div>
        <h1>Phonebook</h1>

        <form onSubmit={this.handleSubmit}>
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
        </form>

        <h2>Contacts</h2>
        <ul>{/* <ListItem /> */}</ul>
      </div>
    );
  }
}
