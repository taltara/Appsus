import utilService from './utilService.js'
import storageService from './storageService.js'

const EMAILS_KEY = 'EMAILS'
var gEmails = null;
_createEmails()
export default {
    query,
    // save,
    remove,
    getById,
    // add,
    emailIsRead,
    toggleIsImportant,
    unReadEmails,
    sendEmail
}

function _createEmails() {
    gEmails = storageService.load(EMAILS_KEY, [])
    if (!gEmails.length) {
        gEmails.push(_createEmail('tal@gmail.com', 'Wassap', 'lorem-ipsum is a JavaScript module for generating passages of lorem ipsum text. Lorem ipsum text is commonly used as placeholder text in publishing, graphic design, and web development.'))
        gEmails.push(_createEmail('meshi@gmail.com', 'hello girl', 'lorem-ipsum is a JavaScript module for generating passages of lorem ipsum text. Lorem ipsum text is commonly used as placeholder text in publishing, graphic design, and web development.'))
        gEmails.push(_createEmail('jon@gmail.com', 'hello girl', 'lorem-ipsum is a JavaScript module for generating passages of lorem ipsum text. Lorem ipsum text is commonly used as placeholder text in publishing, graphic design, and web development.'))
    }
    storageService.store(EMAILS_KEY, gEmails);
}

function _createEmail(sentBy, subject, body, isSent = false) {
    return {
        id: utilService.makeId(),
        sentBy,
        subject,
        body,
        sentAt: formatedSentAt(),
        isRead: false,
        isImportant: false,
        isSent
    }
}

function formatedSentAt() {
    let date = new Date().toString().split(' ');
    return date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3] + ' ' + date[4];
}

function query(currView, filterBy) {

    var filteredEmails = storageService.load(EMAILS_KEY);
    if (!filteredEmails) filteredEmails = gEmails.slice()
    if (currView === 'Important') {
        filteredEmails = gEmails.filter(email => email.isImportant && !email.isSent);
    }
    if (currView === 'Inbox') {
        filteredEmails = gEmails.filter(email => !email.isSent);
    }
    if (filterBy) {
        var { isSent } = filterBy
        if (isSent) {
            filteredEmails = gEmails.filter(email => email.isSent);
        }
        var { title } = filterBy
        if (title) {
            filteredEmails = filteredEmails.filter(email => email.subject.includes(title) ||
                email.sentBy.includes(title) || email.body.includes(title)
            )
        }
    }
    return Promise.resolve(filteredEmails);
}

function getById(id) {
    var email = gEmails.find(email => email.id === id);

    return Promise.resolve(email)
}

function _getById(emailId) {
    return gEmails.find(email => email.id === emailId);
}

// function emailIsRead(emailId) {
//     let email = _getById(emailId);
//     email.isRead = true;
//     console.log(email);

//     storageService.store(EMAILS_KEY, gEmails);
// }

function remove(emailId) {
    let emailIdx = gEmails.findIndex((email) => email.id === emailId)
    if (emailIdx === -1) return;
    gEmails.splice(emailIdx, 1);
    storageService.store(EMAILS_KEY, gEmails);
    return Promise.resolve();
}

function toggleIsImportant(id) {

    let emailIdx = gEmails.findIndex((email) => email.id === id)
    gEmails[emailIdx].isImportant = !gEmails[emailIdx].isImportant;
    storageService.store(EMAILS_KEY, gEmails);
    return Promise.resolve(gEmails[emailIdx]);
}

function unReadEmails() {
    return gEmails.filter(email => !email.isRead && !email.isSent)
}

function emailIsRead(emailId, isRead) {
    let emailIdx = gEmails.findIndex((email) => email.id === emailId)
    if (emailIdx === -1) return;
    gEmails[emailIdx].isRead = isRead;
    storageService.store(EMAILS_KEY, gEmails);
    return Promise.resolve();
}

function sendEmail(email) {
    console.log(email);
    
    gEmails.push(_createEmail(email.to, email.subject, email.body, true));
    storageService.store(EMAILS_KEY, gEmails);
}
