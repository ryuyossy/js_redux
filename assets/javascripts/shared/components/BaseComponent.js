import React from 'react';
import { State, History } from 'react-router';
import request from 'superagent';
import ErrorListView from './ErrorListView';
import MessageView from './MessageView';
import ErrorMessageView from './ErrorMessageView';

class Auth {

  static instance;
  static getInstance(){
    if(!Auth.instance){
      Auth.instance = new Auth();
    }
    return Auth.instance;
  }

  async checkLogin(){
    let response = await request
      .get(`/api/v1/checkLogin`)
      .exec().then(function(res){
        return res;
      },function(err){
        return err.response;
      });

    let user = response.body.data
    let errors = response.body.errors;
    this.user = user;
    this.errors = errors;
    if(this.user){
      return true;
    }else{
      return false;
    }
  }

  async isLoggedIn(){
    if(this.user){
      return true;
    }else{
      return await this.checkLogin();
    }
  }

}


class BaseComponent extends React.Component {

  static async isLoggedIn(){
    return await Auth.getInstance().isLoggedIn();
  }

  styles(){
  return   {
      hide_style: {
        display:"none",
        visibility:"hidden"
      },
      display_style: {

      }
    };
  }

  user(){
    return Auth.getInstance().user;
  }

  constructor(props,context) {
      super(props,context);
      this.state = {}
  }

  static get contextTypes(){
    return {
      router: React.PropTypes.func
    };
  }

  getErrorNodes(errors){

    let errorsNode = null;
    if(errors){
      errorsNode = (
        <ErrorListView errors={errors} />
      );
    }else{
      errorsNode = (<span></span>);
    }
    return errorsNode;
  }

  getMessageView(message, ref="msg_ref", color="#00bfa5"){
    return (
      <MessageView message={message} color={color} ref={ref} elemRef={ref}/>
    );
  }

  getCriticalErrorMessage(errors,message) {
    let errorsNode = null;
    if (errors) {
      errorsNode = (
        <ErrorMessageView errors={errors} message={message} />
      );
    }
    return errorsNode;
  }

  // static willTransitionTo(transition, params){
  //
  // }

}


export default BaseComponent;
