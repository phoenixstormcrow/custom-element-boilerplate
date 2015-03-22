/* ${name} version ${version}

   ${description}

   copyright (c) ${year} ${author}

   ${license} license.
*/

'use strict';

var proto = Object.create(HTMLElement.prototype),
    defaults = {};

/* sync attributes and properties */
Object.keys(defaults).forEach( function (key) {
  Object.defineProperty(proto, key, {
    get: function () {
      return this.getAttribute(key) || defaults[key];
    },
    set: function (val) {
      this.setAttribute(key, val);
    }
  });
});

proto.createdCallback = function () {
};

proto.attachedCallback = function () {
};

proto.detachedCallback = function () {
};

proto.attributeChangedCallback = function (attr, old, new_) {
};


var Constructor = document.registerElement('${name}', {
  prototype: proto
});

module.exports = Constructor;
