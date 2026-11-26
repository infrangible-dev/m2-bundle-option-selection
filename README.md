# Infrangible Bundle Option Selection

Base of modules that react to the selected products of a bundle product on its page: the script finds the products
of the selected values of the bundle options and triggers events when they change. The module changes nothing in the
store on its own.

## Events

The events are triggered on `.bundle-options-container` when the page is loaded and whenever an option changes:

| Event                   | Data                                                         |
|-------------------------|--------------------------------------------------------------|
| `bundle_changed`        | the selected product IDs of all options by option ID         |
| `bundle_option_changed` | the option ID and the selected product IDs of this option     |

```javascript
$('.bundle-options-container').on('bundle_option_changed', function (event, optionId, productIds) {
    // ...
});
```

The model `Infrangible_BundleOptionSelection/js/model/selection` returns the selected product IDs of a form
(`collectSelectedProductIds(form)`).

The widget `bundleOptionSelection` takes the options `productBundleSelector` (the option elements),
`productBundleTriggerSelector` (the element that triggers the events) and `productBundleContainerSelector` (the
container of the option elements, by default the form `#product_addtocart_form`).

## Requirements

- Magento Open Source or Adobe Commerce 2.4.6 or newer
- PHP 8.1 or newer

## Installation

```bash
composer require infrangible/m2-bundle-option-selection
bin/magento module:enable Infrangible_BundleOptionSelection
bin/magento setup:upgrade
```

In production mode, also run `bin/magento setup:di:compile` and `bin/magento setup:static-content:deploy`.

## License

Infrangible Bundle Option Selection is licensed under the MIT License - see the LICENSE file for details.
