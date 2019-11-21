import * as types from "./mutation-types";

export default {
  [types.SET_USER_INFO](state,userInfo){
    state.userInfo = userInfo
  },
  [types.SET_USER_STATE](state,flag){
    state.userState = flag 
  }
}