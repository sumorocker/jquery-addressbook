var displayFunctions = require('./lib/display');
// Add foundation dynamic functionality on page
$(document).foundation();
// Start the app by displaying all the addressbooks
displayFunctions.displayAddressBooksList();

// Load underscore library
// var _ = require('underscore');

// CREATE a template using _.template
// var myTemplate = _.template('<li data-id="<%=id %>"><%=lastName  %>, <%=firstName %></li>');
// var myOutput = myTemplate({
//     id: 123,
//     lastName: "Smith",
//     firstName: "John"
// });
// var myOutput2 = myTemplate({
//     id: 4567,
//     lastName: "Saab",
//     firstName: "Ziad"
// });
// console.log(myOutput, myOutput2);

// var myTableTemplate = _.template(
//     '<table>' +
//         '<tr><th>First Name</th><td><%=firstName %></td></tr>' +
//         '<tr><th>Last Name</th><td><%=lastName %></td></tr>' +
//         '<% if (typeof birthday !== "undefined") { %><tr><th>Birthday</th><td><%=birthday %></td></tr><% } %>' +
//         '<% for (var i = 0; i < emails.length; i++) { %>' +
//             '<tr><th>Email # <%=i+1 %></th><td><%= emails[i].emailAddress %></td></tr>' +
//         '<% } %>' +
//     '</table>'
// );

// var myTableOutput = myTableTemplate({
//     firstName: 'John',
//     lastName: 'Smith',
//     emails: [
//         {emailAddress: 'john@work.com', type: 'work'},
//         {emailAddress: 'john@home.com', type: 'home'}
//     ]
// });

// console.log(myTableOutput);