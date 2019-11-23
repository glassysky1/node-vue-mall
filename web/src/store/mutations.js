import * as types from "./mutation-types";

export default {
  [types.SET_CART_LIST_REFRESH](state,flag){
    state.refreshCartListFlag = flag
  }
}