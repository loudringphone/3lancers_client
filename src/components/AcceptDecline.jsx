import { Component } from "react";
import axios from 'axios'

const OFFERS_URL = 'http://localhost:3000/offers.json'

export default class AcceptDecline extends Component {
   
    declineOffer() {
        let token = localStorage.getItem("token");
        let headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }  
        axios.put(`http://localhost:3000/offers/${this.props.offer.id}.json`, { status: 'Declined'},{headers}).then(() => {
  
        })
        
    };





    acceptOffer() {

        




        let token = localStorage.getItem("token");
        let headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }  
        axios.put(`http://localhost:3000/offers/${this.props.offer.id}.json`, { status: 'Accepted'},{headers}).then(() => {
            let offerIds = []
            for (let offer of this.props.offers) {
                offerIds.push(offer.id)
            }
            for (let id of offerIds) {
                if (id != this.props.offer.id) {
                axios.put(`http://localhost:3000/offers/${id}.json`, { status: 'Declined'},{headers})
                }
            }
           
        })
        .then(()=>{
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