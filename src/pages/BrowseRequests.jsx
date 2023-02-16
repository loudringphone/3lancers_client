import React, { Component } from 'react';
import axios from 'axios'

const REQUESTS_URL = 'http://localhost:3000/requests.json'

class BrowseRequests extends Component {
    constructor() {
        super()
        this.state = {
            requests: [],
            users: []
        }
    }

    componentDidMount() {
        const fetchRequests = () => {
            axios.get(REQUESTS_URL).then((response) => {
                this.setState({ requests:response.data })
                setTimeout(fetchRequests, 5000)
            })
        }
        fetchRequests() 
    }
    

    render() {
        return (
          <div>
            <RequestList requests={ this.state.requests } users={ this.state.users } />

          </div>
        )
    }
}

const RequestList = (props) => {
    return(
        <div className='requests'>
            <h2>Requests from our users</h2>
            { props.requests.map((r) => 
            <div className='browse' key={r.id}>
                <a href={`/requests/${r.id}`}>{r.title}</a>
                <div><span>{r.location}</span> | <span>${r.budget}</span></div>
            </div>
            )}
        </div>
    )
}

export default BrowseRequests;