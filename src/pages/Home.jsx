import React, { Component } from 'react';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            requests: [
                {
                    id: 1,
                    title: "Move sofa",
                    location: 'Pyrmont, 2009',
                    time: '20/01/2023',
                    desciption: 'Move a big sofa with care. From Pyrmont to Surry Hills.Move down from the level 2 at Pyrmont. Move up to the level 3 at Surry Hills.',
                    budget: 100,
                    status: 'open'
                }, {
                    id: 2,
                    title: "Move sofa",
                    location: 'Pyrmont, 2009',
                    time: '20/01/2023',
                    desciption: 'Move a big sofa with care. From Pyrmont to Surry Hills.Move down from the level 2 at Pyrmont. Move up to the level 3 at Surry Hills.',
                    budget: 100,
                    status: 'open'
                }, {
                    id: 3,
                    title: "Move sofa",
                    location: 'Pyrmont, 2009',
                    time: '20/01/2023',
                    desciption: 'Move a big sofa with care. From Pyrmont to Surry Hills.Move down from the level 2 at Pyrmont. Move up to the level 3 at Surry Hills.',
                    budget: 100,
                    status: 'open'
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <PostRequest />
                <AllRequests requests={this.state.requests}/>
            </div>
        )
    };
}

function PostRequest() {
    return (
        <div>
            <div>
                <h2>
                    Post your first request in seconds
                </h2>
                <h3>Get the to-do done with the most affordable cost</h3>
                <div className='post-steps'>
                    <p><span className='step-number'>1</span> Describe what you need to get done</p>
                    <p><span className='step-number'>2</span> Set your budget</p>
                    <p><span className='step-number'>3</span> Receive quotes and pick the best</p>
                </div>
                <button>
                    <a href="/new-request" target="_blank">Post your request for free</a>
                </button>
            </div>
        </div>

    )
};

function AllRequests({requests}) {
    console.log(requests);
    const allRequests = [];
    requests.forEach(request => {
        allRequests.push(<Request request={request}/>);
    })

    return (
        <div>
            <h2>See what other are getting done</h2>
            <div>
                {allRequests}
            </div>
        </div>
    )

}

function Request({request}) {
    console.log(request);
    return (
        <div key={request.id}>
            <h4>
                {request.title}
            </h4>
            <p><span>{request.location}</span> | <span>${request.budget}</span></p>
        </div>
    )
}

export default Home;
