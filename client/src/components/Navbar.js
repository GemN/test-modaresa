import React, { useState } from 'react'
import { useStore } from 'react-redux';
import { loadBrands } from '../actions/brands'
import axios from 'axios';
import $ from "jquery";

export const Navbar = () => {
	const [brand, setBrand] = useState({
		name: '',
		type: [],
		country: '',
		description: ''
	});
	const [error, setError] = useState('');
	const store = useStore();

	const addNewBrand = () => {
		axios.post("http://localhost:3000/brands", {
			name: brand.name,
			type: brand.type,
			country: brand.country,
			description: brand.description
		})
      .then((result) => {
       	setBrand({
       		...brand,
					name: '',
					type: [],
					country: '',
					description: ''
				});
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
    else if (e.target.name === 'type')
      setBrand({
      	...brand,
      	type: Array.from(e.target.selectedOptions, option => option.value)
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
	    <div className="modal fade" id="addNewBrandModal" tabIndex="-1" role="dialog" aria-labelledby="addNewBrandModalLabel" aria-hidden="true">
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
		        	<input type="text" id="nameInput" name="name" className="form-control" placeholder="Name" aria-label="Name" onChange={onChangeForm}/>
		        </div>
		        <div className="form-group">
					    <label htmlFor="typeSelect">Type</label>
					    <select multiple className="form-control" id="typeSelect" name="type" onChange={onChangeForm}>
					      <option>shoes</option>
					      <option>clothes</option>
					      <option>bags</option>
					      <option>hats</option>
					      <option>accessories</option>
					    </select>
					  </div>
					  <div className="form-group">
					  	<label htmlFor="countryInput">Name</label>
		        	<input type="text" id="countryInput" name="country" className="form-control" placeholder="Country" aria-label="Country" onChange={onChangeForm}/>
		        </div>
		        <div className="from-group">
		        	<label htmlFor="descriptionTextArea">Description</label>
		        	<textarea name="description" id="descriptionTextArea" className="form-control" placeholder="Description" aria-label="Description" onChange={onChangeForm}/>
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
	</div>
  )
}
