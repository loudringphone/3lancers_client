import React, { Component } from 'react';
import axios from 'axios';

const Requests_URL = 'http://localhost:3000/requests.json';

class MyRequests extends Component {
    constructor() {
        super();
        this.state = {
            requests: [],
        };
    }
    componentDidMount() {
        const fetchRequests = () => {
            axios.get(Requests_URL).then((response) => {
                this.setState({requests: response.data});
                console.log(response)
            });
        };
        fetchRequests(); 
    }

    render() {
        const requests = this.state.requests;
        const userID = this.props.user.id;
        const filteredRequests = requests.filter(request => request.user_id === userID);
        return (
            <div>
                <h2>My Requests</h2>
                <ul className='request-offerToggle'>
                    <li>
                        <a className='toggle' href="/my-requests">Requests</a>
                    </li>
                    <li>
                        <a className='toggle' href="/my-offers">Offers</a>
                    </li>
                </ul>
                <div id='group-requests'>
                    { filteredRequests.map((r) => {
                        return (
                            <div id='single-request' key={ r.id }>
                                <div className='titleDate'>
                                    <a href={`/requests/${ r.id }`}>{r.title}</a>
                                    <p>{ r.time }</p>
                                </div>
                                <div className='status'>
                                    <p>{ r.status }</p>
                                </div>
                                <div className='price'>
                                    <p>Price: { r.budget }</p>
                                </div>
                                <div className='bids'>
                                    <p>Bids: { r.offers.length }</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MyRequests;