import React, { Component } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";

const REQUESTS_URL = 'http://localhost:3000/requests.json'

class RequestDetails extends Component {
    constructor() {
        super();
        this.state = {
            requests: []
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
        
        return(       
            <div>
                <RequestInfo requests={this.state.requests} />
            </div>
        )
    }
}
export default RequestDetails;

const RequestInfo = (props) => {
    const { id } = useParams();
    if (props.requests) {
    for (let i = 0; i < props.requests.length; i++) {
      if (props.requests[i].id == id) {
        const r = props.requests[i]
        const options = { day: "2-digit", month: "short", year: "numeric" };
        return(
            <div>
                <h3>{r.title}</h3>
                <h3>{r.status}</h3>
                <p>{r.location}</p>
                <p>{r.description}</p>
                <p>Date {new Date(r.time).toLocaleDateString("en-AU", options)}</p>
                <p>Price <b>${parseInt(r.budget).toFixed(2)}</b></p>


            </div>
        )
      }
    }
    }
    else {
        return(<div>Loading...</div>)
    }
}

