import request from 'superagent';
import {COLLECTION_SEARCH_CONTRACT  } from '../constants/ActionTypes';


    export function searchLoanContract(query){
      return dispatch => {
          searchLoanContractAsync(query).then(result =>{
            return dispatch(result);
          });
      };
    }


    async function searchLoanContractAsync(query){
      let response = await request
        .get(`/api/v1/collection_search_contract`)
        .query({
          per_page: 50,
          ...query
        })
        .exec().then(function(res){
          return res;
        },function(err){
            return err.response;
        });

        return {
          type: COLLECTION_SEARCH_CONTRACT,
          collections: response.body,
        };

    }
