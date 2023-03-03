import React, { useState, useEffect  } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { SERVER_URL } from "../components/SERVER_URL"

export default function EditRequest() {
  const [request, setRequest] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const REQUEST_URL = SERVER_URL + "requests/" + id + ".json"
    let token = localStorage.getItem("token");
    if (token) {
      fetch(REQUEST_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.id) {
            setRequest(result);
          }
        });
    }
  }, []);

  const saveRequest = () => {
    // Implement saveRequest logic here
  };

  let token = localStorage.getItem("token");

  if (token) {
    return (
      <div>
        <Helmet>
            <title>3Lancers | Edit Request</title>
        </Helmet>
        <RequestForm request={request} onSubmit={saveRequest} />
      </div>
    )
  } else {
    return null;
  }
}




const RequestForm = (props) => {
    const [request, setRequest] = useState({
        title: '',
        time: '',
        location: '',
        description: '',
        budget: ''
    });






    const { id } = useParams();



    function _handleTitle(e) {
      if (e.target.value === "") {
        setRequest({...request, title: ' '});
      }
      else if (e.target.value.length > 0 && e.target.value[0] === ' ') {
        setRequest({...request, title: e.target.value.slice(1)});
      }
      else {
        setRequest({...request, title: e.target.value});
      }
    };

    function _handleTime(e) {
      setRequest({...request, time: e.target.value});
    };

    function _handleLocation(e) {
      if (e.target.value === "") {
        setRequest({...request, location: " "});
      }
      else if (e.target.value.length > 0 && e.target.value[0] === ' ') {
        setRequest({...request, location: e.target.value.slice(1)});
      }
      else {
        setRequest({...request, location: e.target.value});
      }
    };

    function _handleDescription(e) {
      if (e.target.value === "") {
        setRequest({...request, description: " "});
      }
      else if (e.target.value.length > 0 && e.target.value[0] === ' ') {
        setRequest({...request, description: e.target.value.slice(1)});
      }
      else {
        setRequest({...request, description: e.target.value});
      }
    };

    function _handleBudget(e) {
      if (e.target.value === "") {
        setRequest({...request, budget: " "});
      }
      else {
        setRequest({...request, budget: e.target.value});
      }
    };


    function _handleInputFocus(event) {
    event.target.select();
    }
    const requestDate = String(props.request.time).slice(0,10);

    let token = localStorage.getItem("token");
    let headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const _handleSubmit = (event) => {
        event.preventDefault(); // prevent the form from reloading the page
        const requestData = {
          title: request.title || props.request.title,
          date: request.time || requestDate,
          location: request.location || props.request.location,
          description: request.description || props.request.description,
          budget: request.budget || parseFloat(props.request.budget).toFixed(2)
        };
        axios.put(SERVER_URL + `requests/${id}.json`, requestData, {headers})
          .then((response) => {
            setRequest(response.data); // update the request state with the response data from the server
          })
          .catch((error) => {
            console.log(error); // handle any errors that occur during the AJAX request
          })
          .then(()=>{
            window.location.href = `/requests/${id}`
          })
      };



    return (

        
        <div>
            <h2 className='newRequestTitle'>Edit request</h2>
            <div className='newRequestForm'>
              <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={_handleSubmit}>
                  <label className='newRequest'>
                      In a few words, what do you need done?
                      <input className='newRequestInput'  type="text" name='title' id='title' value={request.title || props.request.title} onChange={_handleTitle} onFocus={_handleInputFocus} required />
                  </label>
                  <label className='newRequest'>
                      When do you need this done? 
                      <input className='newRequestInput'  type="date" name='time' id='time' value={request.time || requestDate} onInput={_handleTime} required />
                  </label>
                  <label className='newRequest'>
                      Where do you need this done?
                      <input className='newRequestInput'  type="text" name='location' id="location" value={request.location || props.request.location} onInput={_handleLocation} onFocus={_handleInputFocus} required />
                  </label>
                  <label className='newRequest'>
                      Provide more details of the request
                      <textarea className='newRequestInput'  name="description" id="description" cols="30" rows="10" value={request.description || props.request.description} onInput={_handleDescription} onFocus={_handleInputFocus}></textarea>
                  </label>
                  <label className='newRequest'>
                      What is your budget for this request?
                      <input  className='newRequestInput' type="number" value={request.budget|| parseInt(props.request.budget).toFixed(2)} onInput={_handleBudget} onFocus={_handleInputFocus} required />
                  </label>
                  <input className='signupBtn' type="submit" value="Edit request" />
              </form>
            </div>
        </div>
    )
}