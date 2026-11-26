# Changelog

## 2.0.1

### Changed

- Supports PHP 8.1 again, like Magento 2.4.6: the Adobe Commerce Marketplace requires modules to allow every PHP
  version of the Magento versions they support.
- The JavaScript follows the ESLint rules of the Magento coding standard, which the Marketplace checks as well;
  the behavior is unchanged.

## 2.0.0

### Breaking changes

- Requires Magento 2.4.6 or newer and PHP 8.2 or newer. Magento 2.4.4 and 2.4.5 and PHP 7.1 to 8.1 are no longer
  supported; use version 1.x for these.
- Requires `infrangible/m2-core` 5.0, `infrangible/m2-foundation` 3.0 and `fewedev/base` 2.4; before, the module used
  m2-core and fewedev/base without requiring them.
- The block has native types, and its constructor uses constructor property promotion.

### Fixed

- The option `productBundleContainerSelector` of the script is used; before, the script read it from the widget
  instead of its options, so the options of the form were always taken.
- A product page without bundle product no longer fails.

### Changed

- The module is loaded after the modules it uses.
- The script returns the widget that `$.widget()` creates.
- README.
- Checks with PHPStan level 9, the Magento coding standard and unit tests on every push.
