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

class ProvisioningRoleView extends BaseComponent {



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
    this.state = { provisioningRoleManagerUserId: null };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleEdit(e){
    this.setState({text_pressed : true});
  }


  handleDelete(e) {
    this.props.actions.deleteProvisioningRole(this.props.provisioningRole.id)
  }




  handleKeyDown(e){
    let key = e.which | e.keyCode;
    if(key == 13){ //enter
      var minNumberOfDaysPastDue = React.findDOMNode(this.refs.min_number_of_days_past_due).value.trim();
      var maxNumberOfDaysPastDue = React.findDOMNode(this.refs.max_number_of_days_past_due).value.trim();
      var forOLB = React.findDOMNode(this.refs.for_olb).value.trim();
      var forInterest = React.findDOMNode(this.refs.for_interest).value.trim();
      var forPenalty = React.findDOMNode(this.refs.for_penalty).value.trim();

      if (!minNumberOfDaysPastDue || !maxNumberOfDaysPastDue || !forOLB || !forInterest || !forPenalty) {
        return;
      }
      let values = {
        minNumberOfDaysPastDue: minNumberOfDaysPastDue,
        maxNumberOfDaysPastDue: maxNumberOfDaysPastDue,
        forOLB: forOLB,
        forInterest: forInterest,
        forPenalty: forPenalty
      };

      this.props.actions.updateProvisioningRole(this.props.id,values);

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

    let provisioningRole = this.props.provisioningRole;


    if(this.state.text_pressed || this.props.errors){
      result = (

        <div>
          <div className="row">
             <div className="input-field col s6">
               <input onKeyDown={this.handleKeyDown}  ref="min_number_of_days_past_due" defaultValue={provisioningRole.min_number_of_days_past_due} id="min_number_of_days_past_due" type="text" className="validate" />
               <label className="active" htmlFor="min_number_of_days_past_due">Min number of days past due</label>
             </div>
          </div>

          <div className="row">
             <div className="input-field col s6">
               <input onKeyDown={this.handleKeyDown}  ref="max_number_of_days_past_due" defaultValue={provisioningRole.max_number_of_days_past_due} id="max_number_of_days_past_due" type="text" className="validate" />
               <label className="active" htmlFor="max_number_of_days_past_due">Max number of days past due</label>
             </div>
          </div>


          <div className="row">
             <div className="input-field col s6">
               <input onKeyDown={this.handleKeyDown}  ref="for_olb" defaultValue={provisioningRole.for_olb} id="provision_for_olb" type="text" className="validate" />
               <label className="active" htmlFor="provision_for_olb">Provision for OLB(%)</label>
             </div>
          </div>

          <div className="row">
             <div className="input-field col s6">
               <input onKeyDown={this.handleKeyDown}  ref="for_interest" defaultValue={provisioningRole.for_interest} id="provision_for_interest" type="text" className="validate" />
               <label className="active" htmlFor="provision_for_interest">Provision for interest(%)</label>
             </div>
          </div>

          <div className="row">
             <div className="input-field col s6">
               <input onKeyDown={this.handleKeyDown}  ref="for_penalty" defaultValue={provisioningRole.for_penalty} id="provision_for_penalty" type="text" className="validate" />
               <label className="active" htmlFor="provision_for_penalty">Provision for penalty(%)</label>
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
          {this.props.provisioningRole.min_number_of_days_past_due}
        </div>
        <div className="col s2" onClick={this.handleEdit}>
          {this.props.provisioningRole.max_number_of_days_past_due}
        </div>
        <div className="col s2" onClick={this.handleEdit}>
          {this.props.provisioningRole.for_olb} %
        </div>
        <div className="col s2" onClick={this.handleEdit}>
          {this.props.provisioningRole.for_interest} %
        </div>
        <div className="col s2" onClick={this.handleEdit}>
          {this.props.provisioningRole.for_penalty} %
        </div>
        <div className="col s2" onClick={this.handleDelete}>Delete</div>
      </div>);
    }

    return result
  }


}


export default ProvisioningRoleView;
