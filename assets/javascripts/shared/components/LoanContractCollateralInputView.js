import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import LoanContractCollateralTypeInputListView from './LoanContractCollateralTypeInputListView';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'


class LoanContractCollateralInputView extends BaseComponent {


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
    this.onChangeCollateralId = this.onChangeCollateralId.bind(this);
    this.onChangeTypeValue = this.onChangeTypeValue.bind(this);
  }


  setDefaultStates(nextProps, nextState){
    var collateralId = nextState.collateral_id || nextProps.collateral_id;
    if(!collateralId && nextProps.collaterals.length > 0){
      collateralId = nextProps.collaterals[0].id;
      this.props.onChange(collateralId, null);
    }

    var types = null;
    nextProps.collaterals.forEach(function(element, index){
      if(collateralId == element.id){
        types = element.collateral_types;
      }
    });


    this.setState({types: types, collateral_id: collateralId});
  }


  componentWillReceiveProps(nextProps, nextState){
    this.setDefaultStates(nextProps, nextState);
  }

  componentWillMount(){
    this.setDefaultStates(this.props, this.state);
  }


  onChangeTypeValue(values){
    this.props.onChange(this.state.collateral_id, values);
  }

  onChangeCollateralId(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);

    var collateralId = e.target.value;
    var types = null;
    this.props.collaterals.forEach(function(element, index){
      if(collateralId == element.id){
        types = element.collateral_types;
      }
    });
    this.setState({types:types});
    this.props.onChange(e.target.value, null);
  }

  getValue(){
    return this.state.collateral_id;
  }


  render() {

    let self = this;

    let optionsCollateral = this.props.collaterals.map(function(collateral) {
      return <option value={collateral.id} key={collateral.id}>{collateral.name}</option>;
    });

    return (
      <div>
        <div className="row">
            <label>Collateral</label>
            <select onChange={this.onChangeCollateralId} id="collateral_id" className="browser-default" value={this.state.collateral_id} >
              {optionsCollateral}
            </select>
            <LoanContractCollateralTypeInputListView onChange={this.onChangeTypeValue} collateralTypes={this.state.types} collateral_values={this.props.collateral_values} />
        </div>
      </div>
    );
  }

}

export default LoanContractCollateralInputView;
