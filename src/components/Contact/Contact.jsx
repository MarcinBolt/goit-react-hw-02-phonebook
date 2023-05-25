import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Contact extends Component {
  render() {
    const { contacts } = this.state;

    return (
      <>
        {contacts.map(({ id, name, number }) => (
          <li key={id}>
            {name}: {number}
          </li>
        ))}
      </>
    );
  }
}

Contact.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
