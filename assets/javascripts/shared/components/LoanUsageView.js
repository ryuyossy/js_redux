import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import BaseComponent from './BaseComponent';
import { Link } from 'react-router';
import {formatDate} from '../utils/utils'


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();

class LoanUsageView extends BaseComponent {



  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }


  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleEdit(e){
    this.setState({text_pressed : true});
  }


  handleDelete(e) {
    this.props.actions.deleteLoanUsage(this.props.loanUsage.id)
  }




  handleKeyDown(e){
    let key = e.which | e.keyCode;
    if(key == 13){ //enter
      var value = React.findDOMNode(this.refs.loan_usage).value.trim();

      if (!value) {
        return;
      }
      let values = {
        value: value
      };

      this.props.actions.updateLoanUsage(this.props.id,values);

      this.setState({text_pressed : false});
    }else if(key == 27){ //esc
      this.setState({text_pressed : false });
    }
  }



  componentWillReceiveProps(nextProps){

  }

  render() {
    let result;
    let errorsNode = this.getErrorNodes(this.props.errors);
    let border = "row 5 grey lighten-4"
    if(this.props.index % 2 == 0){
      border = "row"
    }

    let loanUsage = this.props.loanUsage;


    if(this.state.text_pressed || this.props.errors){
      result = (

        <div>
          <div className="row">
             <div className="input-field col s6">
               <input onKeyDown={this.handleKeyDown}  ref="loan_usage" defaultValue={loanUsage.value} id="loan_usage" type="text" className="validate" />
               <label className="active" htmlFor="loan_usage">Loan usage</label>
             </div>
          </div>

          <div className="row">
             <div className="input-field col s6">
               Delete
             </div>
          </div>
          {errorsNode}
        </div>
      );
    }
    else{
      result = (<div className={border}>
        <div className="col s2" onClick={this.handleEdit}>
          {this.props.loanUsage.value}
        </div>
        <div className="col s2" onClick={this.handleDelete}>Delete</div>
      </div>);
    }

    return result
  }


}


export default LoanUsageView;
