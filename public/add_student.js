var student_id=document.getElementById('student_id')
var form =document.getElementById('form')

var sdata=[];

window.addEventListener('load', function() {
    console.log('this is called');
    $.ajax('/all_student',{
        type:"post" ,
     })
    .done(function(res){
        console.log('response :',res);
         sdata=res;
    })
})

form.addEventListener('click',async (e)=>{
   if(sdata!='error'){
    var id=student_id.value;
    var found=false;
    console.log('student_id  :',id);
   await sdata.forEach(element => {
        if(element.student_id==id){
         found=true;
         $('#error').css('display','block')
         e.preventDefault();

     }
        if(!found){
         $('#btn').prop('disabled', false);
        $('#error').css('display','none')
        }
     });
 
   }
})
