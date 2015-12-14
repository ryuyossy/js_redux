import request from 'superagent';
import { MF_SETTING_LIST, MF_SETTING_ERROR,MF_SETTING_CREATE,MF_SETTING_DELETE,MF_SETTING_UPDATE,MF_SETTING_DETAIL } from '../constants/ActionTypes';

const skipWeekendsInInstallmentDays = {skipWeekendsInInstallmentDays: [{label: "Yes", value: "1"}, {label: "No", value: "2"}]};
const initialState = {mfSettings:[], mfSettingErrors: null, isMfSettingUpdated: false,mfSetting: {}, ...skipWeekendsInInstallmentDays};
export default function mfSettings(state = initialState, action) {

  switch (action.type) {
  case MF_SETTING_LIST:
    var mfSettings =  action.mfSettings;
    return {...state,mfSettings: mfSettings, mfSettingErrors:null,isMfSettingUpdated:false};
  case MF_SETTING_ERROR:
    var errors = action.mfSettings.errors;
    var mfSettingErrors = null;
    var found = false;
    var ary = state.mfSettings.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      mfSettingErrors = errors;
    }

    return {...state,mfSettings: ary,mfSettingErrors: mfSettingErrors,isMfSettingUpdated:false};

  case MF_SETTING_UPDATE:
    var mfSetting = action.mfSetting;
    return {...state,mfSettings: mfSetting, mfSettingErrors:null,isMfSettingUpdated:true};
  default:
    return  {...initialState, ...state, mfSettingErrors:null,isMfSettingUpdated:false }
  }
}
