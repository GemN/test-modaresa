import React, { useState, useEffect } from 'react'
import { useStore, useSelector } from 'react-redux';
import { loadBrands } from '../actions/brands'
import axios from 'axios';
import $ from 'jquery';
import { SERVER_URL } from '../global';

export const Brands = (props) => {
  const [brandToRemove, setBrandToRemove] = useState(null);
  const store = useStore();
  let brands = [];

  brands = useSelector(state=>state.brands);

  useEffect(() => {
    store.dispatch(loadBrands());
  }, [])

  const removeBrandConfirmation = (brand) => {
    setBrandToRemove(brand);
    $('#removeBrandModal').modal('show');
  }

  $('#remove-button').on('click', function(){
    $("#removeBrandModal").modal('hide');
    removeBrand();
    setBrandToRemove(null);
  });

  const removeBrand = () => {
    const brand = brandToRemove;
    if (brand !== null) {
      axios.delete(SERVER_URL + '/brands', {
        data: {
          brandId: brand._id
        }
      }).then(function(res) {
        store.dispatch(loadBrands());
      }).catch(function(error) {
        console.log(error);
      })
    }
  }

  const tableStyle = {
    width: '100%',
    margin: '30px'
  }

  const removeBrandModal = <div className="modal fade bd-example-modal-sm" id="removeBrandModal" tabIndex="-1" role="dialog" aria-labelledby="removeBrandModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-sm">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="removeBrandModalLabel">Confirm delete ?</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button id="remove-button" type="button" className="btn btn-danger">Confirm</button>
        </div>
      </div>
    </div>
  </div>

  return (
    <main>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Types</th>
            <th>Country</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {brands.map(brand => (
          <tr key={brand._id}>
            <td>{brand.name}</td>
            <td>
              {brand.types.map(type => (
                <span key={type}>{type} </span>
                ))}
            </td>
            <td>{brand.country}</td>
            <td>{brand.description}</td>
            <td>
              <button type="button" className="btn btn-danger" onClick={removeBrandConfirmation.bind(this, brand)}>Remove</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {removeBrandModal}
    </main>
  )
}
