import request from 'superagent';
import { REPAYMENT_SCHEDULE_LIST,REPAYMENT_SCHEDULE_UPDATE } from '../constants/ActionTypes';

  export function getRepaymentSchedules(customerId,loanContractId) {
    return dispatch => {
        getRepaymentSchedulesAsync(customerId,loanContractId).then(result =>{
          return dispatch(result);
        });
    };
  }


  export function executeCollect(customerId,loanContractId,repaymentScheduleId,actualInstallmentDate) {
    return dispatch => {
        executeCollectAsync(customerId,loanContractId, repaymentScheduleId, actualInstallmentDate).then(result =>{
          return dispatch(result);
        });
    };
  }

  export function executeUncollect(customerId,loanContractId,repaymentScheduleId) {
    return dispatch => {
        executeUncollectAsync(customerId,loanContractId, repaymentScheduleId).then(result =>{
          return dispatch(result);
        });
    };
  }


  export function executeConfirm(customerId,loanContractId,repaymentScheduleId) {
    return dispatch => {
        executeConfirmAsync(customerId,loanContractId, repaymentScheduleId).then(result =>{
          return dispatch(result);
        });
    };
  }

  export function executeCancel(customerId,loanContractId,repaymentScheduleId) {
    return dispatch => {
        executeCancelAsync(customerId,loanContractId, repaymentScheduleId).then(result =>{
          return dispatch(result);
        });
    };
  }


  async function getRepaymentSchedulesAsync(customerId,loanContractId) {
    let response = await request
      .get(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/repayment_schedules`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: REPAYMENT_SCHEDULE_LIST,
      repaymentSchedules: response.body,
    };
  }

  async function executeCollectAsync(customerId,loanContractId,repaymentScheduleId,actualInstallmentDate) {
    let response = await request
      .put(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/repayment_schedules/${repaymentScheduleId}/collect`)
      .type("form")
      .send(
        {actualInstallmentDate: actualInstallmentDate}
      )
      .exec();
    return {
      type: REPAYMENT_SCHEDULE_UPDATE,
      repaymentSchedules: response.body,
    };
  }


  async function executeUncollectAsync(customerId,loanContractId,repaymentScheduleId) {
    let response = await request
      .put(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/repayment_schedules/${repaymentScheduleId}/uncollect`)
      .exec();
    return {
      type: REPAYMENT_SCHEDULE_UPDATE,
      repaymentSchedules: response.body,
    };
  }



    async function executeConfirmAsync(customerId,loanContractId,repaymentScheduleId) {
      let response = await request
        .put(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/repayment_schedules/${repaymentScheduleId}/confirm`)
        .exec();
      return {
        type: REPAYMENT_SCHEDULE_UPDATE,
        repaymentSchedules: response.body,
      };
    }

    async function executeCancelAsync(customerId,loanContractId,repaymentScheduleId) {
      let response = await request
        .put(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/repayment_schedules/${repaymentScheduleId}/cancel`)
        .exec();
      return {
        type: REPAYMENT_SCHEDULE_UPDATE,
        repaymentSchedules: response.body,
      };
    }
