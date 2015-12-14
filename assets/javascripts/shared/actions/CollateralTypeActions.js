import request from 'superagent';
import { COLLATERAL_TYPE_LIST, COLLATERAL_TYPE_CREATE, COLLATERAL_TYPE_DELETE, COLLATERAL_TYPE_ERROR,COLLATERAL_TYPE_UPDATE,COLLATERAL_TYPE_DETAIL } from '../constants/ActionTypes';

  export function getCollateralTypes(collateralId) {
    return dispatch => {
        getCollateralTypesAsync(collateralId).then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createCollateralType(collateralId,values){
    return dispatch => {
        createCollateralTypeAsync(collateralId,values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteCollateralType(collateralId,id){
      return dispatch => {
            deleteCollateralTypeAsync(collateralId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateCollateralType(collateralId,id,values){
      return dispatch => {
            updateCollateralTypeAsync(collateralId,id,values).then(result =>{
            return dispatch(result);
          });
      };
    }




  async function getCollateralTypesAsync(collateralId) {
    let response = await request
      .get(`/api/v1/settings/collaterals/${collateralId}/types`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: COLLATERAL_TYPE_LIST,
      collateralTypes: response.body,
    };
  }


  async function createCollateralTypeAsync(collateralId,values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/collaterals/${collateralId}/types`)
      .type('form')
      .send({
        ...values
      }
      )
      .exec().then(function(res){
        type = COLLATERAL_TYPE_CREATE;
        return res;
      },function(err){
          type = COLLATERAL_TYPE_ERROR;
          return err.response;
      });

      return {
        type: type,
        collateralTypes: response.body,
      };

  }



  async function deleteCollateralTypeAsync(collateralId,id){
    let response = await request
      .del(`/api/v1/settings/collaterals/${collateralId}/types/${id}`)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: COLLATERAL_TYPE_DELETE,
        collateralTypes: response.body,
        id:id
      };

  }

  async function updateCollateralTypeAsync(collateralId,id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/collaterals/${collateralId}/types/${id}`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = COLLATERAL_TYPE_UPDATE;
        return res;
      },function(err){
        type = COLLATERAL_TYPE_ERROR;
        return err.response;
      });

      return {
        type: type,
        collateralTypes: response.body,
        id:id
      };

  }
