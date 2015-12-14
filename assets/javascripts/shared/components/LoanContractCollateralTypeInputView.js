import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import BaseComponent from './BaseComponent';
import { Link } from 'react-router';
import {formatDate} from '../utils/utils'

import {COLLATERAL_TYPE_MAP_FOR_LABEL} from "../constants/Constants.js"


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();

class LoanContractCollateralTypeInputView extends BaseComponent {



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
    this.onChangeValue = this.onChangeValue.bind(this);
  }




  componentWillMount(){
    this.updateStates(this.props,this.state);
  }

  componentWillReceiveProps(nextProps, nextState){
    this.updateStates(nextProps,nextState);
  }

  updateStates(props,state){
    let self = this;
    let collateralType = props.collateralType;
    let value = state.value || props.value;
    this.setState({value: value, collateral_value_id: this.props.collateral_value_id});

    if(collateralType.type == null && state.type == null){
      this.setState({type: 1});
    }
    Object.keys(collateralType).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = collateralType[element]
        self.setState(obj);
      }
    });
  }


  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
    this.props.onChange({id: this.props.id, value: e.target.value})
  }


  render() {
    let collateralType = this.props.collateralType;
      return (
        <div>
          <div className="row">
             <div className="col s10">
               <h5></h5>
             </div>
          </div>
          <div className="row">
             <div className="input-field col s10" >
               <label className="active" htmlFor="type">{collateralType.name} ({COLLATERAL_TYPE_MAP_FOR_LABEL[collateralType.type]})</label>
               <input ref="name" value={this.state.value} onChange={this.onChangeValue} id="value" type="text" className="validate" />
             </div>
          </div>
        </div>
      );
  }


}


export default LoanContractCollateralTypeInputView;
