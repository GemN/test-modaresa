import axios from 'axios';
import { SERVER_URL } from '../global';
export const GET_BRANDS = "getBrands";

export const getBrandsAction = (res) => ({
  type: GET_BRANDS,
  brands: res
})

export const loadBrands = () => {
  return (dispatch) => {
    axios.get(SERVER_URL + '/brands')
      .then((result) => {
      	dispatch(getBrandsAction(result.data));
      })
      .catch((error) => {
      	console.log(error);
      })
  }
}
