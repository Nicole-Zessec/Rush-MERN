import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class TableMember extends Component {
    constructor(props) {
        super(props);
        this.onFollow = this.onFollow.bind(this);

        this.state = {
            user_id: '',
            login : '',
            email : ''
    };
  }
  componentDidMount(){

    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
        user_id : decoded._id,
        login : decoded.login,
        email : decoded.email
    })
  }

  onFollow(e){
      e.preventDefault();
      console.log(this.state.login);
      console.log(this.props.obj._id);

      const follow = {
          user_id: this.state.user_id,
          leader_id: this.props.obj._id
      };

      axios.post('http://localhost:4242/follow', follow)
          .then((response) => {
              if (response.data.message === 'Successful Follow :D') {
                  alert('Successful Follow :D')
              }
              else
              {
                  console.log(response.data);
              }
          })
          .catch((error) => {
              console.error(error);
          });
  }

  render() {
    return (
        <tr>
          <td>
            {this.props.obj.login}
          </td>
          <td className="mr-auto">
            <form onSubmit={this.onFollow}>
                  <div className="form-group">
                      <input type="submit" value="Follow" className="btn btn-primary"/>
                  </div>
            </form>
            {/* <form action={'/' + this.state.login + '/show_article/' + this.props.obj._id}>
                  <div className="form-group">
                      <input type="submit" value="Show Article" className="btn btn-primary"/>
                  </div>
            </form> */}
          </td>
        </tr>
    );
  }
}

export default TableMember;