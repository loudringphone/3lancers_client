import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";

import Offers from "../components/Offers"; 
import CancelReopenComplete from "../components/CancelReopenComplete"
import MakeOffer from "../components/MakeOffer"

const REQUESTS_URL = 'http://localhost:3000/requests.json'

export default class RequestId extends Component {
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
                setTimeout(fetchRequests, 2500)
            })
        }
        fetchRequests() 
    }
    
    render() {
        
        return(       
            <div>
                <RequestInfo requests={this.state.requests} user={this.props.user}/>
            </div>
        )
    }
}







const RequestInfo = (props) => {
    const { id } = useParams();
    const [showElementC, setShowElementC] = useState(true);
    const handleClickC = () => {
        setShowElementC(true);
        setShowElementO(false);
    };
    const [showElementO, setShowElementO] = useState(false);
    const handleClickO = () => {
        setShowElementO(true);
        setShowElementC(false);
    };
    const OFFERS_URL = 'http://localhost:3000/offers.json'
    const [offers, setOffers] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(OFFERS_URL);
      const offers = response.data
      const filteredOffers = offers.filter(offer => offer.request_id == id);
      setOffers(filteredOffers);
    };

    const intervalId = setInterval(fetchData, 1500);

    return () => clearInterval(intervalId);
  }, []);





   
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
                <div>
                    <button onClick={handleClickC}>Comments</button><button onClick={handleClickO}>Offers</button>
                    {showElementC && <div>No comments yet.</div>}
                    {showElementO && <Offers user={props.user} request={r} offers={offers}/>}
                
                    {r.user_id === props.user.id && (
                        <div>
                        <CancelReopenComplete request={r} offers={offers} />
                        </div>
                    )}
                    {r.user_id != props.user.id && (
                        <MakeOffer user={props.user} request={r} offers={offers} />
                    )}
                </div>

            </div>
        )
      }
    }
    }
    else {
        return(<div>Loading...</div>)
    }
}

