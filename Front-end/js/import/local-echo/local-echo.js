/* eslint-disable */
var LocalEchoController = (function(t) {
  var r = {};
  function e(n) {
    if (r[n]) return r[n].exports;
    var i = (r[n] = { i: n, l: !1, exports: {} });
    return t[n].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
  }
  return (
    (e.m = t),
    (e.c = r),
    (e.d = function(t, r, n) {
      e.o(t, r) || Object.defineProperty(t, r, { enumerable: !0, get: n });
    }),
    (e.r = function(t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (e.t = function(t, r) {
      if ((1 & r && (t = e(t)), 8 & r)) return t;
      if (4 & r && 'object' == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if ((e.r(n), Object.defineProperty(n, 'default', { enumerable: !0, value: t }), 2 & r && 'string' != typeof t))
        for (var i in t)
          e.d(
            n,
            i,
            function(r) {
              return t[r];
            }.bind(null, i)
          );
      return n;
    }),
    (e.n = function(t) {
      var r =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return e.d(r, 'a', r), r;
    }),
    (e.o = function(t, r) {
      return Object.prototype.hasOwnProperty.call(t, r);
    }),
    (e.p = ''),
    e((e.s = 7))
  );
})([
  function(t, r, e) {
    var n = void 0 !== typeof JSON ? JSON : e(1),
      i = e(4),
      s = e(5),
      o = e(6);
    r.quote = function(t) {
      return i(t, function(t) {
        return t && 'object' == typeof t
          ? t.op.replace(/(.)/g, '\\$1')
          : /["\s]/.test(t) && !/'/.test(t)
          ? "'" + t.replace(/(['\\])/g, '\\$1') + "'"
          : /["'\s]/.test(t)
          ? '"' + t.replace(/(["\\$`!])/g, '\\$1') + '"'
          : String(t).replace(/([#!"$&'()*,:;<=>?@\[\\\]^`{|}])/g, '\\$1');
      }).join(' ');
    };
    for (
      var u = '(?:' + ['\\|\\|', '\\&\\&', ';;', '\\|\\&', '[&;()|<>]'].join('|') + ')',
        a = '(\\\\[\'"|&;()<> \\t]|[^\\s\'"|&;()<> \\t])+',
        c = '"((\\\\"|[^"])*?)"',
        h = "'((\\\\'|[^'])*?)'",
        l = '',
        f = 0;
      f < 4;
      f++
    )
      l += (Math.pow(16, 8) * Math.random()).toString(16);
    r.parse = function(t, r, e) {
      var f = (function(t, r, e) {
        var o = new RegExp(['(' + u + ')', '(' + a + '|' + c + '|' + h + ')*'].join('|'), 'g'),
          f = s(t.match(o), Boolean),
          p = !1;
        if (!f) return [];
        r || (r = {});
        e || (e = {});
        return i(f, function(t, i) {
          if (!p) {
            if (RegExp('^' + u + '$').test(t)) return { op: t };
            for (var s = e.escape || '\\', o = !1, a = !1, c = '', h = !1, v = 0, m = t.length; v < m; v++) {
              var y = t.charAt(v);
              if (((h = h || (!o && ('*' === y || '?' === y))), a)) (c += y), (a = !1);
              else if (o)
                y === o
                  ? (o = !1)
                  : "'" == o
                  ? (c += y)
                  : y === s
                  ? ((v += 1), (y = t.charAt(v)), (c += '"' === y || y === s || '$' === y ? y : s + y))
                  : (c += '$' === y ? d() : y);
              else if ('"' === y || "'" === y) o = y;
              else {
                if (RegExp('^' + u + '$').test(y)) return { op: t };
                if (RegExp('^#$').test(y))
                  return (
                    (p = !0),
                    c.length
                      ? [c, { comment: t.slice(v + 1) + f.slice(i + 1).join(' ') }]
                      : [{ comment: t.slice(v + 1) + f.slice(i + 1).join(' ') }]
                  );
                y === s ? (a = !0) : (c += '$' === y ? d() : y);
              }
            }
            return h ? { op: 'glob', pattern: c } : c;
          }
          function d() {
            var e, i;
            if (((v += 1), '{' === t.charAt(v))) {
              if (((v += 1), '}' === t.charAt(v))) throw new Error('Bad substitution: ' + t.substr(v - 2, 3));
              if ((e = t.indexOf('}', v)) < 0) throw new Error('Bad substitution: ' + t.substr(v));
              (i = t.substr(v, e - v)), (v = e);
            } else /[*@#?$!_\-]/.test(t.charAt(v)) ? ((i = t.charAt(v)), (v += 1)) : (e = t.substr(v).match(/[^\w\d_]/)) ? ((i = t.substr(v, e.index)), (v += e.index - 1)) : ((i = t.substr(v)), (v = t.length));
            return (function(t, e, i) {
              var s = 'function' == typeof r ? r(i) : r[i];
              void 0 === s && (s = '');
              return 'object' == typeof s ? e + l + n.stringify(s) + l : e + s;
            })(0, '', i);
          }
        }).reduce(function(t, r) {
          return void 0 === r ? t : t.concat(r);
        }, []);
      })(t, r, e);
      return 'function' != typeof r
        ? f
        : o(
            f,
            function(t, r) {
              if ('object' == typeof r) return t.concat(r);
              var e = r.split(RegExp('(' + l + '.*?' + l + ')', 'g'));
              return 1 === e.length
                ? t.concat(e[0])
                : t.concat(
                    i(s(e, Boolean), function(t) {
                      return RegExp('^' + l).test(t) ? n.parse(t.split(l)[1]) : t;
                    })
                  );
            },
            []
          );
    };
  },
  function(t, r, e) {
    (r.parse = e(2)), (r.stringify = e(3));
  },
  function(t, r) {
    var e,
      n,
      i,
      s,
      o = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' },
      u = function(t) {
        throw { name: 'SyntaxError', message: t, at: e, text: i };
      },
      a = function(t) {
        return t && t !== n && u("Expected '" + t + "' instead of '" + n + "'"), (n = i.charAt(e)), (e += 1), n;
      },
      c = function() {
        var t,
          r = '';
        for ('-' === n && ((r = '-'), a('-')); n >= '0' && n <= '9'; ) (r += n), a();
        if ('.' === n) for (r += '.'; a() && n >= '0' && n <= '9'; ) r += n;
        if ('e' === n || 'E' === n)
          for (r += n, a(), ('-' !== n && '+' !== n) || ((r += n), a()); n >= '0' && n <= '9'; ) (r += n), a();
        if (((t = +r), isFinite(t))) return t;
        u('Bad number');
      },
      h = function() {
        var t,
          r,
          e,
          i = '';
        if ('"' === n)
          for (; a(); ) {
            if ('"' === n) return a(), i;
            if ('\\' === n)
              if ((a(), 'u' === n)) {
                for (e = 0, r = 0; r < 4 && ((t = parseInt(a(), 16)), isFinite(t)); r += 1) e = 16 * e + t;
                i += String.fromCharCode(e);
              } else {
                if ('string' != typeof o[n]) break;
                i += o[n];
              }
            else i += n;
          }
        u('Bad string');
      },
      l = function() {
        for (; n && n <= ' '; ) a();
      };
    (s = function() {
      switch ((l(), n)) {
        case '{':
          return (function() {
            var t,
              r = {};
            if ('{' === n) {
              if ((a('{'), l(), '}' === n)) return a('}'), r;
              for (; n; ) {
                if (
                  ((t = h()),
                  l(),
                  a(':'),
                  Object.hasOwnProperty.call(r, t) && u('Duplicate key "' + t + '"'),
                  (r[t] = s()),
                  l(),
                  '}' === n)
                )
                  return a('}'), r;
                a(','), l();
              }
            }
            u('Bad object');
          })();
        case '[':
          return (function() {
            var t = [];
            if ('[' === n) {
              if ((a('['), l(), ']' === n)) return a(']'), t;
              for (; n; ) {
                if ((t.push(s()), l(), ']' === n)) return a(']'), t;
                a(','), l();
              }
            }
            u('Bad array');
          })();
        case '"':
          return h();
        case '-':
          return c();
        default:
          return n >= '0' && n <= '9'
            ? c()
            : (function() {
                switch (n) {
                  case 't':
                    return a('t'), a('r'), a('u'), a('e'), !0;
                  case 'f':
                    return a('f'), a('a'), a('l'), a('s'), a('e'), !1;
                  case 'n':
                    return a('n'), a('u'), a('l'), a('l'), null;
                }
                u("Unexpected '" + n + "'");
              })();
      }
    }),
      (t.exports = function(t, r) {
        var o;
        return (
          (i = t),
          (e = 0),
          (n = ' '),
          (o = s()),
          l(),
          n && u('Syntax error'),
          'function' == typeof r
            ? (function t(e, n) {
                var i,
                  s,
                  o = e[n];
                if (o && 'object' == typeof o)
                  for (i in o)
                    Object.prototype.hasOwnProperty.call(o, i) && (void 0 !== (s = t(o, i)) ? (o[i] = s) : delete o[i]);
                return r.call(e, n, o);
              })({ '': o }, '')
            : o
        );
      });
  },
  function(t, r) {
    var e,
      n,
      i,
      s = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      o = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' };
    function u(t) {
      return (
        (s.lastIndex = 0),
        s.test(t)
          ? '"' +
            t.replace(s, function(t) {
              var r = o[t];
              return 'string' == typeof r ? r : '\\u' + ('0000' + t.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
          : '"' + t + '"'
      );
    }
    t.exports = function(t, r, s) {
      var o;
      if (((e = ''), (n = ''), 'number' == typeof s)) for (o = 0; o < s; o += 1) n += ' ';
      else 'string' == typeof s && (n = s);
      if (((i = r), r && 'function' != typeof r && ('object' != typeof r || 'number' != typeof r.length)))
        throw new Error('JSON.stringify');
      return (function t(r, s) {
        var o,
          a,
          c,
          h,
          l,
          f = e,
          p = s[r];
        switch (
          (p && 'object' == typeof p && 'function' == typeof p.toJSON && (p = p.toJSON(r)),
          'function' == typeof i && (p = i.call(s, r, p)),
          typeof p)
        ) {
          case 'string':
            return u(p);
          case 'number':
            return isFinite(p) ? String(p) : 'null';
          case 'boolean':
          case 'null':
            return String(p);
          case 'object':
            if (!p) return 'null';
            if (((e += n), (l = []), '[object Array]' === Object.prototype.toString.apply(p))) {
              for (h = p.length, o = 0; o < h; o += 1) l[o] = t(o, p) || 'null';
              return (
                (c =
                  0 === l.length ? '[]' : e ? '[\n' + e + l.join(',\n' + e) + '\n' + f + ']' : '[' + l.join(',') + ']'),
                (e = f),
                c
              );
            }
            if (i && 'object' == typeof i)
              for (h = i.length, o = 0; o < h; o += 1)
                'string' == typeof (a = i[o]) && (c = t(a, p)) && l.push(u(a) + (e ? ': ' : ':') + c);
            else
              for (a in p)
                Object.prototype.hasOwnProperty.call(p, a) && (c = t(a, p)) && l.push(u(a) + (e ? ': ' : ':') + c);
            return (
              (c =
                0 === l.length ? '{}' : e ? '{\n' + e + l.join(',\n' + e) + '\n' + f + '}' : '{' + l.join(',') + '}'),
              (e = f),
              c
            );
        }
      })('', { '': t });
    };
  },
  function(t, r) {
    t.exports = function(t, r) {
      if (t.map) return t.map(r);
      for (var n = [], i = 0; i < t.length; i++) {
        var s = t[i];
        e.call(t, i) && n.push(r(s, i, t));
      }
      return n;
    };
    var e = Object.prototype.hasOwnProperty;
  },
  function(t, r) {
    t.exports = function(t, r) {
      if (t.filter) return t.filter(r);
      for (var n = [], i = 0; i < t.length; i++) e.call(t, i) && r(t[i], i, t) && n.push(t[i]);
      return n;
    };
    var e = Object.prototype.hasOwnProperty;
  },
  function(t, r) {
    var e = Object.prototype.hasOwnProperty;
    t.exports = function(t, r, n) {
      var i = arguments.length >= 3;
      if (i && t.reduce) return t.reduce(r, n);
      if (t.reduce) return t.reduce(r);
      for (var s = 0; s < t.length; s++) e.call(t, s) && (i ? (n = r(n, t[s], s)) : ((n = t[s]), (i = !0)));
      return n;
    };
  },
  function(t, r, e) {
    'use strict';
    function n(t, r) {
      for (var e = 0; e < r.length; e++) {
        var n = r[e];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          'value' in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n);
      }
    }
    e.r(r);
    var i = (function() {
        function t(r) {
          !(function(t, r) {
            if (!(t instanceof r)) throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this.size = r),
            (this.entries = []),
            (this.cursor = 0);
        }
        return (
          (function(t, r, e) {
            r && n(t.prototype, r), e && n(t, e);
          })(t, [
            {
              key: 'push',
              value: function(t) {
                '' !== t.trim() &&
                  t != this.entries[this.entries.length - 1] &&
                  (this.entries.push(t),
                  this.entries.length > this.size && this.entries.pop(0),
                  (this.cursor = this.entries.length));
              }
            },
            {
              key: 'rewind',
              value: function() {
                this.cursor = this.entries.length;
              }
            },
            {
              key: 'getPrevious',
              value: function() {
                var t = Math.max(0, this.cursor - 1);
                return (this.cursor = t), this.entries[t];
              }
            },
            {
              key: 'getNext',
              value: function() {
                var t = Math.min(this.entries.length, this.cursor + 1);
                return (this.cursor = t), this.entries[t];
              }
            }
          ]),
          t
        );
      })(),
      s = e(0);
    function o(t) {
      return (
        (function(t) {
          if (Array.isArray(t)) {
            for (var r = 0, e = new Array(t.length); r < t.length; r++) e[r] = t[r];
            return e;
          }
        })(t) ||
        (function(t) {
          if (Symbol.iterator in Object(t) || '[object Arguments]' === Object.prototype.toString.call(t))
            return Array.from(t);
        })(t) ||
        (function() {
          throw new TypeError('Invalid attempt to spread non-iterable instance');
        })()
      );
    }
    function u(t) {
      for (
        var r, e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = [], i = /\w+/g;
        (r = i.exec(t));

      )
        e ? n.push(r.index) : n.push(r.index + r[0].length);
      return n;
    }
    function a(t, r) {
      var e = u(t, !0)
        .reverse()
        .find(function(t) {
          return t < r;
        });
      return null == e ? 0 : e;
    }
    function c(t, r, e) {
      for (var n = 0, i = 0, s = 0; s < r; ++s) {
        '\n' == t.charAt(s) ? ((i = 0), (n += 1)) : (i += 1) > e && ((i = 0), (n += 1));
      }
      return { row: n, col: i };
    }
    function h(t, r) {
      return c(t, t.length, r).row + 1;
    }
    function l(t) {
      return null != t.match(/[^\\][ \t]$/m);
    }
    function f(t, r) {
      for (var e = 0; e < r.length; e++) {
        var n = r[e];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          'value' in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n);
      }
    }
    var p = (function() {
      function t(r) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        !(function(t, r) {
          if (!(t instanceof r)) throw new TypeError('Cannot call a class as a function');
        })(this, t),
          (this.term = r),
          this.term.onData(this.handleTermData.bind(this)),
          this.term.onResize(this.handleTermResize.bind(this)),
          (this.history = new i(e.historySize || 10)),
          (this.maxAutocompleteEntries = e.maxAutocompleteEntries || 100),
          (this._autocompleteHandlers = []),
          (this._active = !1),
          (this._input = ''),
          (this._cursor = 0),
          (this._activePrompt = null),
          (this._activeCharPrompt = null),
          (this._termSize = { cols: this.term.cols, rows: this.term.rows });
      }
      return (
        (function(t, r, e) {
          r && f(t.prototype, r), e && f(t, e);
        })(t, [
          {
            key: 'addAutocompleteHandler',
            value: function(t) {
              for (var r = arguments.length, e = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
                e[n - 1] = arguments[n];
              this._autocompleteHandlers.push({ fn: t, args: e });
            }
          },
          {
            key: 'removeAutocompleteHandler',
            value: function(t) {
              var r = this._autocompleteHandlers.findIndex(function(r) {
                return r.fn === t;
              });
              -1 !== r && this._autocompleteHandlers.splice(r, 1);
            }
          },
          {
            key: 'read',
            value: function(t) {
              var r = this,
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '> ';
              return new Promise(function(n, i) {
                r.term.write(t),
                  (r._activePrompt = { prompt: t, continuationPrompt: e, resolve: n, reject: i }),
                  (r._input = ''),
                  (r._cursor = 0),
                  (r._active = !0);
              });
            }
          },
          {
            key: 'readChar',
            value: function(t) {
              var r = this;
              return new Promise(function(e, n) {
                r.term.write(t), (r._activeCharPrompt = { prompt: t, resolve: e, reject: n });
              });
            }
          },
          {
            key: 'abortRead',
            value: function() {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 'aborted';
              (null == this._activePrompt && null == this._activeCharPrompt) || this.term.write('\r\n'),
                null != this._activePrompt && (this._activePrompt.reject(t), (this._activePrompt = null)),
                null != this._activeCharPrompt && (this._activeCharPrompt.reject(t), (this._activeCharPrompt = null)),
                (this._active = !1);
            }
          },
          {
            key: 'println',
            value: function(t) {
              this.print(t + '\n');
            }
          },
          {
            key: 'print',
            value: function(t) {
              var r = t.replace(/[\r\n]+/g, '\n');
              this.term.write(r.replace(/\n/g, '\r\n'));
            }
          },
          {
            key: 'printWide',
            value: function(t) {
              var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
              if (0 == t.length) return println('');
              for (
                var e =
                    t.reduce(function(t, r) {
                      return Math.max(t, r.length);
                    }, 0) + r,
                  n = Math.floor(this._termSize.cols / e),
                  i = Math.ceil(t.length / n),
                  s = 0,
                  o = 0;
                o < i;
                ++o
              ) {
                for (var u = '', a = 0; a < n; ++a)
                  if (s < t.length) {
                    var c = t[s++];
                    u += c += ' '.repeat(e - c.length);
                  }
                this.println(u);
              }
            }
          },
          {
            key: 'applyPrompts',
            value: function(t) {
              var r = (this._activePrompt || {}).prompt || '',
                e = (this._activePrompt || {}).continuationPrompt || '';
              return r + t.replace(/\n/g, '\n' + e);
            }
          },
          {
            key: 'applyPromptOffset',
            value: function(t, r) {
              return this.applyPrompts(t.substr(0, r)).length;
            }
          },
          {
            key: 'clearInput',
            value: function() {
              for (
                var t = this.applyPrompts(this._input),
                  r = h(t, this._termSize.cols),
                  e = c(t, this.applyPromptOffset(this._input, this._cursor), this._termSize.cols),
                  n = (e.col, r - e.row - 1),
                  i = 0;
                i < n;
                ++i
              )
                this.term.write('[E');
              this.term.write('\r[K');
              for (i = 1; i < r; ++i) term.write('[F[K');
            }
          },
          {
            key: 'setInput',
            value: function(t) {
              (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) && this.clearInput();
              var r = this.applyPrompts(t);
              this.print(r), this._cursor > t.length && (this._cursor = t.length);
              var e = this.applyPromptOffset(t, this._cursor),
                n = h(r, this._termSize.cols),
                i = c(r, e, this._termSize.cols),
                s = i.col,
                o = n - i.row - 1;
              this.term.write('\r');
              for (var u = 0; u < o; ++u) this.term.write('[F');
              for (u = 0; u < s; ++u) this.term.write('[C');
              this._input = t;
            }
          },
          {
            key: 'printAndRestartPrompt',
            value: function(t) {
              var r = this,
                e = this._cursor;
              this.setCursor(this._input.length), this.term.write('\r\n');
              var n = function() {
                  (r._cursor = e), r.setInput(r._input);
                },
                i = t();
              null == i ? n() : i.then(n);
            }
          },
          {
            key: 'setCursor',
            value: function(t) {
              t < 0 && (t = 0), t > this._input.length && (t = this._input.length);
              var r = this.applyPrompts(this._input),
                e =
                  (h(r, this._termSize.cols),
                  c(r, this.applyPromptOffset(this._input, this._cursor), this._termSize.cols)),
                n = e.col,
                i = e.row,
                s = c(r, this.applyPromptOffset(this._input, t), this._termSize.cols),
                o = s.col,
                u = s.row;
              if (u > i) for (var a = i; a < u; ++a) this.term.write('[B');
              else for (var l = u; l < i; ++l) this.term.write('[A');
              if (o > n) for (var f = n; f < o; ++f) this.term.write('[C');
              else for (var p = o; p < n; ++p) this.term.write('[D');
              this._cursor = t;
            }
          },
          {
            key: 'handleCursorMove',
            value: function(t) {
              if (t > 0) {
                var r = Math.min(t, this._input.length - this._cursor);
                this.setCursor(this._cursor + r);
              } else if (t < 0) {
                var e = Math.max(t, -this._cursor);
                this.setCursor(this._cursor + e);
              }
            }
          },
          {
            key: 'handleCursorErase',
            value: function(t) {
              var r = this._cursor,
                e = this._input;
              if (t) {
                if (r <= 0) return;
                var n = e.substr(0, r - 1) + e.substr(r);
                this.clearInput(), (this._cursor -= 1), this.setInput(n, !1);
              } else {
                var i = e.substr(0, r) + e.substr(r + 1);
                this.setInput(i);
              }
            }
          },
          {
            key: 'handleCursorInsert',
            value: function(t) {
              var r = this._cursor,
                e = this._input,
                n = e.substr(0, r) + t + e.substr(r);
              (this._cursor += t.length), this.setInput(n);
            }
          },
          {
            key: 'handleReadComplete',
            value: function() {
              this.history && this.history.push(this._input),
                this._activePrompt && (this._activePrompt.resolve(this._input), (this._activePrompt = null)),
                this.term.write('\r\n'),
                (this._active = !1);
            }
          },
          {
            key: 'handleTermResize',
            value: function(t) {
              var r = t.rows,
                e = t.cols;
              this.clearInput(), (this._termSize = { cols: e, rows: r }), this.setInput(this._input, !1);
            }
          },
          {
            key: 'handleTermData',
            value: function(t) {
              var r = this;
              if (this._active) {
                if (null != this._activeCharPrompt)
                  return (
                    this._activeCharPrompt.resolve(t), (this._activeCharPrompt = null), void this.term.write('\r\n')
                  );
                if (t.length > 3 && 27 !== t.charCodeAt(0)) {
                  var e = t.replace(/[\r\n]+/g, '\r');
                  Array.from(e).forEach(function(t) {
                    return r.handleData(t);
                  });
                } else this.handleData(t);
              }
            }
          },
          {
            key: 'handleData',
            value: function(t) {
              var r = this;
              if (this._active) {
                var e,
                  n = t.charCodeAt(0);
                if (27 == n)
                  switch (t.substr(1)) {
                    case '[A':
                      if (this.history) {
                        var i = this.history.getPrevious();
                        i && (this.setInput(i), this.setCursor(i.length));
                      }
                      break;
                    case '[B':
                      if (this.history) {
                        var c = this.history.getNext();
                        c || (c = ''), this.setInput(c), this.setCursor(c.length);
                      }
                      break;
                    case '[D':
                      this.handleCursorMove(-1);
                      break;
                    case '[C':
                      this.handleCursorMove(1);
                      break;
                    case '[3~':
                      this.handleCursorErase(!1);
                      break;
                    case '[F':
                      this.setCursor(this._input.length);
                      break;
                    case '[H':
                      this.setCursor(0);
                      break;
                    case 'b':
                      null != (e = a(this._input, this._cursor)) && this.setCursor(e);
                      break;
                    case 'f':
                      null !=
                        (e = (function(t, r) {
                          var e = u(t, !1).find(function(t) {
                            return t > r;
                          });
                          return null == e ? t.length : e;
                        })(this._input, this._cursor)) && this.setCursor(e);
                      break;
                    case '':
                      null != (e = a(this._input, this._cursor)) &&
                        (this.setInput(this._input.substr(0, e) + this._input.substr(this._cursor)), this.setCursor(e));
                  }
                else if (n < 32 || 127 === n)
                  switch (t) {
                    case '\r':
                      !(function(t) {
                        return (
                          '' != t.trim() &&
                          ((t.match(/'/g) || []).length % 2 != 0 ||
                            (t.match(/"/g) || []).length % 2 != 0 ||
                            '' ==
                              t
                                .split(/(\|\||\||&&)/g)
                                .pop()
                                .trim() ||
                            !(!t.endsWith('\\') || t.endsWith('\\\\')))
                        );
                      })(this._input)
                        ? this.handleReadComplete()
                        : this.handleCursorInsert('\n');
                      break;
                    case '':
                      this.handleCursorErase(!0);
                      break;
                    case '\t':
                      if (this._autocompleteHandlers.length > 0) {
                        var h = this._input.substr(0, this._cursor),
                          f = l(h),
                          p = (function(t, r) {
                            var e = Object(s.parse)(r),
                              n = e.length - 1,
                              i = e[n] || '';
                            return (
                              '' === r.trim() ? ((n = 0), (i = '')) : l(r) && ((n += 1), (i = '')),
                              t
                                .reduce(function(t, r) {
                                  var i = r.fn,
                                    s = r.args;
                                  try {
                                    return t.concat(i.apply(void 0, [n, e].concat(o(s))));
                                  } catch (r) {
                                    return console.error('Auto-complete error:', r), t;
                                  }
                                }, [])
                                .filter(function(t) {
                                  return t.startsWith(i);
                                })
                            );
                          })(this._autocompleteHandlers, h);
                        if ((p.sort(), 0 === p.length)) f || this.handleCursorInsert(' ');
                        else if (1 === p.length) {
                          var v = (function(t) {
                            return '' === t.trim() ? '' : l(t) ? '' : Object(s.parse)(t).pop() || '';
                          })(h);
                          this.handleCursorInsert(p[0].substr(v.length) + ' ');
                        } else
                          p.length <= this.maxAutocompleteEntries
                            ? this.printAndRestartPrompt(function() {
                                r.printWide(p);
                              })
                            : this.printAndRestartPrompt(function() {
                                return r
                                  .readChar('Display all '.concat(p.length, ' possibilities? (y or n)'))
                                  .then(function(t) {
                                    ('y' != t && 'Y' != t) || r.printWide(p);
                                  });
                              });
                      } else this.handleCursorInsert('    ');
                      break;
                    case '':
                      this.setCursor(this._input.length),
                        this.term.write('^C\r\n' + ((this._activePrompt || {}).prompt || '')),
                        (this._input = ''),
                        (this._cursor = 0),
                        this.history && this.history.rewind();
                  }
                else this.handleCursorInsert(t);
              }
            }
          }
        ]),
        t
      );
    })();
    e.d(r, 'HistoryController', function() {
      return i;
    });
    r.default = p;
  }
]).default;

export default LocalEchoController;
//# sourceMappingURL=local-echo.js.map
