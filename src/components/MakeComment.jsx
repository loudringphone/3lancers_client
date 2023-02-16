import { useState } from "react";
import axios from 'axios'

const MakeComment = (props) => {

    const [content, setContent] = useState('');
    let token = localStorage.getItem("token");
    let headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const URL = 'http://localhost:3000'
    const COMMENT_URL = URL + '/comments.json'
    const _makeComment = (event) => {
        event.preventDefault();
        event.target.reset();
        axios.post(COMMENT_URL, {user_id: props.user.id, request_id: props.request.id, content: content}, {headers})
          .then(response => {
            console.log('Success:', response);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

    function _handleComment(e) {
        setContent((e.target.value))
    };

    return(

        <div className="commentBox">
            <form onSubmit={_makeComment}>
                <textarea type="text" id="comment" name="comment" 
                placeholder="Type your comment" onInput={_handleComment} required />
                <button type="submit">Post</button>
            </form>
        </div>
    )





}

export default MakeComment