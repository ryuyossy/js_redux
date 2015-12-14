import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import BaseComponent from './BaseComponent';

import * as WeekendActions from '../actions/WeekendActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let Checkbox = mui.Checkbox;

@connect(state => (
{
  weekends: state.weekends
}
))
class WeekendView extends BaseComponent {


  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  async componentWillMount(){
    const { weekends, dispatch } = this.props;
    const actions = bindActionCreators(WeekendActions, dispatch);
    actions.getWeekends();
    this.setDefaultStates(this.props,this.state);
    return;
  }

  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.weekends.isWeekendUpdated == true){
      this.refs.message.show();
    }
    this.setDefaultStates(nextProps,nextState);
  }

  setDefaultStates(nextProps, nextState){
    let self = this;
    let weekend = nextProps.weekends.weekends;

    Object.keys(weekend).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = weekend[element]
        self.setState(obj);
      }
    });

  }


  constructor(props,context) {
    super(props,context);
    this.handleOnCheck = this.handleOnCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnCheck(e,checked){
    let obj = {};
    obj[e.target.id] = checked;
    this.setState(obj);
  }

  handleSubmit(e){
    var sunday = false;
    if(this.state.sunday && this.state.sunday != ""){
      sunday = true;
    }

    var monday = false;
    if(this.state.monday && this.state.monday != ""){
      monday = true;
    }

    var tuesday = false;
    if(this.state.tuesday && this.state.tuesday != ""){
      tuesday = true;
    }


    var wednesday = false;
    if(this.state.wednesday && this.state.wednesday != ""){
      wednesday = true;
    }

    var thursday = false;
    if(this.state.thursday && this.state.thursday != ""){
      thursday = true;
    }


    var friday = false;
    if(this.state.friday && this.state.friday != ""){
      friday = true;
    }


    var saturday = false;
    if(this.state.saturday && this.state.saturday != ""){
      saturday = true;
    }

      let values = {
        sunday: sunday,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday
      };
      const { weekends, dispatch } = this.props;
      const actions = bindActionCreators(WeekendActions, dispatch);
      actions.updateWeekend(values);

  }

  render() {
    const { weekends, dispatch } = this.props;
    let actions = bindActionCreators(WeekendActions, dispatch);
    let messageView = this.getMessageView("Weekends updated!","message");
    let self = this;

    return (
      <div className="weekBox">
        <div className="row">
          <h6>weekend</h6>
           <div className="input-field col s6">
             <ul className="listChk">
              <li>
                <Checkbox
                  onCheck={self.handleOnCheck}
                  ref="sunday"
                  name="sunday"
                  value="true"
                  id="sunday"
                  label="sunday"
                  defaultChecked={this.state.sunday}
                />
              </li>
              <li>
               <Checkbox
                   onCheck={self.handleOnCheck}
                   ref="monday"
                   name="monday"
                   value="true"
                   label="Monday"
                   id="monday"
                   defaultChecked={this.state.monday}
                   />
              </li>
              <li>
               <Checkbox
                   onCheck={self.handleOnCheck}
                   ref="tuesday"
                   name="tuesday"
                   value="true"
                   label="Tuesday"
                   id="tuesday"
                   defaultChecked={this.state.tuesday}
                   />
               </li>

               <li>
               <Checkbox
                   onCheck={self.handleOnCheck}
                   ref="wednesday"
                   name="wednesday"
                   value="true"
                   label="Wednesday"
                   id="wednesday"
                   defaultChecked={this.state.wednesday}
                   />
               </li>

               <li>
               <Checkbox
                   onCheck={self.handleOnCheck}
                   ref="thursday"
                   name="thursday"
                   value="true"
                   label="Thursday"
                   id="thursday"
                   defaultChecked={this.state.thursday}
                   />
               </li>

               <li>
               <Checkbox
                   onCheck={self.handleOnCheck}
                   ref="friday"
                   name="friday"
                   value="true"
                   label="Friday"
                   id="friday"
                   defaultChecked={this.state.friday}
                   />
               </li>

               <li>
               <Checkbox
                   onCheck={self.handleOnCheck}
                   ref="saturday"
                   name="saturday"
                   value="true"
                   label="Saturday"
                   id="saturday"
                   defaultChecked={this.state.saturday}
                   />
               </li>
            </ul>
           </div>
        </div>

        <div className="row">
          <button onClick={this.handleSubmit} className="btn waves-effect waves-light" type="submit" name="action">Update
              <i className="mdi-content-send right"></i>
          </button>
        </div>

        {messageView}
      </div>
    );
  }
}



export default WeekendView;
