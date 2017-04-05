/**
 * Created by lee on 2016/4/12.
 */


/*! JavaScript 的 MD5 实现 */


(function UMD(name, context, definition) {
  if ( typeof module !== "undefined" && module.exports) {
    // 如果 module 存在,并且module.exports存在,则将赋值结果赋给 它
    // 可以不用管
    module.exports = definition();
  } else if ( typeof define === "function" && define.amd) {
    // 如果 define 这个函数存在,应该是另一个基础类库，则使用define
    // 可以不用管
    define(definition);
  } else {
    // 简单一点,可以看成: 调用传入的definition函数，将返回的对象绑定到全局空间
    // 当然,根据传入的上下文不同,也可以绑定到其他对象下面,成为一个属性方法.
    context[name] = definition(name, context);
  }
}
)("md5", this, function DEF(name, context) {"use strict";
  // 上面的 use strict 表示严格语法模式,有错误就拒绝执行.
  // 而普通的JS,是解释执行,不执行的地方,有些错误也不影响其他代码的执行
  // 作为类库,使用严格模式是很有必要的.严格模式声明必须放到一个namespace空间的最起始处.

  //
  var old_public_api = (context || {})[name];
  // 最后要返回的对象/函数.
  function md5_func(text) {
    return hex_md5(text);
  };
  // 下面一堆是具体的算法... 可以先不用管
  /////////////////////////////////////////////////////

  //计算MD5
  var hexcase = 0;
  function hex_md5(a) {
    if (a == "")
      return a;
    return rstr2hex(rstr_md5(str2rstr_utf8(a)))
  };
  function hex_hmac_md5(a, b) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(b)))
  };
  function md5_vm_test() {
    return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72"
  };
  function rstr_md5(a) {
    return binl2rstr(binl_md5(rstr2binl(a), a.length * 8))
  };
  function rstr_hmac_md5(c, f) {
    var e = rstr2binl(c);
    if (e.length > 16) {
      e = binl_md5(e, c.length * 8)
    }
    var a = Array(16), d = Array(16);
    for (var b = 0; b < 16; b++) {
      a[b] = e[b] ^ 909522486;
      d[b] = e[b] ^ 1549556828
    }
    var g = binl_md5(a.concat(rstr2binl(f)), 512 + f.length * 8);
    return binl2rstr(binl_md5(d.concat(g), 512 + 128))
  };
  function rstr2hex(c) {
    try { hexcase
    } catch(g) {
      hexcase = 0
    }
    var f = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var b = "";
    var a;
    for (var d = 0; d < c.length; d++) {
      a = c.charCodeAt(d);
      b += f.charAt((a >>> 4) & 15) + f.charAt(a & 15)
    }
    return b
  };
  function str2rstr_utf8(c) {
    var b = "";
    var d = -1;
    var a, e;
    while (++d < c.length) {
      a = c.charCodeAt(d);
      e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0;
      if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) {
        a = 65536 + ((a & 1023) << 10) + (e & 1023);
        d++
      }
      if (a <= 127) {
        b += String.fromCharCode(a)
      } else {
        if (a <= 2047) {
          b += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63))
        } else {
          if (a <= 65535) {
            b += String.fromCharCode(224 | ((a >>> 12) & 15), 128 | ((a >>> 6) & 63), 128 | (a & 63))
          } else {
            if (a <= 2097151) {
              b += String.fromCharCode(240 | ((a >>> 18) & 7), 128 | ((a >>> 12) & 63), 128 | ((a >>> 6) & 63), 128 | (a & 63))
            }
          }
        }
      }
    }
    return b
  };
  function rstr2binl(b) {
    var a = Array(b.length >> 2);
    for (var c = 0; c < a.length; c++) {
      a[c] = 0
    }
    for (var c = 0; c < b.length * 8; c += 8) {
      a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << (c % 32)
    }
    return a
  };
  function binl2rstr(b) {
    var a = "";
    for (var c = 0; c < b.length * 32; c += 8) {
      a += String.fromCharCode((b[c >> 5] >>> (c % 32)) & 255)
    }
    return a
  };
  function binl_md5(p, k) {
    p[k >> 5] |= 128 << ((k) % 32);
    p[(((k + 64) >>> 9) << 4) + 14] = k;
    var o = 1732584193;
    var n = -271733879;
    var m = -1732584194;
    var l = 271733878;
    for (var g = 0; g < p.length; g += 16) {
      var j = o;
      var h = n;
      var f = m;
      var e = l;
      o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936);
      l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586);
      m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819);
      n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330);
      o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897);
      l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426);
      m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341);
      n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983);
      o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416);
      l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417);
      m = md5_ff(m, l, o, n, p[g + 10], 17, -42063);
      n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162);
      o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682);
      l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101);
      m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290);
      n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329);
      o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510);
      l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632);
      m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713);
      n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302);
      o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691);
      l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083);
      m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335);
      n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848);
      o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438);
      l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690);
      m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961);
      n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501);
      o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467);
      l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784);
      m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473);
      n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734);
      o = md5_hh(o, n, m, l, p[g + 5], 4, -378558);
      l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463);
      m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562);
      n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556);
      o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060);
      l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353);
      m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632);
      n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640);
      o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174);
      l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222);
      m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979);
      n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189);
      o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487);
      l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835);
      m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520);
      n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651);
      o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844);
      l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415);
      m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905);
      n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055);
      o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571);
      l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606);
      m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523);
      n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799);
      o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359);
      l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744);
      m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380);
      n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649);
      o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070);
      l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379);
      m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259);
      n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551);
      o = safe_add(o, j);
      n = safe_add(n, h);
      m = safe_add(m, f);
      l = safe_add(l, e)
    }
    return Array(o, n, m, l)
  };
  function md5_cmn(h, e, d, c, g, f) {
    return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d)
  };
  function md5_ff(g, f, k, j, e, i, h) {
    return md5_cmn((f & k) | ((~f) & j), g, f, e, i, h)
  };
  function md5_gg(g, f, k, j, e, i, h) {
    return md5_cmn((f & j) | (k & (~j)), g, f, e, i, h)
  };
  function md5_hh(g, f, k, j, e, i, h) {
    return md5_cmn(f ^ k ^ j, g, f, e, i, h)
  };
  function md5_ii(g, f, k, j, e, i, h) {
    return md5_cmn(k ^ (f | (~j)), g, f, e, i, h)
  };
  function safe_add(a, d) {
    var c = (a & 65535) + (d & 65535);
    var b = (a >> 16) + (d >> 16) + (c >> 16);
    return (b << 16) | (c & 65535)
  };
  function bit_rol(a, b) {
    return (a << b) | (a >>> (32 - b))
  };

  /////////////////////////////////////////////////////

  // 避免全局命名空间冲突
  md5_func.noConflict = function publicAPI$noConflict() {
    if (context) {
      // 将那个 name还原回原来的对象
      context[name] = old_public_api;
    }
    // 返回自身,由调用的代码自己持有,保存,或赋值给某个变量
    return md5_func;
  };

  // 返回的对象,会被绑定到 MD5 之类的名字上,在外部就引用了此对象,
  // 因为闭包特性,可以利用到闭包内部方法和内部对象。 lib一般都是利用这种闭包特性,维护私有的属性、对象,
  // 对外只暴露一些方法(API),也就是 function, 外面只能调用这些API,方便内部进行逻辑控制,降低依赖.
  return md5_func;
})




////////////////////////////////////////////////////////////////////////////

