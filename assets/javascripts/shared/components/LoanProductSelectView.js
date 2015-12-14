import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import MasterSelectView from './MasterSelectView'

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'


class LoanProductSelectView extends MasterSelectView {

  render() {

    let self = this;
    let options = null;
    if(this.props.list == null){
      options = (<select></select>)
    }else{
      options = this.props.list.map(function(elem) {
        return <option value={elem.id} key={elem.id}>{elem.name}</option>;
      });
    }


    return (
        <select onChange={this.onChangeValue} id="elem" className="browser-default fieldsWidth" value={this.state.elem} >
          {options}
        </select>
    );
  }

}

export default LoanProductSelectView;
