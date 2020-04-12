import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css"
export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            }).catch(function (error) {
                console.log(error)
            })
        axios.get('http://localhost:5000/users/').then(res => {
            if (res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.username),
                })
            }
        })
    }
    onChangeUserName(e) {
        this.setState({ username: e.target.value })
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value })
    }

    onChangeDuration(e) {
        this.setState({ duration: e.target.value })
    }

    onChangeDate(date) {
        this.setState({ date: date })
    }

    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise).then(res => console.log(res.data)).catch((error) => console.log(error.response.request._response))

        console.log(exercise);
        //  window.location = "/"
    }
    render() {
        return (
            <div className="col-md-6 offset-3">
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUserName}>{
                            this.state.users.map(function (user) {
                                return <option key={user} value={user}>{user}
                                </option>
                            })
                        }</select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Duration:</label>
                        <input type="number" required className="form-control" value={this.state.duration} onChange={this.onChangeDuration}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <DatePicker selected={this.state.date} onChange={this.onChangeDate} />

                    </div>
                    <div className="form-group">

                        <button className="btn btn-info" value={'Edit Exercise Log'} onChange={this.onSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

