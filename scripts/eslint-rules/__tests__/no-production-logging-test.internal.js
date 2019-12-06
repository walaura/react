/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */

'use strict';

const rule = require('../no-production-logging');
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('no-production-logging', rule, {
  valid: [
    {
      code: `
        if (__DEV__) {
          warning(test, 'Oh no');
        }
      `,
    },
    {
      code: `
        if (__DEV__) {
          warningWithoutStack(test, 'Oh no');
        }
      `,
    },
    {
      code: `
        if (__DEV__) {
          lowPriorityWarning(test, 'Oh no');
        }
      `,
    },
    {
      code: `
        if (__DEV__) {
          lowPriorityWarningWithoutStack(test, 'Oh no');
        }
      `,
    },
    // This is OK too because it's wrapped outside:
    {
      code: `
        if (__DEV__) {
          if (potato) {
            while (true) {
              warning(test, 'Oh no');
            }
          }
        }`,
    },
    {
      code: `
        var f;
        if (__DEV__) {
          f = function() {
            if (potato) {
              while (true) {
                warning(test, 'Oh no');
              }
            }
          };
        }`,
    },
    {
      code: `
        if (banana && __DEV__ && potato && kitten) {
          warning(test);
        }
      `,
    },
    // Don't do anything with these:
    {
      code: 'normalFunctionCall(test);',
    },
    {
      code: 'invariant(test);',
    },
    {
      code: `
        if (__DEV__) {
          normalFunctionCall(test);
        }
      `,
    },
  ],
  invalid: [
    {
      code: 'warning(test);',
      errors: [
        {
          message: `Wrap warning() in an "if (__DEV__) {}" check`,
        },
      ],
    },
    {
      code: 'warningWithoutStack(test)',
      errors: [
        {
          message: `Wrap warningWithoutStack() in an "if (__DEV__) {}" check`,
        },
      ],
    },
    {
      code: `
        if (potato) {
          warningWithoutStack(test);
        }
      `,
      errors: [
        {
          message: `Wrap warningWithoutStack() in an "if (__DEV__) {}" check`,
        },
      ],
    },
    {
      code: 'lowPriorityWarning(test);',
      errors: [
        {
          message: `Wrap lowPriorityWarning() in an "if (__DEV__) {}" check`,
        },
      ],
    },
    {
      code: 'lowPriorityWarningWithoutStack(test)',
      errors: [
        {
          message: `Wrap lowPriorityWarningWithoutStack() in an "if (__DEV__) {}" check`,
        },
      ],
    },
    {
      code: `
        if (potato) {
          lowPriorityWarningWithoutStack(test);
        }
      `,
      errors: [
        {
          message: `Wrap lowPriorityWarningWithoutStack() in an "if (__DEV__) {}" check`,
        },
      ],
    },
    {
      code: `
        if (__DEV__ || potato && true) {
          warning(test);
        }
      `,
      errors: [
        {
          message: `Wrap warning() in an "if (__DEV__) {}" check`,
        },
      ],
    },
    {
      code: `
        if (!__DEV__) {
          warning(test);
        }
      `,
      errors: [
        {
          message: `Wrap warning() in an "if (__DEV__) {}" check`,
        },
      ],
    },
    {
      code: `
        if (foo || x && __DEV__) {
          warning(test);
        }
      `,
      errors: [
        {
          message: `Wrap warning() in an "if (__DEV__) {}" check`,
        },
      ],
    },
  ],
});