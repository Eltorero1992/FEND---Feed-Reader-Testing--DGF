/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('has URL', function() {
           for(let feed of allFeeds){
             expect(feed['url']).toBeDefined();
             expect(feed['url'].length).not.toBe(0);
           }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('has name', function() {
           for(let feed of allFeeds){
             expect(feed['name']).toBeDefined();
             expect(feed['name'].length).not.toBe(0);
           }
         });

    });


    /* TODO: Write a new test suite named "The menu" */

describe('the slide menu', function() {

        const hiddenMenu = document.querySelector('.slide-menu');
        const menuIcon = document.querySelector('.menu-icon-link');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('is hidden by default', function(){

            expect(hiddenMenu.parentElement.classList[0]).toBe('menu-hidden')
            expect($(hiddenMenu).offset().left).toBe(-192)

         })
})


describe('the slide menu', function() {

        const hiddenMenu = document.querySelector('.slide-menu');
        const menuIcon = document.querySelector('.menu-icon-link');

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */


          /* This asynchronous function allows to check if menu has been displayed
          successfully after it has been clicked and the animation has finished

            [TODO | BUG ] Sometimes this test suite fails

            Cause: Animation runs quicker than the test suite

            Root:   1.Multiple asynchronous responses at once
                    2.Computational power
                    3.Scroll down when test suite is running

            Attempts: 1. Changed delay time to be greater than animation time (0.2s).
                         No predictable whether it will pass or fail

          */

          beforeEach(function(done) {
                menuIcon.click()
                setTimeout(function(){
                    done();
                }, 201)
          })

          it('displays menu when clicked', function(done){

            expect(hiddenMenu.parentElement.classList.length).toBe(0);
            /* Checks for the position of the the menu after being clicked (Shown) */
            expect($(hiddenMenu).offset().left).toBe(0)
            done();
        })

        it('hides when clicked again',function(done){
            expect(hiddenMenu.parentElement.classList[0]).toBe('menu-hidden')
            /* Checks for the position of the the menu after being clicked (Hidden) */
            expect($(hiddenMenu).offset().left).toBe(-192)
            done();

          })

})


/* TODO: Write a new test suite named "Initial Entries" */

describe ('Initial Entries', function() {

        const feedContainer = document.querySelector('.feed')

        /* This function runs loadFeed and callsback once it has finished (2nd parameter in loadFeed) */

        beforeEach(function(done) {
            loadFeed(0, (function () {
                done();
            }))
        })

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it("feed container is not empty", function(done){
            expect(feedContainer.childElementCount).toBeGreaterThan(0);
            done();
         })

})

    /* TODO: Write a new test suite named "New Feed Selection" */

describe("New Feed Selection", function(){

        const feedContainer = document.querySelector('.feed')
        const feedEntry = feedContainer.children

        beforeEach(function(done) {
            loadFeed(0, (function () {
                done();
            }))
        })

//      TODO: Write a test that ensures when a new feed is loaded
//      * by the loadFeed function that the content actually changes.
//      * Remember, loadFeed() is asynchronous.

        it('Content changes when loaded',function(done){

        expect(function () {

            let counter = 0;

                for (var i = 1; i <= feedContainer.childElementCount; i++) {

                    if (feedEntry[i-1].innerText !== feedEntry[i]) {
                        counter ++
                    }
                }

            return counter

        }()).toBe(10)

        done();

     })

})


}());
