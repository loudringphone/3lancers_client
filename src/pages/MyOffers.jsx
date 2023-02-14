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
                <div id='group offers'>
                    { filteredOffers.map((o) => {
                        return (
                            <div id='single offer' key={ o.id }>
                            <a href={`/offers/${ o.id }`}>{o.request.title}</a>
                                <p>{ o.request.datetime }</p>
                                <p>{ o.request.budget }</p>
                                <p>{ o.offer_amount}</p>
                                <p>{ o.status }</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MyOffers;