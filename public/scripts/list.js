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
      displayTasks();
      $('#descIn').val("");
    }//success
  });//ajax object
});//addTask onclick





});//docready

//these need to take paramaters---------------------------------<<<
function updateTask(data) {
  console.log('hello from updateTask function',data);
}//updateTask
function deleteTask(data){
console.log('hello from deleteTask function', data);
}//deleteTask

function displayTasks(){
  var container= '';
  $('#outputDiv').empty();
  container= $('<div />').addClass('container');
  $.ajax({
    "type":"GET",
    "url": "/displayTasks",
    "success":function(data){
      console.log('in success',data);
      for (var i = 0; i < data.length; i++) {
        var button= $('<button />',{
          html:'X',
          class:'deleteButton',
          id:'btn'+data[i].id,
          click:function(){deleteTask(this.id);}
        });//button
        var box= $('<input />',{
          type:'checkbox',
          class:'checkBox',
          id: 'cb'+data[i].id,
          click:function(){updateTask(this.id);}
        })//box
        console.log(box);
        var textToDom=$('<p />',{
          html:data[i].description,
          class:'textToDom',
          id:'task'+data[i].id,
          status:data[i].status
        });//textToDom object
        container.append(box).append(textToDom).append(button);
        $('#outputDiv').append(container);
        console.log(textToDom);
      }//for loop
    }//success function
  });//ajax object
}
// html(data[i].description+' '+data[i].status).attr('id','item-'+data[i].id);
// '<input type = "checkbox" id = cb'+data[i].id+'>';
