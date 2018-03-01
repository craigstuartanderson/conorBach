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
            commentType: '',
        }
        this.getDays = this.getDays.bind(this);
    } 

    getDays(){
        const now = new Date().getDate();
        const daysLeft = (81 - now);

        this.setState({
            countdown: daysLeft
        })

    }
    componentDidMount(){
        this.getDays();

        axios({
            method: 'GET',
            url: 'http://api.wunderground.com/api/61f0a55cb00602dc/conditions/q/Ontario/Thornbury.json',
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
            <aside>
                <div className="asideBlock countdown">
                    <h3>Countdown</h3>
                    <h5>Until 4/20</h5>
                    <h1>{this.state.countdown}</h1>
                    <h4>days</h4>
                </div>
                <div className="asideBlock weather">
                    <h3>Weather</h3>
                    <h5>Blue Mountain, ON</h5>
                    <h1>{this.state.weather.temp}c</h1>
                    <h4>{this.state.weather.desc}</h4>
                </div>
                <div className="asideBlock chalet">
                    <h3>Acommodation</h3>
                    <a href="https://www.airbnb.ca/rooms/532676?location=Blue%20Mountains%2C%20ON&check_in=2018-04-20&check_out=2018-04-22&s=ynvLNBCG" className="asideLink">
                        <img src="./public/images/request.png" alt="" />
                    </a>
                    <h4>Our Chalet</h4>
                </div>
                <div className="asideBlock paintball">
                    <h3>Paintball</h3>
                    <a href="http://www.wasagapaintball.com/" className="asideLink">
                        <img src="./public/images/prediction.png" alt=""/>
                    </a>
                    <h4>Sure</h4>
                </div>
                <div className="asideBlock history">
                    <h3>Local News</h3>
                    <a href="http://www.bayshorebroadcasting.ca/news_item.php?NewsID=57962" className="asideLink">
                        <img src="./public/images/suggestion.png" alt="" />
                    </a>
                    <h4>Bear Alerts</h4>
                </div>
                {/* <div className="asideBlock localNews">
                    <h3>Local News</h3>
                    <h4>BayShor</h4>
                </div> */}
            </aside>
        )
    }
}