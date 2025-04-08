import mailer from '../config/mailConfig.js'
import mailQueue from "../queues/mailQueue.js";

mailQueue.process(async (job) => { // processing mail from queue
    const emailData = job;  // storing email data 
    console.log('Processing email', emailData);

    try {
        const response = await mailer.sendMail(emailData); // sending email data to create email
        console.log('Email sent', response);
    } catch (error) {
        console.log('Error processing email');
    }

})