import { Component } from "react";
import axios from 'axios'

import { SERVER_URL } from "../components/SERVER_URL"


export default class AcceptDecline extends Component {

    declineOffer() {
        let token = localStorage.getItem("token");
        let headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }  
        axios.put(SERVER_URL + `/offers/${this.props.offer.id}.json`, { status: 'Declined'},{headers}).then(() => {
  
        })
        
    };





    acceptOffer() {

        




        let token = localStorage.getItem("token");
        let headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }  
        axios.put(SERVER_URL + `/offers/${this.props.offer.id}.json`, { status: 'Accepted'},{headers}).then(() => {
            let offerIds = []
            for (let offer of this.props.offers) {
                offerIds.push(offer.id)
            }
            for (let id of offerIds) {
                if (id != this.props.offer.id) {
                axios.put(SERVER_URL + `/offers/${id}.json`, { status: 'Declined'},{headers})
                }
            }
        })
        .then(()=>{
            axios.put(SERVER_URL + `/requests/${this.props.offer.request_id}.json`, { budget: `${parseInt(this.props.offer.offer_amount).toFixed(2)}`, status: 'Offer accepted'},{headers})
        })
    };





    render() {
        if (this.props.offer.status == "Open"){
            return(
            <div>
                <a href="#" onClick={() => this.acceptOffer()}>Accept</a> <a href="#" onClick={() => this.declineOffer()}>Decline</a>
            </div>
            )

        }
    }




}