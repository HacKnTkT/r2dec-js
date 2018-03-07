/* 
 * Copyright (C) 2017-2018 deroad
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

module.exports = (function() {

    const escape = require('./escape');

    var _colortheme = {};

    var _set_color = function(color) {
        var f = function(text) {
            var rgb = arguments.callee.color;
            if (rgb == 'reset') {
                return escape(text);
            }
            return '<span style="color: ' + rgb + '">' + escape(text) + '</span>';
        };
        f.color = color;
        return f;
    };

    var _apply_theme = function(object) {
        for (var key in object) {
            _html_colors[key] = _set_color(object[key]);
        }
    };

    var _html_colors = {
        setTheme: function(object) {
            _apply_theme(object);
        },
    };
    return _html_colors;
})();