# jQuery Address Book

## Introduction
This is the skeleton for an address book front-end application based on [the address book API](https://loopback-rest-api-demo-ziad-saab.c9.io/explorer/).

The API itself is hosted at https://loopback-rest-api-demo-ziad-saab.c9.io/api and is [CORS-enabled](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing),
loosely meaning "you can access it thru AJAX from any domain".

This project was created by simply running `foundation new address_book --libsass`, and a bit of code was
added on top of what Foundation generated.

In `index.html`, we removed all the content of the body and replaced it with a single `div` with ID `app`.
This is a common pattern when creating a [Single-Page Application](https://en.wikipedia.org/wiki/Single-page_application).
Indeed, our application will not be refreshing the browser's page when we interact with it. It will use
AJAX requests to talk to an API, and display the results live.

In `js/app.js`, we created a basic skeleton for the application. This JavaScript file is divided into
multiple sections:

  1. Initialization section, where we load Foundation's JavaScript components and set some constants
  2. A data-retrieval section. This presents a set of functions that talk to our API. The functions are
using `jQuery.getJSON` to talk to the API and retrieve some content. 

  You will need to add some more functions
in there and complete some existing functions. The functions in there return the result of `jQuery.getJSON`,
which is a promise-like object on which you can call `.then`. You can see these functions being used in the
next section.
  3. A "views" section. The functions in there will use the data-retrieval functions to get some data from
the API, and then use some of jQuery's [DOM Manipulation](https://api.jquery.com/category/manipulation/) functions
to display the retrieved content on the page.

*Take your time* to identify these different sections in `app.js`, and look at the code in there.

Look more closely at the `displayAddressBooksList` function on line `38`.
Here we are creating elements that look like this: `<li data-id="1">some name</li>`. This is a common pattern,
where we are attaching a piece of data to an HTML element. Later on, when this element is clicked,
we are retrieving the ID -- in this case it's the ID of the address book we are displaying -- and then
calling another function with it (look at line `42`)

## Work
Complete the provided application skeleton to get the following things done:

1. Upon entering the interface, the user should see a list of the first 5 address books, sorted by name
2. Below the list, there should be two pagination buttons: previous page and next page
3. The buttons should be active/inactive depending on whether there are more results to show
4. The address book names should be clickable. Upon clicking on an address book name, the interface switches to show a list of entries
5. The list of entries should show the first 5 entries, sorted by last name. Each entry should be displayed as Last Name, First Name
6. Above the list of entries should be a link to go back to the address book listing
7. Below the list of entries should be two pagination buttons, same as for the address book listing
8. The entries should be clickable. Upon clicking on an entry, the interface should switch to show the full entry using an HTML vertical table. The spec is the same as the command line version of the address book. Basically, display all the entry data as well as related data such as addresses, phones and emails.
9. Above the entry table should be a link to go back to the current address book

## Challenge
As a challenge, add the following functionality:

1. When viewing an entry, an EDIT button is made available.
2. When clicking on EDIT, the view will toggle between "view" and "edit mode"
3. In "edit mode", the first name, last name and birthday will be changed to `<input>` elements. Editing them and pressing ENTER will change them thru the API
4. In "edit mode", each email, address and phone number will have a DELETE button next to it. Clicking this button should delete the entry in the API and update the UI
5. In "edit mode", each of email, address and phone sections will have an ADD button. Clicking this button should open a popup with a form to add a new sub-entry of that type
6. 

# Additions
In this section, let's look at some ways we can make our lives easier. Moving on from using
** only** jQuery, we will look at code splitting, HTML templating, front-end routing as well
as nicer ways to communicate with APIs.

## Splitting code and bundling it up for the web
For bundling up front-end JavaScript, we will use [webpack](https://webpack.github.io/)

Install webpack with; `npm install -g webpack`

Compile you JavaScript bundle with: `webpack --entry ./js/app.js --outp-filename ./js/app-bundle.js`

If you need to develop and will compile often, you can have webpack watch: just add `--watch` to the command line

**NOTE**: You will also need to edit `index.html` to change the `<script>` tag from `app.js` to `app-bundle.js`

Let's look at how to automate this with Grunt:
1. We need to install [`grunt-webpack`](https://github.com/webpack/grunt-webpack) with `npm install --save-dev grunt-webpack`
2. Load the grunt-webpack task in `Gruntfile.js`
3. Add the task to an already existing task list such as `build`
4. Configure the task in `grunt.initConfig`
5. Run and test the task: `grunt webpack`
6. Eventually, add a watcher to recompile your JS every time you make a change. **NOTE** if you output `app-bundle.js`
7. in the same directory as your watched files, the watch task will run in a loop! Make sure to
8. ignore `app-bundle.js` with something like `files: ['js/**/*.js', '!js/app-bundle.js']`

## Templating: generating dynamic HTML without programatically creating elements
We will use the [`template`](http://underscorejs.org/#template) function from UnderscoreJS:

1. `npm install --save underscore`
2. By using Webpack, we will be able to do `var _ = require('underscore');` :)
3. The `_.template` function takes a template string and returns a template function
4. The template string can be any text, as well as interpolation tags `<%= var1 %>` and `<% if (typeof var1 === "undefined") {%>`
5. The returned template function takes an object as parameter, and returns the template string
interpolated with the properties from the passed object.
6. As a last step, we can put our template in our HTML code inside a `<script type="text/template">` tag.
These tags are neither displayed nor evaluated by the browser, but their content can be fetched
by giving them an ID and calling `$('#template-id').html()` to retrieve the template string
7. Checkout [embeddedjs.com](http://www.embeddedjs.com/) for additional instructions and tutorials

## BackboneJS: library for creating front-end, single-page application