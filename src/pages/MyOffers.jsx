import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { MdAttachMoney } from 'react-icons/md' 
import { RiAuctionFill } from 'react-icons/ri' 

import { SERVER_URL } from "../components/SERVER_URL"

const OFFERS_URL = SERVER_URL + "offers.json";

class MyOffers extends Component {
    constructor() {
        super();
        this.state = {
            offers: []
        };
    }
    componentDidMount() {
        const fetchOffers = () => {
            axios.get(OFFERS_URL).then((response) => {
                console.log(response.data)
                this.setState({offers: response.data});
            });
        };
        fetchOffers(); 
    }

    render() {
        const offers = this.state.offers;
        const userID = this.props.user.id;
        const filteredOffers = offers.filter(offer => offer.user_id === userID);
        let activeStyle = {
            textDecoration: 'underline'
        }
        const moneyIcon = <MdAttachMoney size='25px' color='black' />
        const bidIcon = <RiAuctionFill size='25px' color='black' />
        const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
        return (
            <div>
                <h2>My offers</h2>
                <ul className='request-offerToggle'>
                    <li>
                        <NavLink className='toggle' style={({ isActive}) => isActive ? activeStyle : undefined} to="/my-requests">Requests</NavLink>
                    </li>
                    <li>
                        <NavLink className='toggle' style={({ isActive}) => isActive ? activeStyle : undefined} to="/my-offers">Offers</NavLink>
                    </li>
                </ul>
                <div id='group-requests'>
                    { filteredOffers.map((o) => {
                        return (
                            <div id='single-request' key={ o.id }>
                            <div className='banner'>
                                <div className='titleDate'>
                                    <a className='boxedLinks' href={`/requests/${ o.request_id }`}>{o.request.title}</a>
                                        <p>{ new Date(o.request.time.substring(0, 10)).toLocaleDateString("en-AU", dateOptions) }</p>
                                    </div>
                                </div>
                                <div className='status'>
                                {o.status === 'Open'  ? <p className='green'>{ o.status }</p> : o.status === 'Accepted'  ? <p className='blue'>{ o.status }</p> : <p className='red'>{ o.status }</p>}
                                </div> 
                                <div className='price'> 
                                {moneyIcon}
                                    Budget:
                                    <p className='value P'>${ parseInt(o.request.budget).toFixed(2) }</p>
                                </div>
                                <div className='bids'>
                                {bidIcon}
                                    Offer:
                                    <p className='value B2'>${ parseInt(o.offer_amount).toFixed(2) }</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MyOffers;