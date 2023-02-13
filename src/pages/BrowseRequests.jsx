import React, { Component } from 'react';
import axios from 'axios';

const REQUESTS_URL = 'http://localhost:3000/requests.json';

class BrowseRequests extends Component {
    constructor() {
        super();
        this.state = {
            requests: []
        }
    }

    // fetch data from the server
    componentDidMount() {
        const fetchRequests = () => {
            axios.get(REQUESTS_URL).then((response) => {
                console.log(response.data);
                this.setState({ requests: response.data });
                setTimeout(fetchRequests, 5000);
            });
        }
        fetchRequests();
    }

    render() {
        return (
            <div>
                <AllRequests  requests={this.state.requests}/>
            </div>
        );
    }
}


// All requests from all users (including the current user)
function AllRequests({requests}) {
    console.log(requests);
    const allRequests = [];
    requests.forEach(request => {
        allRequests.push(<Request request={request}/>);
    })

    return (
        <div>
            {allRequests}
        </div>
    )

}

function Request({request}) {
    console.log(request);
    return (
        <div key={request.id}>
            <h4>
                {request.title}
            </h4>
            <p><span>{request.location}</span> | <span>${request.budget}</span></p>
        </div>
    )
}

export default BrowseRequests;
