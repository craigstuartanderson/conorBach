import React from 'react';
import axios from 'axios';

// user arrives on page and sees the weather widget for blue mountain and the remaining days until the chalet weekend.

export default class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            weather: {
                temp: '',
                desc: ''
            },
            countdown: '',
        }
        this.getDays = this.getDays.bind(this);
    } 

    getDays(){
        const now = new Date().getDate();
        const daysLeft = (76 - now);

        this.setState({
            countdown: daysLeft
        })

       
    }

    componentDidMount(){
        this.getDays();

        axios({
            method: 'GET',
            url: 'http://api.wunderground.com/api/61f0a55cb00602dc/conditions/q/Ontario/Toronto.json',
            dataResponse: 'json',
            params: {},
            xmlToJSON: false
            })
            .then((res) => {
                const data = res.data.current_observation;
                
                this.setState({
                    weather: {
                        temp: data.temp_c,
                        desc: data.weather
                    }
                })
        });
    }
    
    render(){
        return (
            <header>
                <div className="logo">
                    <img src="./public/images/conorLogo3.png" alt="" />
                </div>
                <div className="countdown">
                    <h3>Days Left</h3>
                    <h2>{this.state.countdown}</h2>
                </div>
                <div className="weather">
                    <h3>Current Weather</h3>
                    <h4>Blue Mountain, ON</h4>
                    <h2>{this.state.weather.temp}c</h2>
                    <h2>{this.state.weather.desc}</h2>
                </div>
            </header>
        )
    }
}