console.log('js sourced');
$(function(){
  console.log('jq docready');
displayTasks();

//listens for click, adds info to task_list table, calls displayTasks
$('#addTask').on('click',function(){
  var objectToSend= {
    "description":$('#descIn').val(),
    "status":false
  };//objectToSend
  $.ajax({
    type:"POST",
    url: "/addTask",
    data:objectToSend,
    success:function(data){
      console.log('in addTask ajax success', data);
      $('#descIn').val("");
      displayTasks();
    }//success
  });//ajax object
});//addTask onclick
});//docready

//these need to take paramaters---------------------------------<<<
function updateTask(data) {
  console.log('hello from updateTask function',data);
  var objectToSend= {
    "id":data
  };
  console.log(objectToSend);
console.log('hello from updateTask function', data);
    $.ajax({
      type:"PUT",
      url: '/updateTask',
      data:objectToSend,
      success:function(data){
        console.log('updateTask success',data);
        displayTasks();
      }//success
    });//ajax call
//deletes from database, calls displayTasks
}//updateTask
function deleteTask(data){
  var objectToSend= {
    "id":data
  };
  console.log(objectToSend);
console.log('hello from deleteTask function', data);
    $.ajax({
      type:"DELETE",
      url: '/deleteTask',
      data:objectToSend,
      success:function(data){
        console.log('deleteTask success',data);
        displayTasks();
      }//success
    });//ajax call
}//deleteTask

//ajax call to get data, create and append each element and display to DOM
function displayTasks(){
  $('#outputDiv').empty();
  var container= $('<div />').addClass('container');

  $.ajax({
    "type":"GET",
    "url": "/displayTasks",
    "success":function(data){
      console.log('in success',data);
      for (var i = 0; i < data.length; i++) {
        var box= '';
        var button= $('<button />',{
          html:'X',
          class:'deleteButton',
          id:data[i].id,
          click:function(){deleteTask(this.id)}
        });//button
        if(data[i].status===true){
          console.log('in the if');
        box= $('<input />',{
          type:'checkbox',
          class:'checkBox',
          checked:'checked',
          id: data[i].id,
          click:function(){updateTask(this.id);}
        });//box
      }//if
      else{
        console.log('in the else');
        box= $('<input />',{
          type:'checkbox',
          class:'checkBox',
          // checked:'checked',
          id: data[i].id,
          click:function(){updateTask(this.id);}
        });//box

      }
        console.log(box);
        var textToDom=$('<p />',{
          html:data[i].description,
          class:'textToDom',
          id:'task'+data[i].id,
          status:data[i].status
        });//textToDom object
        // if(data[i].status == 'true'){container.addClass('done')}


        container.append(button).append(box).append(textToDom);
        $('#outputDiv').append(container);
      }//for loop
    }//success function
  });//ajax object
}//displayTasks


// html(data[i].description+' '+data[i].status).attr('id','item-'+data[i].id);
// '<input type = "checkbox" id = cb'+data[i].id+'>';
