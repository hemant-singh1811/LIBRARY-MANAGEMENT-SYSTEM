var btn=document.getElementById('btn')
var form=document.getElementById('form')
var book_id=document.getElementById('book_id')
var error=document.getElementById('error')
var element;

window.addEventListener('load', function() {
    $.ajax('/book-id',{
        type:"get",
     })
    .done(function(res){
        element=res;
    })
})
 
form.addEventListener('click',(e)=>{
    var id=book_id.value;
    var found=false;
    console.log('book-id :',id);
        element.forEach(element => {
           if(element.book_id==id){
            found=true;
            $('#error').css('display','block')
            e.preventDefault();

        }
           if(!found){
            $('#btn').prop('disabled', false);
           $('#error').css('display','none')
           }
        });
  
    btn.onclick=function(){
        console.log(error.style.display);
        if(found){
            // document.getElementById("form").action = "";
        e.preventDefault();
        error.style.border='1px red solid'
    }
    else{
        // document.getElementById("form").action = "/add-book";

        console.log('you click the button');
    }
    }

})


