import React from 'react';
import { State, History } from 'react-router';
import BaseComponent from './BaseComponent';
import PreloaderView from './PreloaderView';


class CollectionSearchContractHandler extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {};
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  onChangeValue(e){
    var errorsBoxCn = React.findDOMNode(this.refs.errorsBoxCn);
    var errorsBoxCln = React.findDOMNode(this.refs.errorsBoxCln);
    var errorsBoxPn = React.findDOMNode(this.refs.errorsBoxPn);
    var errorsBoxFn = React.findDOMNode(this.refs.errorsBoxFn);
    var errorsBoxLn = React.findDOMNode(this.refs.errorsBoxLn);

    if (e.target.id == 'contract_no') {
      errorsBoxCn.className = 'nomalBox';
    }
    if (e.target.id == 'client_no') {
      errorsBoxCln.className = 'nomalBox';
    }
    if (e.target.id == 'phone_no') {
      errorsBoxPn.className = 'nomalBox';
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
    var contractNo = this.state.contract_no;
    var clientNo = this.state.client_no;
    var phoneNo = this.state.phone_no;
    var preloads = React.findDOMNode(this.refs.preloads);
    var ph = this.props.history;
    var clsName = 'errorsBox';

    var errorsBoxCn = React.findDOMNode(this.refs.errorsBoxCn);
    var errorsBoxCln = React.findDOMNode(this.refs.errorsBoxCln);
    var errorsBoxPn = React.findDOMNode(this.refs.errorsBoxPn);
    var errorsBoxFn = React.findDOMNode(this.refs.errorsBoxFn);
    var errorsBoxLn = React.findDOMNode(this.refs.errorsBoxLn);

    let values = {
      firstName:firstName,
      lastName:lastName,
      contractNo:contractNo,
      clientNo:clientNo,
      phoneNo:phoneNo
    };

    if (!firstName && !lastName && !contractNo && !clientNo && !phoneNo){
      errorsBoxCn.className = clsName;
      errorsBoxCln.className = clsName;
      errorsBoxPn.className = clsName;
      errorsBoxFn.className = clsName;
      errorsBoxLn.className = clsName;
      return;
    } else {
      preloads.className = 'dspB';
      errorsBoxCn.className = 'nomalBox';
      errorsBoxCln.className = 'nomalBox';
      errorsBoxPn.className = 'nomalBox';
      errorsBoxFn.className = 'nomalBox';
      errorsBoxLn.className = 'nomalBox';
      setTimeout(function(a, b) {
        ph.pushState(null, a, b);
      }, 1000, `/collection_search_contract_result`, values);
    }
  }

  render() {
    return (
      <div className="contentPanel">
        <div className="panel-heading">
          <div><i className="material-icons">search</i></div>
          <div><strong>Search Contract</strong></div>
        </div>
        <div className="bdc">
          <ol className="breadcrumb">
            <li ref="stepOne" className="current"><a href="#0">Search Contract</a></li>
            <li ref="stepOne" className="current"><a href="#0">Search Repaymen Schedule</a></li>
          </ol>
        </div>
        <div className="searchClient">
          <div className="row">
            <div className="col s3">
              <div className="fName" ref="errorsBoxCn">
                <input type="text" placeholder="Contract No" ref="contract_no" id="contract_no" onChange={this.onChangeValue}/>
              </div>
              <div className="lName" ref="errorsBoxCln">
                <input type="text" placeholder="Client No" ref="client_no" id="client_no" onChange={this.onChangeValue}/>
              </div>
              <div className="lName" ref="errorsBoxPn">
                <input type="text" placeholder="Phone Number" ref="phone_no" id="phone_no" onChange={this.onChangeValue}/>
              </div>
              <div className="lName" ref="errorsBoxFn">
                <input type="text" placeholder="First Name" ref="first_name" id="first_name" onChange={this.onChangeValue}/>
              </div>
              <div className="lName" ref="errorsBoxLn">
                <input type="text" placeholder="Last Name" ref="last_name" id="last_name" onChange={this.onChangeValue}/>
              </div>
              <div className="sbBtn floatLoaderBox">
                <div>
                  <button className="btn waves-effect blue lighten-1 margin-top-20" type="submit" name="action" onClick={this.handleSubmit}>Search Contract</button>
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

export default CollectionSearchContractHandler;
