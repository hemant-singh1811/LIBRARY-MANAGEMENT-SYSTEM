var book=document.getElementById('book')
var book_results=document.getElementById("book_results");
var book_search_data;
var select="";
$('#select').click(function(){
  var search_by=$('#select').val()
  if(search_by!=1){
    
  $('#error').css("display", "none")
  $('#select').css("border","")
  console.log(search_by);
  select=search_by;
  if(search_by=="book_name"){
    select='name'
    $('#book').val("");
    $('#book').attr('type','text');
  }else{
    
    $('#book').val("");
    $('#book').attr('type','number');
  }
  var book=$('#book')
  var str="Enter the "+search_by+" for searching"
  book.attr("placeholder", str);
  }
  else{
    select=""
  }
})



book.addEventListener('input',(e)=>{
  book_results.innerHTML="";
  var search=book.value;
  console.log(search);
  // console.log('you click it...');
  if(select!="" && search!=""){
  $.ajax('/get-book', {

    type: "get",
    data: {
        select:select,
        book:search
    }
  }).done(async function (response) {
    console.log(response);
    book_search_data=response;
    response.forEach(element => {
      let li = document.createElement("li");
      let id = document.createElement("span");
      let name = document.createElement("span");
      let author  = document.createElement("span");
      let publisher = document.createElement("span");
      let edition = document.createElement("span");
      let price = document.createElement("span");
      let pages = document.createElement("span");
      id.innerText=element.book_id;
      name.innerText=element.name;
      author.innerText=element.author;
      publisher.innerText=element.publisher;
      edition.innerText=element.edition;
      price.innerText=element.price;
      pages.innerText=element.pages;
      li.appendChild(id);
      li.appendChild(name);
      li.appendChild(author);
      li.appendChild(publisher);
      li.appendChild(edition);
      li.appendChild(price);
      li.appendChild(pages);
      book_results.appendChild(li);
    });

  })
}
if(select==""){
  $('#error').css("display", "block")
  $('#select').css("border","2px red solid")
}
})

