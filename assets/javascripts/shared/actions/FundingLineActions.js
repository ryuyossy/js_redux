import request from 'superagent';
import { FUNDING_LINE_LIST, FUNDING_LINE_CREATE, FUNDING_LINE_DELETE, FUNDING_LINE_ERROR,FUNDING_LINE_UPDATE,FUNDING_LINE_DETAIL } from '../constants/ActionTypes';

  export function getFundingLines() {
    return dispatch => {
        getFundingLinesAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createFundingLine(values){
    return dispatch => {
        createFundingLineAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteFundingLine(id){
      return dispatch => {
            deleteFundingLineAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateFundingLine(id,values){
      return dispatch => {
            updateFundingLineAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getFundingLineDetail(id){
      return dispatch => {
          getFundingLineDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getFundingLinesAsync() {
    let response = await request
      .get(`/api/v1/settings/fundingLines`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: FUNDING_LINE_LIST,
      fundingLines: response.body,
    };
  }


  async function createFundingLineAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/fundingLines`)
      .type('form')
      .send({
        fundingSourceName: values.fundingSourceName
      })
      .exec().then(function(res){
        type = FUNDING_LINE_CREATE;
        return res;
      },function(err){
          type = FUNDING_LINE_ERROR;
          return err.response;
      });

      return {
        type: type,
        fundingLines: response.body,
      };

  }



  async function deleteFundingLineAsync(id){
    let response = await request
      .del('/api/v1/settings/fundingLines/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: FUNDING_LINE_DELETE,
        fundingLines: response.body,
        id:id
      };

  }

  async function updateFundingLineAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/fundingLines/`+id)
      .type('form')
      .send({
        fundingSourceName: values.fundingSourceName
      })
      .exec().then(function(res){
        type = FUNDING_LINE_UPDATE;
        return res;
      },function(err){
        type = FUNDING_LINE_ERROR;
        return err.response;
      });

      return {
        type: type,
        fundingLines: response.body,
        id:id
      };

  }
