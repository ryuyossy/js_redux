import request from 'superagent';
import { ORGANIZATION_LIST, ORGANIZATION_CREATE, ORGANIZATION_DELETE, ORGANIZATION_ERROR,ORGANIZATION_UPDATE,ORGANIZATION_DETAIL,GET_USER_MASETER_FOR_ORGANIZATION } from '../constants/ActionTypes';


  export function getOrganizations() {
    return dispatch => {
        getOrganizationsAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createOrganization(values){
    return dispatch => {
        createOrganizationAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }




    export function deleteOrganization(id){
      return dispatch => {
            deleteOrganizationAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateOrganization(id,values){
      return dispatch => {
            updateOrganizationAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getOrganizationDetail(id){
      return dispatch => {
          getOrganizationDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function getUserMaster() {
      return dispatch => {
          getUserMasterAsync().then(result =>{
            return dispatch(result);
          });
      };
    }




  async function getOrganizationsAsync() {
    let response = await request
      .get(`/api/v1/settings/organizations`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: ORGANIZATION_LIST,
      organizations: response.body,
    };
  }


  async function createOrganizationAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/organizations`)
      .type('form')
      .send({
        name: values.name,
        shortName: values.shortName,
        code: values.code,
        address: values.address,
        branch_manager_user_id: values.branchManagerUserId,
        description: values.description,
        isHq:values.isHq
      })
      .exec().then(function(res){
        type = ORGANIZATION_CREATE;
        return res;
      },function(err){
          type = ORGANIZATION_ERROR;
          return err.response;
      });

      return {
        type: type,
        organizations: response.body,
      };

  }



  async function deleteOrganizationAsync(id){
    let response = await request
      .del('/api/v1/settings/organizations/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: ORGANIZATION_DELETE,
        organizations: response.body,
        id:id
      };

  }

  async function updateOrganizationAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/organizations/`+id)
      .type('form')
      .send({
        name: values.name,
        shortName: values.shortName,
        code: values.code,
        address: values.address,
        branch_manager_user_id: values.branchManagerUserId,
        description: values.description,
        isHq:values.isHq
      })
      .exec().then(function(res){
        type = ORGANIZATION_UPDATE;
        return res;
      },function(err){
        type = ORGANIZATION_ERROR;
        return err.response;
      });

      return {
        type: type,
        organizations: response.body,
        id:id
      };

  }





  async function getUserMasterAsync() {
    let response = await request
      .get(`/api/v1/users`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: GET_USER_MASETER_FOR_ORGANIZATION,
      users: response.body,
    };
  }
