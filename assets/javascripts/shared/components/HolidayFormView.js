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


class HolidayFormView extends BaseComponent {

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
  }


  handleKeyDown(e){
    if(e.which == 13){ //enter
      let date = this.refs.date.getDate();
      date = formatDate(date);
      var description = React.findDOMNode(this.refs.description).value.trim();
      if (!date || !description) {
        return;
      }

      this.props.createHoliday(date,description);

      React.findDOMNode(this.refs.description).value = '';
    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);

    return (
      <div className="row">
        <div className="holM">
          <div><b>Date(DD-MM-YYYY)</b></div>
          <DatePicker
            hintText="Date"
            mode="landscape"
            formatDate={formatDate}
            ref="date"
            onKeyDown={this.handleKeyDown}
            />
        </div>
        <div className="holM">
          <div><b>Description</b></div>
          <input type="text" placeholder="Description" ref="description" onKeyDown={this.handleKeyDown} />
        </div>
        <div className="holM">
          <div><b>Delete</b></div>
          Add new holiday
        </div>
          {errorsNode}
      </div>
    );
  }

}

export default HolidayFormView;
