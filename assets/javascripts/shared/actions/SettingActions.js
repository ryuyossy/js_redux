import request from 'superagent';

import { COMPANY_LIST,  COMPANY_ERROR,COMPANY_UPDATE } from '../constants/ActionTypes';



  export function getCompanySettings() {
    return dispatch => {
        getCompanySettingsAsync().then(result =>{
          return dispatch(result);
        });
    };
  }


  export function updateCompanySetting(values) {
    return dispatch => {
        updateCompanySettingAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


  async function getCompanySettingsAsync() {
    let response = await request
      .get(`/api/v1/settings/company`)
      .query({
      })
      .exec();

    return {
      type: COMPANY_LIST,
      company: response.body,
    };
  }



  async function updateCompanySettingAsync(values){
    let type =  COMPANY_UPDATE;

    let response = await request
      .put(`/api/v1/settings/company`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = COMPANY_UPDATE;
        return res;
      },function(err){
        type = COMPANY_ERROR;
        return err.response;
      });

      return {
        company: response.body,
        type: type,
      };

  }
