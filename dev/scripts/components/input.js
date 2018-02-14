import React from 'react';

export default class Input extends React.Component {
    constructor(){
        super();
        this.state = {
            date: '',
            user: '',
            body: '',
            photo: '',
            commentType: '',
            likes: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.logPost = this.logPost.bind(this);
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    logPost(e){
        e.preventDefault();
    
        const newPost = {
            date: new Date().toDateString(),
            user: this.state.user,
            body: this.state.body,
            photo: this.state.photo,
            likes: this.state.likes,
            commentType: this.state.commentType

        }
        const dbRef = firebase.database().ref();
        dbRef.push(newPost);

        this.setState({
            date: '',
            user: '',
            body: '',
            photo: '',
            commentType:'',
            likes: 0,
        })

    }


    render(){
        return(
            <div className="inputModal">
                <form onSubmit={this.logPost}>
                    <div className="entryBox">
                        <label className="inputLabel" htmlFor="user">User</label>
                        <input name="user" type="text" onChange={this.handleChange} value={this.state.user} />
                    </div>
                    <div className="entryBox">
                        <label className="inputLabel" htmlFor="body">Comment</label>
                        <textarea name="body" id="" cols="30" rows="10" onChange={this.handleChange} value={this.state.body}></textarea>
                    </div>
                    <div className="entryBox">
                        <label className="inputLabel" htmlFor="photo">Paste photo URL</label>
                        <input name="photo" type="text" onChange={this.handleChange} value={this.state.photo} />
                    </div>
                    <select name="commentType" onChange={this.handleChange} value={this.state.commentType}>
                        <option value="prediction">Prediction</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="request">Request</option>
                    </select>
                    <button>Post</button>
                
                </form>
            </div>
        )
    }
}