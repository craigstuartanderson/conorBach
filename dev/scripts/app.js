import React from 'react';
import ReactDOM from 'react-dom';
import Aside  from './components/aside.js';
import Input from './components/input.js';
import Comment from './components/comment.js'
import Remove from './components/remove.js'


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



export default class App extends React.Component {
    constructor(){
      super();
      this.state = {
        feed: [
          {
            date: '',
            user: '',
            bodyText: '',
            photo: '',
            commentType: '',
            likes: 0,
            key: ''
          }
        ],
      }
      this.showModal = this.showModal.bind(this);
    }
    // user sees the posts that have been made by others
    // page loads and function maps through the state to find the posts and displays them
    componentDidMount(){
      const dbRef = firebase.database().ref();
      
      dbRef.on('value', (posts) => {
        const postArray = [];
        // the empty array we will fill to set our State.
        const postData = posts.val();
        // the the data we get from firebase - an object

        for(let postKey in postData){
          postData[postKey].key = postKey;

          postArray.push(postData[postKey])
        }
        this.setState({
          feed: postArray,
        })

      })
    }
    
    // user adds a comment--
      // user clicks the add button, triggering a modal. Opening up our Input component
    showModal(commentType) {
      const modal = document.getElementById('modalForm');
      modal.style.display = 'flex';

    }
    removeComment(comment) {
      const dbRef = firebase.database().ref(comment.key);
      dbRef.remove();
    }
    getKey(key){
      return key
    }
    showAside(){
      const aside = document.getElementById('aside');
      aside.style.left = '0';
    }
    render() {
      return (
        <div className="appContainer">
          <header> 
            <div className="logoContainer">
              <img src="./public/images/conorChalet.png" alt=""/>
            </div>
            <div className="title">
              <h1>A Chalet Weekend</h1>
              <h3>For <span className="nameHighlight">Conor Holler</span> and His Greatest Friends</h3>
            </div> 
            {/* <div className="popMenu">
              <button onClick={this.showAside}>Learn</button>
              <button onClick={this.showWall}>Discuss</button>
            </div> */}
          </header>
          <Input />
          <main>
            <div className="mobileTitle">
              <h1>Learn</h1>
            </div>
            <Aside id="aside"/>
            <div className="mobileTitle">
              <h1>Discuss</h1>
            </div>
            <section className="wall">
              <div className="wallTitle">
                <h2>Suggestions / Requests / Predictions</h2>
                <button onClick={this.showModal}>Draft a Comment</button>
              </div>
              {this.state.feed.map((post) => {
                return(
                  <Comment 
                  key={post.key}
                  commentKey={post.key} 
                  date={post.date}
                  user={post.user}
                  bodyText={post.bodyText}
                  photo={post.photo}
                  commentType={post.commentType}
                  likes={post.likes}
                  />
                )
              }).reverse()}
            </section>
          </main>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
