/* 
 * Copyright (C) 2018 deroad
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

    var _regex = /["'&<>]/;

    var escape_html = function(string) {
        var str = '' + string;
        var match = _regex.exec(str);

        if (!match) {
            return str;
        }

        var escape;
        var html = '';
        var index = 0;
        var last_index = 0;

        for (index = match.index; index < str.length; index++) {
            switch (str.charCodeAt(index)) {
                case 34: // "
                    escape = '&quot;';
                    break;
                case 38: // &
                    escape = '&amp;';
                    break;
                case 39: // '
                    escape = '&#39;';
                    break;
                case 60: // <
                    escape = '&lt;';
                    break;
                case 62: // >
                    escape = '&gt;';
                    break;
                default:
                    continue;
            }

            if (last_index !== index) {
                html += str.substring(last_index, index);
            }

            last_index = index + 1;
            html += escape;
        }

        return last_index !== index ? (html + str.substring(last_index, index)) : html;
    }
    return function(text) {
        return escape_html(text);
    };
})();