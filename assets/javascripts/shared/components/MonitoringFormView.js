import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';



class MonitoringFormView extends BaseComponent {



  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }


  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }


  handleKeyDown(e){
    if(e.which == 13){ //enter
      var question = this.state.question.trim();
      var answerType = this.state.answer_type;

      if (!question) {
        return;
      }
      let values = {
        question: question,
        answerType: answerType
      };

      this.props.actions.createMonitoring(values);

      React.findDOMNode(this.refs.question).value = '';

    }else if(e.which == 27){ //esc

    }
  }


  componentWillMount(){
    this.setState({answer_type: 1});
  }





  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);
    let options = this.props.answerTypes.map(function(answerType,index) {
      return <option value={answerType.payload} key={index}>{answerType.text}</option>;
    });

    return (
      <div className="row">
        <div className="col s6">
          <input type="text" id="question" onChange={this.onChangeValue} placeholder="Monitoring question" ref="question" onKeyDown={this.handleKeyDown} />
        </div>
        <div className="input-field col s2">
          <select id="answer_type" onChange={this.onChangeValue}  className="browser-default" >
            {options}
          </select>
        </div>
          {errorsNode}
      </div>
    );
  }

}

export default MonitoringFormView;
