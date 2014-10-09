/*
 * animatedDropdown
 * https://github.com/schcrabicus/animated-dropdown
 *
 * Copyright (c) 2014 schCRABicus
 * Licensed under the MIT license.
 */

(function ($) {

    "use strict";

    var
        /**
         * Set of default options.
         *
         * @static
         * @type {{}}
         */
        defaults = {
            "hidden-element-class": "hidden",
            "animated-dropdown-container-class": "animated-dropdown",
            "animated-dropdown-selected-selector": "span",
            "animated-dropdown-selected-content-selector": "span",
            "animated-dropdown-menu-selector": "ul",
            "animated-dropdown-options-selector": "li",
            "animated-dropdown-markup": "<div class='%animated-dropdown-container-class%'>" +
                "<span><span>%selected%</span></span>" +
                "<ul></ul>" +
                "</div>",
            "animated-dropdown-option-markup": "<li></li>",
            "animated-period": 500
        };

    /**
     * Plugin definition - collection method.
     *
     * @param o     Plugin options.
     * @returns {*}
     */
    $.fn.animatedDropdown = function (o) {

        return this.each(function () {
            var
                /**
                 * jQuery reference to select element being wrapped by plugin
                 *
                 * @type {*|HTMLElement}
                 */
                that = $(this),

                /**
                 * Utilities object
                 *
                 * @type {{}|jQuery.fn.autocompletefnd.utils|*}
                 */
                utils = $.animatedDropdown.utils,

                /**
                 * Plugin options.
                 */
                options = $.extend({}, defaults, utils.retrieveDataOptions(that), o),

                /**
                 * Plugin markup to be inserted
                 */
                pluginMarkup = options["animated-dropdown-markup"],

                /**
                 * Markup for menu elements
                 */
                itemMarkup = options["animated-dropdown-option-markup"],

                /**
                 * Inserted markup container
                 */
                container,

                /**
                 * Selected element
                 */
                selected,

                /**
                 * Selected content element
                 */
                selectedContent,

                /**
                 * Menu with drop down options
                 */
                menu,

                /**
                 * animated drop down options.
                 */
                items;

            that.addClass(options["hidden-element-class"]);

            /* adding markup just after real select element */
            utils.appendPluginMarkup(that, pluginMarkup, options);

            container = that.next("." + options["animated-dropdown-container-class"]);
            selected = container.find(options["animated-dropdown-selected-selector"]);
            selectedContent = selected.find(options["animated-dropdown-selected-content-selector"]);
            menu = container.find(options["animated-dropdown-menu-selector"]);

            /* adding options */
            utils.appendDropdownOptions(that, menu, itemMarkup, options);
            items = menu.find(options["animated-dropdown-options-selector"]);

            /* setting correct selected value */
            selectedContent.html(that.find('option[value="' + that.val() + '"]').html());

            /* binding click event to drop down header to open menu with animated effect */
            selected.click(function () {
                var effect = menu.is(":visible") ? $.fn.slideUp : $.fn.slideDown;
                effect.call(menu, options["animated-period"]);
            });

            /* on external change, synchronize current selection is header */
            that.on('manual-change', function () {
                selected.html(that.find('option[value="' + that.val() + '"]').html());
            });

            /* binding click event to each menu item */
            items.each(function (i, item) {
                var $item = $(item),
                    value = $item.data('value'),
                    html = $item.html();

                $item.click(function () {
                    selectedContent.html(html);
                    that.val(value).select().change();
                    menu.slideUp(options["animated-period"]);
                });
            });

            $(document).click(function (e) {
                var target = $(e.target),
                    isMenuSelected = (target[0] === menu[0] || target[0] === selected[0]),
                    isMenuVisible = menu.is(":visible");

                if (!isMenuSelected && isMenuVisible) {
                    menu.slideUp(options["animated-period"]);
                }
            });
        });
    };

    /**
     * Set of functions for animatedDropdown plugin.
     *
     * @static
     * @type {{}}
     */
    $.animatedDropdown = {
        utils: {

            /**
             * Function to retrieve data-options, corresponding to defaults,
             * from element data- attributes.
             *
             * @param element {jQuery} jQuery reference to element to retrieve options from.
             * @returns {{}} Map of property keys and values, extracted from data-attributes.
             */
            retrieveDataOptions: function (element) {
                var result = {},
                    option,
                    value;

                for (option in defaults) {
                    if (defaults.hasOwnProperty(option) && (value = element.data(option))) {
                        result[option] = value;
                    }
                }

                return result;
            },

            /**
             * Replaces placeholders in the markup with values with the corresponding keys
             * in options map.
             *
             * @param markup    Html markup.
             * @param options   Key-value map where to get placeholder values.
             */
            replacePlaceholders: function (markup, options) {
                return markup ? markup.replace(/%(.*?)%/gim, function (s, k) {
                    return options ? options[k] || "" : "";
                }) : "";
            },

            /**
             * Appends plugin markup just after element
             *
             * @param select    Select element to append markup to
             * @param markup    Plugin markup to append
             * @param options   Plugin options
             */
            appendPluginMarkup: function (select, markup, options) {
                if (select && select.length && markup) {
                    select.after(this.replacePlaceholders(markup, options));
                }
            },

            /**
             * Appends dropdown options with corresponding data- attributes and display values.
             *
             * @param select    Select element to append markup to
             * @param menu      Menu jQuery reference in plugin markup where to append options to
             * @param markup    Markup
             * @param options   Options
             */
            appendDropdownOptions: function (select, menu, markup, options) {
                var that = this;

                if (select && select.length && menu && menu.length && markup) {
                    $.each(select.find('option'), function () {
                        var option = $(this),
                            v = option.attr('value'),
                            h = option.html();

                        menu.append(that.replacePlaceholders(markup, options));

                        menu.children().last().attr('data-value', v).html(h);
                    });
                }
            }
        }
    };

    // Custom selector.
    /**
     * Custom selector to enable selector ':animatedDropdown'
     * 
     * @param elem
     * @returns {boolean}
     */
    $.expr[':'].animatedDropdown = function (elem) {
        // Is this element animated dropdown?
        return $(elem).text().indexOf('awesome') !== -1;
    };

}(jQuery));
