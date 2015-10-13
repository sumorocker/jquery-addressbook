// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

var Backbone = require('backbone');

var EntryModel = Backbone.Model.extend({
    urlRoot: API_URL + '/Entries',
    getFullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    },
    validate: function() {
        
    }
});
EntryModel.includeFilter = JSON.stringify({
    include: ['addresses','emails','phones']
});

var EntryCollection = Backbone.Collection.extend({
    model: EntryModel,
    url: function() {
        return API_URL + '/AddressBooks/' + this.addressBookId + '/entries';
    }
});

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
    
    // var entries = new EntryCollection();
    // entries.addressBookId = addressBookId;
    // return entries.fetch();
    
    return $.getJSON(API_URL + '/AddressBooks/' + addressBookId + '/entries', {
        filter: JSON.stringify({
            limit: numPerPage + 1,
            offset: pageNum * numPerPage,
            order: 'lastName ASC'
        })
    }).then(
        function(res) {
            res.forEach(function(entry) {
            });
            return {
                entries: res.slice(0, numPerPage),
                hasNext: res.length > numPerPage
            }
        }
    );
}

function getEntry(entryId) {
    var entry = new EntryModel({id: entryId});
    return entry.fetch({data: {filter: EntryModel.includeFilter}}).then(
        function() {
            return entry;
        }
    );
    // return $.getJSON(API_URL + '/Entries/' + entryId, {
    //     filter: JSON.stringify({
    //         include: ['addresses','emails','phones']
    //     })
    // }).then(
    //     function(entry) {
    //         entry.getFullName = function() {
    //             return this.firstName + ' ' + this.lastName;
    //         }
    //         entry.validate = function() {
    //             if (this.firstName.length === 0) {
    //                 return false;
    //             }
    //             if (this.lastName.legnth === 0) {
    //                 return false;
    //             }
    //             return true;
    //         }
            
    //         return entry;
    //     }
    // );
}
// End data retrieval functions

module.exports = {
    getAddressBooks: getAddressBooks,
    getAddressBookEntries: getAddressBookEntries,
    getEntry: getEntry
};