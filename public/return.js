var returnform = document.getElementById('returnform')
var bookid = document.getElementById('bookid')
var book_details = document.getElementById("book_details")
var data;
var charges;
$('#fine').val(0);

$('#check-student').click(function () {

  var books = document.getElementById('books')
  $('#returnform').css('display', 'none')
  books.innerHTML = ""
  var student_id = $('#student-id').val();
  console.log(student_id);
  $.ajax('/return-book', {

    type: "get",
    data: {
      student_id: student_id
    }
  }).done(async function (response) {
    data = response
    book_details.innerHTML = ""
    console.log(response);
    var found = false;
    let tr = document.createElement('tr')
    var th = document.createElement('th')
    th.innerText = 'book id';
    var th1 = document.createElement('th')
    th1.innerText = 'book name';
    var th2 = document.createElement('th')
    th2.innerText = 'issue date';
    tr.appendChild(th)
    tr.appendChild(th1)
    tr.appendChild(th2)
    book_details.appendChild(tr)

    await response.forEach(element => {
      let tr = document.createElement('tr')
      if (element.student_id == student_id) {
        found = true;
        var td = document.createElement('td')
        td.innerText = element.book_id;
        let str = 'book(' + element.book_id + ')'
        console.log(str);
        td.setAttribute('onclick', str)
        var td1 = document.createElement('td')
        td1.innerText = element.book_name;
        var td2 = document.createElement('td')
        td2.innerText = element.issue_date;
        tr.setAttribute('onclick', str)
        tr.style.cursor = 'pointer';
        tr.appendChild(td)
        tr.appendChild(td1)
        tr.appendChild(td2)
      }
      book_details.appendChild(tr)
    })



    await response.forEach(element => {

      if (element.student_id == student_id) {
        found = true;
        $('#student-warn').css('display', 'none')
        $('#student-name').text(element.student_name);
        $('#book-name').val(element.book_name);
        $('#book-id').val(element.book_id);

        $('#student-name').val(element.student_name);
        $('#student_id').val(element.student_id);
        $('#student_name').val(element.student_name);
        $('#issue_date').val(element.issue_date);
        $('#book_id').val(element.book_id);
        $('#details').css('display', 'contents')

        $('#student-id').css('border-color', '#1890ff')
      }
    });

    if (!found) {
      $('#student-warn').css('display', 'block')
      $('#details').css('display', 'none')
      $('#student-id').css('border-color', 'red')
    }
  })
})

function book(id) {
  $('#bookid').val(id)
  var bookid = $('#bookid').val()
  var fine = 0;
  console.log('you click the btn book function is called', bookid);
  $('#fine').val(0);
  var found = false;
  data.forEach(element => {
    if (element.book_id == bookid && !found) {
      found = true;

      console.log('book found');

      $('#bookname').text(element.book_name);
      $('#book_name').val(element.book_name);
      var dob = element.issue_date;
      console.log('issue date', element.issue_date);
      dob = dob.substring(0, 10)
      console.log('issue date', dob);
      var issuemm = parseInt(dob.substring(5, 7))
      var issuedd = parseInt(dob.substring(8, 10))
      console.log('issue date', issuedd);
      console.log('issue mounth', issuemm);

      const today = new Date();
      var dd = parseInt(String(today.getDate()).padStart(2, '0'));
      var mm = parseInt(String(today.getMonth() + 1).padStart(2, '0'))
      console.log('cuurent dd', dd);
      console.log('cuurent mm', mm);
      //    console.log(dob);
      fine = (mm - issuemm) * 30
      //  if(issuedd<dd)
      console.log('month', fine);
      fine += dd - issuedd;
      //  else
      console.log('date ', fine);
      //  fine+=issuedd-dd;
      if (fine > 15)
        fine = fine * 5;
      else fine = 0;

      charges = fine;
      $('#fine').val(fine);
      $('#charge').val(fine);
      $('#returnform').css('display', 'inline-block')
      return;;
      //    returnform.style.visibility="visible"
    }
  });
}

$('#checkbtn').click(function () {
  var fine = 0;

  $('#fine').val(0);
  console.log('you click the btn');
  var bookid = $('#bookid').val()
  console.log(bookid);
  var found = false;
  data.forEach(element => {
    if (element.book_id == bookid && !found) {
      found = true;
      console.log('book found');
      $('#bookid').css('border-color', '1890ff')
      $('#bookname').text(element.book_name);
      $('#book_name').val(element.book_name);
      var dob = element.issue_date;
      console.log('issue date', element.issue_date);
      dob = dob.substring(0, 10)
      console.log('issue date', dob);
      var issuemm = parseInt(dob.substring(5, 7))
      var issuedd = parseInt(dob.substring(8, 10))
      console.log('issue date', issuedd);
      console.log('issue mounth', issuemm);

      const today = new Date();
      var dd = parseInt(String(today.getDate()).padStart(2, '0'));
      var mm = parseInt(String(today.getMonth() + 1).padStart(2, '0'))
      console.log('cuurent dd', dd);
      console.log('cuurent mm', mm);
      //    console.log(dob);
      fine = (mm - issuemm) * 30
      //  if(issuedd<dd)
      console.log('month', fine);
      fine += dd - issuedd;
      //  else
      console.log('date ', fine);
      //  fine+=issuedd-dd;
      if (fine > 15)
        fine = fine * 5;
      else fine = 0;

      charges = fine;
      $('#fine').val(fine);
      $('#charge').val(fine);
      $('#returnform').css('display', 'inline-block')
      return;;
      //    returnform.style.visibility="visible"
    }
  });

  if (!found) {
    $('#bookid').css('border-color', 'red')
    $('#returnform').css('display', 'none')
  }
})

returnform.addEventListener('submit', (e) => {
  var str = 'Make Sure you collect the fine : ' + charges;
  if (confirm(str) == false)
    e.preventDefault();
  else {
    alert('book is successfully return')
  }

})

function booke(id) {
  console.log('you click the ');
  console.log(id);
  $('#bookid').val(id)
  book()
}