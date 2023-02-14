import { Component } from "react";
import axios from 'axios'

import AcceptDecline from "./AcceptDecline"; 

const OFFERS_URL = 'http://localhost:3000/offers.json'
const USERS_URL = 'http://localhost:3000/users.json'

export default class Offers extends Component {
    constructor() {
        super();
        this.state = {
            offers: [],
            users: []
        }
    }

    componentDidMount() {
        const fetchOffers = () => {
            axios.get(OFFERS_URL).then((response) => {
                this.setState({ offers:response.data })
                setTimeout(fetchOffers, 5000)
            })
        }
        fetchOffers()

        const fetchUsers = () => {
            axios.get(USERS_URL).then((response) => {
                this.setState({ users:response.data })
                setTimeout(fetchUsers, 5000)
            })
        }
        fetchUsers()
    }



    render() {
        const offers = this.state.offers;
        const requestID = this.props.request.id
        const filteredOffers = offers.filter(offer => offer.request_id === requestID);
        let users = {}
        for (let i = 0; i < this.state.users.length; i++) {
            users[this.state.users[i].id] = this.state.users[i].username
        }

        if (filteredOffers) {
            return (

                <div>
                    {filteredOffers.map(o => (
          <div key={o.id}>
            <p>{users[o.user_id]}  ${o.offer_amount}  {o.status} {this.props.request.user_id === this.props.user.id && (<AcceptDecline offer={o} />)}</p>
          </div>
        ))}






                </div>



            )
        }
        else {
            return(
                <div>Loading...</div>
            )
        }
    }






}