import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import ContactItem from './components/ContactItem'

import './App.css'

const initialContactsList = [
  {
    id: uuidv4(),
    name: 'Ram',
    mobileNo: 9999988888,
    isFavorite: false,
  },
  {
    id: uuidv4(),
    name: 'Pavan',
    mobileNo: 8888866666,
    isFavorite: true,
  },
  {
    id: uuidv4(),
    name: 'Nikhil',
    mobileNo: 9999955555,
    isFavorite: false,
  },
]

class App extends Component {
  state = {
    contactsList: initialContactsList,
    name: '',
    mobileNo: '',
    isSaved: false,
  }

  getStateFromLocalStorage = () => {
    const contactsList = localStorage.getItem('state')
    if (contactsList !== undefined) {
      this.setState(JSON.parse(contactsList))
    }
  }

  componentDidMount = () => {
    // Fetch data from local storage
    this.getStateFromLocalStorage()
  }

  onAddContact = event => {
    event.preventDefault()
    const {name, mobileNo} = this.state
    const newContact = {
      id: uuidv4(),
      name,
      mobileNo,
      isFavorite: false,
    }
    this.setState(prevState => ({
      contactsList: [...prevState.contactsList, newContact],
      name: '',
      mobileNo: '',
    }))
  }

  onChangeMobileNo = event => {
    this.setState({mobileNo: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value, isSaved: false})
  }

  onAddFavorites = id => {
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(eachContact => {
        if (id === eachContact.id) {
          return {...eachContact, isFavorite: !eachContact.isFavorite}
        }
        return eachContact
      }),
    }))
  }

  onSaveData = () => {
    localStorage.setItem('state', JSON.stringify(this.state))
    this.setState({isSaved: true})
  }

  onDeleteContact = id => {
    const {contactsList} = this.state

    const filteredContacts = contactsList.filter(
      eachContact => id !== eachContact.id,
    )
    this.setState({contactsList: filteredContacts})
  }

  render() {
    const {name, mobileNo, contactsList, isSaved} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <input
              value={name}
              onChange={this.onChangeName}
              className="input"
              placeholder="Name"
            />
            <input
              className="input"
              value={mobileNo}
              onChange={this.onChangeMobileNo}
              placeholder="Mobile Number"
            />
            <button type="submit" className="button">
              Add Contact
            </button>
          </form>
          <ul className="contacts-table">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">Mobile Number</p>
            </li>
            {contactsList.map(eachContact => (
              <ContactItem
                onAddFavorites={this.onAddFavorites}
                key={eachContact.id}
                contactDetails={eachContact}
                onDeleteContact={this.onDeleteContact}
              />
            ))}
          </ul>
          <button className="button" onClick={this.onSaveData} type="button">
            Save
          </button>
          {!isSaved && <span className="save"> </span>}
          {isSaved && <span className="save"> Saved Successfully</span>}
        </div>
      </div>
    )
  }
}

export default App
