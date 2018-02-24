import React from 'react'

export default class Remove extends React.Component {
    constructor() {
        super();
        this.state = {
            

        }
        this.showCheck = this.showCheck.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.cancelRemove = this.cancelRemove.bind(this);
        
    } 
    showCheck(){
        const modal = document.getElementById(this.props.removeKey);
        const button = document.getElementById(`button${this.props.removeKey}`)
        modal.style.display = 'block';
        button.style.display = 'none';

    }
    removeComment(comment) {
        const dbRef = firebase.database().ref(this.props.removeKey);
        dbRef.remove();
    }
    cancelRemove(){
        const modal = document.getElementById(this.props.removeKey);
        const button = document.getElementById(`button${this.props.removeKey}`)
        modal.style.display = 'none';
        button.style.display = 'block';
    }

    render(){
        return(
            <div className="removeContainer">
                <button onClick={this.showCheck} id={`button${this.props.removeKey}`}>Delete</button>
            <div className="removeCheck" id={this.props.removeKey}>
                <div className="checkButtons">
                    <button onClick={this.removeComment}>Delete</button>
                    <button onClick={this.cancelRemove} id="cancelButton">Cancel</button>
                </div>
            </div>
            </div>
        )
    }   
}    