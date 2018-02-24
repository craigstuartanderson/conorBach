import React from 'react';
import Remove from './remove.js';


export default class Comment extends React.Component{
    constructor(){
        super();
        this.state = {
            key: ''
        }
    }
    
    componentDidMount(){
        const newKey = this.props.commentKey
        this.setState({
            key: newKey
        })
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
                <Remove removeKey={this.state.key} />
            </div>
        )
    }

}