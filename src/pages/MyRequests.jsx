import React, { Component } from 'react';
import axios from 'axios';

const Requests_URL = 'http://localhost:3000/requests.json';

class MyRequests extends Component {
    constructor() {
        super();
        this.state = {
            requests: []
        };
    }
    componentDidMount() {
        const fetchRequests = () => {
            axios.get(Requests_URL).then((response) => {
                this.setState({requests: response.data}); // set the data from the API as our state
                console.log(response)
            });
        };
        fetchRequests(); 
    }

    render() {
        return (
            <div>
                <RequestList requests={ this.state.requests }/>
            </div>
        );
    }
    
}

const RequestList = (props) => {
    return (
        <div >
            <h2>My Requests</h2>
            <div>
                { props.requests.map((r) => {
                    return (
                        <div key={ r.id }>
                            <a href={`/requests/${ r.id }`}>{r.title}</a>
                            <p>{ r.location }</p>
                            <p>{ r.datetime }</p>
                            <p>{ r.description }</p>
                            <p>{ r.budget }</p>
                            <p>{ r.status }</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default MyRequests;