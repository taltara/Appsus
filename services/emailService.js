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
    isStar
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

function _createEmail(id, sentBy, subject, body, isRead, sentAt, isStar) {
    return {
        id,
        sentBy,
        subject,
        body,
        isRead,
        sentAt,
        isStar
    }
}

function query(filterBy) {
    var filteredEmails = gEmails.slice()
    if (filterBy) {
        var { title, maxPrice, minPrice } = filterBy

        maxPrice = maxPrice ? maxPrice : Infinity
        minPrice = minPrice ? minPrice : 0
        filteredEmails = gEmails.filter(email => email.title.includes(title)
            && (email.listPrice.amount < maxPrice)
            && (email.listPrice.amount > minPrice)
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
    console.log('ne page', email);

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
    console.log(emailIdx);
    gEmails.splice(emailIdx, 1);
    storageService.store(EMAILS_KEY, gEmails);
    return Promise.resolve();
}

function isStar(id,isStar) {
    let emailIdx = gEmails.findIndex((email) => email.id === id)
    gEmails[emailIdx].isStar = isStar;
    console.log('star',gEmails);
}

