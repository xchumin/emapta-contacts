import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {AddressBook} from '@styled-icons/fa-regular/AddressBook';
import {UserCircle} from '@styled-icons/boxicons-solid/UserCircle';
import {Edit} from '@styled-icons/evaicons-solid/Edit';
import {Delete} from '@styled-icons/fluentui-system-filled/Delete';
import {PersonAddAlt} from '@styled-icons/material-rounded/PersonAddAlt';
import './ContactList.css';

// icon styles for contacts
const ContactIcon = styled(AddressBook)
` color: #243355;
  height: 40px;
  width: 48px;
`

const UserIcon = styled(UserCircle)
` color: #7d4f68;
  height: 30px;
  width: 45px;
`
const EditUser = styled(Edit)
` color: #1a3f0c;
  height: 30px;
  width: 45px;
`
const DeleterUser = styled(Delete)`
  color: #900101;
  height: 25px;
  width: 35px;
`
const AddUser = styled(PersonAddAlt)
` color: #05430a;
  height: 30px;
  width: 45px;`

  // Function for the Contact List

function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editId, setEditId] = useState(null);
    const [showAddFields, setShowAddFields] = useState(false);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setContacts(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleAddContact = () => {
        const newContact = { id: Date.now(), name, email, phone };
        setContacts([...contacts, newContact]);
        setName('');
        setEmail('');
        setPhone('');
        setShowAddFields(false);
    };

    const handleEditContact = (id) => {
        const contact = contacts.find((contact) => contact.id === id);
        setName(contact.name);
        setEmail(contact.email);
        setPhone(contact.phone);
        setEditId(id);
        setShowAddFields(true);
    };

    const handleUpdateContact = () => {
        const updatedContacts = contacts.map((contact) =>
            contact.id === editId ? { ...contact, name, email, phone } : contact
        );
        setContacts(updatedContacts);
        setName('');
        setEmail('');
        setPhone('');
        setEditId(null);
    };

    const handleDeleteContact = (id) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
    };

    return (
      <div className="ui main">
            <h2> <ContactIcon /> Contact List Resonate</h2>
            <div className='ui form'>
              {showAddFields ? (
                <>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={{ display: 'block', marginBottom: '5px' }} />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"  style={{ display: 'block', marginBottom: '5px' }}/>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Number"  style={{ display: 'block', marginBottom: '5px' }}/>
                  <br></br>
                 {editId ? (
                    <button onClick={handleUpdateContact}
                    style={{ backgroundColor: '#97bd8c', color: 'white', fontSize: '15px', border: 'none', padding: '10px 20px' }}
                    >Update Contact</button>
                 ) : (
                    <button 
                    style={{ backgroundColor: '#97bd8c', color: 'white', fontSize: '15px', border: 'none', padding: '10px 20px' }}
                    onClick={handleAddContact}>Add Contact</button>
                 )}
                 
                </>
              ) : (
               
                 <p>
                  <AddUser 
                  className='add-button'
                  onClick={() => setShowAddFields(true)}/> Add New Contact
                </p>
               // <button onClick={() => setShowAddFields(true)}>Add Contact</button>
              ) }

            </div>

            
            
      
            <div className='content'>
              <br></br>
    <table className='contact-list'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {contacts.map((contact) => (
                <tr key={contact.id}>
                    <td><UserIcon /> {contact.name}</td>
                    <td>Email: {contact.email}</td>
                    <td>Phone Number: {contact.phone}</td>
                    <td><EditUser onClick={() => handleEditContact(contact.id)}/> 
                        <DeleterUser onClick={() => handleDeleteContact(contact.id)}/>
                    </td>   
                </tr>
            ))}
        </tbody>
    </table>
</div>
</div>
       
       
    );
}

export default ContactList;
