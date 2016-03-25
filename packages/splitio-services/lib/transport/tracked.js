'use strict';

/**
Copyright 2016 Split Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/

require('isomorphic-fetch');

// @TOOD WIP
function TrackedRequest(tracker) {
  return function RequestFactory(request /*: Request */) /*: Promise */{
    var stop = tracker.timer('request').start();

    return fetch(request).then(function (response) {
      tracker.counter(response.status).inc();
    }).then(function (response) {
      return response.json();
    }).then(function (object) {
      stop();

      return object;
    }).catch(function () {
      // tracker.counter(response.status).inc();
      stop();

      return undefined;
    });
  };
}

module.exports = TrackedRequest;
//# sourceMappingURL=tracked.js.map