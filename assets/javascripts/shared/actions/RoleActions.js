import request from 'superagent';
import { ROLE_LIST, ROLE_CREATE, ROLE_DELETE, ROLE_ERROR,ROLE_UPDATE,ROLE_DETAIL } from '../constants/ActionTypes';

  export function getRoles() {
    return dispatch => {
        getRolesAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createRole(values){
    return dispatch => {
        createRoleAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteRole(id){
      return dispatch => {
            deleteRoleAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateRole(id,values){
      return dispatch => {
            updateRoleAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getRoleDetail(id){
      return dispatch => {
          getRoleDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getRolesAsync() {
    let response = await request
      .get(`/api/v1/settings/roles`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: ROLE_LIST,
      roles: response.body,
    };
  }


  async function createRoleAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/roles`)
      .type('form')
      .send({
        fundingSourceName: values.fundingSourceName
      })
      .exec().then(function(res){
        type = ROLE_CREATE;
        return res;
      },function(err){
          type = ROLE_ERROR;
          return err.response;
      });

      return {
        type: type,
        roles: response.body,
      };

  }



  async function deleteRoleAsync(id){
    let response = await request
      .del('/api/v1/settings/roles/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: ROLE_DELETE,
        roles: response.body,
        id:id
      };

  }

  async function updateRoleAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/roles/`+id)
      .type('form')
      .send({
        fundingSourceName: values.fundingSourceName
      })
      .exec().then(function(res){
        type = ROLE_UPDATE;
        return res;
      },function(err){
        type = ROLE_ERROR;
        return err.response;
      });

      return {
        type: type,
        roles: response.body,
        id:id
      };

  }
