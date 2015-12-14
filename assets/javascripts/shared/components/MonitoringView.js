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

class MonitoringView extends BaseComponent {


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
    this.onChangeValue = this.onChangeValue.bind(this);
  }


  handleEdit(e){
    this.setState({text_pressed : true});
  }


  handleDelete(e) {
    this.props.actions.deleteMonitoring(this.props.monitoring.id)
  }


  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }




  handleKeyDown(e){
    let key = e.which | e.keyCode;
    if(key == 13){ //enter
      var question =  this.state.question.trim();
      var answerType = this.state.answer_type;

      if (!question) {
        return;
      }
      let values = {
        question: question,
        answerType: answerType
      };

      this.props.actions.updateMonitoring(this.props.id,values);

      this.setState({text_pressed : false});
    }else if(key == 27){ //esc
      this.setState({text_pressed : false });
    }
  }



  componentWillReceiveProps(nextProps){
    let self = this;
    let monitoring = nextProps.monitoring;
    Object.keys(monitoring).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = monitoring[element]
        self.setState(obj);
      }
    });
  }

  render() {
    let result;
    let errorsNode = this.getErrorNodes(this.props.errors);
    let border = "row 5 grey lighten-4"
    if(this.props.index % 2 == 0){
      border = "row"
    }

    let monitoring = this.props.monitoring;

    let selectedValue =  this.state.answer_type || this.props.monitoring.answer_type;

    let selectedLabel = null;
    this.props.answerTypes.forEach(function(answerType) {
      if(answerType.payload == selectedValue){
        selectedLabel = answerType.text;
      }
    });

    let options = this.props.answerTypes.map(function(answerType,index) {
      return <option value={answerType.payload} key={index}>{answerType.text}</option>;
    });

    if(this.state.text_pressed || this.props.errors){
      result = (

        <div>
          <div className="row">
             <div className="input-field col s5">
               <input onKeyDown={this.handleKeyDown} id="question" ref="question" onChange={this.onChangeValue} value={this.state.question}  type="text" className="validate" />
               <label className="active" htmlFor="monitoring">Question</label>
             </div>
          </div>

          <div className="input-field col s5">
            <select id="answer_type" onChange={this.onChangeValue} className="browser-default" value={this.state.answer_type} >
              {options}
            </select>
          </div>


          <div className="row">
             <div className="input-field col s2">
               Delete
             </div>
          </div>
          {errorsNode}
        </div>
      );
    }
    else{
      result = (<div className={border}>
        <div className="col s5" onClick={this.handleEdit}>
          {monitoring.question}
        </div>
        <div className="col s5" onClick={this.handleEdit}>
          {selectedLabel}
        </div>
        <div className="col s2" onClick={this.handleDelete}>Delete</div>
      </div>);
    }

    return result
  }


}


export default MonitoringView;
