import React,{PropTypes} from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import BaseComponent from './BaseComponent';
import PreloaderView from './PreloaderView';

class LoginFormView extends BaseComponent {

  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  constructor(props,context) {
    super(props,context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keysup = this.keysup.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var userNo = React.findDOMNode(this.refs.user_no).value;
    var password = React.findDOMNode(this.refs.password).value;
    var errorsBoxUn = React.findDOMNode(this.refs.errorsBoxUn);
    var errorsBoxPs = React.findDOMNode(this.refs.errorsBoxPs);
    var clsName = 'errorsBox';

    if (!userNo) {
      errorsBoxUn.className = clsName;
    }
    if (!password) {
      errorsBoxPs.className = clsName;
    }
    this.props.login(userNo,password);
  }

  keysup(e) {
    var errorsBoxUn = React.findDOMNode(this.refs.errorsBoxUn);
    var errorsBoxPs = React.findDOMNode(this.refs.errorsBoxPs);
    if (e.target.type == 'password') {
      errorsBoxPs.className = 'nomalBox';
    } else {
      errorsBoxUn.className = 'nomalBox';
    }
  }

  render() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <div className="unum">
          <div className="iconBox">
            <i className="material-icons">perm_identity</i>
          </div>
          <div className="un" ref="errorsBoxUn">
            <input type="text" placeholder="User No." ref="user_no" onKeyUp={this.keysup}/>
          </div>
        </div>
        <div className="passn">
          <div className="iconBox">
            <i className="material-icons">https</i>
          </div>
          <div className="pass" ref="errorsBoxPs">
            <input type="password" placeholder="password" ref="password" onKeyUp={this.keysup}/>
          </div>
        </div>
        <div className="sbBtn floatLoaderBox">
          <div>
            <button className="btn waves-effect waves-light" type="submit" value="Login">Login</button>
          </div>
          <div className="dspN" ref="preloads">
            <PreloaderView />
          </div>
        </div>
      </form>
    );
  }
}

export default LoginFormView;
