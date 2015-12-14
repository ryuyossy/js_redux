import React,{PropTypes} from 'react';
import { State,History } from 'react-router';
import Immutable from 'immutable';
import LoginFormView from './LoginFormView';
import BaseComponent from './BaseComponent';

import * as SessionActions from '../actions/SessionActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReactMixin from 'react-mixin';


@connect(state => (
{
  user: state.session
}
))
@ReactMixin.decorate(History)
class LoginHandler extends BaseComponent {


  async componentDidMount(){
    if(await BaseComponent.isLoggedIn()){
      this.props.history.pushState(null, `/dashboard`, null);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.id){
      this.props.history.pushState(null, `/dashboard`, null);
    }
  }


  render() {
    const { user, dispatch } = this.props;
    const actions = bindActionCreators(SessionActions, dispatch);
    return (
        <div className="loginBox">
          <div className="panel-heading">
            <div><i className="material-icons">supervisor_account</i></div>
            <div><strong>login</strong></div>
          </div>
          <LoginFormView login={actions.login} user={user} />
        </div>
    );
  }

}

export default LoginHandler;
