import React from "react";

export default class NewRequest extends React.Component {
    render () {
     return (
        <div>
            <h2>Post a new request</h2>
            <form style={{display: 'flex', flexDirection: 'column'}}>
                <label>
                    In a few words, what do you need done?
                    <input type="text" name='title' id='title'/>
                </label>
                <label>
                    When do you need this done?
                    <input type="date" name='date' id='date'/>
                </label>
                <label>
                    Where do you need this done?
                    <input type="text" name='location' id="location"/>
                </label>
                <label>
                    Provide more details of the request
                    <textarea name="description" id="description" cols="30" rows="10"></textarea>
                </label>
                <label>
                    What is your budget for this request?
                    <input type="number" />
                </label>
                <input type="submit" value="Post request" />
            </form>
        </div>
    )
    }
}
