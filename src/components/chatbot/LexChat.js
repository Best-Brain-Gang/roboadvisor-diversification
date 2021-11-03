import React from 'react';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@material-ui/core';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import './styles/chatbot.css';

class LexChat extends React.Component {
  static showRequest(daText) {
    const conversationDiv = document.getElementById('conversation');
    const requestPara = document.createElement('P');
    requestPara.className = 'userRequest';
    requestPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(requestPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  static showError(daText) {
    const conversationDiv = document.getElementById('conversation');
    const errorPara = document.createElement('P');
    errorPara.className = 'lexError';
    errorPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(errorPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  static showResponse(lexResponse) {
    const conversationDiv = document.getElementById('conversation');
    const responsePara = document.createElement('P');
    responsePara.className = 'lexResponse';
    if (lexResponse.message) {
      responsePara.appendChild(document.createTextNode(lexResponse.message));
      responsePara.appendChild(document.createElement('br'));
    }
    if (lexResponse.dialogState === 'ReadyForFulfillment') {
      responsePara.appendChild(
        document.createTextNode('Ready for fulfillment')
      );
      // TODO:  show slot values
    } else {
      responsePara.appendChild(document.createTextNode(''));
    }
    conversationDiv.appendChild(responsePara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      lexUserId: `chatbot-demo${Date.now()}`,
      sessionAttributes: {},
      visible: 'closed'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { region, IdentityPoolId } = this.props;
    document.getElementById('inputField').focus();
    AWS.config.region = region || 'us-west-2';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId
    });
    const lexruntime = new AWS.LexRuntime();
    this.lexruntime = lexruntime;
  }

  handleClick() {
    const { visible } = this.state;
    this.setState({
      visible: visible === 'open' ? 'closed' : 'open'
    });
    console.log(this.state);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ data: event.target.value });
  }

  pushChat(event) {
    const { botName } = this.props;
    const { lexUserId, sessionAttributes } = this.state;
    event.preventDefault();

    const inputFieldText = document.getElementById('inputField');

    if (
      inputFieldText
      && inputFieldText.value
      && inputFieldText.value.trim().length > 0
    ) {
      // disable input to show we're sending it
      const inputField = inputFieldText.value.trim();
      inputFieldText.value = '...';
      inputFieldText.locked = true;

      // send it to the Lex runtime
      const params = {
        botAlias: '$LATEST',
        botName,
        inputText: inputField,
        userId: lexUserId,
        sessionAttributes
      };
      LexChat.showRequest(inputField);
      const a = function a(err, data) {
        if (err) {
          console.log(err, err.stack);
          LexChat.showError(`Error: ${err.message} (see console for details)`);
        }
        if (data) {
          // capture the sessionAttributes for the next cycle
          this.setState({ sessionAttributes: data.sessionAttributes });
          // sessionAttributes = data.sessionAttributes;
          // show response and/or error/dialog status
          LexChat.showResponse(data);
        }
        // re-enable input
        inputFieldText.value = '';
        inputFieldText.locked = false;
      };

      this.lexruntime.postText(params, a.bind(this));
    }
    // we always cancel form submission
    return false;
  }

  render() {
    const {
      height,
      backgroundColor,
      placeholder,
      headerText
    } = this.props;
    const { visible, data } = this.state;
    const inputStyle = {
      padding: '4px',
      fontSize: 24,
      width: '388px',
      height: '40px',
      borderRadius: '1px',
      border: '10px'
    };

    const conversationStyle = {
      width: '400px',
      height,
      border: 'px solid #ccc',
      backgroundColor,
      padding: '4px',
      overflow: 'scroll',
      borderBottom: 'thin ridge #bfbfbf'
    };

    const headerRectStyle = {
      backgroundColor: '#5664d2',
      width: '408px',
      height: '40px',
      textAlign: 'center',
      paddingTop: 12,
      paddingBottom: -12,
      color: '#FFFFFF',
      fontSize: '24px'
    };

    const chatcontainerStyle = {
      backgroundColor: '#FFFFFF',
      width: 408,
      bottom: 20
    };

    const chatFormStyle = {
      margin: '1px',
      padding: '2px'
    };

    return (
      <div>
        <Card
          className={visible}
          sx={{
            bottom: 80,
            fontSize: 12,
            right: 24,
            position: 'fixed',
            width: 400
          }}
        >
          <div
            id="chatcontainer"
            className={visible}
            style={chatcontainerStyle}
          >
            <CardHeader style={headerRectStyle} title={headerText} />
            <CardContent id="conversation" style={conversationStyle} />
            <Divider />
            <form
              id="chatform"
              style={chatFormStyle}
              onSubmit={this.pushChat.bind(this)}
            >
              <input
                type="text"
                id="inputField"
                autoComplete="off"
                size="40"
                value={data}
                placeholder={placeholder}
                onChange={this.handleChange.bind(this)}
                style={inputStyle}
              />
            </form>
          </div>
        </Card>
        <Avatar
          onClick={this.handleClick}
          sx={{
            position: 'absolute',
            backgroundColor: '#5664d2',
            height: 56,
            width: 56,
            bottom: 10,
            right: 24
          }}
        >
          {visible === 'open' ? (
            <KeyboardArrowDownIcon />
          ) : (
            <ChatBubbleRoundedIcon />
          )}
        </Avatar>
      </div>

    );
  }
}

LexChat.propTypes = {
  botName: PropTypes.string,
  IdentityPoolId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  headerText: PropTypes.string
};

export default LexChat;
