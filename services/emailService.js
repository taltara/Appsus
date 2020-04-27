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
    // emailIsRead,
    toggleIsImportant,
}

function _createEmails() {
    gEmails = storageService.load(EMAILS_KEY, [])
    if (!gEmails.length) {
        gEmails.push(_createEmail(utilService.makeId(), 'tal', 'Wassap', 'Pick up!', false, 1551133930594, false))
        gEmails.push(_createEmail(utilService.makeId(), 'meshi', 'hello girl', 'what do you like to watch on netflix??', false, 1551133930594, false))
        gEmails.push(_createEmail(utilService.makeId(), 'jon', 'hello girl', 'long time no see!', false, 1551133930594, false))
    }
    storageService.store(EMAILS_KEY, gEmails);
}

function _createEmail(id, sentBy, subject, body, isRead, sentAt, isImportant) {
    return {
        id,
        sentBy,
        subject,
        body,
        isRead,
        sentAt,
        isImportant
    }
}

function query(currView, filterBy) {
    var filteredEmails= storageService.load(EMAILS_KEY);
    if(!filteredEmails) filteredEmails = gEmails.slice()
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
    // storageService.store(EMAILS_KEY, gEmails);
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

// function getAllImportantEmails() {
//     return gEmails.map(email => email.isImportant);
// }
