import { Component } from "react";
import axios from 'axios'

const OFFERS_URL = 'http://localhost:3000/offers.json'

export default class Offers extends Component {
    constructor() {
        super();
        this.state = {
            offers: []
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
    }



    render() {

        





        return (

            <div>Offersssss!!</div>



        )
    }






}