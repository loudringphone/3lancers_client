// import React, { Component, useState } from 'react';
// import axios from 'axios';

// const REQUESTS_URL = 'http://localhost:3000/requests.json'; // Later: change this heroku or wherever you host your server

// class Requests extends Component {
//     constructor() {
//         super();
//         this.state = {
//             requests: []
//         };
//     }
//     componentDidMount() {
//         const fetchRequests = () => {
//             axios.get(REQUESTS_URL).then((response) => {
//                 this.setState({requests: response.data}); // set the data from the API as our state
//                 setTimeout(fetchRequests, 5000); // recursion for polling. Setting timer to call itself again in 7 seconds
//             });
//         };
//         fetchRequests(); 
//     }

//     render() {
//         return (
//             <div>
//                 <h1>All Requests</h1>
//                 <RequestList requests={ this.state.requests }/>
//             </div>
//         );
//     }
// }

// const RequestList = (props) => {
//     return (
//         <div>
//             { props.requests.map((r) => 
//             <div key={ r.id }>
//                 <a href={`/my-requests/${ r.id }`}>{r.title}</a>
//                 <p>{ r.location }</p>
//                 <p>{ r.datetime }</p>
//                 <p>{ r.description }</p>
//                 <p>{ r.budget }</p>
//                 <p>{ r.status }</p>
//             </div>) }
//         </div>
//     );
// };
// export default Requests;