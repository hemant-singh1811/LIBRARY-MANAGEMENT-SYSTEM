var info = document.getElementById('info')
var search_btn = document.getElementById('check-book')
var warn = document.getElementById('warn');
var student_warn = document.getElementById('student-warn')
var check_student_btn = document.getElementById('check-student')
var student_info = document.getElementById('student-info')
var book_no = document.getElementById('book-no')
var book_results = document.getElementById("book_results");

student_info.style.display = 'none'
info.style.display = 'none'

$('#issue-btn').prop('disabled', true)
var book = '';
var student = '';
var book_name = '';
var student_name = '';

book_no.addEventListener('input', function (e) {
    book_results.innerHTML = "";
    info.style.display = 'none'
    console.log(book_no.value);
    if (book_no.value != "") {
        $.ajax('/get-book', {

            type: "get",
            data: {
                select: 'book_id',
                book: book_no.value
            }
        }).done(function (response) {
            // console.log(typeof (response));
            console.log('response ', response);
            if (response.length == 0) {
                console.log('not found');
                $('#book-no').css('border-color', 'red')
                // $('#book-no').css('box-shadow', 'red')
                // $('#book-no').css('outline', 'red')
                info.style.display = 'none'
                info.style.visibility = 'hidden'
                warn.style.display = 'inline-block'
            }
            else {
                console.log('found');
                $('#book-no').css('border-color', 'black')
                // $('#book-no').css('box-shadow', 'red')
                // $('#book-no').css('outline', 'red')
                // info.style.display = ''
                // info.style.visibility = 'hidden'
                warn.style.display = 'none'
                response.forEach(element => {
                    console.log(element);
                    let li = document.createElement("li");

                    let st = "" + element.book_id + "," + '"' + element.name + '"' + "," + '"' + element.author + '"' +','+'"'+element.isbn+ '"'+"," + '"' + element.publisher + '"' + "," + '"' + element.edition + '"' + "," + element.price + "," + element.pages
                    console.log(st);
                    let click = "get_book(" + st + ")";
                    li.setAttribute('onclick', click);

                    let id = document.createElement("span");
                    let name = document.createElement("span");
                    let author = document.createElement("span");
                    let publisher = document.createElement("span");

                    id.innerText = element.book_id;
                    name.innerText = element.name;
                    author.innerText = element.author;
                    publisher.innerText = element.publisher;

                    li.appendChild(id);
                    li.appendChild(name);
                    li.appendChild(author);
                    li.appendChild(publisher);

                    book_results.appendChild(li);
                });
            }
        })

    }
})


search_btn.onclick = function () {
    book_results.innerHTML = ""
    var book_id = document.getElementById("book-no").value;
    var found = false;
    console.log(book_id);
    $.ajax('/book', {

        type: "get",
        data: {
            book_id: book_id
        }
    }).done(function (response) {
        // console.log('res',response);
        if (response != 'error') {
            response.forEach(element => {
                console.log('bookid', element.book_id);
                if (element.book_id == book_id) {
                    console.log('found');
                    found = true;
                    // console.log('res',response);
                    $('#book-name').val(element.name);
                    $('#book-author').val(element.author)
                    $('#isbn').val(element.isbn)
                    $('#publisher').val(element.publisher)
                    $('#edition').val(element.edition)
                    $('#price').val(element.price)
                    $('#pages').val(element.pages)
                    info.style.display = 'inline-block'
                    info.style.visibility = 'visible'
                    warn.style.display = 'none'
                    book = book_id;
                    // book_name=book_name;
                    $('#book-no').css('outline', 'black')
                    $('#book-no').css('border-color', 'black')
                    $('#book-no').css('box-shadow', 'black')
                    $('#bookname').val(element.name)
                    $('#issue-book').val(book_id)
                    if (book != '' && student != '') {
                        $('#issue-btn').css('background-color', 'black')
                        $('#issue-btn').prop('disabled', false);
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();
                        today = yyyy + '-' + mm + '-' + dd;
                        console.log(today);
                        $('#date').val(today);
                    }
                }

            });
            if (!found) {
                console.log('not found');
                $('#book-no').css('border-color', 'red')
                // $('#book-no').css('box-shadow', 'red')
                // $('#book-no').css('outline', 'red')
                info.style.display = 'none'
                info.style.visibility = 'hidden'
                warn.style.display = 'inline-block'

            }
        }
    })

}


function get_book(book_id, name, author, isbn, publisher, edition, price, pages) {
    console.log("came in get_book()");

    book_results.innerHTML = "";
    $('#book-no').val(book_id)
    $('#book-name').val(name);
    $('#book-author').val(author)
    $('#isbn').val(isbn)
    $('#publisher').val(publisher)
    $('#edition').val(edition)
    $('#price').val(price)
    $('#pages').val(pages)
    info.style.display = 'inline-block'
    info.style.visibility = 'visible'
    warn.style.display = 'none'
    book = book_id;
    // book_name=book_name;
    $('#book-no').css('outline', 'black')
    $('#book-no').css('border-color', 'black')
    $('#book-no').css('box-shadow', 'black')
    $('#bookname').val(name)
    $('#issue-book').val(book_id)
    if (book != '' && student != '') {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today);
        $('#date').val(today);
    }
}


check_student_btn.onclick = function () {
    // student_info.style.display='inline-block'
    var student_id = document.getElementById("student-id").value;
    var found = false;
    console.log(student_id);
    $.ajax('/student', {

        type: "get",
        data: {
            student_id: student_id
        }
    }).done(function (response) {
        // console.log('res',response);
        if (response != 'error') {
            response.forEach(element => {
                console.log('student id', element.student_id);
                if (element.student_id == student_id) {
                    console.log('found');
                    found = true;
                    var dob = element.DOB;
                    dob = dob.substring(0, 10)
                    // console.log('date of birth',dob);
                    // console.log('date of birth',element.DOB);
                    // console.log('res',response);
                    $('#student-name').val(element.name);
                    $('#father-name').val(element.father_name)
                    $('#dob').val(dob)
                    $('#course').val(element.course)
                    $('#year').val(element.year)
                    $('#semester').val(element.semester)
                    student_info.style.display = 'inline-block'
                    student_info.style.visibility = 'visible'
                    student_warn.style.display = 'none'
                    $('#student-id').css('outline', 'black')
                    $('#student-id').css('border-color', 'black')
                    $('#student-id').css('box-shadow', 'black')
                    student = student_id;
                    student_name = student_name;
                    $('#studentname').val(element.name);
                    $('#issue-student').val(student_id);

                    if (book != '' && student != '') {
                        $('#issue-btn').prop('disabled', false);
                        $('#issue-btn').css('background-color', 'black')
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();
                        today = yyyy + '-' + mm + '-' + dd;
                        console.log(today);
                        $('#date').val(today);
                    }
                }

            });
            if (!found) {
                console.log('not found');
                $('#student-id').css('border-color', 'red')
                $('#student-id').css('box-shadow', 'red')
                $('#student-id').css('outline', 'red')
                student_info.style.display = 'none'
                student_warn.style.display = 'inline-block'

            }
        }
    })
}



