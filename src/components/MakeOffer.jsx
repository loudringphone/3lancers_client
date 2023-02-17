import { useState } from "react";
import axios from 'axios'

import { SERVER_URL } from "../components/SERVER_URL"

const MakeOffer = (props) => {
    const [offer_amount, setOfferAmount] = useState('');
    let token = localStorage.getItem("token");
    let headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const OFFERS_URL = SERVER_URL + 'offers.json'
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
        axios.put(SERVER_URL + `offers/${userOpenOfferId}.json`, { status: 'Canceled'},{headers}).then(response => {
            console.log('Success:', response);
          })
          .catch(error => {
            console.error('Error:', error);
          })
          .then(()=>{
        axios.put(SERVER_URL + `offers/${userOpenOfferId}.json`, { offer_amount: offer_amount},{headers}).then(response => {
            console.log('Success:', response)
          })
          .catch(error => {
            console.error('Error:', error);
          });
        })
        .then(()=>{
        axios.put(SERVER_URL + `offers/${userOpenOfferId}.json`, { status: 'Open'},{headers}).then(response => {
            console.log('Success:', response);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        })
    }
    
    const requestBudget = Number(props.request.budget)
    function _handleOfferAmount(e) {
            setOfferAmount(e.target.value)
    };
    function _handleInputFocus(event) {
    event.target.select();
    }
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

        if (token) {
            if (openOffers){

                
                if(userOpenOffer === true && props.request.status == 'Open') {

                    return(
                        <div>
                            <form onSubmit={_editOffer}>
                                <label>Edit offer</label>
                                <input type="number" id="offer" name="offer" value={offer_amount || (userOpenOfferAmount)} onBlur={_handleOfferAmount}  onFocus={_handleInputFocus} required />
                                <button type="submit">Edit</button>
                            </form>

                        </div>

                    )


                }
                else if (props.request.status == 'Open') {
                    return(
                        <div>
                            <form onSubmit={_makeOffer}>
                                <label>Make an offer</label>
                                <input type="number" id="offer" name="offer" value={offer_amount} placeholder={ requestBudget } onInput={_handleOfferAmount} required onFocus={_handleInputFocus} />
                                <button type="submit">Go</button>
                            </form>
                        </div>
                    )
                }
            }
        }
        else {
            if (props.request.status == 'Open') {
                return (
                    <p>Plesae <a href="/login">login</a> to make an offer</p>
                )
            }
        }
    
}


export default MakeOffer