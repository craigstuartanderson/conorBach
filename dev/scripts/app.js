import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.js';
import Input from './components/input.js';
import Comment from './components/comment.js'


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
          }
        ],

      }
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

    render() {
      return (
        <div className="appContainer">
          <Header />
          <main>
            <button>Add Comment</button>
            <Input />
            <section className="wall">
            {/* {this.state.feed.map((post) => {
              <Comment 
              key={post.key} 
              date={post.date}
              user={post.user}
              body={post.bodyText}
              photo={post.photo}
              commentType={post.commentType}
              likes={post.likes}
              />
            })} */}
            </section>
          </main>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
