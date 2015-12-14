// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');

var LIST_LIMIT = 5;



// Data retrieval functions
function getAddressBooks() {
    return $.getJSON(API_URL + '/AddressBooks');
}

function getAddressBook(id) {
    return $.getJSON(API_URL + '/AddressBooks/' + id);
}

function getEntries(addressBookId) {
    return $.getJSON(API_URL + '/AddressBooks/' + addressBookId + '/entries/')
}

function getEntry(entryId) {
    return $.getJSON(API_URL + '/entries/' + entryId)
}

function getPhone(phoneId) {
    return $.getJSON(API_URL + '/entries/' + phoneId + '/phones/')
}

function getEmail(emailId) {
    return $.getJSON(API_URL + '/entries/' + emailId + '/emails/')
}

function getAddresses(addressesId) {
    return $.getJSON(API_URL + '/entries/' + addressesId + '/addresses/')
}
// End data retrieval functions

// Functions that display things on the screen (views)
function displayAddressBooksList() {
    getAddressBooks().then(
        function(addressBooks) {

            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Books List</h2>');
            $app.append('<ul></ul>');

            addressBooks.forEach(function(ab) {
                $app.find('ul').append('<li data-id="' + ab.id + '">' + ab.name + '</li>');
            });

            $app.find('li').on('click', function() {
                var addressBookId = $(this).data('id');
                var addressBookName = $(this).html();
                displayAddressBook(addressBookId, addressBookName);
            });
        }
    )
}

function displayAddressBook(addressBookId, addressBookName) {
    getEntries(addressBookId).then(
        function(EntriesInfo) {
            $app.html('');
            $app.append('<h2>Entries</h2>');
            $app.append('<ul></ul>');

            EntriesInfo.forEach(function(entry) {
                $app.find('ul').append('<li data-id="' + entry.id + '">' + entry.lastName + ' ' + entry.firstName + '</li>');
            })
            $app.find('li').on('click', function() {
                var the_EntriesId = $(this).data('id');
                var EntriesContent = $(this).html();
                displayAllInfo(the_EntriesId, EntriesContent);
            })
        })
}

function displayAllInfo(EntryId, EntryContent) {
    
    $app.html('');
    $app.append('<h2>Information</h2>');
    getEntry(EntryId).then(
        function(EntryId) {
            $app.append('<h2>Name:</h2>')
            $app.append('<ul id="names"></ul>');
            $app.find('#names').append('<li data-id="' + EntryId.id + '">' + EntryId.lastName + ' ' + EntryId.firstName + '<br>' + EntryId.birthday + '</li>');
        });

    getPhone(EntryId).then(
        function(phoneNumbers) {
            $app.append('<h2>Phone Number(s):</h2>');
            $app.append('<ul id= "phone"></ul>');
            
            phoneNumbers.forEach(function(phone) {
                $app.find('#phone').append('<li data-id="' + phone.id + '">'+'<b>'+ phone.type+'</b>'+': '+ phone.phoneNumber);

            });

            getEmail(EntryId).then(
                function(emails) {
                    $app.append('<h2>Email(s):</h2>');
                    $app.append('<ul id="email"></ul>');

                    emails.forEach(function(Email) {
                        $app.find('#email').append('<li data-id="' + Email.id + '">' + '<b>'+Email.type+'</b>'+': '+ Email.email);
                    });

                    getAddresses(EntryId).then(
                        function(addresses) {
                            $app.append('<h2>Address(es):</h2>');
                            $app.append('<ul id="address"></ul>');

                            addresses.forEach(function(Address) {
                                $app.find('#address').append('<li data-id="' + Address.id + '">' + '<h3>' + Address.type + ':</h3>' + '<br>' + Address.line1 + '<br>' + Address.line2 + '<br>' + Address.city + ' ,' + Address.state + '<br>' + Address.zip + ' ,' + Address.country);
                            });

                        });
                });
        });
}
// End functions that display views


// Start the app by displaying all the addressbooks
// NOTE: This line is very important! So far, our code has only defined functions! This line calls the
// function that displays the list of address books, effectively initializing our UI.
displayAddressBooksList();


// $app.find('li').on('click', function() {
//     var emailId = $(this).data('id');
//     var phoneNumberId = $(this).data('id');
//     var addressId = $(this).data('id');
//     var emailContent = $(this).html();
//     var addressContent = $(this).html();
//     var phoneNumberContent = $(this).html();
// displayAllInfo(phoneNumberId, phoneNumberContent, addressId, emailId, emailContent, addressContent);
// });