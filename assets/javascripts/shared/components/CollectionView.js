import React from 'react';
import { State, History } from 'react-router';
import BaseComponent from './BaseComponent';
import PreloaderView from './PreloaderView';


class CollectionView extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keysup = this.keysup.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    var contractNo = React.findDOMNode(this.refs.contract_no).value;
    var clientNo = React.findDOMNode(this.refs.client_no).value;
    var phoneNo = React.findDOMNode(this.refs.phone_number).value;
    var firstName = React.findDOMNode(this.refs.first_name).value;
    var lastName = React.findDOMNode(this.refs.last_name).value;

    var errorsBoxCn = React.findDOMNode(this.refs.errorsBoxCn);
    var errorsBoxCln = React.findDOMNode(this.refs.errorsBoxCln);
    var errorsBoxPn = React.findDOMNode(this.refs.errorsBoxPn);
    var errorsBoxFn = React.findDOMNode(this.refs.errorsBoxFn);
    var errorsBoxLn = React.findDOMNode(this.refs.errorsBoxLn);
    var clsName = 'errorsBox';

    if (!contractNo && !clientNo && !phoneNo && !firstName && !lastName) {
      errorsBoxCn.className = clsName;
      errorsBoxCln.className = clsName;
      errorsBoxPn.className = clsName;
      errorsBoxFn.className = clsName;
      errorsBoxLn.className = clsName;
    } else {
      errorsBoxCn.className = 'nomalBox';
      errorsBoxCln.className = 'nomalBox';
      errorsBoxPn.className = 'nomalBox';
      errorsBoxFn.className = 'nomalBox';
      errorsBoxLn.className = 'nomalBox';
    }
  }

  keysup(e) {
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
    if (e.target.id == 'phone_number') {
      errorsBoxPn.className = 'nomalBox';
    }
    if (e.target.id == 'first_name') {
      errorsBoxFn.className = 'nomalBox';
    }
    if (e.target.id == 'last_name') {
      errorsBoxLn.className = 'nomalBox';
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
                <input type="text" placeholder="Contract No*" ref="contract_no" id="contract_no" onKeyUp={this.keysup} />
              </div>
              <div className="lName" ref="errorsBoxCln">
                <input type="text" placeholder="Client No*" ref="client_no" id="client_no" onKeyUp={this.keysup} />
              </div>
              <div className="lName" ref="errorsBoxPn">
                <input type="text" placeholder="Phone Number*" ref="phone_number" id="phone_number" onKeyUp={this.keysup} />
              </div>
              <div className="lName" ref="errorsBoxFn">
                <input type="text" placeholder="First Name*" ref="first_name" id="first_name" onKeyUp={this.keysup} />
              </div>
              <div className="lName" ref="errorsBoxLn">
                <input type="text" placeholder="Last Name*" ref="last_name" id="last_name" onKeyUp={this.keysup} />
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

export default CollectionView;
