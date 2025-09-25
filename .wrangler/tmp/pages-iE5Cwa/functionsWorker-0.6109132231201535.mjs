var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../.wrangler/tmp/bundle-YUU8YO/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
var init_strip_cf_connecting_ip_header = __esm({
  "../.wrangler/tmp/bundle-YUU8YO/strip-cf-connecting-ip-header.js"() {
    __name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        return Reflect.apply(target, thisArg, [
          stripCfConnectingIPHeader.apply(null, argArray)
        ]);
      }
    });
  }
});

// api/auth/status.ts
function verifyToken(token) {
  if (!token)
    return null;
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    return decoded.userId || null;
  } catch {
    return null;
  }
}
var onRequestGet;
var init_status = __esm({
  "api/auth/status.ts"() {
    init_functionsRoutes_0_00735418631797935();
    init_strip_cf_connecting_ip_header();
    __name(verifyToken, "verifyToken");
    onRequestGet = /* @__PURE__ */ __name(async ({ request }) => {
      const auth = request.headers.get("authorization");
      const token = auth?.replace("Bearer ", "") || null;
      const userId = verifyToken(token);
      return new Response(JSON.stringify({ authenticated: !!userId, userId: userId || void 0 }), {
        headers: { "content-type": "application/json" }
      });
    }, "onRequestGet");
  }
});

// api/debug-env.ts
var onRequestGet2;
var init_debug_env = __esm({
  "api/debug-env.ts"() {
    init_functionsRoutes_0_00735418631797935();
    init_strip_cf_connecting_ip_header();
    onRequestGet2 = /* @__PURE__ */ __name(async ({ env }) => {
      const data = {
        hasUrl: !!env?.SUPABASE_URL,
        hasAnon: !!env?.SUPABASE_ANON_KEY,
        hasService: !!env?.SUPABASE_SERVICE_ROLE
      };
      return Response.json(data);
    }, "onRequestGet");
  }
});

// api/order.ts
var order_exports = {};
__export(order_exports, {
  onRequestPost: () => onRequestPost
});
var onRequestPost;
var init_order = __esm({
  "api/order.ts"() {
    init_functionsRoutes_0_00735418631797935();
    init_strip_cf_connecting_ip_header();
    onRequestPost = /* @__PURE__ */ __name(async ({ request, env }) => {
      try {
        const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = env;
        if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
          return new Response("Missing env", { status: 500 });
        }
        const payload = await request.json();
        if (!payload?.userId)
          return new Response("userId required", { status: 400 });
        const insertUrl = `${SUPABASE_URL}/rest/v1/orders?select=*`;
        const insertRes = await fetch(insertUrl, {
          method: "POST",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
            "content-type": "application/json"
          },
          body: JSON.stringify({
            userId: payload.userId,
            productName: payload.productName ?? "Barbari",
            quantity: payload.quantity ?? 1,
            totalPrice: payload.totalPrice ?? 0,
            totalAmount: payload.totalAmount ?? payload.totalPrice ?? 0,
            firstName: payload.firstName,
            lastName: payload.lastName,
            phone: payload.phone,
            street: payload.street,
            houseNumber: payload.houseNumber,
            apartment: payload.apartment,
            postalCode: payload.postalCode,
            city: payload.city,
            state: payload.state
          })
        });
        if (!insertRes.ok) {
          const errText = await insertRes.text().catch(() => "");
          return new Response(`orders insert failed: ${insertRes.status} ${errText}`, { status: 500 });
        }
        const createdArr = await insertRes.json();
        const data = Array.isArray(createdArr) ? createdArr[0] : createdArr;
        return new Response(JSON.stringify({ ok: true, order: data }), {
          headers: { "content-type": "application/json" }
        });
      } catch (e) {
        return new Response(String(e?.message || e), { status: 500 });
      }
    }, "onRequestPost");
  }
});

// api/orders.ts
var onRequestPost2;
var init_orders = __esm({
  "api/orders.ts"() {
    init_functionsRoutes_0_00735418631797935();
    init_strip_cf_connecting_ip_header();
    onRequestPost2 = /* @__PURE__ */ __name(async ({ request, env }) => {
      const mod = await Promise.resolve().then(() => (init_order(), order_exports));
      return mod.onRequestPost({ request, env });
    }, "onRequestPost");
  }
});

// api/products.ts
var onRequestGet3;
var init_products = __esm({
  "api/products.ts"() {
    init_functionsRoutes_0_00735418631797935();
    init_strip_cf_connecting_ip_header();
    onRequestGet3 = /* @__PURE__ */ __name(async ({ env }) => {
      try {
        const { SUPABASE_URL, SUPABASE_ANON_KEY } = env;
        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
          return new Response(JSON.stringify({ error: "Missing SUPABASE envs" }), { status: 500 });
        }
        const url = `${SUPABASE_URL}/rest/v1/products?select=id,name,slug,priceCents,active&active=eq.true&order=id`;
        const res = await fetch(url, { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } });
        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          return new Response(JSON.stringify({ error: `products fetch failed: ${res.status} ${errText}` }), { status: 500 });
        }
        const rows = await res.json();
        const data = Array.isArray(rows) ? rows.map((p) => ({ ...p, price_cents: p.priceCents })) : [];
        return new Response(JSON.stringify({ products: data ?? [] }), {
          headers: { "content-type": "application/json" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500 });
      }
    }, "onRequestGet");
  }
});

// api/register.ts
var onRequestPost3;
var init_register = __esm({
  "api/register.ts"() {
    init_functionsRoutes_0_00735418631797935();
    init_strip_cf_connecting_ip_header();
    onRequestPost3 = /* @__PURE__ */ __name(async ({ request, env }) => {
      try {
        const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = env;
        if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
          return new Response(JSON.stringify({ error: "Missing env SUPABASE_URL or SUPABASE_SERVICE_ROLE" }), {
            status: 500,
            headers: { "content-type": "application/json" }
          });
        }
        const body = await request.json();
        const {
          firstName,
          lastName,
          phone,
          street,
          houseNumber,
          apartment,
          postalCode,
          city,
          state
        } = body || {};
        if (!firstName || !lastName || !phone || !street || !houseNumber || !postalCode || !city || !state) {
          return new Response(JSON.stringify({ error: "All required fields must be provided" }), {
            status: 400,
            headers: { "content-type": "application/json" }
          });
        }
        const selectUrl = `${SUPABASE_URL}/rest/v1/users?phone=eq.${encodeURIComponent(phone)}&select=id,phone`;
        const selectRes = await fetch(selectUrl, {
          headers: {
            apikey: SUPABASE_SERVICE_ROLE,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
            "content-type": "application/json"
          }
        });
        if (!selectRes.ok) {
          const errText = await selectRes.text().catch(() => "");
          return new Response(JSON.stringify({ error: `users select failed: ${selectRes.status} ${errText}` }), { status: 500, headers: { "content-type": "application/json" } });
        }
        const existingArr = await selectRes.json();
        if (Array.isArray(existingArr) && existingArr.length > 0) {
          return new Response(JSON.stringify({ error: "User already exists with this phone number" }), {
            status: 400,
            headers: { "content-type": "application/json" }
          });
        }
        const insertUrl = `${SUPABASE_URL}/rest/v1/users?select=*`;
        const insertRes = await fetch(insertUrl, {
          method: "POST",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
            "content-type": "application/json"
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phone,
            street,
            houseNumber,
            apartment,
            postalCode,
            city,
            state,
            country: "Deutschland"
          })
        });
        let created = null;
        if (!insertRes.ok) {
          const errText = await insertRes.text().catch(() => "");
          const insertResSnake = await fetch(insertUrl, {
            method: "POST",
            headers: {
              apikey: SUPABASE_SERVICE_ROLE,
              Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
              "content-type": "application/json"
            },
            body: JSON.stringify({
              firstName,
              lastName,
              phone,
              street,
              houseNumber,
              apartment,
              postalCode,
              city,
              state,
              country: "Deutschland"
            })
          });
          if (!insertResSnake.ok) {
            const errText2 = await insertResSnake.text().catch(() => "");
            return new Response(JSON.stringify({ error: `users insert failed: ${insertRes.status} ${errText} | snake_case: ${insertResSnake.status} ${errText2}` }), { status: 500, headers: { "content-type": "application/json" } });
          }
          const createdArrSnake = await insertResSnake.json();
          created = Array.isArray(createdArrSnake) ? createdArrSnake[0] : createdArrSnake;
        } else {
          const createdArr = await insertRes.json();
          created = Array.isArray(createdArr) ? createdArr[0] : createdArr;
        }
        const token = Buffer.from(JSON.stringify({ userId: created.id, timestamp: Date.now() })).toString("base64");
        return new Response(JSON.stringify({
          success: true,
          message: "User registered successfully",
          token,
          user: created
        }), { headers: { "content-type": "application/json" } });
      } catch (e) {
        return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500, headers: { "content-type": "application/json" } });
      }
    }, "onRequestPost");
  }
});

// ping.ts
var onRequestGet4;
var init_ping = __esm({
  "ping.ts"() {
    init_functionsRoutes_0_00735418631797935();
    init_strip_cf_connecting_ip_header();
    onRequestGet4 = /* @__PURE__ */ __name(async () => {
      return new Response("ok", {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }, "onRequestGet");
  }
});

// ../.wrangler/tmp/pages-iE5Cwa/functionsRoutes-0.00735418631797935.mjs
var routes;
var init_functionsRoutes_0_00735418631797935 = __esm({
  "../.wrangler/tmp/pages-iE5Cwa/functionsRoutes-0.00735418631797935.mjs"() {
    init_status();
    init_debug_env();
    init_order();
    init_orders();
    init_products();
    init_register();
    init_ping();
    routes = [
      {
        routePath: "/api/auth/status",
        mountPath: "/api/auth",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet]
      },
      {
        routePath: "/api/debug-env",
        mountPath: "/api",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet2]
      },
      {
        routePath: "/api/order",
        mountPath: "/api",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost]
      },
      {
        routePath: "/api/orders",
        mountPath: "/api",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost2]
      },
      {
        routePath: "/api/products",
        mountPath: "/api",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet3]
      },
      {
        routePath: "/api/register",
        mountPath: "/api",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost3]
      },
      {
        routePath: "/ping",
        mountPath: "/",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet4]
      }
    ];
  }
});

// ../.wrangler/tmp/bundle-YUU8YO/middleware-loader.entry.ts
init_functionsRoutes_0_00735418631797935();
init_strip_cf_connecting_ip_header();

// ../.wrangler/tmp/bundle-YUU8YO/middleware-insertion-facade.js
init_functionsRoutes_0_00735418631797935();
init_strip_cf_connecting_ip_header();

// ../../../../AppData/Local/npm-cache/_npx/0eedb5afd4158ff3/node_modules/wrangler/templates/pages-template-worker.ts
init_functionsRoutes_0_00735418631797935();
init_strip_cf_connecting_ip_header();

// ../../../../AppData/Local/npm-cache/_npx/0eedb5afd4158ff3/node_modules/path-to-regexp/dist.es2015/index.js
init_functionsRoutes_0_00735418631797935();
init_strip_cf_connecting_ip_header();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../AppData/Local/npm-cache/_npx/0eedb5afd4158ff3/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../../../../AppData/Local/npm-cache/_npx/0eedb5afd4158ff3/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_functionsRoutes_0_00735418631797935();
init_strip_cf_connecting_ip_header();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../AppData/Local/npm-cache/_npx/0eedb5afd4158ff3/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_functionsRoutes_0_00735418631797935();
init_strip_cf_connecting_ip_header();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-YUU8YO/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../../../../AppData/Local/npm-cache/_npx/0eedb5afd4158ff3/node_modules/wrangler/templates/middleware/common.ts
init_functionsRoutes_0_00735418631797935();
init_strip_cf_connecting_ip_header();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-YUU8YO/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.6109132231201535.mjs.map
