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
    emailIsSelect,
    removeAllEmailsSelected,
    markAsReadForAllSelected
}

function _createEmails() {
    gEmails = storageService.load(EMAILS_KEY, [])
    if (!gEmails.length) {
        gEmails.push(_createEmail(utilService.makeId(), 'tal', 'Wassap', 'lorem-ipsum is a JavaScript module for generating passages of lorem ipsum text. Lorem ipsum text is commonly used as placeholder text in publishing, graphic design, and web development.', 1551133930594))
        gEmails.push(_createEmail(utilService.makeId(), 'meshi', 'hello girl', 'lorem-ipsum is a JavaScript module for generating passages of lorem ipsum text. Lorem ipsum text is commonly used as placeholder text in publishing, graphic design, and web development.', 1551133930594))
        gEmails.push(_createEmail(utilService.makeId(), 'jon', 'hello girl', 'lorem-ipsum is a JavaScript module for generating passages of lorem ipsum text. Lorem ipsum text is commonly used as placeholder text in publishing, graphic design, and web development.', 1551133930594))
    }
    storageService.store(EMAILS_KEY, gEmails);
}

function _createEmail(id, sentBy, subject, body, sentAt) {
    return {
        id,
        sentBy,
        subject,
        body,
        sentAt,
        isRead: false,
        isImportant: false,
        isSelect: false
    }
}

function query(currView, filterBy) {
    var filteredEmails = storageService.load(EMAILS_KEY);
    if (!filteredEmails) filteredEmails = gEmails.slice()
    if (currView === 'Important') {
        filteredEmails = gEmails.filter(email => email.isImportant);
    }
    if (filterBy) {
        var { title } = filterBy
        filteredEmails = filteredEmails.filter(email => email.subject.includes(title) ||
            email.sentBy.includes(title) || email.body.includes(title)
        )
    }
    return Promise.resolve(filteredEmails);
}

// function save() {
//     let emailIdx = gEmails.findIndex((email) => email.id === emailId)
//     if (emailIdx === -1) return;
//     gEmails[emailIdx] = email;
//     storageService.store(EMAILS_KEY, gEmails);
//     return Promise.resolve(gEmails);
// }

function getById(id) {
    var email = gEmails.find(email => email.id === id);

    return Promise.resolve(email)
}

function _getById(emailId) {
    return gEmails.find(email => email.id === emailId);
}

function emailIsRead(emailId) {
    let email = _getById(emailId);
    email.isRead = true;
    storageService.store(EMAILS_KEY, gEmails);
}

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
    return gEmails.filter(email => !email.isRead)
}

function emailIsSelect(emailId) {
    let email = _getById(emailId);
    email.isSelect = !email.isSelect;
    storageService.store(EMAILS_KEY, gEmails);
}

function getAllEmailsSelected() {
    return gEmails.filter(email => email.isSelect)
}

function removeAllEmailsSelected() {
    var emails = getAllEmailsSelected();
    emails.forEach(email => {
        remove(email.id)
    });
}

function markAsReadForAllSelected(isRead){
    var emails = getAllEmailsSelected();
    emails.forEach(email=>{
        email.isRead = isRead;
    })
    console.log('isOpen',gEmails);
    
    storageService.store(EMAILS_KEY, gEmails);
}

// function getAllImportantEmails() {
//     return gEmails.map(email => email.isImportant);
// }
