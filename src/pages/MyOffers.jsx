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
                this.setState({offers: response.data}); // set the data from the API as our state
                setTimeout(fetchOffers, 5000); // post new offers every 5 seconds
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
    return (
        <div >
            <h2>My Offers</h2>
                <div>
                    { props.offers.map((o) => {
                        return (
                            <div key={ o.id }>
                                <p>{ o.title }</p>
                                <p>{ o.status }</p>
                                <p>{ o.datetime }</p>
                                <button>Open</button>
                            </div>
                        );
                    })}
                </div>
        </div>
    )
}

export default MyOffers;