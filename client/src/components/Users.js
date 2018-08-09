import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Users extends Component {
  state = {
    users: [],
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const URL = 'http://localhost:8000/api/users';
    if (token) {
      axios
        .get(URL, { headers: { Authorization: token }})
        .then(response => {
          this.setState({ users: response.data })
        })
        .catch(err => console.log(err))
    } else {
      return;
    }
  }

  logout = () => {
    localStorage.removeItem('token');
  }

  render() {
    return(
      <Fragment>
        {!localStorage.getItem('token') ? (
          <p>You are not logged in.</p>
        ) : (
          <Fragment>
            <Link to='/login'>
              <button type='button' className='logout' onClick={this.logout}>
                Logout
              </button>
            </Link>
            {this.state.users.map(user => {
              return (
                  <div className='user'>
                    <p>{user.username}</p>
                    <p>{user.department}</p>
                  </div>
              )
            })}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default Users;