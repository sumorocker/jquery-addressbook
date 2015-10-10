// Add foundation dynamic functionality on page
$(document).foundation();

// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Some constants...
var LISTING_LIMIT = 5;

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');

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

// Functions that display things on the screen (views)
function displayAddressBooksList(pageNum) {
    pageNum = pageNum || 0;
    getAddressBooks(LISTING_LIMIT, pageNum).then(
        function(result) {
            
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Books List</h2>');
            var $ul = $('<ul>');
            $app.append($ul);
            
            result.addressBooks.forEach(function(ab) {
                $ul.append('<li data-id="' + ab.id + '">' + ab.name + '</li>');
            });
            
            $ul.on('click', 'li', function() {
                var addressBookId = $(this).data('id');
                displayAddressBook(addressBookId);
            });
            
            $('<button>&lt; prev</button>')
                .prop('disabled', pageNum === 0)
                .appendTo($app)
                .on('click', function() {
                    displayAddressBooksList(pageNum - 1);
                });
            
            $('<button>next &gt;</button>')
                .prop('disabled', !result.hasNext)
                .appendTo($app)
                .on('click', function() {
                    displayAddressBooksList(pageNum + 1);
                });
            
        }
    );
}

function displayAddressBook(addressBookId, pageNum) {
    pageNum = pageNum || 0;
    getAddressBookEntries(addressBookId, LISTING_LIMIT, pageNum).then(
        function(result) {
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Book Entries</h2>');
            $('<button class="small">&laquo; Go back to address books listing</button>')
                .appendTo($app)
                .on('click', displayAddressBooksList.bind(null, null));
            
            
            var $ul = $('<ul>');
            $app.append($ul);
            
            result.entries.forEach(function(entry) {
                $ul.append('<li data-id="' + entry.id + '">' + entry.lastName + ', ' + entry.firstName + '</li>');
            });
            
            $ul.on('click', 'li', function() {
                var entryId = $(this).data('id');
                displayEntry(entryId);
            });
            
            $('<button>&lt; prev</button>')
                .prop('disabled', pageNum === 0)
                .appendTo($app)
                .on('click', function() {
                    displayAddressBook(addressBookId, pageNum - 1);
                });
            
            $('<button>next &gt;</button>')
                .prop('disabled', !result.hasNext)
                .appendTo($app)
                .on('click', function() {
                    displayAddressBook(addressBookId, pageNum + 1);
                });
            
        }
    )
}

function displayEntry(entryId) {
    getEntry(entryId).then(
        function(entry) {
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Book Entries</h2>');
            $('<button class="small">&laquo; Go back to current address book</button>')
                .appendTo($app)
                .on('click', displayAddressBook.bind(null, entry.addressBookId, null));
            
            var $table = $('<table class="entry-table">');
            
            $table.append('<tr><th>First Name</th><td>' + entry.firstName + '</td></tr>');
            $table.append('<tr><th>Last Name</th><td>' + entry.lastName + '</td></tr>');
            if (entry.birthday) {
                $table.append('<tr><th>Birthday</th><td>' + entry.birthday + '</td></tr>');
            }
            if (entry.addresses.length) {
                $table.append('<tr><th>Addresses</th><td>' + _buildAddresses(entry.addresses) + '</td></tr>');
            }
            if (entry.emails.length) {
                $table.append('<tr><th>Emails</th><td>' + _buildEmails(entry.emails) + '</td></tr>');
            }
            if (entry.phones.length) {
                $table.append('<tr><th>Phones</th><td>' + _buildPhones(entry.phones) + '</td></tr>');
            }

            $app.append($table);
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

// Start the app by displaying all the addressbooks
displayAddressBooksList();