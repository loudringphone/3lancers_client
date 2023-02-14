import React, { Component } from 'react';
import axios from 'axios';

const OFFERS_URL = 'http://localhost:3000/offers.json';
const Requests_URL = 'http://localhost:3000/requests.json';

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
        return (
            <div>
                <OfferList offers={ this.state.offers }/>
            </div>
        );
    }
}

const OfferList = ( { offers }) => {
    console.log(offers)
    return (
        <div >
            <h2>My Offers</h2>
            <div id='group offers'>
                { offers.map((o) => {
                    console.log(o)
                    if (o.user_id && o.request_id != null) {
                    return (
                        <div id='single offer' key={ o.id }>
                        <a href={`/my-offers/${ o.id }`}>{o.request_id}</a>
                            {/* <p>{ o.request.date }</p> */}
                            <p>{ o.status }</p>
                            {/* <p>Price: { o.request.budget }</p> */}
                            <p>Bid: { o.offer_amount }</p>
                        </div>
                    );
                    }
                })}
            </div>
        </div>
    )
}

export default MyOffers;