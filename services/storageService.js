
function store(key, value) {
    localStorage[key] = JSON.stringify(value);
    console.log(value);
}

function load(key, defaultValue = null) {
    var value = localStorage[key];
    
    if (!value || value === undefined) return defaultValue
    else return JSON.parse(value);
}

export default {
    store,
    load
}