/*jslint unparam: true, browser: true, nomen: true, regexp: true, maxerr: 50, indent: 4, devel: true */
/*global describe:true, beforeEach:true, afterEach:true, it:true, xit:true, expect:true, spyOn:true, Backbone:true, $:true, _:true, loadFixtures:true, setFixtures: true, readFixtures: true, jasmine:true, mostRecentAjaxRequest:true, clearAjaxRequests:true, waitsFor:true, runs:true */

/**
 * Unit and integration test for animatedDropdown plugin.
 */
describe("Unit and integration test for animatedDropdown plugin", function () {
    "use strict";

    /**
     * Block of unit tests
     */
    describe("Unit tests for plugin", function () {

        /**
         * Block of tests checking correct plugin initialization
         */
        describe("Initialization check", function () {

            /**
             * Checks correct initialization in case of passing options via data-attributes
             */
            describe("Initialization with custom options via data attributes check", function () {
                var expectedHiddenElementClass = "custom-hidden",
                    expectedSlidingDropdownContainerClass = "custom-container",
                    expectedOptionsClass = "custom-option",
                    expectedOptionValues = [1, 2, 3],
                    expectedOptionDisplayValues = ["First", "Second", "Third"],
                    expectedSelectedDisplayValue = "Third",
                    select;

                beforeEach(function () {
                    loadFixtures("animatedDropdown.dataAttributes.html");

                    select = $("#select");
                    select.animatedDropdown();
                });

                /**
                 * Checks that custom hidden class is added to select element
                 */
                it("Should add custom hidden class to select element", function () {
                    expect(select.hasClass(expectedHiddenElementClass)).toBeTruthy();
                });

                /**
                 * Checks that custom hidden class is added to select element
                 */
                it("Should create sliding dropdown container with custom class", function () {
                    var container = $("#custom");

                    // expect element to exist
                    expect(container.length).toEqual(1);

                    // expect element to have proper class
                    expect(container.hasClass(expectedSlidingDropdownContainerClass)).toBeTruthy();
                });

                /**
                 * Checks that sliding dropdown container is created with custom markup
                 */
                it("Should create sliding dropdown container with custom markup", function () {
                    var container = $("#custom");

                    // expect element to exist
                    expect(container.length).toEqual(1);

                    // expect to have h1 element as title
                    expect(container.children("h1").length).toEqual(1);
                });

                /**
                 * Checks that sliding dropdown container is created with custom options markup
                 */
                it("Should create sliding dropdown container with custom options markup", function () {
                    var container = $("#custom");

                    // expect element to exist
                    expect(container.length).toEqual(1);

                    // expect all options are span elements with custom class
                    expect(container.children("div").children("span").hasClass(expectedOptionsClass)).toBeTruthy();
                });

                /**
                 * Checks that sliding dropdown container is created with correct options -
                 * the same as in select element.
                 */
                it("Should create sliding dropdown container with options, corresponding select options", function () {
                    var container = $("#custom"),
                        options;

                    // expect element to exist
                    expect(container.length).toEqual(1);

                    // expect to have options with correct data-value attributes and correct display values
                    options = container.children("div").children("span");
                    expect(options.length).toEqual(expectedOptionValues.length);

                    $.each(options, function (i, option) {
                        expect($(option).data('value')).toEqual(expectedOptionValues[i]);
                        expect($(option).html()).toEqual(expectedOptionDisplayValues[i]);
                    });
                });

                /**
                 * Checks that sliding dropdown container is created with correct options -
                 * the same as in select element.
                 */
                it("Should create sliding dropdown container with correctly selected element", function () {
                    var container = $("#custom"),
                        selected = container.find("h1");

                    // expect element to exist
                    expect(selected.length).toEqual(1);

                    // expect to have correct data-value attribute and correct display value
                    expect(selected.html()).toEqual(expectedSelectedDisplayValue);
                });
            });

            /**
             * Checks correct initialization in case of explicit passing options on plugin initialization
             */
            describe("Initialization with custom options via explicit passing check", function () {
                var expectedOptionValues = [1, 2, 3],
                    expectedOptionDisplayValues = ["First", "Second", "Third"],
                    expectedSelectedDisplayValue = "Second",
                    select,
                    options = {
                        "hidden-element-class": "test-hidden",
                        "sliding-dropdown-container-class": "test-container"
                    };

                beforeEach(function () {
                    loadFixtures("animatedDropdown.customOptions.html");

                    select = $("#select");
                    select.animatedDropdown(options);
                });

                /**
                 * Checks that custom hidden class is added to select element
                 */
                it("Should add custom hidden class to select element", function () {
                    expect(select.hasClass(options["hidden-element-class"])).toBeTruthy();
                });

                /**
                 * Checks that custom hidden class is added to select element
                 */
                it("Should create sliding dropdown container with custom class", function () {
                    var container = select.next();

                    // expect element to exist
                    expect(container.length).toEqual(1);

                    // expect element to have proper class
                    expect(container.hasClass(options["sliding-dropdown-container-class"])).toBeTruthy();
                });

                /**
                 * Checks that sliding dropdown container is created with default markup
                 */
                it("Should create sliding dropdown container with default markup", function () {
                    var container = select.next();

                    // expect element to exist
                    expect(container.length).toEqual(1);

                    // expect to have h1 element as title
                    expect(container.children("span").length).toEqual(1);
                });

                /**
                 * Checks that sliding dropdown container is created with default options markup
                 */
                it("Should create sliding dropdown container with default options markup", function () {
                    var container = select.next();

                    // expect element to exist
                    expect(container.length).toEqual(1);

                    // expect all options are span elements with custom class
                    expect(container.children("ul").length).toEqual(1);
                });

                /**
                 * Checks that sliding dropdown container is created with correct options -
                 * the same as in select element.
                 */
                it("Should create sliding dropdown container with options, corresponding select options", function () {
                    var container = select.next(),
                        items;

                    // expect element to exist
                    expect(container.length).toEqual(1);

                    // expect to have options with correct data-value attributes and correct display values
                    items = container.children("ul").children("li");
                    expect(items.length).toEqual(expectedOptionValues.length);

                    $.each(items, function (i, option) {
                        expect($(option).data('value')).toEqual(expectedOptionValues[i]);
                        expect($(option).html()).toEqual(expectedOptionDisplayValues[i]);
                    });
                });

                /**
                 * Checks that sliding dropdown container is created with correct options -
                 * the same as in select element.
                 */
                it("Should create sliding dropdown container with correctly selected element", function () {
                    var container = select.next(),
                        selected = container.children("span");

                    // expect element to exist
                    expect(selected.length).toEqual(1);

                    // expect to have correct data-value attribute and correct display value
                    expect(selected.html()).toEqual(expectedSelectedDisplayValue);
                });
            });
        });
    });

    /**
     * Block of integration tests
     */
    describe("Integration tests for plugin", function () {

        var select,
            container,
            items,
            selected,
            options = {
                "sliding-dropdown-container-class": "test-container",
                "sliding-period": 200
            },
            mocks = {};

        /**
         * Loads fixtures and initializes plugin
         */
        beforeEach(function () {
            loadFixtures("animatedDropdown.customOptions.html");

            select = $("#select");
            select.animatedDropdown(options);

            container = $("." + options["sliding-dropdown-container-class"]);
            selected = container.children("span");
            items = container.children("ul").children("li");

            mocks.slideUp = $.fn.slideUp || $.noop;
            mocks.slideDown = $.fn.slideDown || $.noop;
            $.fn.slideUp = function (duration) {
                this.hide();
            };
            $.fn.slideDown = function (duration) {
                this.show();
            };
        });

        /**
         * Checks that change event is delegated properly,
         * i.e. user is able to subscribe on change event.
         */
        it("Should delegate change event", function () {
            var o = {
                f: $.noop
            };
            spyOn(o, "f");

            // subscribing to 'change' event
            select.change(function () {
                o.f();
            });

            // when selecting any element
            items.first().click();

            // then expect change event to be triggered - spy to be called
            expect(o.f).toHaveBeenCalled();
        });

        /**
         * Checks that proper value is selected in initial select element.
         */
        it("Should select proper value in initial select element on menu item click", function () {
            // check that initially the second element is selected
            expect(select.val()).toEqual("2");

            // when selecting first element
            items.first().click();

            // then expect the correct element to be selected in initial select element
            expect(select.val()).toEqual("1");
        });

        /**
         * Checks that proper value is selected in drop down header.
         */
        it("Should select corresponding element in drop down header on menu item click", function () {
            // check that initially the second element is selected
            expect(select.val()).toEqual("2");

            // when selecting first element
            items.first().click();

            // then expect the correct element to be selected in initial select element
            expect(selected.html()).toEqual("First");
        });

        /**
         * Checks that menu items are shown with slideDown effect on dropdown header click
         */
        it("Should show menu items with slideDown effect on dropdown header click", function () {
            spyOn($.fn, "slideDown");

            // when clicking on dropdown header
            selected.click();

            // then expect slideDown to be called with proper duration
            expect($.fn.slideDown).toHaveBeenCalledWith(options["sliding-period"]);
        });

        /**
         * Checks that menu gets hidden on dropdown header click if it's already opened
         */
        it("Should hide menu items with slideUp effect on dropdown header click if menu is already opened", function () {
            spyOn($.fn, "slideDown").andCallThrough();
            spyOn($.fn, "slideUp").andCallThrough();

            // when clicking on dropdown header
            selected.click();

            // then expect slideDown to be called with proper duration
            expect($.fn.slideDown).toHaveBeenCalledWith(options["sliding-period"]);

            // when clicking on dropdown header again
            selected.click();

            // then expect slideUp to be called with proper duration
            expect($.fn.slideUp).toHaveBeenCalledWith(options["sliding-period"]);
        });

        /**
         * Checks that menu gets hidden on click outside menu
         */
        it("Should hide menu items with slideUp effect on click outside menu", function () {
            spyOn($.fn, "slideDown").andCallThrough();
            spyOn($.fn, "slideUp").andCallThrough();

            // when clicking on dropdown header
            selected.click();

            // then expect slideDown to be called with proper duration
            expect($.fn.slideDown).toHaveBeenCalledWith(options["sliding-period"]);

            // when clicking outside
            $('body').click();

            // then expect slideUp to be called with proper duration
            expect($.fn.slideUp).toHaveBeenCalledWith(options["sliding-period"]);
        });

        /**
         * Checks that menu items are hidden with slideDown effect on dropdown header click
         */
        it("Should hide menu items with slideUp effect on item selection", function () {
            spyOn($.fn, "slideUp");

            // when clicking on dropdown header
            items.first().click();

            // then expect slideDown to be called with proper duration
            expect($.fn.slideUp).toHaveBeenCalledWith(options["sliding-period"]);
        });
    });

    /**
     * Block of test to check utility functions.
     */
    describe("Utility function check", function () {
        var utils = $.fn.animatedDropdown.utils;

        /**
         * Block of test to check replacePlaceholders function
         */
        describe("replacePlaceholders function check", function () {

            /**
             * Checks that nothing is performed if null markup is passed and empty value is returned
             */
            it("Should do nothing if null markup is passed", function () {
                expect(utils.replacePlaceholders(null, {a: 1})).toEqual("");
            });

            /**
             * Checks that nothing is performed if undefined markup is passed and empty value  is returned
             */
            it("Should do nothing if undefined markup is passed", function () {
                expect(utils.replacePlaceholders(undefined, {a: 1})).toEqual("");
            });

            /**
             * Checks that nothing is performed if empty markup is passed and empty value is returned
             */
            it("Should do nothing if empty markup is passed", function () {
                expect(utils.replacePlaceholders("", {a: 1})).toEqual("");
            });

            /**
             * Checks that if empty key-values map is passed, then placeholders are replaced with empty values
             */
            it("Should do nothing if null key-values map is passed", function () {
                var markup = "<div class='%a%' id='%b%'>value is %c%</div>",
                    expected = "<div class='' id=''>value is </div>";
                expect(utils.replacePlaceholders(markup, null)).toEqual(expected);
            });

            /**
             * Checks that if empty key-values map is passed, then placeholders are replaced with empty values
             */
            it("Should do nothing if undefined key-values map is passed", function () {
                var markup = "<div class='%a%' id='%b%'>value is %c%</div>",
                    expected = "<div class='' id=''>value is </div>";
                expect(utils.replacePlaceholders(markup, undefined)).toEqual(expected);
            });

            /**
             * Checks that if empty key-values map is passed, then placeholders are replaced with empty values
             */
            it("Should do nothing if empty key-values map is passed", function () {
                var markup = "<div class='%a%' id='%b%'>value is %c%</div>",
                    expected = "<div class='' id=''>value is </div>";
                expect(utils.replacePlaceholders(markup, {})).toEqual(expected);
            });

            /**
             * Checks that all placeholders are correctly replaced
             */
            it("Should replace all placeholders correctly", function () {
                var markup = "<div class='%a%' id='%b%'>value is %c%</div>",
                    map = {
                        a: "my-class",
                        b: "my-id",
                        c: 1
                    },
                    expected = "<div class='my-class' id='my-id'>value is 1</div>";
                expect(utils.replacePlaceholders(markup, map)).toEqual(expected);
            });

            /**
             * Checks that all placeholders are correctly replaced, even if they are
             * specified several times
             */
            it("Should replace all placeholders even if they repeat", function () {
                var markup = "<div class='%a%' id='%b%'>value is %c%, id is '%b%', class is '%a%'</div>",
                    map = {
                        a: "my-class",
                        b: "my-id",
                        c: 1
                    },
                    expected = "<div class='my-class' id='my-id'>value is 1, id is 'my-id', class is 'my-class'</div>";
                expect(utils.replacePlaceholders(markup, map)).toEqual(expected);
            });

            /**
             * Checks that placeholders which are not specified in key-values map, are replaced with empty value
             */
            it("Should replace with empty value placeholders missed in key-values map", function () {
                var markup = "<div class='%a%' id='%b%'>value is %c%</div>",
                    map = {
                        a: "my-class",
                        c: 1
                    },
                    expected = "<div class='my-class' id=''>value is 1</div>";
                expect(utils.replacePlaceholders(markup, map)).toEqual(expected);
            });
        });

        /**
         * Block of test to check appendDropdownOptions function
         */
        describe("appendDropdownOptions function check", function () {

            var select,
                menu;

            /**
             * Loads fixture and stores reference to element.
             */
            beforeEach(function () {
                loadFixtures("animatedDropdown.customOptions.html");

                select = $("#select");

                select.after("<div id='menu'></div>");
                menu = $("#menu");
            });

            /**
             * Checks that nothing is performed if null markup is passed
             */
            it("Should do nothing if null element is passed", function () {
                // check that initially there is no elements in menu
                expect(menu.children().length).toEqual(0);

                // now calling for append function
                utils.appendDropdownOptions(null, menu, "<div id='appended'></div>", {});

                // then expect options not to be appended
                expect(menu.children().length).toEqual(0);
            });

            /**
             * Checks that nothing is performed if undefined markup is passed
             */
            it("Should do nothing if undefined element is passed", function () {
                // check that initially there is no elements in menu
                expect(menu.children().length).toEqual(0);

                // now calling for append function
                utils.appendDropdownOptions(undefined, menu, "<div id='appended'></div>", {});

                // then expect options not to be appended
                expect(menu.children().length).toEqual(0);
            });

            /**
             * Checks that nothing is performed if empty markup is passed
             */
            it("Should do nothing if empty jQuery reference is passed", function () {
                // check that initially there is no elements in menu
                expect(menu.children().length).toEqual(0);

                // now calling for append function
                utils.appendDropdownOptions($(".some-fake-selector"), menu, "<div id='appended'></div>", {});

                // then expect options not to be appended
                expect(menu.children().length).toEqual(0);
            });

            /**
             * Checks that nothing is performed if null menu is passed
             */
            it("Should do nothing if null menu is passed", function () {
                // check that initially there is no elements in menu
                expect(menu.children().length).toEqual(0);

                // now calling for append function
                utils.appendDropdownOptions(select, null, "<div id='appended'></div>", {});

                // then expect options not to be appended
                expect(menu.children().length).toEqual(0);
            });

            /**
             * Checks that nothing is performed if undefined menu is passed
             */
            it("Should do nothing if undefined menu is passed", function () {
                // check that initially there is no elements in menu
                expect(menu.children().length).toEqual(0);

                // now calling for append function
                utils.appendDropdownOptions(select, undefined,  "<div id='appended'></div>", {});

                // then expect options not to be appended
                expect(menu.children().length).toEqual(0);
            });

            /**
             * Checks that nothing is performed if empty menu is passed
             */
            it("Should do nothing if empty jQuery reference to menu is passed", function () {
                // check that initially there is no elements in menu
                expect(menu.children().length).toEqual(0);

                // now calling for append function
                utils.appendDropdownOptions(select, $(".some-fake-selector"), "<div id='appended'></div>", {});

                // then expect options not to be appended
                expect(menu.children().length).toEqual(0);
            });

            /**
             * Checks that nothing is performed if null markup is passed
             */
            it("Should do nothing if null markup is passed", function () {
                // check that initially there is no elements in menu
                expect(menu.children().length).toEqual(0);

                // now calling for append function
                utils.appendDropdownOptions(select, menu, null, {});

                // then expect options not to be appended
                expect(menu.children().length).toEqual(0);
            });

            /**
             * Checks that nothing is performed if undefined markup is passed
             */
            it("Should do nothing if undefined markup is passed", function () {
                // check that initially there is no elements in menu
                expect(menu.children().length).toEqual(0);

                // now calling for append function
                utils.appendDropdownOptions(select, menu, undefined, {});

                // then expect options not to be appended
                expect(menu.children().length).toEqual(0);
            });

            /**
             * Checks that nothing is performed if empty markup is passed
             */
            it("Should do nothing if empty markup is passed", function () {
                // check that initially there is no elements in menu
                expect(menu.children().length).toEqual(0);

                // now calling for append function
                utils.appendDropdownOptions(select, menu, "", {});

                // then expect options not to be appended
                expect(menu.children().length).toEqual(0);
            });

            /**
             * Checks that all options are appended to element
             */
            it("Should append all options to menu", function () {
                var expected = '<p data-value="1">First</p><p data-value="2">Second</p><p data-value="3">Third</p>';

                // check that initially there is only one element
                expect(menu.children().length).toEqual(0);

                // now calling for append function
                utils.appendDropdownOptions(select, menu, "<p></p>", {});

                // then expect optoins to be added correctly
                expect(menu.html()).toEqual(expected);
            });

            /**
             * Checks that options are appended with replaced placeholders in markup
             */
            it("Should append markup with replaced placeholders", function () {
                var expected = '<p class="test-class" data-value="1">First</p>' +
                    '<p class="test-class" data-value="2">Second</p>' +
                    '<p class="test-class" data-value="3">Third</p>';

                // check that initially there is only one element
                expect(menu.children().length).toEqual(0);

                // now calling for append function
                utils.appendDropdownOptions(select, menu, "<p class='%element-class%'></div>", {"element-class" : "test-class"});

                // then expect optoins to be added correctly
                expect(menu.children().length).toEqual(3);
                expect(menu.children("p.test-class").length).toEqual(3);
                expect(menu.children("p.test-class[data-value=1]").html()).toEqual("First");
                expect(menu.children("p.test-class[data-value=2]").html()).toEqual("Second");
                expect(menu.children("p.test-class[data-value=3]").html()).toEqual("Third");
            });
        });

        /**
         * Block of test to check appendPluginMarkup function
         */
        describe("appendPluginMarkup function check", function () {

            var wrapper,
                select;

            /**
             * Loads fixture and stores reference to element.
             */
            beforeEach(function () {
                loadFixtures("animatedDropdown.customOptions.html");

                wrapper = $("#wrapper");
                select = $("#select");
            });

            /**
             * Checks that nothing is performed if null markup is passed
             */
            it("Should do nothing if null element is passed", function () {
                // check that initially there is only one element
                expect(wrapper.children().length).toEqual(1);

                // now calling for append function
                utils.appendPluginMarkup(null, "<div id='appended'></div>", {});

                // then expect element not to be appended
                expect(wrapper.children().length).toEqual(1);
                expect(wrapper.children("#appended").length).toEqual(0);
            });

            /**
             * Checks that nothing is performed if undefined markup is passed and empty value  is returned
             */
            it("Should do nothing if undefined element is passed", function () {
                // check that initially there is only one element
                expect(wrapper.children().length).toEqual(1);

                // now calling for append function
                utils.appendPluginMarkup(undefined, "<div id='appended'></div>", {});

                // then expect element not to be appended
                expect(wrapper.children().length).toEqual(1);
                expect(wrapper.children("#appended").length).toEqual(0);
            });

            /**
             * Checks that nothing is performed if empty markup is passed and empty value is returned
             */
            it("Should do nothing if empty jQuery reference is passed", function () {
                // check that initially there is only one element
                expect(wrapper.children().length).toEqual(1);

                // now calling for append function
                utils.appendPluginMarkup($(".some-fake-selector"), "<div id='appended'></div>", {});

                // then expect element not to be appended
                expect(wrapper.children().length).toEqual(1);
                expect(wrapper.children("#appended").length).toEqual(0);
            });

            /**
             * Checks that nothing is performed if null markup is passed and empty value is returned
             */
            it("Should do nothing if null markup is passed", function () {
                // check that initially there is only one element
                expect(wrapper.children().length).toEqual(1);

                // now calling for append function
                utils.appendPluginMarkup(select, null, {});

                // then expect element not to be appended
                expect(wrapper.children().length).toEqual(1);
            });

            /**
             * Checks that nothing is performed if undefined markup is passed and empty value  is returned
             */
            it("Should do nothing if undefined markup is passed", function () {
                // check that initially there is only one element
                expect(wrapper.children().length).toEqual(1);

                // now calling for append function
                utils.appendPluginMarkup(select, undefined, {});

                // then expect element not to be appended
                expect(wrapper.children().length).toEqual(1);
            });

            /**
             * Checks that nothing is performed if empty markup is passed and empty value is returned
             */
            it("Should do nothing if empty markup is passed", function () {
                // check that initially there is only one element
                expect(wrapper.children().length).toEqual(1);

                // now calling for append function
                utils.appendPluginMarkup(select, "", {});

                // then expect element not to be appended
                expect(wrapper.children().length).toEqual(1);
            });

            /**
             * Checks that markup is appended just after the element
             */
            it("Should append markup just after the element", function () {
                // check that initially there is only one element
                expect(wrapper.children().length).toEqual(1);

                // now calling for append function
                utils.appendPluginMarkup(select, "<div id='appended'></div>", {});

                // then expect element not to be appended
                expect(wrapper.children().length).toEqual(2);
                expect(wrapper.children("#appended").length).toEqual(1);
                expect(select.next().length).toEqual(1);
            });

            /**
             * Checks that markup is appended with replaced placeholders
             */
            it("Should append markup with replaced placeholders", function () {
                // check that initially there is only one element
                expect(wrapper.children().length).toEqual(1);

                // now calling for append function
                utils.appendPluginMarkup(select, "<div id='%element-id%'></div>", {"element-id" : "appended"});

                // then expect element not to be appended
                expect(wrapper.children().length).toEqual(2);
                expect(wrapper.children("#appended").length).toEqual(1);
                expect(select.next().length).toEqual(1);
            });
        });

        /**
         * Block of test to check retrieveDataOptions function
         */
        describe("retrieveDataOptions function check", function () {

            /**
             * Checks that all values are retrieved from data-attribute correctly
             */
            it("Should correctly retrieve all options", function () {
                var expected = {
                        "hidden-element-class": "test-hidden",
                        "sliding-dropdown-container-class": "test-sliding-dropdown",
                        "sliding-dropdown-selected-selector": "test-span",
                        "sliding-dropdown-menu-selector": "test-ul",
                        "sliding-dropdown-options-selector": "test-li",
                        "sliding-dropdown-markup": '<div class="test"></div>',
                        "sliding-dropdown-option-markup": "<article></article>",
                        "sliding-period": 100
                    },
                    markup = "<div id='test' "
                        + "data-hidden-element-class='" + expected["hidden-element-class"] + "' "
                        + "data-sliding-dropdown-container-class='" + expected["sliding-dropdown-container-class"] + "' "
                        + "data-sliding-dropdown-selected-selector='" + expected["sliding-dropdown-selected-selector"] + "' "
                        + "data-sliding-dropdown-menu-selector='" + expected["sliding-dropdown-menu-selector"] + "' "
                        + "data-sliding-dropdown-options-selector='" + expected["sliding-dropdown-options-selector"] + "' "
                        + "data-sliding-dropdown-markup='" + expected["sliding-dropdown-markup"] + "' "
                        + "data-sliding-dropdown-option-markup='" + expected["sliding-dropdown-option-markup"] + "' "
                        + "data-sliding-period='" + expected["sliding-period"] + "' "
                        + "></div>",
                    body = $('body'),
                    element,
                    actual;

                body.append(markup);
                element = $("#test");

                // when calling for retrieveDataOptions method
                actual = utils.retrieveDataOptions(element);
                element.remove();

                // then expect to get the expected result
                expect(actual).toEqual(expected);
            });
        });
    });
});