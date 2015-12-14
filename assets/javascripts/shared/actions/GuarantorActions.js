import request from 'superagent';
import { GUARANTOR_LIST, GUARANTOR_CREATE, GUARANTOR_DELETE, GUARANTOR_ERROR,GUARANTOR_UPDATE,GUARANTOR_DETAIL,GUARANTOR_CLEAR,GUARANTOR_ID_PICTURE_UPLOAD } from '../constants/ActionTypes';

  export function getGuarantors(customerId,loanContractId) {
    return dispatch => {
        getGuarantorsAsync(customerId,loanContractId).then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createGuarantor(customerId,loanContractId,values){
    return dispatch => {
        createGuarantorAsync(customerId,loanContractId,values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteGuarantor(customerId,loanContractId,id){
      return dispatch => {
            deleteGuarantorAsync(customerId,loanContractId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateGuarantor(customerId,loanContractId,id,values){
      return dispatch => {
            updateGuarantorAsync(customerId,loanContractId,id,values).then(result =>{
            return dispatch(result);
          });
      };
    }




    export function getGuarantorDetail(customerId,loanContractId,id){
      return dispatch => {
          getGuarantorDetailAsync(customerId,loanContractId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function uploadIdPicture(customerId, loanContractId, id, file) {
      return dispatch => {
          uploadIdPictureAsync(customerId, loanContractId, id, file).then(result =>{
            return dispatch(result);
          });
      };
    }


  async function uploadIdPictureAsync(customerId, loanContractId, id, file){
    let type = GUARANTOR_ID_PICTURE_UPLOAD;
    var formData = new FormData();
    formData.append('file', file);
    let response = await request
      .post(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/guarantors/${id}/idPicture/upload`)
      .send(formData)
      .exec().then(function(res){
        type = GUARANTOR_ID_PICTURE_UPLOAD;
        return res;
      },function(err){
          type = GUARANTOR_ERROR;
          return err.response;
      });

      return {
      type: GUARANTOR_ID_PICTURE_UPLOAD,
      guarantors: response.body,
    };

  }

  async function getGuarantorsAsync(customerId,loanContractId) {
    let response = await request
      .get(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/guarantors`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: GUARANTOR_LIST,
      guarantors: response.body,
    };
  }


  async function createGuarantorAsync(customerId,loanContractId,values){
    let type = null;
    let response = await request
      .post(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/guarantors`)
      .type('form')
      .send({
        ...values
      }
      )
      .exec().then(function(res){
        type = GUARANTOR_CREATE;
        return res;
      },function(err){
          type = GUARANTOR_ERROR;
          return err.response;
      });

      return {
        type: type,
        guarantors: response.body,
      };

  }



  async function deleteGuarantorAsync(customerId,loanContractId,id){
    let response = await request
      .del(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/guarantors/${id}`)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: GUARANTOR_DELETE,
        guarantors: response.body,
        id:id
      };

  }

  async function updateGuarantorAsync(customerId,loanContractId,id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/guarantors/${id}`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = GUARANTOR_UPDATE;
        return res;
      },function(err){
        type = GUARANTOR_ERROR;
        return err.response;
      });

      return {
        type: type,
        guarantors: response.body,
        id:id
      };

  }



    async function getGuarantorDetailAsync(customerId,loanContractId,id){
      let response = await request
        .get(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/guarantors/${id}`)
        .exec().then(function(res){
          return res;
        },function(err){
            return err.response;
        });

        return {
          type: GUARANTOR_DETAIL,
          guarantor: response.body,
          id:id
        };

    }
