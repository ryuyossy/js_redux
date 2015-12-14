import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let Snackbar = mui.Snackbar;



class ErrorView {

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

  componentWillReceiveProps(nextProps){
    this.refs.snack.show();
  }

  componentDidMount(){
    this.refs.snack.show();
  }

  handleAction() {
    //We can add more code to this function, but for now we'll just include an alert.
    this.refs.snack.dismiss();
  }

  render() {
    return (
      <Snackbar
        ref="snack"
        message={this.props.error.message}
        action=""
        onActionTouchTap={this.handleAction}
        style={{backgroundColor: "#d50000"}}
        />
    );
  }

}


export default ErrorView;
