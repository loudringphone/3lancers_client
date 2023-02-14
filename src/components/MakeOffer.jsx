import { useState } from "react";
import axios from 'axios'

const MakeOffer = (props) => {

    const [offer_amount, setOfferAmount] = useState('');
    let token = localStorage.getItem("token");
    let headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const OFFERS_URL = 'http://localhost:3000/offers.json'
    const _handleSubmit = (event) => {
        event.preventDefault();
        axios.post(OFFERS_URL, {user_id: props.user.id, request_id: props.request.id, offer_amount: offer_amount, status: 'Open'}, {headers})
          .then(response => {
            console.log('Success:', response);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

    function _handleOfferAmount(e) {
        setOfferAmount((e.target.value))
    };


    const openOffers = props.offers.filter(offer => offer.status == "Open")
 
    let userOpenOffer = false
    for (let offer of openOffers) {
        if (offer.user_id == props.user.id) {
            userOpenOffer = true
            break
        }
    }



    if (openOffers){

        





        return(
            <div>
                 <form onSubmit={_handleSubmit}>
                    <label>Make an offer</label>
                    <input type="number" id="offer" name="offer" value={offer_amount} onInput={_handleOfferAmount} required />
                    <button type="submit">Go</button>
                </form>





            </div>
        )
    }


}


export default MakeOffer