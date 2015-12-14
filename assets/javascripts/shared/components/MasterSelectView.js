import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'


class MasterSelectView extends BaseComponent {

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


  setDefaultStates(nextProps, nextState){
    var elem = nextState.elem || nextProps.value;
    let valueKey = this.props.value_key || "id"
    if(!elem &&  nextProps.list && nextProps.list.length > 0){
      elem = nextProps.list[0][valueKey];
    }
    this.setState({elem: elem})
  }


  componentWillReceiveProps(nextProps, nextState){
    this.setDefaultStates(nextProps, nextState);
  }


  componentWillMount(){
    this.setDefaultStates(this.props, this.state);
  }


  onChangeValue(e){

    if(this.props.multiple){
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      let obj = {};
      obj[e.target.id] = value;
      this.setState(obj)
      this.props.onChange(value);
    }else{
      let obj = {};
      obj[e.target.id] = e.target.value;
      this.setState(obj);
      this.props.onChange(e.target.value);
    }

  }


  getValue(){
    return this.state.elem;
  }


  render() {

    let self = this;
    let options = null;
    let labelKey = this.props.label_key || "value"
    let valueKey = this.props.value_key || "id"

    if(this.props.list == null){
      options = (<select></select>)
    }else{
      options = this.props.list.map(function(elem) {
        return <option value={elem[valueKey]} key={elem[valueKey]}>{elem[labelKey]}</option>;
      });
    }

    return (
        <select multiple={this.props.multiple} onChange={this.onChangeValue} id="elem" className="browser-default fieldsWidth" value={this.state.elem} >
          {options}
        </select>
    );
  }

}

export default MasterSelectView;
