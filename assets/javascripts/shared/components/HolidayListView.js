import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import Holiday from './HolidayView';
import BaseComponent from './BaseComponent';
import HolidayFormView from './HolidayFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class HolidayListView extends BaseComponent {
  render() {

    if(this.props.holidays == null || !this.props.holidays.length){
      return (
        <div className="holBox">
          <HolidayFormView errors={this.props.holiday_errors} createHoliday={this.props.createHoliday} />
        </div>

      );
    }
    let self = this;

    var holidayNodes = this.props.holidays.map(function(holiday, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Holiday index={index+1} deleteHoliday={self.props.deleteHoliday} errors={holiday.errors} key={holiday.id} holiday={holiday} id={holiday.id} updateHoliday={self.props.updateHoliday}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s4"><b>Date(DD-MM-YYYY)</b></div>
        <div className="col s4"><b>Description</b></div>
        <div className="col s4"><b>Delete</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {holidayNodes}
      </ReactCSSTransitionGroup>
      <HolidayFormView errors={this.props.holiday_errors} createHoliday={this.props.createHoliday} />
    </div>


    );
  }


}

export default HolidayListView;
