const mysql=require('mysql2');
const { resolveContent } = require('nodemailer/lib/shared');

const connection=mysql.createConnection({
    host: 'localhost',
    database: 'mytestdb',
    user: 'myuser',
    password: 'mypass'
})

function createbook_section() {
    return new Promise((resolve, reject) => {
        connection.query(`
        create table if not exists book_section(
            book_id Integer auto_increment primary key,
            name varchar(90),
            author varchar(40),
            isbn varchar(40),
            publisher varchar(60),
            edition Integer,
            price Integer,
            pages Integer(10)
            )`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve('book table created successfully');
            }
        })
        //    connection.close();
    })
}

// createbook_section().then(function(d){
//     console.log(d);
// }).catch((e)=>{
//   console.error(e);
// })


function create_student_section(){
    return new Promise(function(resolve,reject){
        connection.query(`
        create table if not exists student_section(
            student_id Integer auto_increment primary key not null,
            name varchar(90) not null,
            father_name varchar(40) not null,
            DOB date not null,
            course varchar(60) not null,
            year varchar(50) not null,
            semester varchar(30) not null,
            session varchar(50) not null)
            `,function(err,result){
            if(err)
            reject(err)
            else
            resolve('student section is created successfully')
        })
    })
}

// create_student_section().then((d)=>{
//     console.log(d);
// }).catch((e)=>{
//     console.error(e);
// })


function create_student_info(){
    return new Promise(function(resolve,reject){
        connection.query(`
        create table if not exists student_info(
            student_id Integer auto_increment primary key not null,
            email varchar(90) not null,
            phone_no bigint(10) UNSIGNED not null ,
            foreign key(student_id) references student_section(student_id)
            )
        `,function(err,result){
            if(err)
            reject(err)
            else
            resolve('student info table created successfully')
        })
    })
}

// create_student_info().then((d)=>{
//         console.log(d);
//     }).catch((e)=>{
//         console.error(e);
//     })
    

function select_book(book_id){
    return new Promise(function(resolve,reject){
        connection.query(`
        select *from book_section;
        `,function(err,result){
            if(err){
               console.error(err);
                reject('error')
            }else{
                resolve(result)
            }
        })
    })
}

function select_student(student_id){
    return new Promise(function(resolve,reject){
        connection.query(`
        select *from student_section;
        `,function(err,result){
            if(err){
               console.error(err);
                reject('error')
            }else{
                resolve(result)
            }
        })
    })
}

function current_issue(){
    return new Promise(function(resolve,reject){
        connection.query(`
        create table if not exists issue_section(
         student_id Integer auto_increment not null,
           student_name varchar(90) not null,
            book_id Integer not null,
            book_name varchar(90) not null,
            issue_date varchar(90) not null,
            foreign key(student_id) references student_section(student_id),
            foreign key(book_id) references book_section(book_id)
            
            )
        `,function(err,result){
            if(err)
            reject(err)
            else
            resolve()
        })
    })
}

// current_issue().then((d)=>{
//     console.log('table is created successfully');
// }).catch((e)=>{
//     console.error(e);
// })

function issue(student_id,student_name,book_id,book_name,date){
    console.log('inside the db issue section date is = ',date);
    return new Promise(function(resolve,reject){
        connection.query(`
        insert into issue_section values(${student_id},'${student_name}',${book_id},'${book_name}','${date}')
        `,function(err,result){
            if(err)
            reject(err)
            else
            resolve(result)
        })
    })
}

function select_student_info(){
    return new Promise(function(resolve,reject){
        connection.query(`
        select * from student_info;
        `,function(err,result){
            if(err)
            reject('error')
            else
            resolve(result)
        })
    })
}

function student_info(){
    return new Promise(function(resolve,reject){
        connection.query(`
        select * from student_section;
        `,function(err,result){
            if(err)
            reject('error')
            else
            resolve(result)
        })
    })
}
// select_student_info().then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err);
// })

function issue_details(){
    return new Promise(function(resolve,reject){
        connection.query(`
        select *from issue_section;
        `,function(err,result){
            if(err)
            reject('error')
            else
            resolve(result)
        })
    })
}

function return_book(book_id,student_id){
    return new Promise(function(resolve,reject){
        connection.query(`
        DELETE FROM issue_section WHERE book_id=${book_id} AND student_id=${student_id};
        `,function(err,result){
            if(err)
            reject('error')
            else
            resolve('entry deleted successfully')
        })
    })

}

// return_book('51048','039').then((d)=>{
//     console.log(d);
// }).catch((e)=>{
//     console.error(e);
// })
// issue_details().then((data)=>{
//       console.log(data);
// }).catch((err)=>{
//    console.log(err);
// })

function book_id(){
    return new Promise(function(resolve,reject){
        connection.query(`
        select book_id from book_section;
        `,function(err,result){
            if(err)
            reject('error')
            else
            resolve(result)
        })
    })
}
// book_id().then((data)=>{
//     console.log(data);
// }).catch((e)=>{
//     console.log(e);
// })

function add_book(book_id,book_name,author,isbn,publisher,edition,price,pages){
   
    return new Promise(function(resolve,reject){
        connection.query(
        'insert into book_section(book_id,name,author,isbn,publisher,edition,price,pages) values(?,?,?,?,?,?,?,?)',
        [book_id,book_name,author,isbn,publisher,edition,price,pages]
        ,function(err,result){
            if(err){
                console.log(err);
            reject('error')
            }
            else    
                resolve('book is added')
            
        })
    })
}

function get_book(search_by,book){
    var str="'"+book+"%"+"'";
    if(search_by=='name'){
       str+= ' or author like'+"'"+ book+"%"+"'";
    }
    console.log(str);
    console.log(` select * from book_section where '${search_by}' like '${str}';`);
    return new Promise(function(resolve,reject){
        connection.query(`
        select * from book_section where ${search_by} like ${str};
        `,function(err,result){
            if(err){
             console.log(err);
                reject('error')
            }
            else{
            console.log(result);
                resolve(result);
            }
        })
    })
}

function add_student_info(id,email,phone_no){
    return new Promise(function(resolve,reject){
    connection.query(
        'insert into student_info(student_id,email,phone_no) values(?,?,?)',
        [id,email,phone_no]
        ,function(err,result){
            if(err){
                console.log(err);
            reject('error')
            }
            else    
                resolve('data added')
         })
        })
}

function add_student(id,name,father_name,dob,course,year,semester,session){
    return new Promise(function(resolve,reject){
        connection.query(
            'insert into student_section(student_id,name,father_name,DOB,course,year,semester,session) values(?,?,?,?,?,?,?,?)',
            [id,name,father_name,dob,course,year,semester,session]
            ,function(err,result){
                if(err){
                    console.log(err);
                reject('error')
                }
                else    
                    resolve('data is added')
                
            })
    })
}

function issue_data(){
    return new Promise(function(resolve,reject){
        connection.query(`
         select * from issue_section
        `,function(err,result){
            if(err){
                console.log(err);
                reject('error')
            }else{
               reject(result)
            }
        })
    })
}

module.exports={
    select_book,
    select_student,
    issue,
    issue_details,
    select_student_info,
    return_book,
    book_id,
    add_book,
    get_book,
    add_student,
    student_info,
    add_student_info,
    issue_data
}