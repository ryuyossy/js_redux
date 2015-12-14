import request from 'superagent';
import { AREA_SETTINGS_LIST,AREA_SETTINGS_UPLOAD,AREA_SETTINGS_ERROR,AREA_SETTINGS_COUNT } from '../constants/ActionTypes';



  export function getAreaSettings() {
    return dispatch => {
        getAreaSettingsAsync().then(result =>{
          return dispatch(result);
        });
    };
  }


  export function getAreaSettingsCount() {
    return dispatch => {
        getAreaSettingsCountAsync().then(result =>{
          return dispatch(result);
        });
    };
  }


  export function uploadCsvFile(file) {
    return dispatch => {
        uploadCsvFileAsync(file).then(result =>{
          return dispatch(result);
        });
    };
  }


  async function getAreaSettingsAsync() {
    let response = await request
      .get(`/api/v1/area_settings`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: AREA_SETTINGS_LIST,
      area_settings: response.body,
    };
  }


  async function getAreaSettingsCountAsync() {
    let response = await request
      .get(`/api/v1/area_settings/count`)
      .query({
        per_page: 50,
      })
      .exec();
    return {
      type: AREA_SETTINGS_COUNT,
      area_settings: response.body,
    };
  }



  async function createAreaSettingAsync(value,parent_id){
    let response = await request
      .post(`/api/v1/area_settings`)
      .type('form')
      .send({
        value: value,
        parent_id: parent_id
      })
      .exec();
      return {
        area_settings: response.body,
      };

  }


  async function uploadCsvFileAsync(file){
    let type = AREA_SETTINGS_UPLOAD;
    let response = await request
      .post(`/api/v1/area_settings/upload`)
      .field("file",file)
      .exec().then(function(res){
        type = AREA_SETTINGS_UPLOAD;
        return res;
      },function(err){
          type = AREA_SETTINGS_ERROR;
          return err.response;
      });

      return {
      type: AREA_SETTINGS_UPLOAD,
      area_settings: response.body,
    };

  }

  async function updateAreaSettingAsync(id,value){
    let response = await request
      .put(`/api/v1/area_settings/`+id)
      .type('form')
      .send({
        value: value
      })
      .exec().then(function(res){
        return res;
      },function(err){
        return err.response;
      });

      return {
        area_settings: response.body,
        id:id
      };

  }




  async function deleteAreaSettingAsync(id){
    let response = await request
      .del('/api/v1/area_settings/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        area_settings: response.body,
        id:id
      };

  }
