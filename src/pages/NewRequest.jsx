import axios from "axios";
import React, { useState } from "react";

const REQUESTS_URL = "http://localhost:3000/requests.json";
export default class NewRequest extends React.Component {
    constructor() {
        super();
        this.state = {
            requests: [],
        };
        this.saveRequest = this.saveRequest.bind(this);
    }

    // React life cycle method
    saveRequest(title, date, location, description, budget) {
        // save the request to the server via AJAX
        axios.post(REQUESTS_URL, { title: title, date: date, location: location, desciption: description, budget: budget }).then((response) => {
            // save the new request to the server
            this.setState({ requests: [response.data, ...this.state.requests] });
        });
    };


    render() {
        return (
            <div>
                <RequestForm onSubmit={this.saveRequest} />
            </div>
        )
    }
}

const RequestForm = (props) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState();

    function _handleTitle(e) {
        setTitle(e.target.value)
    };

    function _handleDate(e) {
        setDate(e.target.value);
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
        props.onSubmit(title, date, location, description, budget);
    };

    return (
        <div>
            <h2>Post a new request</h2>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={_handleSubmit}>
                <label>
                    In a few words, what do you need done?
                    <input type="text" name='title' id='title' value={title} onInput={_handleTitle} />
                </label>
                <label>
                    When do you need this done?
                    <input type="date" name='date' id='date' value={date} onInput={_handleDate}/>
                </label>
                <label>
                    Where do you need this done?
                    <input type="text" name='location' id="location" value={location} onInput={_handleLocation} />
                </label>
                <label>
                    Provide more details of the request
                    <textarea name="description" id="description" cols="30" rows="10" value={description} onInput={_handleDescription}></textarea>
                </label>
                <label>
                    What is your budget for this request?
                    <input type="number" value={budget} onInput={_handleBudget} />
                </label>
                <input type="submit" value="Post request" />
            </form>
        </div>
    )
}
