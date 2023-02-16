import React, { Component } from 'react';
import axios from 'axios';
import { MdAttachMoney } from 'react-icons/md' 
import { Link, NavLink } from 'react-router-dom';

const Requests_URL = 'http://localhost:3000/requests.json';

class MyRequests extends Component {
    constructor() {
        super();
        this.state = {
            requests: [],
        };
    }
    componentDidMount() {
        const fetchRequests = () => {
            axios.get(Requests_URL).then((response) => {
                this.setState({requests: response.data});
                console.log(response)
            });
        };
        fetchRequests(); 
    }

    

   

    render() {
        const moneyIcon = <MdAttachMoney size='25px' color='#8A2BE2' />
        const requests = this.state.requests;
        const userID = this.props.user.id;
        const filteredRequests = requests.filter(request => request.user_id === userID);
        let activeStyle = {
            textDecoration: 'underline'
        }
        const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
        return (
            <div>
                <h2>My Requests</h2>
                <ul className='request-offerToggle'>
                    <li className='request-offerLinks'>
                        {/* <a className='toggle' href="/my-requests" >Requests</a> */}
                        <NavLink className='toggle' style={({ isActive}) => isActive ? activeStyle : undefined} to="/my-requests">Requests</NavLink>
                    </li>
                    <li className='request-offerLinks'>
                        {/* <a className='toggle' href="/my-offers">Offers</a> */}
                        <NavLink className='toggle' style={({ isActive}) => isActive ? activeStyle : undefined} to="/my-offers">Offers</NavLink>
                    </li>
                </ul>
                <div id='group-requests'>
                    { filteredRequests.map((r) => {
                        return (
                            <div id='single-request' key={ r.id }>
                                <div className='titleDate'>
                                    <a href={`/requests/${ r.id }`}>{r.title.substring(0, 30)}</a>
                                    <p>{ new Date(r.time.substring(0, 10)).toLocaleDateString("en-AU", dateOptions) }</p>
                                </div>
                                <div className='status'>
                                    {r.status === 'Open'  ? <p className='green'>{ r.status }</p> : r.status === 'Cancelled'  ? <p className='grey'>{ r.status }</p> : <p className='red'>{ r.status }</p>} 
                                </div>
                                <div className='price'>
                                    {/* {moneyIcon} */}
                                    Price:
                                    <p className='value P'>${ r.budget.substring(0, 2) }</p>
                                </div>
                                <div className='bids'>
                                    Bids:
                                    <p className='value B'>{ r.offers.length }</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MyRequests;