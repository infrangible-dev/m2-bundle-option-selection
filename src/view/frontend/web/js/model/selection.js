/**
 * @author      Andreas Knollmann
 * @copyright   2014-2025 Softwareentwicklung Andreas Knollmann
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

        setOptions: function(options) {
            this.options = options;
        },

        collectSelectedProductIds: function(form, productBundleSelector) {
            if (productBundleSelector === undefined) {
                productBundleSelector = defaultProductBundleSelector;
            }

            const options = $(productBundleSelector, form);

            return this.getCollectSelectedProductIds(options);
        },

        getCollectSelectedProductIds: function(options) {
            const self = this;
            const selectedProductIds = {};

            options.each(function() {
                const option = $(this);
                const optionId = utils.findOptionId(option[0]);
                const optionValueSelectedProductIds = self.getOptionValueSelectedProductIds(option);

                if (! (optionId in selectedProductIds)) {
                    selectedProductIds[optionId] = [];
                }

                $.each(optionValueSelectedProductIds, function(key, selectedProductId) {
                    selectedProductIds[optionId].push(selectedProductId);
                });
            });

            return selectedProductIds;
        },

        getOptionValueSelectedProductIds: function(option) {
            const self = this;

            const optionType = option.prop('type');
            const optionId = utils.findOptionId(option[0]);
            const optionValue = option.val() || null;

            const optionValueSelectedProductIds = [];

            if (optionValue) {
                const optionIndex = self.options.index[optionId];

                if (optionIndex) {
                    let selectedProductId;

                    switch (optionType) {
                        case 'select-one':
                        case 'hidden':
                            selectedProductId = optionIndex[optionValue];
                            if (selectedProductId) {
                                optionValueSelectedProductIds.push(selectedProductId);
                            }
                            break;

                        case 'select-multiple':
                            if (Array.isArray(optionValue)) {
                                $.each(optionValue, function(key, optionValueValue) {
                                    selectedProductId = optionIndex[optionValueValue];
                                    if (selectedProductId) {
                                        optionValueSelectedProductIds.push(selectedProductId);
                                    }
                                });
                            }
                            break;

                        case 'radio':
                        case 'checkbox':
                            if (option.is(':checked')) {
                                selectedProductId = optionIndex[optionValue];
                                if (selectedProductId) {
                                    optionValueSelectedProductIds.push(selectedProductId);
                                }
                            }
                            break;
                    }
                }
            }

            if (! (optionId in self.cache)) {
                self.cache[optionId] = [];
            }

            self.cache[optionId][optionValue] = [];

            $.each(optionValueSelectedProductIds, function(key, selectedProductId) {
                self.cache[optionId][optionValue].push(selectedProductId);
            });

            return optionValueSelectedProductIds;
        }
    };
});
