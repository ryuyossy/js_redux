import request from 'superagent';

import { MF_SETTING_LIST,  MF_SETTING_ERROR,MF_SETTING_UPDATE } from '../constants/ActionTypes';



  export function getMFSettings() {
    return dispatch => {
        getMFSettingsAsync().then(result =>{
          return dispatch(result);
        });
    };
  }


  export function updateMFSetting(values) {
    return dispatch => {
        updateMFSettingAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


  async function getMFSettingsAsync() {
    let response = await request
      .get(`/api/v1/settings/mf`)
      .query({
      })
      .exec();

    return {
      type: MF_SETTING_LIST,
      mfSettings: response.body,
    };
  }



  async function updateMFSettingAsync(values){
    let type =  MF_SETTING_UPDATE;

    let response = await request
      .put(`/api/v1/settings/mf`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = MF_SETTING_UPDATE;
        return res;
      },function(err){
        type = MF_SETTING_ERROR;
        return err.response;
      });

      return {
        mfSetting: response.body,
        type: type,
      };

  }
