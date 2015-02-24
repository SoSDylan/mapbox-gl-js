'use strict';

var LineVertexBuffer = require('./line_vertex_buffer');
var LineElementBuffer = require('./line_element_buffer');
var FillVertexBuffer = require('./fill_vertex_buffer');
var FillElementBuffer = require('./fill_elements_buffer');
var OutlineElementBuffer = require('./outline_elements_buffer');
var GlyphVertexBuffer = require('./glyph_vertex_buffer');
var IconVertexBuffer = require('./icon_vertex_buffer');
var PlacementBoxVertexBuffer = require('./placement_box_vertex_buffer');
var GlyphFadeBuffer = require('./symbol_fade_buffer');
var IconFadeBuffer = require('./symbol_fade_buffer');

module.exports = function(bufferset) {
    bufferset = bufferset || {};
    return {
        glyphVertex: new GlyphVertexBuffer(bufferset.glyphVertex),
        iconVertex: new IconVertexBuffer(bufferset.iconVertex),
        fillVertex: new FillVertexBuffer(bufferset.fillVertex),
        fillElement: new FillElementBuffer(bufferset.fillElement),
        outlineElement: new OutlineElementBuffer(bufferset.outlineElement),
        lineVertex: new LineVertexBuffer(bufferset.lineVertex),
        lineElement: new LineElementBuffer(bufferset.lineElement),
        placementBoxVertex: new PlacementBoxVertexBuffer(bufferset.placementBoxVertex),
        glyphFade: new GlyphFadeBuffer(bufferset.glyphFade),
        iconFade: new IconFadeBuffer(bufferset.iconFade)
    };
};
