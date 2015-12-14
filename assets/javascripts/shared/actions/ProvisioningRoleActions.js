import request from 'superagent';
import { PROVISIONING_ROLE_LIST, PROVISIONING_ROLE_CREATE, PROVISIONING_ROLE_DELETE, PROVISIONING_ROLE_ERROR,PROVISIONING_ROLE_UPDATE,PROVISIONING_ROLE_DETAIL } from '../constants/ActionTypes';

  export function getProvisioningRoles() {
    return dispatch => {
        getProvisioningRolesAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createProvisioningRole(values){
    return dispatch => {
        createProvisioningRoleAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteProvisioningRole(id){
      return dispatch => {
            deleteProvisioningRoleAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateProvisioningRole(id,values){
      return dispatch => {
            updateProvisioningRoleAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getProvisioningRoleDetail(id){
      return dispatch => {
          getProvisioningRoleDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getProvisioningRolesAsync() {
    let response = await request
      .get(`/api/v1/settings/provisioningRoles`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: PROVISIONING_ROLE_LIST,
      provisioningRoles: response.body,
    };
  }


  async function createProvisioningRoleAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/provisioningRoles`)
      .type('form')
      .send({
        minNumberOfDaysPastDue: values.minNumberOfDaysPastDue,
        maxNumberOfDaysPastDue: values.maxNumberOfDaysPastDue,
        forOLB: values.forOLB,
        forInterest: values.forInterest,
        forPenalty: values.forPenalty
      })
      .exec().then(function(res){
        type = PROVISIONING_ROLE_CREATE;
        return res;
      },function(err){
          type = PROVISIONING_ROLE_ERROR;
          return err.response;
      });

      return {
        type: type,
        provisioningRoles: response.body,
      };

  }



  async function deleteProvisioningRoleAsync(id){
    let response = await request
      .del('/api/v1/settings/provisioningRoles/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: PROVISIONING_ROLE_DELETE,
        provisioningRoles: response.body,
        id:id
      };

  }

  async function updateProvisioningRoleAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/provisioningRoles/`+id)
      .type('form')
      .send({
        minNumberOfDaysPastDue: values.minNumberOfDaysPastDue,
        maxNumberOfDaysPastDue: values.maxNumberOfDaysPastDue,
        forOLB: values.forOLB,
        forInterest: values.forInterest,
        forPenalty: values.forPenalty
      })
      .exec().then(function(res){
        type = PROVISIONING_ROLE_UPDATE;
        return res;
      },function(err){
        type = PROVISIONING_ROLE_ERROR;
        return err.response;
      });

      return {
        type: type,
        provisioningRoles: response.body,
        id:id
      };

  }
