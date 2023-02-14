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
    const _makeOffer = (event) => {
        event.preventDefault();
        axios.post(OFFERS_URL, {user_id: props.user.id, request_id: props.request.id, offer_amount: offer_amount, status: 'Open'}, {headers})
          .then(response => {
            console.log('Success:', response);
          })
          .catch(error => {
            if (error.response.status === 422) {
                console.log('Validation error:', error.response.data);
              } else {
            console.error('Error:', error);
          }});
      };

    const _editOffer = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:3000/offers/${userOpenOfferId}.json`, { status: 'Canceled'},{headers})
        axios.put(`http://localhost:3000/offers/${userOpenOfferId}.json`, { offer_amount: offer_amount},{headers})
        axios.put(`http://localhost:3000/offers/${userOpenOfferId}.json`, { status: 'Open'},{headers})





    }


    function _handleOfferAmount(e) {
        setOfferAmount((e.target.value))
    };


    const openOffers = props.offers.filter(offer => offer.status == "Open")
 
    let userOpenOffer = false
    let userOpenOfferId
    let userOpenOfferAmount
    for (let offer of openOffers) {
        if (offer.user_id == props.user.id) {
            userOpenOffer = true
            userOpenOfferId = offer.id
            userOpenOfferAmount = offer.offer_amount
            break
        }
    }



    if (openOffers){

        
        if(userOpenOffer === true) {

            return(
                <div>
                    <form onSubmit={_editOffer}>
                        <label>Edit offer</label>
                        <input type="number" id="offer" name="offer" value={offer_amount || userOpenOfferAmount} onInput={_handleOfferAmount} required />
                        <button type="submit">Edit</button>
                    </form>



                </div>

            )


        }
        else {
            return(
                <div>
                    <form onSubmit={_makeOffer}>
                        <label>Make an offer</label>
                        <input type="number" id="offer" name="offer" value={offer_amount} onInput={_handleOfferAmount} required />
                        <button type="submit">Go</button>
                    </form>
                </div>
            )
        }
    }


}


export default MakeOffer