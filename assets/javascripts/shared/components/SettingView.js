import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';

class SettingView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.state = {text_pressed: false}

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }



  handleEdit(e){
    this.setState({text_pressed : true});
  }


  handleKeyDown(e){
    if(e.which == 13){ //enter
      let val = React.findDOMNode(this.refs.setting_value).value.trim();
      this.props.updateSetting(this.props.setting.id,val);
      this.setState({text_pressed : false});
    }else if(e.which == 27){ //esc
      this.setState({text_pressed : false });
    }
  }

  getStyleInputStyle(){
    if(this.state.text_pressed){
      return this.styles().display_style;
    }else{
      return this.styles().hide_style;
    }
  }

  getH2Style(){
    if(this.state.text_pressed){
      return this.styles().hide_style;
    }else{
      return this.styles().display_style;
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.setting.errors){
      this.setState({text_pressed : true});
    }
  }

  render() {

    let errorsNode = null;
    if(this.props.setting.errors){
      errorsNode = (
        <ErrorListView errors={this.props.setting.errors} />
      );
    }else{
      errorsNode = (<span></span>);
    }

    return (
      <div className="setting">
        <span>
        {this.props.setting.label}
        </span>
        :
        <span onClick={this.handleEdit} style={this.getH2Style()}>
          {this.props.setting.value}
        </span>
        <input ref="setting_value" type="text" defaultValue={this.props.setting.value} style={this.getStyleInputStyle()} onKeyDown={this.handleKeyDown}/>
          {errorsNode}
      </div>
    );
  }


}


export default SettingView;
