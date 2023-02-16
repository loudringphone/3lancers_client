import React, { Component } from 'react';
import BrowseRequests from './BrowseRequests';
class Home extends Component {

    render() {
        return (
            <div>
                <PostRequest />
                <div>
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
                <div className='post-steps'>
                    <h3 className ='hph3'>Get your to-do list done at a cost of your choosing:</h3>
                        <p><span className='step-number'>1.</span> Describe what you need to get done</p>
                        <p><span className='step-number'>2.</span> Set your budget</p>
                        <p><span className='step-number'>3.</span> Receive quotes and pick the best</p>
                    <button className='homepageBtn'>
                        <a href="/new-request">Post your request for free</a>
                    </button>
                </div>
            </div>
        </div>

    )
};

export default Home;
