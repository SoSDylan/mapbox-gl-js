'use strict';

var parseColor = require('./parse_color');
var styleFunction = require('./style_function');

module.exports = StyleDeclaration;

function StyleDeclaration(reference, value) {
    this.type = reference.type;
    this.transitionable = reference.transition;
    this.value = value;

    // immutable representation of value. used for comparison
    this.json = JSON.stringify(this.value);

    var parsedValue = this.type === 'color' ? parseColor(this.value) : value;
    this.calculate = styleFunction.createBackwardsCompatible(reference, parsedValue);

    if (reference.function !== 'interpolated' && reference.transition) {
        this.calculate = transitioned(this.calculate);
    }
}

function transitioned(calculate) {
    return function(z, zh, duration) {
        var fraction = z % 1;
        var t = Math.min((Date.now() - zh.lastIntegerZoomTime) / duration, 1);
        var fromScale = 1;
        var toScale = 1;
        var mix, from, to;

        if (z > zh.lastIntegerZoom) {
            mix = fraction + (1 - fraction) * t;
            fromScale *= 2;
            from = calculate(z - 1);
            to = calculate(z);
        } else {
            mix = 1 - (1 - t) * fraction;
            to = calculate(z);
            from = calculate(z + 1);
            fromScale /= 2;
        }

        return {
            from: from,
            fromScale: fromScale,
            to: to,
            toScale: toScale,
            t: mix
        };
    };
}
