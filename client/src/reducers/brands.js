import { GET_BRANDS } from '../actions/brands'

const reducer = (state = {} , action) => {
  switch (action.type){
    case GET_BRANDS:
      return {
        ...state,
        brands: action.brands
      }
    default:
      return state
  }
}

export default reducer

