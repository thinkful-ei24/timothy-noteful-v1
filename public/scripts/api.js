/* global $ */
'use strict';

const api = {

  update: function(id, obj, callback){
    $.ajax({
      type: 'PUT',
      url: `/api/notes/${id}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
      success: callback
    });
  },

  search: function (query, callback) {
    $.ajax({
      type: 'GET',
      url: '/api/notes/',
      dataType: 'json',
      data: query,
      success: callback
    });
  },

  details: function (id, callback) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/api/notes/${id}`,
      success: callback
    });
  },

  remove: function(id, callback){
    return $.ajax({
      type: 'DELETE', 
      url: `/api/notes/${id}`,
      dataType: 'json',
      success: callback
    });

  }

};
