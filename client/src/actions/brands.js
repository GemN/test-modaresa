import axios from 'axios';
export const GET_BRANDS = "getBrands";

export const getBrandsAction = (res) => ({
  type: GET_BRANDS,
  brands: res
})

export const loadBrands = () => {
  return (dispatch) => {
    axios.get("http://localhost:3000/brands")
      .then((result) => {
      	console.log(result);
      	dispatch(getBrandsAction(result.data));
      })
      .catch((error) => {
      	console.log(error);
      })
  }
}
