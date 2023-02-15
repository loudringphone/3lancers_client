import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { AiFillEdit } from 'react-icons/ai'

import Comments from "../components/Comments"; 
import Offers from "../components/Offers"; 
import CancelReopenComplete from "../components/CancelReopenComplete"
import MakeOffer from "../components/MakeOffer"
import MessageButton from "../components/MessageButton"

const URL = 'http://localhost:3000'
const REQUESTS_URL = URL + '/requests.json'

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


    const editIcon = <AiFillEdit className='edit' 
    size='25px' color='#8A2BE2' 
    cursor='pointer'
    onClick={() => window.location.href = `/requests/${id}/edit`}
    />


    let mapLocation
    for (let i = 0; i < props.requests.length; i++) {
        if (props.requests[i].id == id) {
            mapLocation = (props.requests[i].location).replace(/\s+/g, '+')
        }
    }
    const YOUR_API_KEY = process.env.REACT_APP_GOECODING_API;

    
    const [location, setLocation] = useState(null);
    useEffect(() => {
        if (mapLocation) {
        let geoCoding = `https://maps.googleapis.com/maps/api/geocode/json?address=${mapLocation}&key=${YOUR_API_KEY}`
        fetch(geoCoding)
          .then(response => response.json())
          .then(data => setLocation(data.results[0].geometry.location))
          .catch(error => console.log(error))
        }
      }, [mapLocation])
   

    if (props.requests) {
    for (let i = 0; i < props.requests.length; i++) {
      if (props.requests[i].id == id) {
        const r = props.requests[i]
        const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
        return(
            <div>
                <h3>{r.title}</h3>{(props.user.id == r.user_id || props.user.admin === true) && editIcon}
                <h3>Request status: {r.status}</h3>
                <p>Location: {r.location}</p>
                <p>Description: {r.description}</p>
                <p>Date: {new Date(r.time).toLocaleDateString("en-AU", dateOptions)}</p>
                <p>Budget: <b>${parseInt(r.budget).toFixed(2)}</b></p>
                <div>
                    {(props.user.id == r.user_id || props.user.admin === true) && (
                        <div>
                        <CancelReopenComplete request={r} offers={offers} />
                        </div>
                    )}
                    {(props.user.id) && (
                        <div>
                            <MessageButton />
                        </div>
                    )}
                    {r.user_id != props.user.id && (
                        <MakeOffer user={props.user} request={r} offers={offers} />
                    )}



                </div>
                <div>
                    <div style={{ display: 'inline-flex' }}><button onClick={handleClickC}>Comments</button><button onClick={handleClickO}>Offers</button></div>
                    {showElementC && <Comments user={props.user} request={r} />}
                    {showElementO && <Offers user={props.user} request={r} offers={offers}/>}
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

