import React from 'react';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let Snackbar = mui.Snackbar;



class MessageView {

  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  constructor(props,context) {
    this.handleAction = this.handleAction.bind(this);
  }


  handleAction() {
    //We can add more code to this function, but for now we'll just include an alert.
    this.dismiss();
  }

  show(){
    this.refs[this.props.elemRef].show();
  }

  dismiss(){
    this.refs[this.props.elemRef].dismiss();
  }

  render() {
    return (
      <Snackbar
        ref={this.props.elemRef}
        message={this.props.message}
        action=""
        onActionTouchTap={this.handleAction}
        style={{backgroundColor: this.props.color}}
        />
    );
  }

}


export default MessageView;
