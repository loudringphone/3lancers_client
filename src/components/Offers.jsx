import { Component } from "react";
import axios from 'axios'

import { SERVER_URL } from "../components/SERVER_URL"
import AcceptDecline from "./AcceptDecline"; 

const USERS_URL = SERVER_URL + "users.json"

export default class Offers extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const fetchUsers = () => {
            axios.get(USERS_URL).then((response) => {
                this.setState({ users:response.data })
                setTimeout(fetchUsers, 5000)
            })
        }
        fetchUsers()
    }



    render() {
        const offers = this.props.offers;
        const offerWithCommas = function(offer) {
            let offerWithCommas = offer.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            if (offerWithCommas.slice(-2)[0] === '.') {
                offerWithCommas = offerWithCommas + '0'
            }
            if (!offerWithCommas.includes('.')) {
                offerWithCommas = offerWithCommas + '.00'
            }
            return offerWithCommas
        }
        let users = {}
        for (let i = 0; i < this.state.users.length; i++) {
            users[this.state.users[i].id] = this.state.users[i].username
        }

        if (offers) {
            if (offers.length > 0) {
                return (

                    <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                        {offers.map(o => (
            <div className="eachOffer" key={o.id}>
                <p>{users[o.user_id]}  ${offerWithCommas(String(o.offer_amount))}  {o.status} </p>{this.props.request.user_id === this.props.user.id && (<AcceptDecline offer={o} offers={offers} />)}
            </div>
            ))}
                    </div>
                )
            }
            else {
                return ( <div><p>No offers yet.</p></div>)
            }
        }
        else {
            return(
                <div>Loading...</div>
            )
        }
    }






}