const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "e.library.2021.system@gmail.com",
    pass: 'Hemant123456@'
  }
})

var sendto = "singhhemant1852@gmail.com"


function sendMail(mail, mess, subject) {
  return new Promise(function (resolve, reject) {
    transporter.sendMail({
      from: "e.library.2021.system@gmail.com",
      to: mail,
      subject: subject,
      text: mess
    }, function (err, results) {
      if (err)
        reject('error');
      else
        resolve('mail is sended successfully');
    })
  })
}

// sendMail(sendto).then(function(data){
//     console.log(data);
// }).catch(function(err){
//     console.log(err);
// })

module.exports = module = {
  sendMail
}