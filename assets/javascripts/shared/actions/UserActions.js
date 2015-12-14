import request from 'superagent';

import { USER_LIST, USER_CREATE, USER_DELETE, USER_ERROR,USER_UPDATE } from '../constants/ActionTypes';

export function getUsers() {
  return dispatch => {
    getUsersAsync().then(result =>{
      return dispatch(result);
    });
  };
}


export function postUser(values) {
  return dispatch => {
    postUserAsync(values).then(result =>{
      return dispatch(result);
    });
  };
}

export function updateUser(id,values) {
  return dispatch => {
    updateUserAsync(id,values).then(result =>{
      return dispatch(result);
    });
  };
}


export function deleteUser(id) {
  return dispatch => {
    deleteUserAsync(id).then(result =>{
      return dispatch(result);
    });
  };
}




async function getUsersAsync() {
  let response = await request
    .get(`/api/v1/users`)
    .query({
      per_page: 50,
    })
    .exec();

  return {
    type: USER_LIST,
    users: response.body,
  };
}



async function postUserAsync(values){
  let type = null;
  let response = await request
    .post(`/api/v1/users`)
    .type('form')
    .send({
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      roleId: values.roleId,
      organizationId: values.organizationId
    })
    .exec().then(function(res){
      type = USER_CREATE;
      return res;
    },function(err){
      type = USER_ERROR;
      return err.response;
    });

    return {
      type: type,
      users: response.body,
    };

}



  async function deleteUserAsync(id){
    let type = null;
    let response = await request
      .del('/api/v1/users/'+id)
      .exec().then(function(res){
        type = USER_DELETE;
        return res;
      },function(err){
        type = USER_ERROR;
        return err.response;
      });

      return {
        users: response.body,
        type: type,
        id:id
      };
  }


async  function updateUserAsync(id,values){
  let type = null;
  let response = await request
    .put(`/api/v1/users/`+id)
    .type('form')
    .send({
      userNo: values.userNo,
      firstName: values.firstName,
      lastName: values.lastName,
      roleId: values.roleId,
      organizationId: values.organizationId
    })
    .exec().then(function(res){
      type = USER_UPDATE;
      return res;
    },function(err){
      type = USER_ERROR;
      return err.response;
    });

    return {
      users: response.body,
      type:type,
      id:id
    };

}
