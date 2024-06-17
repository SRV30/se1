import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactForms } from '../../actions/contactActions';
import './AdminContact.css';

const AdminContact = () => {
  const dispatch = useDispatch();

  const contactFetch = useSelector((state) => state.contactFetch);
  const { loading, error, contacts } = contactFetch;

  useEffect(() => {
    dispatch(fetchContactForms());
  }, [dispatch]);

  const limitedContacts = contacts
    ? contacts.slice(0, 50).sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <div className="adminContactContainer">
      <h2>Contact Form Submissions</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {limitedContacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContact;
