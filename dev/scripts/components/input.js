import React from 'react';

export default class Input extends React.Component {
    constructor(){
        super();
        this.state = {
            date: '',
            user: '',
            bodyText: '',
            photo: '',
            commentType: '',
            likes: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.logPost = this.logPost.bind(this);
        this.cancelPost = this.cancelPost.bind(this);
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
            bodyText: this.state.bodyText,
            photo: this.state.photo,
            likes: this.state.likes,
            commentType: this.state.commentType

        }
        const dbRef = firebase.database().ref();
        dbRef.push(newPost);

        const modal = document.getElementById('modalForm');
        modal.style.display = 'none';

        this.setState({
            date: '',
            user: '',
            bodyText: '',
            photo: '',
            commentType:'',
            likes: 0,
        })

    }
    
    cancelPost(){
        const modal = document.getElementById('modalForm');
        modal.style.display = 'none';
    }


    render(){
        return(
            <div className="inputModal">
                <form id="modalForm">
                    <div className="formContainer">
                        <h2>Share Something With The Group</h2>
                        <div className="entryBox">
                            <label className="inputLabel" htmlFor="user">Great Friend</label>
                            <input name="user" type="text" onChange={this.handleChange} value={this.state.user} />
                        </div>
                        <div className="entryBox">
                            <label className="inputLabel" htmlFor="bodyText">Message</label>
                            <textarea name="bodyText" id="" cols="30" rows="10" onChange={this.handleChange} value={this.state.bodyText}></textarea>
                        </div>
                        <div className="modalButtons">
                            <button onClick={this.logPost}>Post</button>
                            <button onClick={this.cancelPost}>Cancel</button>
                        </div>
                    </div>
                
                </form>
            </div>
        )
    }
}