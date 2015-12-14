import React from 'react';
import { State, History } from 'react-router';
import BaseComponent from './BaseComponent';
import { bindActionCreators } from 'redux';
import * as GroupActions from '../actions/GroupActions';
import ReactMixin from 'react-mixin';
import { connect } from 'react-redux';
import PreloaderView from './PreloaderView';

@connect(state => (
{
}
))
@ReactMixin.decorate(History)
class GroupSearchHandler extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {};
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  onChangeValue(e){
    var errorsBoxGn = React.findDOMNode(this.refs.errorsBoxGn);
    var errorsBoxFn = React.findDOMNode(this.refs.errorsBoxFn);
    var errorsBoxLn = React.findDOMNode(this.refs.errorsBoxLn);

    if (e.target.id == 'group_no') {
      errorsBoxGn.className = 'nomalBox';
    }
    if (e.target.id == 'first_name') {
      errorsBoxFn.className = 'nomalBox';
    }
    if (e.target.id == 'last_name') {
      errorsBoxLn.className = 'nomalBox';
    }

    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.submitForm();
  }

  submitForm(){
    var firstName = this.state.first_name;
    var lastName = this.state.last_name;
    var groupNo = this.state.group_no;
    var preloads = React.findDOMNode(this.refs.preloads);
    var ph = this.props.history;

    var clsName = 'errorsBox';
    var errorsBoxGn = React.findDOMNode(this.refs.errorsBoxGn);
    var errorsBoxFn = React.findDOMNode(this.refs.errorsBoxFn);
    var errorsBoxLn = React.findDOMNode(this.refs.errorsBoxLn);

    let values = {
      firstName:firstName,
      lastName:lastName,
      groupNo:groupNo
    };

    if (!firstName && !lastName && !groupNo) {
      errorsBoxGn.className = clsName;
      errorsBoxFn.className = clsName;
      errorsBoxLn.className = clsName;
      return;
    } else {
      preloads.className = 'dspB';
      errorsBoxGn.className = 'nomalBox';
      errorsBoxFn.className = 'nomalBox';
      errorsBoxLn.className = 'nomalBox';

      setTimeout(function(a, b) {
        ph.pushState(null, a, b);
      }, 1000, `/groups_search_result`, values);
    }
  }

  render() {
    return (
      <div className="contentPanel">
        <div className="panel-heading">
          <div><i className="material-icons">search</i></div>
          <div><strong>Group search</strong></div>
        </div>
        <div className="searchClient">
          <div className="row">
            <div className="col s3">
              <div className="fName" ref="errorsBoxGn">
                <input type="text" placeholder="Group No" ref="group_no" id="group_no" onChange={this.onChangeValue}/>
              </div>
              <div className="fName" ref="errorsBoxFn">
                <input type="text" placeholder="Member First Name" ref="first_name" id="first_name" onChange={this.onChangeValue}/>
              </div>
              <div className="lName" ref="errorsBoxLn">
                <input type="text" placeholder="Member Last Name" ref="last_name" id="last_name" onChange={this.onChangeValue}/>
              </div>
              <div className="sbBtn floatLoaderBox">
                <div>
                  <button className="btn waves-effect waves-light margin-top-20" type="submit" name="action" onClick={this.handleSubmit}>Search</button>
                </div>
                <div className="dspN" ref="preloads">
                  <PreloaderView />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupSearchHandler;
