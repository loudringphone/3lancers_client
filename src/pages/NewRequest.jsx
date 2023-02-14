import axios from "axios";
import React, { useState } from "react";

const REQUESTS_URL = "http://localhost:3000/requests.json";

// token to be able to save info to database
let token = localStorage.getItem("token");
let headers = {};
if (token) {
    headers.Authorization = `Bearer ${token}`;
}

export default class NewRequest extends React.Component {
    constructor() {
        super();
        this.state = {
            newRequest: null,
        };
        this.saveRequest = this.saveRequest.bind(this);
    }

    // React life cycle method
    saveRequest(title, time, location, description, budget) {
        // save the request to the server via AJAX
        axios.post(REQUESTS_URL, { user_id: this.props.user_id, title: title, time: time, location: location, description: description, budget: budget }, { headers }).then((response) => {
            // save the new request to the server
            this.setState({ newRequest: response.data });
        });
    };


    render() {
        // if currentUser logged in then show the new request form
        // else show them a message and a button linking to the login page.
        if (token) {
            return (
                <div>
                    <RequestForm onSubmit={this.saveRequest} />
                </div>
            )
        } else  {
            return (
                <div>
                    <p>Please login to create a new request</p>
                    <p><a href="/login">Go to login</a></p>
                </div>
            )
        }
    }
}

const RequestForm = (props) => {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState();

    function _handleTitle(e) {
        setTitle(e.target.value)
    };

    function _handleTime(e) {
        setTime(e.target.value);
    };

    function _handleLocation(e) {
        setLocation(e.target.value)
    };

    function _handleDescription(e) {
        setDescription(e.target.value)
    };

    function _handleBudget(e) {
        setBudget(Number(e.target.value))
    };

    function _handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(title, time, location, description, budget);
    };

    return (
        <div>
            <h2>Post a new request</h2>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={_handleSubmit}>
                <label>
                    In a few words, what do you need done?
                    <input type="text" name='title' id='title' value={title} onInput={_handleTitle} required />
                </label>
                <label>
                    When do you need this done?
                    <input type="date" name='time' id='time' value={time} onInput={_handleTime} required />
                </label>
                <label>
                    Where do you need this done?
                    <input type="text" name='location' id="location" value={location} onInput={_handleLocation} required />
                </label>
                <label>
                    Provide more details of the request
                    <textarea name="description" id="description" cols="30" rows="10" value={description} onInput={_handleDescription}></textarea>
                </label>
                <label>
                    What is your budget for this request?
                    <input type="number" value={budget} onInput={_handleBudget} required />
                </label>
                <input type="submit" value="Post request" />
            </form>
        </div>
    )
}
