import './index.css'

const ContactItem = props => {
  const {contactDetails, onAddFavorites, onDeleteContact} = props
  const {name, mobileNo, isFavorite, id} = contactDetails

  const onClickFavorite = () => {
    onAddFavorites(id)
  }

  const onClickDelete = () => {
    onDeleteContact(id)
  }

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/star-filled-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/star-outline-img.png'

  return (
    <li className="table-row">
      <div className="table-cell name-column">
        <p>{name}</p>
      </div>
      <hr className="separator" />
      <div className="table-cell mobile-no-column">
        <p className="mobile-no-value">{mobileNo}</p>
        <button
          onClick={onClickFavorite}
          type="button"
          className="favorite-icon-container"
        >
          <img src={starImgUrl} className="favorite-icon" alt="star" />
        </button>
        <button onClick={onClickDelete} type="button" className="button">
          Delete
        </button>
      </div>
    </li>
  )
}

export default ContactItem
