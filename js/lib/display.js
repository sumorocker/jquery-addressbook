var dataFunctions = require('./data');
var $app = $('#app');
var _ = require('underscore');

// Some constants...
var LISTING_LIMIT = 5;

// Functions that display things on the screen (views)
function displayAddressBooksList(pageNum) {
    pageNum = +pageNum || 0;
    dataFunctions.getAddressBooks(LISTING_LIMIT, pageNum).then(
        function(result) {
            
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Books List</h2>');
            var $ul = $('<ul>');
            $app.append($ul);
            
            result.addressBooks.forEach(function(ab) {
                $ul.append('<li><a href="#/addressbooks/' + ab.id + '">' + ab.name + '</a></li>');
            });
            
            $app.append('<a class="button" href="#/addressbooks/page' + (pageNum - 1) + '">&lt; prev</a>');
            $app.append('<a class="button" href="#/addressbooks/page' + (pageNum + 1) + '">next &gt;</a>');
            
        }
    );
}

function displayAddressBook(addressBookId, pageNum) {
    pageNum = +pageNum || 0;
    dataFunctions.getAddressBookEntries(addressBookId, LISTING_LIMIT, pageNum).then(
        function(result) {
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Book Entries</h2>');
            $('<button class="small">&laquo; Go back to address books listing</button>')
                .appendTo($app)
                .on('click', displayAddressBooksList.bind(null, null));
            
            
            var $ul = $('<ul>');
            $app.append($ul);
            
            result.entries.forEach(function(entry) {
                $ul.append('<li><a href="#/entry/' + entry.id +'">' + entry.lastName + ', ' + entry.firstName + '</a></li>');
            });
            
            $app.append('<a class="button" href="#/addressbooks/' +addressBookId + '/' + (pageNum - 1) + '">&lt; prev</a>');
            $app.append('<a class="button" href="#/addressbooks/' + addressBookId + '/' + (pageNum + 1) + '">next &gt;</a>');
        }
    )
}

function displayEntry(entryId) {
    dataFunctions.getEntry(entryId).then(
        function(entry) {
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Book Entries</h2>');
            $('<button class="small">&laquo; Go back to current address book</button>')
                .appendTo($app)
                .on('click', displayAddressBook.bind(null, entry.addressBookId, null));
            
            var entryTemplate = _.template( $('#entry-template').html() );
            var entryTable = entryTemplate({entry: entry});
            $app.append(entryTable);
        }
    );
}
// End functions that display views

// Utility functions
function _buildAddresses(addresses) {
    return addresses.map(function(address) {
        var html = '<div class="address">';
        html += '<p class="address__type">' + address.type + ':</p>';
        html += '<pre class="address__text">';
        html += address.line1 + "\n";
        if (address.line2) {
            html += address.line2 + "\n";
        }
        html += address.city + ', ' + address.state + ' ' + address.zip + "\n";
        html += address.country;
        html += '</pre>';
        html += '</div>';
        
        return html;
    }).join('');
}
function _buildEmails(emails) {
    return emails.map(function(email) {
        var html = '<div class="address">';
        html += '<p class="address__type">' + email.type + ':</p>';
        html += '<pre class="address__text">';
        html += email.email;
        html += '</pre>';
        html += '</div>';
        
        return html;
    }).join('');
}
function _buildPhones(phones) {
    return phones.map(function(phone) {
        var html = '<div class="address">';
        html += '<p class="address__type">' + phone.type + ':</p>';
        html += '<pre class="address__text">';
        html += phone.phoneNumber + ' (' + phone.phoneType + ')';
        html += '</pre>';
        html += '</div>';
        
        return html;
    }).join('');
}
// End utility functions

module.exports = {
    displayAddressBooksList: displayAddressBooksList,
    displayAddressBook: displayAddressBook,
    displayEntry: displayEntry
};