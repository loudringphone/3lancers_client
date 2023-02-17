import React, { Component } from "react";
import axios from "axios";

import { SERVER_URL } from "../components/SERVER_URL"
import { NewMessageForm } from "../pages/MyMessages";

const MESSAGES_URL = SERVER_URL + "messages";

export default class SendMessage extends Component {
    constructor() {
        super();
        // this.state = {
        //     content: null,
        // }
        this.saveMessage = this.saveMessage.bind(this)
    }

    saveMessage(content, receiver_id, request_id) {
        // save the message to the server
        axios.post(MESSAGES_URL, { sender_id: this.props.current_user_id, receiver_id: this.props.creator_id, content: content, request_id: this.props.request_id }).then(response => {
            // console.log(response.data);
            window.location.href = `/my-messages/`
        }).catch( err => alert(err.message))
    }

    render() {
        // if the request creator is not the current user, show the SendMessage.
        if (this.props.creator_id !== this.props.current_user_id) {
            return (
                <NewMessageForm onSubmit={this.saveMessage} />
            )
        }
    }
}
