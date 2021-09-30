var table=document.getElementById('table')
var notify_all_btn=document.getElementById('notify-all-btn')
var current_issue;

$.ajax('/issue-data',{
    type:'get',

}).done(async function(res){
      console.log(res);
      current_issue=res;
      res.forEach(element => {
         console.log(element); 
        let tr=document.createElement('tr') 
        let td1=document.createElement('td');
        let td2=document.createElement('td');
        let td3=document.createElement('td');
        let td4=document.createElement('td');
        let td5=document.createElement('td');
        let td6=document.createElement('td');
        let td7=document.createElement('td');
        let td8=document.createElement('td');
        
         td1.innerText=element.book_id;
         td2.innerText=element.book_name;
         td3.innerText=element.student_id;
         td4.innerText=element.student_name;
         td5.innerText=element.course;
         td6.innerText=element.branch;
         td7.innerText=element.issue_date;
         let button=document.createElement('button')
         button.setAttribute('id',element.student_id)
          button.textContent="Notify him"
          let str='send('+'"'+element.book_id+'"'+","+'"'+element.book_name+'"'+","+'"'+element.student_id+'"'+","+'"'+element.student_name+'"'+","+'"'+element.issue_date+'"'+')';
          button.setAttribute('onclick',str) 
         td8.appendChild(button)

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
     table.appendChild(tr)
      });

})

notify_all_btn.onclick=async function(){
console.log('you click on');
  await current_issue.forEach(element => {
         send(element.book_id,element.book_name,element.student_id,element.student_name,element.issue_date)
   });
   notify_all_btn.disabled=true;
}

async function send(book_id,book_name,student_id,student_name,issue_date){
    console.log('you click the btn');
    document.getElementById(student_id).disabled=true
   await $.ajax('/notify',{
        type:'post',
        data:{
          book_id:book_id,
          book_name:book_name,
          student_id:student_id,
          student_name:student_name,
          issue_date:issue_date
        }
    }).done(async function(res){
        if(res!='error'){
           document.getElementById(student_id).textContent='Notified'
           document.getElementById(student_id).disabled=true
        }else{
            document.getElementById(student_id).textContent='Notify him'
            document.getElementById(student_id).disabled=false
        }
    })
}


