import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const OFFERS_URL = 'http://localhost:3000/offers.json';

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
        const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
        return (
            <div>
                <h2>My Offers</h2>
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
                                <div className='titleDate'>
                                <a href={`/requests/${ o.request_id }`}>{o.request.title}</a>
                                    <p>{ new Date(o.request.time.substring(0, 10)).toLocaleDateString("en-AU", dateOptions) }</p>
                                </div>
                                <div className='status'>
                                {o.status === 'Open'  ? <p className='green'>{ o.status }</p> : o.status === 'Accepted'  ? <p className='blue'>{ o.status }</p> : <p className='red'>{ o.status }</p>}
                                </div> 
                                <div className='price'> 
                                    Price:
                                    <p className='value P'>${ o.request.budget }</p>
                                </div>
                                <div className='bids'>
                                    Bid:
                                    <p className='value B2'>${ o.offer_amount }</p>
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