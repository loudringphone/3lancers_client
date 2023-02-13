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
                this.setState({requests: response.data});
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
    console.log(props)
    return (
        <div >
            <h2>My Requests</h2>
            <div id='group-requests'>
                { props.requests.map((r) => {
                    if (r.user_id) {
                    return (
                        <div id='single request' key={ r.id }>
                            <a href={`/my requests/${ r.id }`}>{r.title}</a>
                            <p>{ r.location }</p>
                            <p>{ r.datetime }</p>
                            <p>{ r.description }</p>
                            <p>{ r.budget }</p>
                            <p>{ r.status }</p>
                        </div>
                    );   
                    }
                    
                })}
            </div>
        </div>
    )
}

export default MyRequests;