import React, { Component } from "react";

export default class MyMessages extends Component {
    constructor() {
        super();
        this.state = {
            messages: [
                {
                    sender_id: 1,
                    receiver_id: 2,
                    request_id: 1,
                    text: 'Hello, could you specify the date?',
                    is_read: false,
                    created_at: new Date(),
                },
                {
                    sender_id: 3,
                    receiver_id: 1,
                    request_id: 1,
                    text: 'What time will you start your work?',
                    is_read: false,
                    created_at: new Date(),
                },
                {
                    sender_id: 2,
                    receiver_id: 1,
                    request_id: 1,
                    text: 'Will you want to get paid by cash or cards?',
                    is_read: true,
                    created_at: new Date(),
                },
                {
                    sender_id: 1,
                    receiver_id: 2,
                    request_id: 2,
                    text: 'Couldyou help to prepare some carton boxes?',
                    is_read: true,
                    created_at: new Date(),
                }
            ],
        }
    }

    render() {
        return (
            <div>
                This is My Message pages
            </div>
        )
    }
}
