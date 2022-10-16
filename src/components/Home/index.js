import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Password from '../Password'

import './index.css'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png'

class Home extends Component {
  state = {
    websiteName: '',
    userName: '',
    password: '',
    data: [],
    isCheckedPassword: false,
    searchInput: '',
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsiteName = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {websiteName, userName, password, isCheckedPassword} = this.state
    if (websiteName !== '' && userName !== '' && password !== '') {
      const newData = {
        id: uuidv4(),
        websiteName,
        userName,
        password,
        isCheckedPassword,
      }
      this.setState(prevState => ({
        data: [...prevState.data, newData],
        websiteName: '',
        userName: '',
        password: '',
      }))
    }
  }

  onChangeActivePassword = () => {
    this.setState(prev => ({isCheckedPassword: !prev.isCheckedPassword}))
  }

  onClickDelete = tabid => {
    const {data} = this.state
    const filterResults = data.filter(eacItem => eacItem.id !== tabid)
    this.setState({data: filterResults})
  }

  renderNoPasswordView = () => (
    <div className="noPassword-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwordsImg"
      />
      <p className="No-Passwords">No Passwords</p>
    </div>
  )

  render() {
    const {
      websiteName,
      userName,
      password,
      searchInput,
      data,
      isCheckedPassword,
    } = this.state
    const searchResults = data.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="app-container">
        <img src={websiteLogo} alt="app logo" className="app-logo" />
        <div className="inputs-container">
          <div className="input-form">
            <h1 className="title">Add New Password</h1>
            <form onSubmit={this.onSubmitForm}>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="logo"
                />
                <hr className="line" />
                <input
                  placeholder="Enter Website"
                  type="text"
                  className="input"
                  onChange={this.onChangeWebsiteName}
                  value={websiteName}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="logo"
                />
                <hr className="line" />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.onChangeUserName}
                  value={userName}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="logo"
                />
                <hr className="line" />
                <input
                  placeholder="Enter Password"
                  type="password"
                  className="input"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager"
          />
        </div>
        <div className="output-container">
          <div className="password-container">
            <div>
              <h1 className="output-title">Your Passwords</h1>
              <p className="length">{searchResults.length}</p>
            </div>
            <div className="out-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="logo"
              />
              <hr className="line" />
              <input
                type="search"
                placeholder="Search"
                className="input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="check-container">
            <input
              type="checkbox"
              id="check"
              className="check-type"
              onChange={this.onChangeActivePassword}
            />
            <label htmlFor="check" className="label-check">
              Show Passwords
            </label>
          </div>
          {searchResults.length === 0 && this.renderNoPasswordView()}
          <ul className="passwords-list">
            {searchResults.map(eachItem => (
              <Password
                searchResults={eachItem}
                key={eachItem.id}
                isCheckedPassword={isCheckedPassword}
                onClickDelete={this.onClickDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Home
