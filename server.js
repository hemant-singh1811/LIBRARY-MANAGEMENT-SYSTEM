const express = require('express')
const { sendtext } = require('./phonetext')
const { sendMail } = require('./nodemail')
const { select_student, select_book, issue, select_student_info, add_student_info, student_info, add_student, issue_details, get_book, return_book, book_id, add_book, issue_data } = require('./DB/db')
const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use('/', (express.static(__dirname + '/public')))

server.use('/book-issue', (express.static(__dirname + '/public/issue.html')))

server.use('/add-book', (express.static(__dirname + '/public/add_book.html')))

server.use('/add-student', (express.static(__dirname + '/public/add_student.html')))

server.use('/return', (express.static(__dirname + '/public/returnsection.html')))

server.use('/search_book', (express.static(__dirname + '/public/search_book.html')))

server.use('/stats', (express.static(__dirname + '/public/stats.html')))


server.get('/book', (req, res) => {
    var book_id = req.query.book_id;
    select_book(book_id).then((data) => {
        res.send(data);
    }).catch((e) => {
        res.send(e)
    })
})

server.post('/all_student', async (req, res) => {
    console.log('came here');
    await student_info().then((data) => {
        console.log(data);
        res.send(data);
    })
        .catch((error) => {
            console.error('error');
            res.send('error')
        })

})

server.get('/student', (req, res) => {

    var student_id = req.query.student_id;
    select_student(student_id).then((data) => {
        res.send(data);
    }).catch((e) => {
        res.send(e)
    })

})

server.get('/issuing', async (req, res) => {
    console.log(req.query);
    var student_name = req.query.student_name;
    var book_name = req.query.book_name;
    var student_id = req.query.student_id;
    var book_id = req.query.book_id;
    var issuedate = req.query.date;
    issuedate = issuedate.toString();
    console.log(issuedate);
    console.log(student_id, student_name, book_id, book_name, issuedate);
    await issue(student_id, student_name, book_id, book_name, issuedate).then((d) => {
        console.log('book is issue to ', student_name, ' on ', issuedate);
        var mess = 'book is issue to ' + '"' + student_name + '"';
        res.send(mess);

    }).catch((e) => {
        console.log(e);
        res.send('error')
    })
    var student_mail = '';
    var student_phone = '91';
    var subject = "New Book Issued"
    var mailmessage = `Hi! ${student_name} (enrollement no. ${student_id}),
                       you issue a new book detail as book name="${book_name}", book id ="${book_id}" on "${issuedate}",
                        
                       date of return will be on 15 days after the issue of date (i.e ${issuedate}).
                        
                        if you not issue any book then contact to libaray management`;
    var mail_message = `Hi! ${student_name} (enrollement no. ${student_id}),
    you issue a new book detail as book name="${book_name}", book id ="${book_id}" on "${issuedate}",  
    date of return will be on 15 days after the issue of date (i.e ${issuedate}).
     if you not issue any book then contact to library management`;
    await select_student_info().then(async (data) => {
        await data.forEach(element => {
            if (element.student_id == student_id) {
                student_mail = element.email;
                student_phone += element.phone_no;
            }
        });
        await sendMail(student_mail, mailmessage, subject).then((data) => {
            console.log('mail sent success ');
            console.log(data);
        }).catch((err) => {
            console.log('error occur during mail sending ', err);
        })
        await sendtext(student_phone, mail_message).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log('error occur during phone message sending');
        })
    })

    console.log('new issue a book');

})

server.get('/return-book', (req, res) => {
    var student_id = req.query.student_id;
    issue_details().then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

server.get('/returned', async (req, res) => {
    console.log(req.query);
    var student_name = req.query.student_name;
    var book_name = req.query.book_name;
    var student_id = req.query.student_id;
    var book_id = req.query.book_id;
    var issue_date = req.query.issue_date;
    var fine = req.query.fine;
    var today = new Date()
    console.log(book_name, student_id, book_id, issue_date, fine);
    // res.send(student_id)
    await return_book(book_id, student_id).then((data) => {
        console.log(data);
        res.redirect('/return')
    }).catch((e) => {
        console.log(e);
    })
    var mailmessage = `Hi! ${student_name} (enrollement no. ${student_id}),
                       you are successfully return the book on ${today} book name="${book_name}", book id ="${book_id}",  date of issue= "${issue_date}",
                        
                        late returned charges fine =${fine};
                
                        if you not return any book then contact to libaray management`;
    var student_mail = '';
    var student_phone = '91';
    var subject = "Book Returned"
    await select_student_info().then(async (data) => {
        data.forEach(element => {
            if (element.student_id == student_id) {
                student_mail = element.email;
                student_phone += element.phone_no;
            }
        });
        sendMail(student_mail, mailmessage, subject).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log('error occur during mail sending ', err);
        })
        sendtext(student_phone, mailmessage).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log('error');
        })
    })



})

server.get('/book-id', async (req, res) => {
    await book_id().then((data) => {
        res.send(data);
    }).catch((e) => {
        res.send(e)
    })

})

server.post('/add-book', async (req, res) => {
    let book_id = req.body.book_id.trim();
    let book_name = req.body.book_name.trim();
    let Author = req.body.Author.trim();
    let isbn = req.body.isbn.trim();
    let publisher = req.body.publisher.trim();
    let edition = req.body.edition.trim();
    let price = req.body.price.trim();
    let pages = req.body.pages.trim();
    console.log(req.body);
    let mess = "";
    //  var str=""+book_id +" "+book_name +" "+ isbn+" "+publisher+" "+edition +" "+price+" "+pages
    await add_book(book_id, book_name, Author, isbn, publisher, edition, price, pages).then((data) => {
        mess = data;
    }).catch((err) => {
        mess = err;
    })
    await res.send(mess)
    console.log(book_id, book_name, isbn, publisher, edition, price, pages);

})

server.get('/get-book', async (req, res) => {
    let search_by = req.query.select;
    let book = req.query.book;
    await get_book(search_by, book).then((data) => {
        res.send(data)
    })
        .catch((err) => {
            res.send(err)
        })
    // res.send(search_by)

})

server.post('/add-student', async (req, res) => {
    let student_id = req.body.student_id.trim().replace(/\s+/g, '');
    let name = req.body.name.trim().replace(/\s+/g, '');
    let father_name = req.body.father_name.trim().replace(/\s+/g, '');
    let dob = req.body.dob.trim();
    let course = req.body.course.trim().replace(/\s+/g, '');
    let year = req.body.year.trim().replace(/\s+/g, '');
    let semester = req.body.semester.trim().replace(/\s+/g, '');
    let session = req.body.session.trim().replace(/\s+/g, '');
    let email = req.body.email.trim().replace(/\s+/g, '');
    let phone_no = req.body.phone_no.trim().replace(/\s+/g, '');

    let str = student_id + "," + name + "," + father_name + "," + dob + "," + course + "," + year + "," + semester + "," + session + "," + email + "," + phone_no;

    await add_student(student_id, name, father_name, dob, course, year, semester, session)
        .then((data) => {
        })
    await add_student_info(student_id, email, phone_no).then((data) => {
        res.send(name + " added successfully")
        return;
    })
    console.log(str);
    res.send('error');
})

server.get('/issue-data', async (req, res) => {

    await issue_data().then((data) => {
        res.send(data);

    }).catch((e) => {
        res.send(e);
    })

})

server.post('/notify', async (req, res) => {
    let book_id = req.body.book_id;
    let book_name = req.body.book_name;
    let student_id = req.body.student_id;
    let student_name = req.body.student_name;
    let issue_date = req.body.issue_date;

    var mailmessage = `Hi! ${student_name} (enrollement no. ${student_id}),
                       you had issue the book on ${issue_date} book name="${book_name}", book id ="${book_id}",
                       ,date of return will be on 15 days after the issue of date (i.e ${issue_date}).
                        
                       please return book as soon so that fine will be minimum.                      
                                                
                        if you not issue any book then contact to libaray management`
    var student_mail = '';
    var student_phone = '91';
    var subject = "Library Book Alert"
    var send=false;
    await select_student_info().then(async (data) => {
       await data.forEach(element => {
            if (element.student_id == student_id) {
                student_mail = element.email;
                student_phone += element.phone_no;
            }
        });
       await sendMail(student_mail, mailmessage, subject).then((data) => {
            console.log(data);
            send=true;
        }).catch((err) => {
            console.log('error occur during mail sending ', err);
        })
      await sendtext(student_phone, mailmessage).then((data) => {
            console.log(data);
            send=true;
        }).catch((err) => {
            console.log('error');
        })
    })
     if(send)
    res.send('success')
    else
    res.send('error')

})

server.listen(7777, function () {
    console.log('server is running at 7777');
})