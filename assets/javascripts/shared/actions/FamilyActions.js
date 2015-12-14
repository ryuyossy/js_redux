import request from 'superagent';
import { FAMILY_LIST, FAMILY_CREATE, FAMILY_DELETE, FAMILY_ERROR,FAMILY_UPDATE,FAMILY_DETAIL,FAMILY_CLEAR,FAMILY_ID_PICTURE_UPLOAD } from '../constants/ActionTypes';

  export function getFamilies(customerId) {
    return dispatch => {
        getFamiliesAsync(customerId).then(result =>{
          return dispatch(result);
        });
    };
  }


  export function createFamily(customerId,values){
    return dispatch => {
        createFamilyAsync(customerId,values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteFamily(customerId,id){
      return dispatch => {
            deleteFamilyAsync(customerId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateFamily(customerId,id,values){
      return dispatch => {
            updateFamilyAsync(customerId,id,values).then(result =>{
            return dispatch(result);
          });
      };
    }




    export function getFamilyDetail(customerId,id){
      return dispatch => {
          getFamilyDetailAsync(customerId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


  async function getFamiliesAsync(customerId) {
    let response = await request
      .get(`/api/v1/customers/${customerId}/families`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: FAMILY_LIST,
      families: response.body,
    };
  }


  async function createFamilyAsync(customerId,values){
    let type = null;
    let response = await request
      .post(`/api/v1/customers/${customerId}/families`)
      .type('form')
      .send({
        ...values
      }
      )
      .exec().then(function(res){
        type = FAMILY_CREATE;
        return res;
      },function(err){
          type = FAMILY_ERROR;
          return err.response;
      });

      return {
        type: type,
        families: response.body,
      };

  }



  async function deleteFamilyAsync(customerId,id){
    let response = await request
      .del(`/api/v1/customers/${customerId}/families/${id}`)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: FAMILY_DELETE,
        families: response.body,
        id:id
      };

  }

  async function updateFamilyAsync(customerId,id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/customers/${customerId}/families/${id}`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = FAMILY_UPDATE;
        return res;
      },function(err){
        type = FAMILY_ERROR;
        return err.response;
      });

      return {
        type: type,
        families: response.body,
        id:id
      };

  }


    async function getFamilyDetailAsync(customerId,id){
      let response = await request
        .get(`/api/v1/customers/${customerId}/families/${id}`)
        .exec().then(function(res){
          return res;
        },function(err){
            return err.response;
        });

        return {
          type: FAMILY_DETAIL,
          family: response.body,
          id:id
        };

    }
