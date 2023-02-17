import axios from "axios";
import React, { useState } from "react";

import { SERVER_URL } from "../components/SERVER_URL"

const REQUESTS_URL = SERVER_URL + "requests.json";

// token
let token = localStorage.getItem("token");
let headers = {};
if (token) {
    headers.Authorization = `Bearer ${token}`;
}

export default class NewRequest extends React.Component {
    constructor() {
        super();
        this.saveRequest = this.saveRequest.bind(this);
    }

    // React life cycle method
    saveRequest(title, time, location, description, budget) {
        // save the request to the server via AJAX
        axios.post(REQUESTS_URL, { user_id: this.props.user_id, title: title, time: time, location: location, description: description, budget: budget }, { headers }).then((response) => {
            // save the new request to the server
            window.location.href = `/requests/${response.data.id}`
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
                    <p>Please <a href="/login">login</a> to create a new request</p>
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
        props.onSubmit(title, time, location, description, budget)
    };

    return (
        <div>
            <h2 className='newRequestTitle'>Post a new request</h2>
            <div className='newRequestForm'>
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={_handleSubmit}>
                    <label className='newRequest'>
                        In a few words, what do you need done?
                        <input className='newRequestInput' type="text" name='title' id='title' value={title} onInput={_handleTitle} required />
                    </label>
                    <label className='newRequest'>
                        When do you need this done?
                        <input className='newRequestInput' type="date" name='time' id='time' value={time} onInput={_handleTime} required />
                    </label>
                    <label className='newRequest'>
                        Where do you need this done?
                        <input className='newRequestInput' type="text" name='location' id="location" value={location} onInput={_handleLocation} required />
                    </label>
                    <label className='newRequest'>
                        Provide more details of the request
                        <textarea className='newRequestInput' name="description" id="description" cols="30" rows="10" value={description} onInput={_handleDescription}></textarea>
                    </label>
                    <label className='newRequest'>
                        What is your budget for this request?
                        <input className='newRequestInput' type="number" value={budget} onInput={_handleBudget} required />
                    </label>
                    <input className='signupBtn' type="submit" value="Post request" />
                </form>
            </div>
        </div>
    )
}
