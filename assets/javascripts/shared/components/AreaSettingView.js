import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';

import AreaSettingListView from './AreaSettingListView';


class AreaSettingView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.state = {text_pressed: false}

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleExpandChild = this.handleExpandChild.bind(this);

  }



  handleEdit(e){
    // this.setState({text_pressed : true});
  }

  handleExpandChild(e){

  }

  handleDelete(e) {
    // let areaSettingActions = this.props.flux.getActions('area_settings');
    // areaSettingActions.deleteAreaSetting(this.props.area_setting.id);
  }

  handleKeyDown(e){
    if(e.which == 13){ //enter
      // let areaSettingActions = this.props.flux.getActions('area_settings');
      // let val = React.findDOMNode(this.refs.setting_value).value.trim();
      // areaSettingActions.updateAreaSetting(this.props.area_setting.id,val);
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
    if(nextProps.area_setting.errors){
      this.setState({text_pressed : true});
    }
  }

  render() {

    let errorsNode = this.getErrorNodes(this.props.area_setting.errors);

    let tds = []
    for(let i=0; i<=3; i++){
      if(this.props.offset == i){
        tds.push(
        (
          <td key={i}>
            <div style={this.getH2Style()} onClick={this.handleEdit}>
              {this.props.area_setting.value}
            </div>
          </td>
        )
        )
      }else{
        tds.push((<td key={i}></td>))
      }
    }




    return (
      <tr>
      <td key={this.props.area_setting.id} >{this.props.area_setting.id}{errorsNode}</td>
      {tds}
      </tr>
    );
  }


}


export default AreaSettingView;
