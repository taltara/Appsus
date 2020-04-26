import utilService from './utilService.js'
import storageService from './storageService.js'


var gEmails = [];

export default {
    query,
    // save,
    onRemove,
    getById,
    // add,
    emailIsRead
}
_createEmails();

function _createEmails() {
    gEmails.push(_createEmail(utilService.makeId(), 'tal', 'Wassap', 'Pick up!', false, 1551133930594))
    gEmails.push(_createEmail(utilService.makeId(), 'meshi', 'hello girl', 'what do you like to watch on netflix??', false, 1551133930594))
    gEmails.push(_createEmail(utilService.makeId(), 'jon', 'hello girl', 'long time no see!', false, 1551133930594))
}

function _createEmail(id, sentBy, subject, body, isRead, sentAt) {
    return {
        id,
        sentBy,
        subject,
        body,
        isRead,
        sentAt
    }
}

function query(filterBy) {
    var emails = gEmails;
    if (filterBy) {
        var { title, maxPrice, minPrice } = filterBy

        maxPrice = maxPrice ? maxPrice : Infinity
        minPrice = minPrice ? minPrice : 0
        emails = gEmails.filter(email => email.title.includes(title)
            && (email.listPrice.amount < maxPrice)
            && (email.listPrice.amount > minPrice)
        )
    }
    return Promise.resolve(emails);
}

function getById(emailId) {
    return gEmails.find(email => email.id === emailId);
}

function emailIsRead(emailId) {
    let email = getById(emailId);
    email.isRead = true;
}

function onRemove(emailId) {
    
    let emailIdx = gEmails.findIndex((email) => email.id === emailId)
    if (emailIdx === -1) return;
    console.log(emailIdx);
    gEmails.splice(emailIdx, 1)
}

