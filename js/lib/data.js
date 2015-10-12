// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Data retrieval functions

/*
Retrieves address books from the API.

This function tries to fetch one more than the requested number of entries in order
to find out for sure if there is a next page to display.
*/
function getAddressBooks(numPerPage, pageNum) {
    return $.getJSON(API_URL + '/AddressBooks', {
        filter: JSON.stringify({
            limit: numPerPage + 1,
            offset: pageNum * numPerPage
        })
    }).then(
        function(res) {
            return {
                addressBooks: res.slice(0, numPerPage),
                hasNext: res.length > numPerPage
            }
        }
    );
}

function getAddressBookEntries(addressBookId, numPerPage, pageNum) {
    return $.getJSON(API_URL + '/AddressBooks/' + addressBookId + '/entries', {
        filter: JSON.stringify({
            limit: numPerPage + 1,
            offset: pageNum * numPerPage,
            order: 'lastName ASC'
        })
    }).then(
        function(res) {
            return {
                entries: res.slice(0, numPerPage),
                hasNext: res.length > numPerPage
            }
        }
    );
}

function getEntry(entryId) {
    return $.getJSON(API_URL + '/Entries/' + entryId, {
        filter: JSON.stringify({
            include: ['addresses','emails','phones']
        })
    });
}
// End data retrieval functions

module.exports = {
    getAddressBooks: getAddressBooks,
    getAddressBookEntries: getAddressBookEntries,
    getEntry: getEntry
};