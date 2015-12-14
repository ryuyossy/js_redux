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




class IdPaperSelectView extends BaseComponent {


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
    var idPaper = nextState.id_paper || nextProps.value;
    if(!idPaper && nextProps.id_papers.length > 0){
      idPaper = nextProps.id_papers[0].id;
    }
    this.setState({id_paper: idPaper})
  }


  componentWillReceiveProps(nextProps, nextState){
    this.setDefaultStates(nextProps, nextState);
  }

  componentWillMount(){
    this.setDefaultStates(this.props, this.state);
  }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
    this.props.onChange(e.target.value);
  }

  getValue(){
    return this.state.id_paper;
  }


  render() {

    let self = this;

    let optionsIdPaper = this.props.id_papers.map(function(idPaper) {
      return <option value={idPaper.id} key={idPaper.id}>{idPaper.value}</option>;
    });



    return (
      <div>

        <div className="row">
            <label>Id paper</label>
            <select onChange={this.onChangeValue} id="id_paper" className="browser-default" value={this.state.id_paper} >
              {optionsIdPaper}
            </select>
        </div>

      </div>

    );
  }

}

export default IdPaperSelectView;
