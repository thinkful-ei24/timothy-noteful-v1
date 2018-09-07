/* global $ */
'use strict';

const api = {

  update: function(id, obj){
    return $.ajax({
      type: 'PUT',
      url: `/api/notes/${id}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
    });
  },

  search: function (query) {
    return $.ajax({
      type: 'GET',
      url: '/api/notes/',
      dataType: 'json',
      data: query
    });
  },

  details: function (id) {
    return $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/api/notes/${id}`,
    });
  },

  remove: function(id){
    return $.ajax({
      type: 'DELETE', 
      url: `/api/notes/${id}`,
      dataType: 'json'
    });
  },
  
  create: function(obj){
    return $.ajax({
      type: 'POST',
      url: '/api/notes',
      dataType: 'json',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify(obj)
    });
  }

};
