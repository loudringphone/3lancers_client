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
                this.setState({offers: response.data});
                console.log(response)
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

const OfferList = (props) => {
    console.log(props)
    return (
        <div >
            <h2>My Offers</h2>
            <div id='group offers'>
                { props.offers.map((o) => {
                    if (o.user_id) {
                    return (
                        <div id='single offer' key={ o.id }>
                        <a href={`/my-offers/${ o.id }`}>{o.request_id}</a>
                            <p>{ o.request.date }</p>
                            <p>{ o.status }</p>
                            <p>Price: { o.request.budget }</p>
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