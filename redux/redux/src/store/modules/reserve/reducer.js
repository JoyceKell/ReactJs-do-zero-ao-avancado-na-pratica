import produce from 'immer';
import { act } from 'react-dom/test-utils';
export default function reserve(state = [], action ){
  console.log(state);
  switch (action.type) {
    case 'ADD_RESERVE_SUCCESS':
      return produce(state, draft => {
       draft.push(action.trip);
      });
    case 'REMOVE_RESERVE':
      return produce(state, draft =>{
        const tripIndex = draft.findIndex(trip => trip.id === action.id);
        if(tripIndex>=0){
          draft.splice(tripIndex,1);
        }
      });
    case 'UPDATE_RESERVE_SUCCESS': {
      return produce(state, draft =>{
        const tripIndex = draft.findIndex(trip => trip.id === action.id);
        if(tripIndex>=0){
          draft[tripIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
};