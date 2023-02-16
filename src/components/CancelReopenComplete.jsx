import { Component } from "react";
import axios from 'axios'

export default class CancelReopenComplete extends Component {

    cancelRequest() {
        let token = localStorage.getItem("token");
        let headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }  
        axios.put(`http://localhost:3000/requests/${this.props.request.id}.json`, { status: 'Canceled'},{headers}).then(() => {
            let offerIds = []
            for (let offer of this.props.offers) {
                offerIds.push(offer.id)
            }
            for (let id of offerIds) {
                axios.put(`http://localhost:3000/offers/${id}.json`, { status: 'Declined'},{headers})
            }
        })
        
    };

    reopenRequest() {
        let token = localStorage.getItem("token");
        let headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }  
        axios.put(`http://localhost:3000/requests/${this.props.request.id}.json`, { status: 'Open'},{headers})
    }










    completeOffer() {
        let token = localStorage.getItem("token");
        let headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }  
        axios.put(`http://localhost:3000/requests/${this.props.request.id}.json`, { status: 'Completed'},{headers}).then(() => {
            let acceptedOfferId
            for (let offer of this.props.offers) {
                if (offer.status = "Accepted") {
                    acceptedOfferId = offer.id
                }
            }
                axios.put(`http://localhost:3000/offers/${acceptedOfferId}.json`, { status: 'Completed'},{headers})
        })
    }


    render() {

        if (this.props.request.status != "Completed") {


            if (this.props.request.status != "Canceled" && this.props.request.status != "Offer accepted" ) {
                return(
                    <div>
                        <button onClick={() => this.cancelRequest()}>Cancel request</button>
                    </div>
                )
            }
            if (this.props.request.status != "Canceled" && this.props.request.status === "Offer accepted" ) {
                return(
                    <div>
                        <button onClick={() => this.completeOffer()}>Complete request</button>
                        <button onClick={() => this.cancelRequest()}>Cancel request</button>
                    </div>
                )
            }
            if (this.props.request.status === "Canceled") {
                return(
                    <div> 
                        <button onClick={() => this.reopenRequest()}>Reopen request</button>
                    </div>
                )
            }
        }
   
    }





}