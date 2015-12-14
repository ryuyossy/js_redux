import request from 'superagent';

import { SESSION_LOGIN,SESSION_ERROR } from '../constants/ActionTypes';


export function login(userNo, password) {
  return dispatch => {
      loginAsync(userNo, password).then(result =>{
        return dispatch(result);
      });
  };
}

export async function loginAsync(userNo, password) {
  let user =  await postAuthInfo(userNo,password);
  if(user.user && user.user.data){
    return   {
              type: SESSION_LOGIN,
              user: user.user.data
            }
  }else{
    return   {
              type: SESSION_ERROR,
              user: user.user.errors
            }
  }
}


async function postAuthInfo(userNo, password){

  let response = await request
    .post(`/api/v1/session`)
    .type('form')
    .send({
      userNo: userNo,
      password: password
    })
    .exec().then(function(res){
      return res;
    },function(err){
      return err.response;
    });

    return {
      user: response.body,
    };
}
