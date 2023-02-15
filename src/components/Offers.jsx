import { Component } from "react";
import axios from 'axios'

import AcceptDecline from "./AcceptDecline"; 

const OFFERS_URL = 'http://localhost:3000/offers.json'
const USERS_URL = 'http://localhost:3000/users.json'

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

        let users = {}
        for (let i = 0; i < this.state.users.length; i++) {
            users[this.state.users[i].id] = this.state.users[i].username
        }

        if (offers) {
            if (offers.length > 0) {
                return (

                    <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                        {offers.map(o => (
            <div key={o.id}>
                <p>{users[o.user_id]}  ${o.offer_amount.toFixed(2)}  {o.status} </p>{this.props.request.user_id === this.props.user.id && (<AcceptDecline offer={o} offers={offers} />)}
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