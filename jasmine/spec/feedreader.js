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


        /*The function below takes the allfeeds array
        and analyzes one by one if they have an url and
        are not empty*/

         it('has URL', function() {
           for(let feed of allFeeds){
             expect(feed['url']).toBeDefined();
             expect(feed['url'].length).not.toBe(0);
           }
         });


        /*The function below takes the allfeeds array
        and analyzes one by one if they have a name and
        are not empty*/

        it('has name', function() {
           for(let feed of allFeeds){
             expect(feed['name']).toBeDefined();
             expect(feed['name'].length).not.toBe(0);
           }
         });

    });

        /* The test suite below tests the behaviour of the slide menu */

describe('the slide menu', function() {

        const hiddenMenu = document.querySelector('.slide-menu');

         it('is hidden by default', function(){

            /* Checks if the menu is in the hiding position before being clicked */

            expect($(hiddenMenu).offset().left).toBe(-192);

            /* Checks if the hidden class is on while the menu is in the hiding position */
            expect($('body').hasClass('menu-hidden')).toBe(true);

         })
})


describe('the slide menu', function() {

        const hiddenMenu = document.querySelector('.slide-menu');
        const menuIcon = document.querySelector('.menu-icon-link');


        /* I found two ways of tackling this test suite,

            1. [Asynchronously] which will allow to check for the position of the test slide menu
            and also to check when the 'menu-hidden' is toggle on and off of the
            body

            2. [Synchronously] Only allows to check whether the class menu hidden has been toggled
            on and off from the body, as to check for the positioning of the menu will not be possible
            as the animation is set on a 0.2s delay

            */


        /* Asynchronous */

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

        //   beforeEach(function(done) {
        //         menuIcon.click()
        //         setTimeout(function(){
        //             done();
        //         }, 201)
        //   })

        //   it('displays menu when clicked', function(done){

        //     expect(hiddenMenu.parentElement.classList.length).toBe(0);
        //     /* Checks for the position of the the menu after being clicked (Shown) */
        //     expect($(hiddenMenu).offset().left).toBe(0)
        //     expect($('body').hasClass('menu-hidden')).toBe(false);
        //     done();
        // })

        // it('hides when clicked again',function(done){
        //     expect(hiddenMenu.parentElement.classList[0]).toBe('menu-hidden')
        //     /* Checks for the position of the the menu after being clicked (Hidden) */
        //     expect($(hiddenMenu).offset().left).toBe(-192)
        //     expect($('body').hasClass('menu-hidden')).toBe(true);
        //     done();

        //   })

        /* Synchrounously */

        it('displays menu when clicked and hides when clicked again', function(){

            menuIcon.click();

            expect($('body').hasClass('menu-hidden')).toBe(false);

            menuIcon.click();

            expect($('body').hasClass('menu-hidden')).toBe(true);

          })

})

describe ('Initial Entries', function() {

        /* This function runs loadFeed and callsback once it has finished (2nd parameter in loadFeed) */

        beforeEach(function(done) {
            loadFeed(0, function () {
                done();
            })
        })

        /* Checks that the number of entries within the feed container is greater than 0 */

         it("feed container is not empty", function(done){
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
            done();
         })

})

describe("New Feed Selection", function(){

        const feedContainer = document.querySelector('.feed .entry')

        let feedOne = "";
        let feedTwo = "";

        /* Asynchronous function to store two feeds in two separate
        variables by checking the DOM and the entry links */

        beforeEach(function(done) {
            loadFeed(0, function () {
                feedOne = document.querySelector('.feed .entry').parentElement;
                loadFeed(1,function () {
                    feedTwo = document.querySelector('.feed .entry').parentElement;
                    done()
                })
            })
        })

    /* Compares the first feed to the second one to not be equal */

        it("should change content", function(done) {
            expect(feedOne).not.toEqual(feedTwo)
            done()
        })

})


}());
