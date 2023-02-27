import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";

import { SERVER_URL } from "../components/SERVER_URL"

const REQUESTS_URL = SERVER_URL + "requests.json"

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
        <div className='allUserRequests'>
            <Helmet>
                <title>3Lancers | Browse requests</title>
            </Helmet>
            <h2>Current user requests</h2>
            <div className='requests'>
                { props.requests.map((r) =>
                {if (r.status === 'Open') { return (
                  <div className='browse' key={r.id}>
                    <p><span><a href={`/requests/${r.id}`}>{r.title}</a></span> posted by <span>{r.user.username}</span></p>
                    <div><span>{r.location}</span> | <span>${r.budget}</span></div>
                    </div>
                )

                }
                })}
            </div>
        </div>
    )
}

export default BrowseRequests;
