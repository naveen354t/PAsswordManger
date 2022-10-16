import './index.css'

const stars =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png '

const Password = props => {
  const {searchResults, isCheckedPassword, onClickDelete} = props
  const {websiteName, userName, password, id} = searchResults
  const onClickDeleteId = () => {
    onClickDelete(id)
  }
  return (
    <li className="password-item">
      <div className="pototo">
        <p className="web-name">{websiteName.slice(0, 1)}</p>
        <div className="password">
          <p className="top">{websiteName}</p>
          <p className="top">{userName}</p>
          <p className="top">
            {isCheckedPassword ? (
              password
            ) : (
              <img src={stars} alt="stars" className="stars" />
            )}
          </p>
        </div>
        <button
          type="button"
          className="delete-btn"
          onClick={onClickDeleteId}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}
export default Password
