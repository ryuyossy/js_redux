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
let DatePicker = mui.DatePicker;
let Snackbar = mui.Snackbar;

class HolidayView extends BaseComponent {

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
    this.props.deleteHoliday(this.props.holiday.id)
  }



  handleKeyDown(e){
    if(e.which == 13){ //enter
      let date = this.refs.date.getDate();
      date = formatDate(date);
      let description = React.findDOMNode(this.refs.description).value.trim();
      this.props.updateHoliday(this.props.holiday.id,date,description);
      this.setState({text_pressed : false});
    }else if(e.which == 27){ //esc
      this.setState({text_pressed : false });
    }
  }


  componentWillReceiveProps(nextProps){

  }

  render() {
    let result;
    let errorsNode = this.getErrorNodes(this.props.errors);
    let date = new Date(this.props.holiday.date);
    let border = "row 5 grey lighten-4"
    if(this.props.index % 2 == 0){
      border = "row"
    }

    if(this.state.text_pressed || this.props.errors){
      result = (
        <div className={border}>
          <div className="col s4">
            <DatePicker
              hintText="Date"
              mode="landscape"
              defaultDate={date}
              formatDate={formatDate}
              ref="date"
              onKeyDown={this.handleKeyDown}
              />
          </div>
          <div className="col s4">
            <input id="date" ref="description" type="text" className="validate" defaultValue={this.props.holiday.description}  onKeyDown={this.handleKeyDown}/>
              {errorsNode}
          </div>
          <div className="col s4">
            Delete
          </div>
      </div>
      );
    }
    else{
      result = (<div className={border}>
        <div className="col s4" onClick={this.handleEdit}>
          {formatDate(date)}
        </div>
        <div className="col s4" onClick={this.handleEdit}>
          {this.props.holiday.description}
        </div>
        <div className="col s4" onClick={this.handleDelete}>Delete</div>
      </div>);
    }

    return result
  }


}


export default HolidayView;
