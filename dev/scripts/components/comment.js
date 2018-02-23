import React from 'react';


export default class Comment extends React.Component{
    constructor(){
        super();
        this.state = {

        }
        this.removeComment = this.removeComment.bind(this);
    }
    removeComment(){
        dbRef = firebase.database().ref()
    }

    render(){
        return(
            <div className="commentContainer">
                <div className="commentTitle">
                    <img src="./public/images/conorBald2.png" alt="bald tatoo icon"/>
                </div>
                <div className="commentContent">
                    <h3>{this.props.user}</h3>
                    <p>{this.props.bodyText}</p>
                    <h6>{this.props.date}</h6>
                </div>
                <button onClick={this.removeComment}>Remove</button>
            </div>
        )
    }

}