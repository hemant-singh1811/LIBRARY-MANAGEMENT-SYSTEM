const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "a7f22e6a",
    apiSecret: "n3RvthcOx0gT5uOG"
})

const from = "Vonage APIs"
const to = "919717861858"
const tot = "8766215649"
const text ="A text message sent using the Vonage SMS API"

function sendtext(number,message){
     return new Promise(function(resolve,reject){
        vonage.message.sendSms(from,number,message, (err, responseData) => {
            if (err) {
                reject('error')
                console.log(err);
            } else {
                // console.log('responsedata', responseData);
                if (responseData.messages[0]['status'] === "0") {
                    resolve("Message sent successfully.");
                    console.log("Message sent successfully.");
                } else {
                    reject('error')
                    // console.log(responseData);
                    // console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                }
            }
        })
     })
}

module.exports={
    sendtext
}
