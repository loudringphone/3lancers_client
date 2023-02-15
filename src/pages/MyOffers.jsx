import React, { Component } from 'react';
import axios from 'axios';

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
        return (
            <div>
                <h2>My Offers</h2>
                <ul className='request-offerToggle'>
                    <li>
                        <a className='toggle' href="/my-requests">Requests</a>
                    </li>
                    <li>
                        <a className='toggle' href="/my-offers">Offers</a>
                    </li>
                </ul>
                <div id='group-requests'>
                    { filteredOffers.map((o) => {
                        return (
                            <div id='single-request' key={ o.id }>
                                <div className='titleDate'>
                                <a href={`/offers/${ o.id }`}>{o.request.title}</a>
                                    <p>{ o.request.time.substring(0, 10) }</p>
                                </div>  
                                <div className='status'>
                                        <p className='red'>{ o.status }</p>
                                </div> 
                                <div className='price'> 
                                    Price:
                                    <p className='value P'>${ o.request.budget.substring(0, 2) }</p>
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