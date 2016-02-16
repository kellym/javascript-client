/* @flow */'use strict';

var findIndex = require('../utils/binarySearch').bind(null, [1000, 1500, 2250, 3375, 5063, 7594, 11391, 17086, 25629, 38443, 57665, 86498, 129746, 194620, 291929, 437894, 656841, 985261, 1477892, 2216838, 3325257, 4987885, 7481828]);

function Collector() {
  this.clear();
}

// Latency counters based on the internal ranges
Collector.prototype.counters = function () /*: Array<number> */{
  return this.counter;
};

// Store latency and return the number of occurrencies inside the range
// defined
Collector.prototype.track = function (latency /*: number */) /*: number */{
  return ++this.counter[findIndex(latency)];
};

// Recycle the collector (reset using 0 for all the counters)
Collector.prototype.clear = function () /*: Collector */{
  this.counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return this;
};

// Hook JSON.stringify to expose the state of the counters
Collector.prototype.toJSON = function () {
  return this.counter;
};

module.exports = Collector;
//# sourceMappingURL=index.js.map