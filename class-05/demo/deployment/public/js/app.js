'use strict';
$(document).ready(function(){
    $.ajax('data/301d3.json' , {method:'GET'} , {dataType : 'JSON'})
     .then(data => {
         data.forEach(student => {
             let name = $(`<div>${student.student_name}</div>`);
             $('#grid-elm').append(name);
         });
     });
});