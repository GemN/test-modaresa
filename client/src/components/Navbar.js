import React, { useState, useEffect } from 'react'
import { useStore } from 'react-redux';
import { loadBrands } from '../actions/brands'
import axios from 'axios';
import $ from 'jquery';
import { SERVER_URL } from '../global';

export const Navbar = () => {
	const [brand, setBrand] = useState({
		name: '',
		types: [],
		country: '',
		description: ''
	});
	const [countries, setCountries] = useState([])
	const [error, setError] = useState('');
	const store = useStore();
	const types = [
		'shoes',
		'clothes',
		'bags',
		'hats',
		'accessories'
	]

	useEffect(() => {
    axios.get(SERVER_URL + '/countries')
      .then((result) => {
       	setCountries(result.data);
      })
      .catch((error) => {
      	console.log(error);
      })
	}, [])

	const addNewBrand = () => {
		axios.post(SERVER_URL + '/brands', {
			name: brand.name,
			types: brand.types,
			country: brand.country,
			description: brand.description
		})
    .then((result) => {
     	setBrand({
       	...brand,
				name: '',
				types: [],
				country: '',
				description: ''
			});
			setError('');
			$('#addNewBrandModal').modal('hide');
       	store.dispatch(loadBrands());
      })
    .catch((error) => {
    		setError(error.response.data);
      }
    )
	}

	const onChangeForm = (e) => { 
    if (e.target.name === 'name')
      setBrand({
      	...brand,
      	name: e.target.value
      })
    else if (e.target.name === 'types')
      setBrand({
      	...brand,
      	types: Array.from(e.target.selectedOptions, option => option.value)
      })
    else if (e.target.name === 'country')
      setBrand({
      	...brand,
      	country: e.target.value
      })
   	else if (e.target.name === 'description')
      setBrand({
      	...brand,
      	description: e.target.value
      })
  }

  const errorStyle = {
  	textAlign: 'center',
    marginTop: '10px',
    color: 'red'
  }

  const addNewBrandModal = <div className="modal fade" id="addNewBrandModal" tabIndex="-1" role="dialog" aria-labelledby="addNewBrandModalLabel" aria-hidden="true">
	  <div className="modal-dialog" role="document">
	    <div className="modal-content">
	      <div className="modal-header">
	        <h5 className="modal-title" id="addNewBrandModalLabel">Add new brand</h5>
	        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div className="modal-body">
	        <div className="from-group">
	        	<label htmlFor="nameInput">Name</label>
	        	<input type="text" id="nameInput" name="name" className="form-control" placeholder="Name" aria-label="Name" value={brand.name} onChange={onChangeForm}/>
	        </div>
	        <div className="form-group">
				    <label htmlFor="typeSelect">Types</label>
				    <select multiple className="form-control" id="typeSelect" name="types" value={brand.types} onChange={onChangeForm}>
				      {types.map(type => (
				      	<option key={type}>{type}</option>
				      	))}
				    </select>
				  </div>
				  <div className="form-group">
				  	<label htmlFor="countrySelect">Country</label>
		    		<select className="form-control" id="countrySelect" name="country" value={brand.country} onChange={onChangeForm}>
				      <option value="">Select Country</option>
				      {countries.map(country => (
				      	<option key={country.code}>{country.name}</option>
				      	))}
					</select>
	        </div>
	        <div className="from-group">
	        	<label htmlFor="descriptionTextArea">Description</label>
	        	<textarea name="description" id="descriptionTextArea" className="form-control" placeholder="Description" aria-label="Description" value={brand.description} onChange={onChangeForm}/>
	      	</div>
	      	<p style={errorStyle}>{error}</p>
	      </div>
	      <div className="modal-footer">
	        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
	        <button type="button" className="btn btn-primary" onClick={addNewBrand}>Add</button>
	      </div>
	    </div>
	  </div>
	</div>

  return (
  	<div>
	    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
	      <a className="navbar-brand" href="#">Brands</a>
	      <div className="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul className="navbar-nav mr-auto">
		      <li className="nav-item active">
		        <a className="nav-link" href="#" data-toggle="modal" data-target="#addNewBrandModal">Add new brand <span className="sr-only">(current)</span></a>
		      </li>
		    </ul>
	  	  </div>
	    </nav>
	    {addNewBrandModal}
	</div>
  )
}
