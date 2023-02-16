import React, { Component, useState } from "react";
import axios from "axios";
import { resolvePath } from "react-router-dom";

import '../components/css/Message.css';

// token
let token = localStorage.getItem("token");
let headers = {};
if (token) {
    headers.Authorization = `Bearer ${token}`;
}

// messages_url
const MESSAGES_URL = 'http://localhost:3000/messages'

export default class MyMessages extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            newMessage: null,
        }

        this.saveMessage = this.saveMessage.bind(this)
    }

    // fetch messages
    componentDidMount() {
        const fetchMessages = () => {
            axios.get(MESSAGES_URL).then(response => {
                this.setState({ messages: response.data })
                setTimeout(fetchMessages, 5000); // fetch messages every 5 seconds
                console.log(this.state.messages)
            })
        }
        fetchMessages()
    }

    saveMessage(content, receiver_id, request_id) {
        // save the message to the server
        axios.post(MESSAGES_URL, { sender_id: this.props.user_id, receiver_id: receiver_id, content: content, request_id: request_id }).then(response => {
            console.log(response.data);
            this.setState({ messages: [...this.state.messages, response.data] })
        })
    }

    render() {
        // filter to get only messages to or by the current user.
        const myMessages = [];
        for (let message of this.state.messages) {
            if (message.sender_id === this.props.user_id || message.receiver_id === this.props.user_id) {
                myMessages.push(message);
            }
        }

        // categorise the current user's messages into different chat boxes
        // which is identical by sender_id, receiver_id and request_id
        let chats = {};
        // the guest is the conversation's other user who is not the curerent  user
        let guest;
        // each chat is identical by chatId
        let chatId = undefined;
        for (let m of myMessages) {
            // console.log(m.request_id, typeof m.request_id)
            // if the request_id is exiting then
            // find the guest
            // set the chatId
            // push a message to the existing chat or create a new chat.
            if (m.request_id) {
                if (m.sender_id === this.props.user_id) {
                    guest = m.receiver;
                    chatId = `${m.request_id}-${guest.id}`
                    if (chats.hasOwnProperty(chatId)) {
                        chats[chatId].push(m);
                    } else {
                        chats[chatId] = [m];
                    }
                }

                if (m.receiver_id === this.props.user_id) {
                    guest = m.sender;
                    chatId = `${m.request_id}-${guest.id}`
                    if (chats.hasOwnProperty(chatId)) {
                        chats[chatId].push(m);
                    } else {
                        chats[chatId] = [m];
                    }

                }

            }
        }

        console.log(chats);
        console.log(Object.values(chats));

        // Quick view of each conversation which contains the latest message
        const quickViews = [];
        // all conversation windows.
        const allConversationWindows = [];
        for (let [chatId, chatContents] of Object.entries(chats)) {
            quickViews.push(
                <LatestMessage message={chatContents[chatContents.length - 1]} message_id={chatContents[chatContents.length - 1].id} key={chatContents[chatContents.length - 1].id} chat_id={chatId} />
            )
            allConversationWindows.push(
                <ConversationWindow chatContents={chatContents} key={chatId} id={chatId} saveMessage={this.saveMessage} guest_id={chatId.split('-')[1]} />
            )

        }

        if (token) {
            return (
                <div className="my-messages">
                    <div key={"quick-views"} id="quick-views">
                        {quickViews}
                    </div>
                    <div key={"all-conversations"} id="all-conversations">
                        {allConversationWindows}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Please <a href="/login">login</a> to view this page!</h2>
                </div>
            )
        }

    }
}

function LatestMessage({ message, message_id, chat_id }) {
    // show only the latest message from the groupOfMessages
    const latestMessage = <Message message={message} key={message_id} />;
    console.log('chat id for this latest message', chat_id)
    const _handleClick = (e) => {
        _showConversationWindow();
    };

    const _showConversationWindow = () => {
        const correspondingConversation = document.getElementById(chat_id);
        correspondingConversation.style.display = '';

        document.getElementById("quick-views").style.display = 'none';
    };

    return (
        <div onClick={_handleClick} key={message_id} className="msg-quickview">
            <p className="msg-request">
                <span className="msg-request-title">{message.request.title}</span>
                <span className="msg-request-time"><i>posted on</i> {(new Date(message.request.created_at)).toString().substring(0, 15)}</span>
            </p>
            {latestMessage}
        </div>
    )
}

function Message({ message }) {
    return (
        <div className="msg-quickview-body">
            <p className="swap">
                <span className="msg-sender-name">{message.sender.username}</span>
                <span className="msg-request-time">at {(new Date(message.created_at)).toString().substring(0, 24)}</span>
            </p>
            <p className="msg-quickview-content">{message.content}</p>
        </div>
    )
}

// Conversation window
function ConversationWindow({ chatContents, saveMessage, guest_id, id }) {
    const conversation = [];
    const requestTitle = chatContents[0].request.title;
    const requestDate = chatContents[0].request.created_at;
    const requestId = chatContents[0].request_id;
    console.log('requestId: ', requestId);
    for (const message of chatContents) {
        conversation.push(
            <Message message={message} key={message.id} />
        )
    }

    // close conversation
    const _closeConversation = (e) => {
        document.getElementById(id).style.display = 'none';

        document.getElementById("quick-views").style.display = '';
    }

    return (
        //by default, the full conversation will be hidden.
        <div style={{ display: 'none' }} id={id} className="full-conversation">
            <div className="conversation-body">
                <input className="close-btn" onClick={_closeConversation} type="button" value="Close" />
                <p className="msg-request">
                    <span className="msg-request-title">{requestTitle}</span>
                    <span className="msg-request-time">{requestDate}</span>
                </p>
                <div className="messages">
                    {conversation}
                </div>
            </div>
            <div>
                <NewMessageForm onSubmit={saveMessage} receiver_id={guest_id} request_id={requestId} />
            </div>

        </div>
    )
}


// New Message Form
export function NewMessageForm(props) {
    const [content, setContent] = useState('');

    const _handleInput = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const _handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(content, props.receiver_id, props.request_id);
        setContent('')
    };

    return (
        <form onSubmit={_handleSubmit}>
            <textarea type="text" placeholder="Type your message" name="message" onInput={_handleInput} value={content} required ></textarea>
            <input type="submit" value="Send" />
        </form>
    )
}

//     render() {
//         const messages = this.state.messages;
//         console.log(messages.length, messages)
//         // LatestMessagees accessed by the current user.
//         const LatestMessagees = {};

//         // host is the current user
//         // guest is the latestMessage's other side
//         let host;
//         let guest;

//         // each LatestMessage is identical by the LatestMessageId
//         let LatestMessageId;

//         // -----Iterate through messages, keep only messages sent by or received by the current user ---------------------------------------------------------

//         for (let message of messages) {
//             console.log('start an interation', messages.indexOf(message) + 1, message)
//             const sender = message.sender
//             const receiver = message.receiver
//             // case 1: sender is the current user
//             if (sender.id === this.props.user_id) {
//                 host = sender;
//                 guest = receiver;
//             }

//             // case 2: receiver is the current user
//             if (receiver.id === this.props.user_id) {
//                 host = receiver;
//                 guest = sender;
//             }

//             // else {
//             //     // case 3: neither sender nor receiver is the current user, the message, skip.
//             //     continue;
//             // }
//             console.log('is your guest', guest)
//             if (guest) {
//                 console.log('inner an interation', messages.indexOf(message) + 1, message)
//                 console.log('host', host, 'guest', guest);
//                 LatestMessageId = `${message.request_id}${guest.id}` //each LatestMessage is identical by request id and guest id
//                 console.log(LatestMessageId);

//                 //if the LatestMessageId is not existing yet, initialize the new LatestMessage
//                 // else push the message to the existing LatestMessage
//                 console.log('is any id?', LatestMessagees.LatestMessageId);
//                 if (LatestMessagees.LatestMessageId) {
//                     LatestMessagees.LatestMessageId.push(message)
//                     console.log('current chat box: ', LatestMessagees.LatestMessageId.length,LatestMessagees.LatestMessageId)
//                 } else {
//                     LatestMessagees.LatestMessageId = [];
//                     LatestMessagees.LatestMessageId.push(message)
//                     console.log('new chat box: ', LatestMessagees.LatestMessageId)
//                 }
//             }

//             console.log('end the interation');
//         }

//         // ------End of the iteration -----------------------------------
//         console.log(LatestMessagees);

//         // display each LatestMessage of LatestMessagees
//         const LatestMessageBlocks = [];
//         for (const [key, message] of Object.entries(LatestMessagees)) {
//             LatestMessageBlocks.push(
//                 <div>
//                     <h4></h4>
//                 </div>
//             )
//         }

//         return (
//             <div>
//                 {this.props.user_id}
//                 {console.log(this.state.messages)}
//                 {console.log('LatestMessagees',LatestMessagees)}
//             </div>
//         )
//     }
// }

// function Message({ message }) {
//     console.log(message);
//     const sender = message.sender
//     const receiver = message.receiver
//     let [ host, guest ] = [];
//     if (sender.id === current_user_id) {
//         host = sender;
//         guest = receiver;
//     } else {
//         host = receiver;
//         guest = sender;
//     }
//     console.log(host, guest);

//     return (
//         <div>
//             <h4 className="guest-name-header">
//                 {guest.username}
//             </h4>
//         </div>
//     )
// };

// // Message header where displays the name of the guest
// function MessageHeader( { current_user_id, user_id }) {
//     // if user_id !== current_user_id then that user is the guest. Dislay there name

// }
