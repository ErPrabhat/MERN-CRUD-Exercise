import React, { Component } from 'react'
import axios from 'axios'
export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
           
        }
    }

    onChangeUserName(e) {
        this.setState({ username: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
           
        }
        console.log(user);

         axios.post('http://localhost:5000/users/add',user).then(res=>console.log(res.data)).catch((error) => console.log( error.response.request._response ) )
 
         this.setState({
            username:''
        })
        }

    render() {
        return (
            <div className="col-md-6 offset-3">
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUserName}>
                        </input>
                    </div>
                       
                    
                    <div className="form-group">
                        
                        <button  className="btn btn-info" value={'Create User'} onChange={this.onSubmit}>
                            Submit
                        </button>
                    </div> 
                </form>
            </div>
        )
    }
}
