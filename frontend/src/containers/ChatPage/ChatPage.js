import React, {Component} from 'react';
import './ChatPage.css'
import {connect} from "react-redux";

class ChatPage extends Component {
  state = {
    text: '',
    messages: [],
  };

  componentDidMount() {
    if(!!this.props.user){
      this.websocket = new WebSocket(`ws://localhost:8080/chat?token=${this.props.user.token}`);

      this.websocket.onmessage = (message) => {
        try{
          const data = JSON.parse(message.data);
          console.log(data);
          switch(data.type){
            case 'LAST_MESSAGES':
              this.setState({messages: data.messages});
              break;
            case 'NEW_MESSAGE':
              console.log(data.username);
              break;
          }
        }catch(error){
          console.log(error)
        }
      }
    }
  }

  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  onSendMessage = event => {
    event.preventDefault();

    const message = {
      type: 'CREATE_MESSAGE',
      text: this.state.text,
    };

    this.websocket.send(JSON.stringify(message));
  };

  render() {
    const messages = this.state.messages.map(message => (
      <div key={message._id}>
        {message.text}
      </div>
    ));

    return (
      <div className="ChatPage">
        <div className="leftBar">
          ergergeh
        </div>
        <div className="rightBar">
          <div className="MessageBlock">
            {messages}
          </div>
          <div className='InputForm'>
            <form onSubmit={this.onSendMessage}>
              <input
                type="text"
                value={this.state.text}
                name="text"
                onChange={this.inputChangeHandler}
              />
              <button>Send message</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user
});

export default connect(mapStateToProps, null)(ChatPage);