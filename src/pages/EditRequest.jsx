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
        title: props.request.title || '',
        time: props.request.time || '',
        location: props.request.location || '',
        description: props.request.description || '',
        budget: props.request.budget || ''
    });

    // if no useEffect, the input fields would not be pre-filled
    useEffect(() => {
      setRequest(request => ({ ...request, title: props.request.title }));
    }, [props.request.title]);
    // useEffect(() => {
    //   setRequest(request => ({ ...request, time: props.request.time }));
    // }, [props.request.title]);
    useEffect(() => {
      setRequest(request => ({ ...request, location: props.request.location }));
    }, [props.request.location]);
    useEffect(() => {
      setRequest(request => ({ ...request, description: props.request.description }));
    }, [props.request.description]);
    useEffect(() => {
      setRequest(request => ({ ...request, budget: props.request.budget }));
    }, [props.request.budget]);


    const { id } = useParams();



    function _handleTitle(e) {
      setRequest({...request, title: e.target.value});
    };

    function _handleTime(e) {
      setRequest({...request, time: e.target.value});
    };

    function _handleLocation(e) {
      setRequest({...request, location: e.target.value});
    }

    function _handleDescription(e) {
      setRequest({...request, description: e.target.value});
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
                      <input className='newRequestInput'  type="text" name='title' id='title' value={request.title} onChange={_handleTitle} onFocus={_handleInputFocus} required />
                  </label>
                  <label className='newRequest'>
                      When do you need this done? 
                      <input className='newRequestInput'  type="date" name='time' id='time' value={request.time || requestDate} onInput={_handleTime} required />
                  </label>
                  <label className='newRequest'>
                      Where do you need this done?
                      <input className='newRequestInput'  type="text" name='location' id="location" value={request.location} onInput={_handleLocation} onFocus={_handleInputFocus} required />
                  </label>
                  <label className='newRequest'>
                      Provide more details of the request
                      <textarea className='newRequestInput'  name="description" id="description" cols="30" rows="10" value={request.description} onInput={_handleDescription} onFocus={_handleInputFocus}></textarea>
                  </label>
                  <label className='newRequest'>
                      What is your budget for this request?
                      <input className='newRequestInput' type="test" pattern="^\d*(\.\d+)?$" title="Budget must be a number" value={request.budget} onInput={_handleBudget} onFocus={_handleInputFocus} required />
                  </label>
                  <input className='signupBtn' type="submit" value="Edit request" />
              </form>
            </div>
        </div>
    )
}