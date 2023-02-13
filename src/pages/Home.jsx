import React, { Component } from 'react';
import BrowseRequests from './BrowseRequests';
class Home extends Component {

    render() {
        return (
            <div>
                <PostRequest />
                <div>
                    <h2>See what others get done</h2>
                    <BrowseRequests />
                </div>
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

export default Home;
