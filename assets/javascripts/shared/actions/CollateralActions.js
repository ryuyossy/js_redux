import request from 'superagent';
import { COLLATERAL_LIST, COLLATERAL_CREATE, COLLATERAL_DELETE, COLLATERAL_ERROR,COLLATERAL_UPDATE,COLLATERAL_DETAIL,COLLATERAL_CLEAR_DATA } from '../constants/ActionTypes';


  export function clearData(){
    return {type: COLLATERAL_CLEAR_DATA};
  }
  export function getCollaterals() {
    return dispatch => {
        getCollateralsAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createCollateral(values){
    return dispatch => {
        createCollateralAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteCollateral(id){
      return dispatch => {
            deleteCollateralAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateCollateral(id,values){
      return dispatch => {
            updateCollateralAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }




    export function getCollateralDetail(id){
      return dispatch => {
          getCollateralDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


  async function getCollateralsAsync() {
    let response = await request
      .get(`/api/v1/settings/collaterals`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: COLLATERAL_LIST,
      collaterals: response.body,
    };
  }


  async function createCollateralAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/collaterals`)
      .type('form')
      .send({
        ...values
      }
      )
      .exec().then(function(res){
        type = COLLATERAL_CREATE;
        return res;
      },function(err){
          type = COLLATERAL_ERROR;
          return err.response;
      });

      return {
        type: type,
        collaterals: response.body,
      };

  }



  async function deleteCollateralAsync(id){
    let response = await request
      .del('/api/v1/settings/collaterals/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: COLLATERAL_DELETE,
        collaterals: response.body,
        id:id
      };

  }

  async function updateCollateralAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/collaterals/`+id)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = COLLATERAL_UPDATE;
        return res;
      },function(err){
        type = COLLATERAL_ERROR;
        return err.response;
      });

      return {
        type: type,
        collaterals: response.body,
        id:id
      };

  }



    async function getCollateralDetailAsync(id){
      let response = await request
        .get('/api/v1/settings/collaterals/'+id)
        .exec().then(function(res){
          return res;
        },function(err){
            return err.response;
        });

        return {
          type: COLLATERAL_DETAIL,
          collateral: response.body,
          id:id
        };

    }
