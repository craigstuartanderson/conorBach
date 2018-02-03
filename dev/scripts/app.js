import React from 'react';
import ReactDOM from 'react-dom';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAVO9zJf_NAk-Zk3VxATGASubOmsETzSbE",
  authDomain: "conorbach.firebaseapp.com",
  databaseURL: "https://conorbach.firebaseio.com",
  projectId: "conorbach",
  storageBucket: "conorbach.appspot.com",
  messagingSenderId: "45959161852"
};
firebase.initializeApp(config);



class App extends React.Component {
    render() {
      return (
        <div>
          <h1>Conor Holler Bachelor Chalet</h1>
          <h2>Get ready for the weekend</h2>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
