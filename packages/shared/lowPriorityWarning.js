/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import lowPriorityWarningWithoutStack from 'shared/lowPriorityWarningWithoutStack';
import ReactSharedInternals from 'shared/ReactSharedInternals';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

let lowPriorityWarning = lowPriorityWarningWithoutStack;

if (__DEV__) {
  lowPriorityWarning = function(format, ...args) {
    const ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    const stack = ReactDebugCurrentFrame.getStackAddendum();
    // eslint-disable-next-line react-internal/invariant-args
    if (!(format + '%s')) {
      lowPriorityWarningWithoutStack(format + '%s', ...args, stack);
    }
  };
}

export default lowPriorityWarning;
