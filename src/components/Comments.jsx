import { Component } from "react";
import axios from 'axios'

import { SERVER_URL } from "../components/SERVER_URL"
import MakeComment from './MakeComment'

const COMMENTS_URL = SERVER_URL + '/comments.json'

export default class Comments extends Component {
    constructor() {
        super();
        this.state = {
            comments: []
        }
    }



    componentDidMount() {
        const fetchCommentss = () => {
            axios.get(COMMENTS_URL).then((response) => {
                this.setState({ comments:response.data })
                setTimeout(fetchCommentss, 5000)
            })
        }
        fetchCommentss()
    }

    render() {
        let token = localStorage.getItem("token");

        function formatDate(date) {
            return date.toLocaleString('en-AU', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            });
          }

        const comments = this.state.comments;
        
        const filteredComments = comments.filter(comment => comment.request_id == this.props.request.id) 



        if (filteredComments) {
            if (filteredComments.length > 0) {
                return (
                    <div className="commentSection">
                        <div className="commentArea" style={{ height: '300px', overflowY: 'scroll' }}>
                            <div>
                                {filteredComments.map(c => (
                    <div key={c.id} className='comment'>
                        <p><span style={{fontWeight: 'bold'}}>{c.user.username}</span>  <span style={{fontSize: 'x-small'}}>{ formatDate(new Date(c.sent_time)).replace(",", "") }</span></p>
                        <p>{c.content}</p>
                    </div>
                    ))}
                            </div>
                        </div>
                        {token? (<MakeComment user={this.props.user} request={this.props.request} />):(<div></div>)}
                    </div>
                )
            }
            else {
                return ( <div><p>No comments yet.</p>
                {token? (<MakeComment user={this.props.user} request={this.props.request} />):(<div></div>)}</div>
                )
            }
        }
        else {
            return(
                <div>Loading...</div>
            )
        }
    }

}