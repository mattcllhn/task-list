console.log('js sourced');
$(function(){
  console.log('jq docready');
displayTasks();







});//docready
function updateTask() {
  console.log('hello from updateTask function');
}
function deleteTask(){
console.log('hello from deleteTask function');
}

function displayTasks(){
  var container= $('<div />').addClass('container');
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
          click:function(){deleteTask(button.id);}
        });//button
        var box= $('<input />',{
          type:'checkbox',
          class:'checkBox',
          id: 'cb'+data[i].id,
          click:function(){updateTask(box.id);}
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
