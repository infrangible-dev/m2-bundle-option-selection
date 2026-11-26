/**
 * @author      Andreas Knollmann
 * @copyright   Copyright (c) 2014-2026 Softwareentwicklung Andreas Knollmann
 * @license     http://www.opensource.org/licenses/mit-license.php MIT
 */

define([
    'jquery',
    'ko',
    'underscore',
    'priceUtils',
    'domReady!'
], function ($, ko, _, utils) {
    'use strict';

    const defaultProductBundleSelector = 'input.bundle.option, select.bundle.option, textarea.bundle.option';

    return {
        cache: {},
        options: {
            index: {}
        },

        setOptions: function (options) {
            this.options = options;
        },

        collectSelectedProductIds: function (form, productBundleSelector) {
            if (productBundleSelector === undefined) {
                productBundleSelector = defaultProductBundleSelector;
            }

            const options = $(productBundleSelector, form);

            return this.getCollectSelectedProductIds(options);
        },

        getCollectSelectedProductIds: function (options) {
            const self = this,
                selectedProductIds = {};

            options.each(function () {
                const option = $(this),
                    optionId = utils.findOptionId(option[0]),
                    optionValueSelectedProductIds = self.getOptionValueSelectedProductIds(option);

                if (!(optionId in selectedProductIds)) {
                    selectedProductIds[optionId] = [];
                }

                $.each(optionValueSelectedProductIds, function (key, selectedProductId) {
                    selectedProductIds[optionId].push(selectedProductId);
                });
            });

            return selectedProductIds;
        },

        getOptionValueSelectedProductIds: function (option) {
            const self = this,
                optionId = utils.findOptionId(option[0]),
                optionValue = option.val() || null,
                optionIndex = optionValue ? self.options.index[optionId] : undefined,
                optionValueSelectedProductIds = optionIndex ?
                    self.findSelectedProductIds(option, optionIndex, optionValue) : [];

            if (!(optionId in self.cache)) {
                self.cache[optionId] = [];
            }

            self.cache[optionId][optionValue] = [];

            $.each(optionValueSelectedProductIds, function (key, selectedProductId) {
                self.cache[optionId][optionValue].push(selectedProductId);
            });

            return optionValueSelectedProductIds;
        },

        /**
         * Returns the IDs of the products that the value of the option selects, by the type of the option.
         *
         * @param {jQuery} option
         * @param {Object<string, string>} optionIndex the product IDs by option value
         * @param {string|Array<string>} optionValue
         * @returns {Array<string>}
         */
        findSelectedProductIds: function (option, optionIndex, optionValue) {
            let values = [];

            switch (option.prop('type')) {
            case 'select-one':
            case 'hidden':
                values = [optionValue];
                break;

            case 'select-multiple':
                values = Array.isArray(optionValue) ? optionValue : [];
                break;

            case 'radio':
            case 'checkbox':
                values = option.is(':checked') ? [optionValue] : [];
                break;
            }

            return values.map(function (value) {
                return optionIndex[value];
            }).filter(function (selectedProductId) {
                return !!selectedProductId;
            });
        }
    };
});
