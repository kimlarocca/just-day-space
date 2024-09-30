import { version, unref, inject, toRef, isRef, defineComponent, ref, provide, createElementBlock, h, computed, shallowReactive, watch, Suspense, nextTick, Fragment, Transition, hasInjectionContext, getCurrentInstance, mergeProps, useSSRContext, createApp, effectScope, reactive, getCurrentScope, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, defineAsyncComponent, shallowRef, isReadonly, withCtx, isShallow, isReactive, toRaw, openBlock, renderList, normalizeClass, createElementVNode, toDisplayString, createCommentVNode, createBlock, withDirectives, vShow, renderSlot, resolveDirective, Teleport, normalizeStyle, resolveComponent, createSlots, createTextVNode, withKeys, toHandlers } from 'vue';
import { $ as $fetch, m as hasProtocol, n as isScriptProtocol, o as joinURL, w as withQuery, p as defu, q as sanitizeStatusCode, t as klona, v as parse, x as getRequestHeader, y as createHooks, i as createError$1, z as destr, A as isEqual, B as setCookie, C as getCookie, D as deleteCookie, E as toRouteMatcher, F as createRouter$1 } from '../runtime.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { getActiveHead, CapoPlugin } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { createClient } from '@supabase/supabase-js';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

function createContext$1(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers$1.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers$1.delete(onLeave);
      }
    }
  };
}
function createNamespace$1(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$1({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$2 = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey$2] || (_globalThis$1[globalKey$2] = createNamespace$1());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey$1 = "__unctx_async_handlers__";
const asyncHandlers$1 = _globalThis$1[asyncHandlersKey$1] || (_globalThis$1[asyncHandlersKey$1] = /* @__PURE__ */ new Set());

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink", "prefetch": true, "prefetchOn": { "visibility": true } };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.13.0";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin2.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  const global2 = options.global || typeof name !== "string";
  const mw = middleware;
  if (!mw) {
    console.warn("[nuxt] No route middleware passed to `addRouteMiddleware`.", name);
    return;
  }
  if (global2) {
    nuxtApp._middleware.global.push(mw);
  } else {
    nuxtApp._middleware.named[name] = mw;
  }
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler2) {
  _global[globalKey$1] = handler2;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const __nuxt_page_meta$2 = {
  middleware: "auth"
};
const __nuxt_page_meta$1 = {
  middleware: "auth"
};
const __nuxt_page_meta = {
  middleware: "auth"
};
const _routes = [
  {
    name: "dashboard",
    path: "/dashboard",
    meta: __nuxt_page_meta$2 || {},
    component: () => import('./dashboard-soOmJwr7.mjs').then((m) => m.default || m)
  },
  {
    name: "forgot-password",
    path: "/forgot-password",
    component: () => import('./forgot-password-DVMqh1aq.mjs').then((m) => m.default || m)
  },
  {
    name: "help",
    path: "/help",
    component: () => import('./help-BhmXSDbd.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index-BlW6k7v9.mjs').then((m) => m.default || m)
  },
  {
    name: "login",
    path: "/login",
    component: () => import('./login-DBxarG_V.mjs').then((m) => m.default || m)
  },
  {
    name: "logout",
    path: "/logout",
    component: () => import('./logout-Bvoxan-B.mjs').then((m) => m.default || m)
  },
  {
    name: "magic-link",
    path: "/magic-link",
    component: () => import('./magic-link-CFRPnpH2.mjs').then((m) => m.default || m)
  },
  {
    name: "onboarding",
    path: "/onboarding",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./onboarding-BN3ihNvJ.mjs').then((m) => m.default || m)
  },
  {
    name: "settings",
    path: "/settings",
    meta: __nuxt_page_meta || {},
    component: () => import('./settings-DHk6R4o5.mjs').then((m) => m.default || m)
  },
  {
    name: "signup",
    path: "/signup",
    component: () => import('./signup-DkfNuedM.mjs').then((m) => m.default || m)
  },
  {
    name: "styleguide",
    path: "/styleguide",
    component: () => import('./styleguide-DmpXjSJz.mjs').then((m) => m.default || m)
  },
  {
    name: "success",
    path: "/success",
    component: () => import('./success-BB7jKxSr.mjs').then((m) => m.default || m)
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await nuxtApp.runWithContext(() => showError(error));
      });
      return false;
    }
  });
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {
  auth: () => import('./auth-BV7pt0Zd.mjs')
};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    if (!((_b = nuxtApp.ssrContext) == null ? void 0 : _b.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.matched.length === 0) {
          await nuxtApp.runWithContext(() => showError(createError$1({
            statusCode: 404,
            fatal: false,
            statusMessage: `Page not found: ${to.fullPath}`,
            data: {
              path: to.fullPath
            }
          })));
        } else if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ?? (opts.filter = (key) => key === name);
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const useSupabaseToken = () => {
  const { supabase: { cookies: cookieOptions } } = (/* @__PURE__ */ useRuntimeConfig()).public;
  const cookieName = `${cookieOptions.name}-access-token`;
  return useCookie(cookieName);
};
const useSupabaseUser = () => {
  const user = useState("supabase_user");
  const token = useSupabaseToken();
  if (!token.value) {
    user.value = null;
  }
  return user;
};
const redirectToLogin = (toPath) => {
  const router = useRouter();
  const redirect = (/* @__PURE__ */ useRuntimeConfig()).public.supabase.redirect;
  if (redirect && redirect.login) {
    if ([redirect.login, redirect.callback].includes(toPath)) {
      return;
    }
    if (!router.resolve(toPath).name) {
      return;
    }
    router.push(redirect.login);
  }
};
const auth_redirect_hxxEaFfrIx = /* @__PURE__ */ defineNuxtPlugin(() => {
  addRouteMiddleware("global-auth", (to) => {
    const user = useSupabaseUser();
    if (!user.value) {
      redirectToLogin(to.path);
    }
  }, { global: true });
});
const useSupabaseAuthClient = () => {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._supabaseAuthClient) {
    const token = useSupabaseToken();
    const authorizationHeader = token.value ? `Bearer ${token.value}` : void 0;
    const { supabase: { url, key, client: clientOptions } } = (/* @__PURE__ */ useRuntimeConfig()).public;
    const options = authorizationHeader ? defu(clientOptions, { global: { headers: { Authorization: authorizationHeader } } }) : clientOptions;
    nuxtApp._supabaseAuthClient = createClient(url, key, options);
  }
  return nuxtApp._supabaseAuthClient;
};
const supabase_server_6VOknHCOlQ = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
  const user = useSupabaseUser();
  const authClient = useSupabaseAuthClient();
  const token = useSupabaseToken();
  const route = useRoute();
  if (!token.value) {
    return;
  }
  const { data: { user: supabaseUser }, error } = ([__temp, __restore] = executeAsync(() => authClient.auth.getUser(token.value)), __temp = await __temp, __restore(), __temp);
  if (error) {
    token.value = null;
    user.value = null;
    redirectToLogin(route.path);
  } else {
    user.value = supabaseUser;
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
var DomHandler = {
  innerWidth(el) {
    if (el) {
      let width = el.offsetWidth;
      let style = getComputedStyle(el);
      width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width;
    }
    return 0;
  },
  width(el) {
    if (el) {
      let width = el.offsetWidth;
      let style = getComputedStyle(el);
      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width;
    }
    return 0;
  },
  getWindowScrollTop() {
    let doc = (void 0).documentElement;
    return ((void 0).pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  },
  getWindowScrollLeft() {
    let doc = (void 0).documentElement;
    return ((void 0).pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  },
  getOuterWidth(el, margin) {
    if (el) {
      let width = el.offsetWidth;
      if (margin) {
        let style = getComputedStyle(el);
        width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      return width;
    }
    return 0;
  },
  getOuterHeight(el, margin) {
    if (el) {
      let height = el.offsetHeight;
      if (margin) {
        let style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getClientHeight(el, margin) {
    if (el) {
      let height = el.clientHeight;
      if (margin) {
        let style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getViewport() {
    let win = void 0, d = void 0, e = d.documentElement, g = d.getElementsByTagName("body")[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h2 = win.innerHeight || e.clientHeight || g.clientHeight;
    return { width: w, height: h2 };
  },
  getOffset(el) {
    if (el) {
      let rect = el.getBoundingClientRect();
      return {
        top: rect.top + ((void 0).pageYOffset || (void 0).documentElement.scrollTop || (void 0).body.scrollTop || 0),
        left: rect.left + ((void 0).pageXOffset || (void 0).documentElement.scrollLeft || (void 0).body.scrollLeft || 0)
      };
    }
    return {
      top: "auto",
      left: "auto"
    };
  },
  index(element) {
    if (element) {
      let children = element.parentNode.childNodes;
      let num = 0;
      for (let i = 0; i < children.length; i++) {
        if (children[i] === element) return num;
        if (children[i].nodeType === 1) num++;
      }
    }
    return -1;
  },
  addMultipleClasses(element, className) {
    if (element && className) {
      if (element.classList) {
        let styles = className.split(" ");
        for (let i = 0; i < styles.length; i++) {
          element.classList.add(styles[i]);
        }
      } else {
        let styles = className.split(" ");
        for (let i = 0; i < styles.length; i++) {
          element.className += " " + styles[i];
        }
      }
    }
  },
  addClass(element, className) {
    if (element && className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    }
  },
  removeClass(element, className) {
    if (element && className) {
      if (element.classList) element.classList.remove(className);
      else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
  },
  hasClass(element, className) {
    if (element) {
      if (element.classList) return element.classList.contains(className);
      else return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
    }
    return false;
  },
  find(element, selector) {
    return this.isElement(element) ? element.querySelectorAll(selector) : [];
  },
  findSingle(element, selector) {
    return this.isElement(element) ? element.querySelector(selector) : null;
  },
  getHeight(el) {
    if (el) {
      let height = el.offsetHeight;
      let style = getComputedStyle(el);
      height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      return height;
    }
    return 0;
  },
  getWidth(el) {
    if (el) {
      let width = el.offsetWidth;
      let style = getComputedStyle(el);
      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      return width;
    }
    return 0;
  },
  absolutePosition(element, target) {
    if (element) {
      let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
      let elementOuterHeight = elementDimensions.height;
      let elementOuterWidth = elementDimensions.width;
      let targetOuterHeight = target.offsetHeight;
      let targetOuterWidth = target.offsetWidth;
      let targetOffset = target.getBoundingClientRect();
      let windowScrollTop = this.getWindowScrollTop();
      let windowScrollLeft = this.getWindowScrollLeft();
      let viewport = this.getViewport();
      let top, left;
      if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        element.style.transformOrigin = "bottom";
        if (top < 0) {
          top = windowScrollTop;
        }
      } else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
        element.style.transformOrigin = "top";
      }
      if (targetOffset.left + elementOuterWidth > viewport.width) left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
      else left = targetOffset.left + windowScrollLeft;
      element.style.top = top + "px";
      element.style.left = left + "px";
    }
  },
  relativePosition(element, target) {
    if (element) {
      let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
      const targetHeight = target.offsetHeight;
      const targetOffset = target.getBoundingClientRect();
      const viewport = this.getViewport();
      let top, left;
      if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
        top = -1 * elementDimensions.height;
        element.style.transformOrigin = "bottom";
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }
      } else {
        top = targetHeight;
        element.style.transformOrigin = "top";
      }
      if (elementDimensions.width > viewport.width) {
        left = targetOffset.left * -1;
      } else if (targetOffset.left + elementDimensions.width > viewport.width) {
        left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      } else {
        left = 0;
      }
      element.style.top = top + "px";
      element.style.left = left + "px";
    }
  },
  getParents(element, parents = []) {
    return element["parentNode"] === null ? parents : this.getParents(element.parentNode, parents.concat([element.parentNode]));
  },
  getScrollableParents(element) {
    let scrollableParents = [];
    if (element) {
      let parents = this.getParents(element);
      const overflowRegex = /(auto|scroll)/;
      const overflowCheck = (node) => {
        let styleDeclaration = (void 0)["getComputedStyle"](node, null);
        return overflowRegex.test(styleDeclaration.getPropertyValue("overflow")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowX")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowY"));
      };
      for (let parent of parents) {
        let scrollSelectors = parent.nodeType === 1 && parent.dataset["scrollselectors"];
        if (scrollSelectors) {
          let selectors = scrollSelectors.split(",");
          for (let selector of selectors) {
            let el = this.findSingle(parent, selector);
            if (el && overflowCheck(el)) {
              scrollableParents.push(el);
            }
          }
        }
        if (parent.nodeType !== 9 && overflowCheck(parent)) {
          scrollableParents.push(parent);
        }
      }
    }
    return scrollableParents;
  },
  getHiddenElementOuterHeight(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      let elementHeight = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementHeight;
    }
    return 0;
  },
  getHiddenElementOuterWidth(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      let elementWidth = element.offsetWidth;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementWidth;
    }
    return 0;
  },
  getHiddenElementDimensions(element) {
    if (element) {
      let dimensions = {};
      element.style.visibility = "hidden";
      element.style.display = "block";
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return dimensions;
    }
    return 0;
  },
  fadeIn(element, duration) {
    if (element) {
      element.style.opacity = 0;
      let last = +/* @__PURE__ */ new Date();
      let opacity = 0;
      let tick = function() {
        opacity = +element.style.opacity + ((/* @__PURE__ */ new Date()).getTime() - last) / duration;
        element.style.opacity = opacity;
        last = +/* @__PURE__ */ new Date();
        if (+opacity < 1) {
          (void 0).requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
        }
      };
      tick();
    }
  },
  fadeOut(element, ms) {
    if (element) {
      let opacity = 1, interval = 50, duration = ms, gap = interval / duration;
      let fading = setInterval(() => {
        opacity -= gap;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fading);
        }
        element.style.opacity = opacity;
      }, interval);
    }
  },
  getUserAgent() {
    return (void 0).userAgent;
  },
  appendChild(element, target) {
    if (this.isElement(target)) target.appendChild(element);
    else if (target.el && target.elElement) target.elElement.appendChild(element);
    else throw new Error("Cannot append " + target + " to " + element);
  },
  isElement(obj) {
    return typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
  },
  scrollInView(container, item) {
    let borderTopValue = getComputedStyle(container).getPropertyValue("borderTopWidth");
    let borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
    let paddingTopValue = getComputedStyle(container).getPropertyValue("paddingTop");
    let paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    let containerRect = container.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();
    let offset = itemRect.top + (void 0).body.scrollTop - (containerRect.top + (void 0).body.scrollTop) - borderTop - paddingTop;
    let scroll = container.scrollTop;
    let elementHeight = container.clientHeight;
    let itemHeight = this.getOuterHeight(item);
    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  },
  clearSelection() {
    if ((void 0).getSelection) {
      if ((void 0).getSelection().empty) {
        (void 0).getSelection().empty();
      } else if ((void 0).getSelection().removeAllRanges && (void 0).getSelection().rangeCount > 0 && (void 0).getSelection().getRangeAt(0).getClientRects().length > 0) {
        (void 0).getSelection().removeAllRanges();
      }
    } else if ((void 0)["selection"] && (void 0)["selection"].empty) {
      try {
        (void 0)["selection"].empty();
      } catch (error) {
      }
    }
  },
  getSelection() {
    if ((void 0).getSelection) return (void 0).getSelection().toString();
    else if ((void 0).getSelection) return (void 0).getSelection().toString();
    else if ((void 0)["selection"]) return (void 0)["selection"].createRange().text;
    return null;
  },
  calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth;
    let scrollDiv = (void 0).createElement("div");
    scrollDiv.className = "p-scrollbar-measure";
    (void 0).body.appendChild(scrollDiv);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    (void 0).body.removeChild(scrollDiv);
    this.calculatedScrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
  },
  getBrowser() {
    if (!this.browser) {
      let matched = this.resolveUserAgent();
      this.browser = {};
      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser["version"] = matched.version;
      }
      if (this.browser["chrome"]) {
        this.browser["webkit"] = true;
      } else if (this.browser["webkit"]) {
        this.browser["safari"] = true;
      }
    }
    return this.browser;
  },
  resolveUserAgent() {
    let ua = (void 0).userAgent.toLowerCase();
    let match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  },
  isVisible(element) {
    return element && element.offsetParent != null;
  },
  invokeElementMethod(element, methodName, args) {
    element[methodName].apply(element, args);
  },
  isExist(element) {
    return element !== null && typeof element !== "undefined" && element.nodeName && element.parentNode;
  },
  isClient() {
    return false;
  },
  focus(el, options) {
    el && (void 0).activeElement !== el && el.focus(options);
  },
  isFocusableElement(element, selector = "") {
    return this.isElement(element) ? element.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`) : false;
  },
  getFocusableElements(element, selector = "") {
    let focusableElements = this.find(
      element,
      `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`
    );
    let visibleFocusableElements = [];
    for (let focusableElement of focusableElements) {
      if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden") visibleFocusableElements.push(focusableElement);
    }
    return visibleFocusableElements;
  },
  getFirstFocusableElement(element, selector) {
    const focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[0] : null;
  },
  getLastFocusableElement(element, selector) {
    const focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
  },
  getNextFocusableElement(container, element, selector) {
    const focusableElements = this.getFocusableElements(container, selector);
    const index = focusableElements.length > 0 ? focusableElements.findIndex((el) => el === element) : -1;
    const nextIndex = index > -1 && focusableElements.length >= index + 1 ? index + 1 : -1;
    return nextIndex > -1 ? focusableElements[nextIndex] : null;
  },
  isClickable(element) {
    const targetNode = element.nodeName;
    const parentNode = element.parentElement && element.parentElement.nodeName;
    return targetNode == "INPUT" || targetNode == "BUTTON" || targetNode == "A" || parentNode == "INPUT" || parentNode == "BUTTON" || parentNode == "A" || this.hasClass(element, "p-button") || this.hasClass(element.parentElement, "p-button") || this.hasClass(element.parentElement, "p-checkbox") || this.hasClass(element.parentElement, "p-radiobutton");
  },
  applyStyle(element, style) {
    if (typeof style === "string") {
      element.style.cssText = style;
    } else {
      for (let prop in style) {
        element.style[prop] = style[prop];
      }
    }
  },
  isIOS() {
    return /iPad|iPhone|iPod/.test((void 0).userAgent) && !(void 0)["MSStream"];
  },
  isAndroid() {
    return /(android)/i.test((void 0).userAgent);
  },
  isTouchDevice() {
    return "ontouchstart" in void 0 || (void 0).maxTouchPoints > 0 || (void 0).msMaxTouchPoints > 0;
  },
  exportCSV(csv, filename) {
    let blob = new Blob([csv], {
      type: "application/csv;charset=utf-8;"
    });
    if ((void 0).navigator.msSaveOrOpenBlob) {
      (void 0).msSaveOrOpenBlob(blob, filename + ".csv");
    } else {
      let link = (void 0).createElement("a");
      if (link.download !== void 0) {
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", filename + ".csv");
        link.style.display = "none";
        (void 0).body.appendChild(link);
        link.click();
        (void 0).body.removeChild(link);
      } else {
        csv = "data:text/csv;charset=utf-8," + csv;
        (void 0).open(encodeURI(csv));
      }
    }
  }
};
class ConnectedOverlayScrollHandler {
  constructor(element, listener = () => {
  }) {
    this.element = element;
    this.listener = listener;
  }
  bindScrollListener() {
    this.scrollableParents = DomHandler.getScrollableParents(this.element);
    for (let i = 0; i < this.scrollableParents.length; i++) {
      this.scrollableParents[i].addEventListener("scroll", this.listener);
    }
  }
  unbindScrollListener() {
    if (this.scrollableParents) {
      for (let i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].removeEventListener("scroll", this.listener);
      }
    }
  }
  destroy() {
    this.unbindScrollListener();
    this.element = null;
    this.listener = null;
    this.scrollableParents = null;
  }
}
var ObjectUtils = {
  equals(obj1, obj2, field) {
    if (field) return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
    else return this.deepEquals(obj1, obj2);
  },
  deepEquals(a, b) {
    if (a === b) return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
      if (arrA && arrB) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0; ) if (!this.deepEquals(a[i], b[i])) return false;
        return true;
      }
      if (arrA != arrB) return false;
      var dateA = a instanceof Date, dateB = b instanceof Date;
      if (dateA != dateB) return false;
      if (dateA && dateB) return a.getTime() == b.getTime();
      var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
      if (regexpA != regexpB) return false;
      if (regexpA && regexpB) return a.toString() == b.toString();
      var keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;
      for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      for (i = length; i-- !== 0; ) {
        key = keys[i];
        if (!this.deepEquals(a[key], b[key])) return false;
      }
      return true;
    }
    return a !== a && b !== b;
  },
  resolveFieldData(data, field) {
    if (data && Object.keys(data).length && field) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf(".") === -1) {
        return data[field];
      } else {
        let fields = field.split(".");
        let value = data;
        for (var i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  },
  isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  },
  getItemValue(obj, ...params) {
    return this.isFunction(obj) ? obj(...params) : obj;
  },
  filter(value, fields, filterValue) {
    var filteredItems = [];
    if (value) {
      for (let item of value) {
        for (let field of fields) {
          if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
            filteredItems.push(item);
            break;
          }
        }
      }
    }
    return filteredItems;
  },
  reorderArray(value, from, to) {
    let target;
    if (value && from !== to) {
      if (to >= value.length) {
        target = to - value.length;
        while (target-- + 1) {
          value.push(void 0);
        }
      }
      value.splice(to, 0, value.splice(from, 1)[0]);
    }
  },
  findIndexInList(value, list) {
    let index = -1;
    if (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] === value) {
          index = i;
          break;
        }
      }
    }
    return index;
  },
  contains(value, list) {
    if (value != null && list && list.length) {
      for (let val of list) {
        if (this.equals(value, val)) return true;
      }
    }
    return false;
  },
  insertIntoOrderedArray(item, index, arr, sourceArr) {
    if (arr.length > 0) {
      let injected = false;
      for (let i = 0; i < arr.length; i++) {
        let currentItemIndex = this.findIndexInList(arr[i], sourceArr);
        if (currentItemIndex > index) {
          arr.splice(i, 0, item);
          injected = true;
          break;
        }
      }
      if (!injected) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
  },
  removeAccents(str) {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
      str = str.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y");
    }
    return str;
  },
  getVNodeProp(vnode, prop) {
    let props = vnode.props;
    if (props) {
      let kebapProp = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      let propName = Object.prototype.hasOwnProperty.call(props, kebapProp) ? kebapProp : prop;
      return vnode.type.props[prop].type === Boolean && props[propName] === "" ? true : props[propName];
    }
    return null;
  },
  isEmpty(value) {
    return value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && typeof value === "object" && Object.keys(value).length === 0;
  },
  isNotEmpty(value) {
    return !this.isEmpty(value);
  },
  isPrintableCharacter(char = "") {
    return this.isNotEmpty(char) && char.length === 1 && char.match(/\S| /);
  },
  /**
   * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlast
   */
  findLast(arr, callback) {
    let item;
    if (this.isNotEmpty(arr)) {
      try {
        item = arr.findLast(callback);
      } catch {
        item = [...arr].reverse().find(callback);
      }
    }
    return item;
  },
  /**
   * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
   */
  findLastIndex(arr, callback) {
    let index = -1;
    if (this.isNotEmpty(arr)) {
      try {
        index = arr.findLastIndex(callback);
      } catch {
        index = arr.lastIndexOf([...arr].reverse().find(callback));
      }
    }
    return index;
  }
};
function handler() {
  let zIndexes = [];
  const generateZIndex = (key, baseZIndex) => {
    let lastZIndex = zIndexes.length > 0 ? zIndexes[zIndexes.length - 1] : { key, value: baseZIndex };
    let newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
    zIndexes.push({ key, value: newZIndex });
    return newZIndex;
  };
  const revertZIndex = (zIndex) => {
    zIndexes = zIndexes.filter((obj) => obj.value !== zIndex);
  };
  const getCurrentZIndex = () => {
    return zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
  };
  const getZIndex = (el) => {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: (key, el, baseZIndex) => {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, baseZIndex));
      }
    },
    clear: (el) => {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: () => getCurrentZIndex()
  };
}
var ZIndexUtils = handler();
var lastId = 0;
function UniqueComponentId(prefix = "pv_id_") {
  lastId++;
  return `${prefix}${lastId}`;
}
function primebus() {
  const allHandlers = /* @__PURE__ */ new Map();
  return {
    on(type, handler2) {
      let handlers = allHandlers.get(type);
      if (!handlers) handlers = [handler2];
      else handlers.push(handler2);
      allHandlers.set(type, handlers);
    },
    off(type, handler2) {
      let handlers = allHandlers.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler2) >>> 0, 1);
      }
    },
    emit(type, evt) {
      let handlers = allHandlers.get(type);
      if (handlers) {
        handlers.slice().map((handler2) => {
          handler2(evt);
        });
      }
    }
  };
}
const FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  IN: "in",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  BETWEEN: "between",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};
const FilterService = {
  filter(value, fields, filterValue, filterMatchMode, filterLocale) {
    let filteredItems = [];
    if (value) {
      for (let item of value) {
        for (let field of fields) {
          let fieldValue = ObjectUtils.resolveFieldData(item, field);
          if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
            filteredItems.push(item);
            break;
          }
        }
      }
    }
    return filteredItems;
  },
  filters: {
    startsWith(value, filter, filterLocale) {
      if (filter === void 0 || filter === null || filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.slice(0, filterValue.length) === filterValue;
    },
    contains(value, filter, filterLocale) {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) !== -1;
    },
    notContains(value, filter, filterLocale) {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) === -1;
    },
    endsWith(value, filter, filterLocale) {
      if (filter === void 0 || filter === null || filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    },
    equals(value, filter, filterLocale) {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() === filter.getTime();
      else return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
    },
    notEquals(value, filter, filterLocale) {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return false;
      }
      if (value === void 0 || value === null) {
        return true;
      }
      if (value.getTime && filter.getTime) return value.getTime() !== filter.getTime();
      else return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
    },
    in(value, filter) {
      if (filter === void 0 || filter === null || filter.length === 0) {
        return true;
      }
      for (let i = 0; i < filter.length; i++) {
        if (ObjectUtils.equals(value, filter[i])) {
          return true;
        }
      }
      return false;
    },
    between(value, filter) {
      if (filter == null || filter[0] == null || filter[1] == null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime) return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
      else return filter[0] <= value && value <= filter[1];
    },
    lt(value, filter) {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() < filter.getTime();
      else return value < filter;
    },
    lte(value, filter) {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() <= filter.getTime();
      else return value <= filter;
    },
    gt(value, filter) {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() > filter.getTime();
      else return value > filter;
    },
    gte(value, filter) {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() >= filter.getTime();
      else return value >= filter;
    },
    dateIs(value, filter) {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() === filter.toDateString();
    },
    dateIsNot(value, filter) {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() !== filter.toDateString();
    },
    dateBefore(value, filter) {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() < filter.getTime();
    },
    dateAfter(value, filter) {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() > filter.getTime();
    }
  },
  register(rule, fn) {
    this.filters[rule] = fn;
  }
};
const defaultOptions = {
  ripple: false,
  inputStyle: "outlined",
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    completed: "Completed",
    pending: "Pending",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    // @deprecated Use 'emptySearchMessage' option instead.
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "{page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      previousPageLabel: "Previous Page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left"
    }
  },
  filterMatchModeOptions: {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  },
  zIndex: {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  }
};
const PrimeVueSymbol = Symbol();
var PrimeVue = {
  install: (app, options) => {
    let configOptions = options ? { ...defaultOptions, ...options } : { ...defaultOptions };
    const PrimeVue2 = {
      config: reactive(configOptions)
    };
    app.config.globalProperties.$primevue = PrimeVue2;
    app.provide(PrimeVueSymbol, PrimeVue2);
  }
};
let timeout;
function bindEvents$1(el) {
  el.addEventListener("mousedown", onMouseDown);
}
function unbindEvents$1(el) {
  el.removeEventListener("mousedown", onMouseDown);
}
function create$1(el) {
  let ink = (void 0).createElement("span");
  ink.className = "p-ink";
  ink.setAttribute("role", "presentation");
  ink.setAttribute("aria-hidden", "true");
  el.appendChild(ink);
  ink.addEventListener("animationend", onAnimationEnd);
}
function remove$1(el) {
  let ink = getInk(el);
  if (ink) {
    unbindEvents$1(el);
    ink.removeEventListener("animationend", onAnimationEnd);
    ink.remove();
  }
}
function onMouseDown(event) {
  let target = event.currentTarget;
  let ink = getInk(target);
  if (!ink || getComputedStyle(ink, null).display === "none") {
    return;
  }
  DomHandler.removeClass(ink, "p-ink-active");
  if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
    let d = Math.max(DomHandler.getOuterWidth(target), DomHandler.getOuterHeight(target));
    ink.style.height = d + "px";
    ink.style.width = d + "px";
  }
  let offset = DomHandler.getOffset(target);
  let x = event.pageX - offset.left + (void 0).body.scrollTop - DomHandler.getWidth(ink) / 2;
  let y = event.pageY - offset.top + (void 0).body.scrollLeft - DomHandler.getHeight(ink) / 2;
  ink.style.top = y + "px";
  ink.style.left = x + "px";
  DomHandler.addClass(ink, "p-ink-active");
  timeout = setTimeout(() => {
    if (ink) {
      DomHandler.removeClass(ink, "p-ink-active");
    }
  }, 401);
}
function onAnimationEnd(event) {
  if (timeout) {
    clearTimeout(timeout);
  }
  DomHandler.removeClass(event.currentTarget, "p-ink-active");
}
function getInk(el) {
  for (let i = 0; i < el.children.length; i++) {
    if (typeof el.children[i].className === "string" && el.children[i].className.indexOf("p-ink") !== -1) {
      return el.children[i];
    }
  }
  return null;
}
const Ripple = {
  mounted(el, binding) {
    if (binding.instance.$primevue && binding.instance.$primevue.config && binding.instance.$primevue.config.ripple) {
      create$1(el);
      bindEvents$1(el);
    }
  },
  unmounted(el) {
    remove$1(el);
  }
};
var script$o = {
  name: "Accordion",
  emits: ["update:activeIndex", "tab-open", "tab-close", "tab-click"],
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    activeIndex: {
      type: [Number, Array],
      default: null
    },
    lazy: {
      type: Boolean,
      default: false
    },
    expandIcon: {
      type: String,
      default: "pi pi-chevron-right"
    },
    collapseIcon: {
      type: String,
      default: "pi pi-chevron-down"
    },
    tabindex: {
      type: Number,
      default: 0
    },
    selectOnFocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      d_activeIndex: this.activeIndex
    };
  },
  watch: {
    activeIndex(newValue) {
      this.d_activeIndex = newValue;
    }
  },
  methods: {
    isAccordionTab(child) {
      return child.type.name === "AccordionTab";
    },
    isTabActive(index) {
      return this.multiple ? this.d_activeIndex && this.d_activeIndex.includes(index) : this.d_activeIndex === index;
    },
    getTabProp(tab, name) {
      return tab.props ? tab.props[name] : void 0;
    },
    getKey(tab, index) {
      return this.getTabProp(tab, "header") || index;
    },
    getTabHeaderActionId(index) {
      return `${this.id}_${index}_header_action`;
    },
    getTabContentId(index) {
      return `${this.id}_${index}_content`;
    },
    onTabClick(event, tab, index) {
      this.changeActiveIndex(event, tab, index);
      this.$emit("tab-click", { originalEvent: event, index });
    },
    onTabKeyDown(event, tab, index) {
      switch (event.code) {
        case "ArrowDown":
          this.onTabArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onTabArrowUpKey(event);
          break;
        case "Home":
          this.onTabHomeKey(event);
          break;
        case "End":
          this.onTabEndKey(event);
          break;
        case "Enter":
        case "Space":
          this.onTabEnterKey(event, tab, index);
          break;
      }
    },
    onTabArrowDownKey(event) {
      const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement.parentElement);
      nextHeaderAction ? this.changeFocusedTab(event, nextHeaderAction) : this.onTabHomeKey(event);
      event.preventDefault();
    },
    onTabArrowUpKey(event) {
      const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement.parentElement);
      prevHeaderAction ? this.changeFocusedTab(event, prevHeaderAction) : this.onTabEndKey(event);
      event.preventDefault();
    },
    onTabHomeKey(event) {
      const firstHeaderAction = this.findFirstHeaderAction();
      this.changeFocusedTab(event, firstHeaderAction);
      event.preventDefault();
    },
    onTabEndKey(event) {
      const lastHeaderAction = this.findLastHeaderAction();
      this.changeFocusedTab(event, lastHeaderAction);
      event.preventDefault();
    },
    onTabEnterKey(event, tab, index) {
      this.changeActiveIndex(event, tab, index);
      event.preventDefault();
    },
    findNextHeaderAction(tabElement, selfCheck = false) {
      const nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
      const headerElement = DomHandler.findSingle(nextTabElement, ".p-accordion-header");
      return headerElement ? DomHandler.hasClass(headerElement, "p-disabled") ? this.findNextHeaderAction(headerElement.parentElement) : DomHandler.findSingle(headerElement, ".p-accordion-header-action") : null;
    },
    findPrevHeaderAction(tabElement, selfCheck = false) {
      const prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
      const headerElement = DomHandler.findSingle(prevTabElement, ".p-accordion-header");
      return headerElement ? DomHandler.hasClass(headerElement, "p-disabled") ? this.findPrevHeaderAction(headerElement.parentElement) : DomHandler.findSingle(headerElement, ".p-accordion-header-action") : null;
    },
    findFirstHeaderAction() {
      return this.findNextHeaderAction(this.$el.firstElementChild, true);
    },
    findLastHeaderAction() {
      return this.findPrevHeaderAction(this.$el.lastElementChild, true);
    },
    changeActiveIndex(event, tab, index) {
      if (!this.getTabProp(tab, "disabled")) {
        const active = this.isTabActive(index);
        const eventName = active ? "tab-close" : "tab-open";
        if (this.multiple) {
          if (active) {
            this.d_activeIndex = this.d_activeIndex.filter((i) => i !== index);
          } else {
            if (this.d_activeIndex) this.d_activeIndex.push(index);
            else this.d_activeIndex = [index];
          }
        } else {
          this.d_activeIndex = this.d_activeIndex === index ? null : index;
        }
        this.$emit("update:activeIndex", this.d_activeIndex);
        this.$emit(eventName, { originalEvent: event, index });
      }
    },
    changeFocusedTab(event, element) {
      if (element) {
        DomHandler.focus(element);
        if (this.selectOnFocus) {
          const index = parseInt(element.parentElement.parentElement.dataset.index, 10);
          const tab = this.tabs[index];
          this.changeActiveIndex(event, tab, index);
        }
      }
    },
    getTabClass(i) {
      return [
        "p-accordion-tab",
        {
          "p-accordion-tab-active": this.isTabActive(i)
        }
      ];
    },
    getTabHeaderClass(tab, i) {
      return [
        "p-accordion-header",
        this.getTabProp(tab, "headerClass"),
        {
          "p-highlight": this.isTabActive(i),
          "p-disabled": this.getTabProp(tab, "disabled")
        }
      ];
    },
    getTabHeaderIconClass(i) {
      return ["p-accordion-toggle-icon", this.isTabActive(i) ? this.collapseIcon : this.expandIcon];
    },
    getTabContentClass(tab) {
      return ["p-toggleable-content", this.getTabProp(tab, "contentClass")];
    }
  },
  computed: {
    tabs() {
      return this.$slots.default().reduce((tabs, child) => {
        if (this.isAccordionTab(child)) {
          tabs.push(child);
        } else if (child.children && child.children instanceof Array) {
          child.children.forEach((nestedChild) => {
            if (this.isAccordionTab(nestedChild)) {
              tabs.push(nestedChild);
            }
          });
        }
        return tabs;
      }, []);
    },
    id() {
      return this.$attrs.id || UniqueComponentId();
    }
  },
  directives: {
    ripple: Ripple
  }
};
const _hoisted_1$l = { class: "p-accordion p-component" };
const _hoisted_2$g = ["data-index"];
const _hoisted_3$b = ["id", "tabindex", "aria-disabled", "aria-expanded", "aria-controls", "onClick", "onKeydown"];
const _hoisted_4$8 = {
  key: 0,
  class: "p-accordion-header-text"
};
const _hoisted_5$7 = ["id", "aria-labelledby"];
const _hoisted_6$4 = { class: "p-accordion-content" };
function render$o(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$l, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.tabs, (tab, i) => {
      return openBlock(), createElementBlock("div", {
        key: $options.getKey(tab, i),
        class: normalizeClass($options.getTabClass(i)),
        "data-index": i
      }, [
        createElementVNode("div", mergeProps({
          style: $options.getTabProp(tab, "headerStyle"),
          class: $options.getTabHeaderClass(tab, i)
        }, $options.getTabProp(tab, "headerProps")), [
          createElementVNode("a", mergeProps({
            id: $options.getTabHeaderActionId(i),
            class: "p-accordion-header-link p-accordion-header-action",
            tabindex: $options.getTabProp(tab, "disabled") ? -1 : $props.tabindex,
            role: "button",
            "aria-disabled": $options.getTabProp(tab, "disabled"),
            "aria-expanded": $options.isTabActive(i),
            "aria-controls": $options.getTabContentId(i),
            onClick: ($event) => $options.onTabClick($event, tab, i),
            onKeydown: ($event) => $options.onTabKeyDown($event, tab, i)
          }, $options.getTabProp(tab, "headerActionProps")), [
            createElementVNode("span", {
              class: normalizeClass($options.getTabHeaderIconClass(i)),
              "aria-hidden": "true"
            }, null, 2),
            tab.props && tab.props.header ? (openBlock(), createElementBlock("span", _hoisted_4$8, toDisplayString(tab.props.header), 1)) : createCommentVNode("", true),
            tab.children && tab.children.header ? (openBlock(), createBlock(resolveDynamicComponent(tab.children.header), { key: 1 })) : createCommentVNode("", true)
          ], 16, _hoisted_3$b)
        ], 16),
        createVNode(Transition, { name: "p-toggleable-content" }, {
          default: withCtx(() => [
            ($props.lazy ? $options.isTabActive(i) : true) ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              id: $options.getTabContentId(i),
              style: $options.getTabProp(tab, "contentStyle"),
              class: $options.getTabContentClass(tab),
              role: "region",
              "aria-labelledby": $options.getTabHeaderActionId(i)
            }, $options.getTabProp(tab, "contentProps")), [
              createElementVNode("div", _hoisted_6$4, [
                (openBlock(), createBlock(resolveDynamicComponent(tab)))
              ])
            ], 16, _hoisted_5$7)), [
              [vShow, $props.lazy ? true : $options.isTabActive(i)]
            ]) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1024)
      ], 10, _hoisted_2$g);
    }), 128))
  ]);
}
function styleInject$h(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$h();
script$o.render = render$o;
var script$n = {
  name: "AccordionTab",
  props: {
    header: null,
    headerStyle: null,
    headerClass: null,
    headerProps: null,
    headerActionProps: null,
    contentStyle: null,
    contentClass: null,
    contentProps: null,
    disabled: Boolean
  }
};
function render$n(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
script$n.render = render$n;
var script$m = {
  name: "Avatar",
  emits: ["error"],
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "normal"
    },
    shape: {
      type: String,
      default: "square"
    },
    "aria-labelledby": {
      type: String,
      default: null
    },
    "aria-label": {
      type: String,
      default: null
    }
  },
  methods: {
    onError() {
      this.$emit("error");
    }
  },
  computed: {
    containerClass() {
      return [
        "p-avatar p-component",
        {
          "p-avatar-image": this.image != null,
          "p-avatar-circle": this.shape === "circle",
          "p-avatar-lg": this.size === "large",
          "p-avatar-xl": this.size === "xlarge"
        }
      ];
    },
    iconClass() {
      return ["p-avatar-icon", this.icon];
    }
  }
};
const _hoisted_1$k = ["aria-labelledby", "aria-label"];
const _hoisted_2$f = {
  key: 0,
  class: "p-avatar-text"
};
const _hoisted_3$a = ["src"];
function render$m(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.containerClass),
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      $props.label ? (openBlock(), createElementBlock("span", _hoisted_2$f, toDisplayString($props.label), 1)) : $props.icon ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass($options.iconClass)
      }, null, 2)) : $props.image ? (openBlock(), createElementBlock("img", {
        key: 2,
        src: $props.image,
        onError: _cache[0] || (_cache[0] = (...args) => $options.onError && $options.onError(...args))
      }, null, 40, _hoisted_3$a)) : createCommentVNode("", true)
    ])
  ], 10, _hoisted_1$k);
}
function styleInject$g(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$g();
script$m.render = render$m;
var script$l = {
  name: "Button",
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconPos: {
      type: String,
      default: "left"
    },
    iconClass: {
      type: String,
      default: null
    },
    badge: {
      type: String,
      default: null
    },
    badgeClass: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: String,
      default: "pi pi-spinner pi-spin"
    }
  },
  computed: {
    buttonClass() {
      return {
        "p-button p-component": true,
        "p-button-icon-only": this.icon && !this.label,
        "p-button-vertical": (this.iconPos === "top" || this.iconPos === "bottom") && this.label,
        "p-disabled": this.$attrs.disabled || this.loading,
        "p-button-loading": this.loading,
        "p-button-loading-label-only": this.loading && !this.icon && this.label
      };
    },
    iconStyleClass() {
      return [
        this.loading ? "p-button-loading-icon " + this.loadingIcon : this.icon,
        "p-button-icon",
        this.iconClass,
        {
          "p-button-icon-left": this.iconPos === "left" && this.label,
          "p-button-icon-right": this.iconPos === "right" && this.label,
          "p-button-icon-top": this.iconPos === "top" && this.label,
          "p-button-icon-bottom": this.iconPos === "bottom" && this.label
        }
      ];
    },
    badgeStyleClass() {
      return [
        "p-badge p-component",
        this.badgeClass,
        {
          "p-badge-no-gutter": this.badge && String(this.badge).length === 1
        }
      ];
    },
    disabled() {
      return this.$attrs.disabled || this.loading;
    },
    defaultAriaLabel() {
      return this.label ? this.label + (this.badge ? " " + this.badge : "") : this.$attrs["aria-label"];
    }
  },
  directives: {
    ripple: Ripple
  }
};
const _hoisted_1$j = ["aria-label", "disabled"];
const _hoisted_2$e = { class: "p-button-label" };
function render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = resolveDirective("ripple");
  return withDirectives((openBlock(), createElementBlock("button", {
    class: normalizeClass($options.buttonClass),
    type: "button",
    "aria-label": $options.defaultAriaLabel,
    disabled: $options.disabled
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      $props.loading && !$props.icon ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass($options.iconStyleClass)
      }, null, 2)) : createCommentVNode("", true),
      $props.icon ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass($options.iconStyleClass)
      }, null, 2)) : createCommentVNode("", true),
      createElementVNode("span", _hoisted_2$e, toDisplayString($props.label || " "), 1),
      $props.badge ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: normalizeClass($options.badgeStyleClass)
      }, toDisplayString($props.badge), 3)) : createCommentVNode("", true)
    ])
  ], 10, _hoisted_1$j)), [
    [_directive_ripple]
  ]);
}
script$l.render = render$l;
var OverlayEventBus = primebus();
var script$k = {
  name: "Portal",
  props: {
    appendTo: {
      type: String,
      default: "body"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mounted: false
    };
  },
  mounted() {
    this.mounted = DomHandler.isClient();
  },
  computed: {
    inline() {
      return this.disabled || this.appendTo === "self";
    }
  }
};
function render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return $options.inline ? renderSlot(_ctx.$slots, "default", { key: 0 }) : $data.mounted ? (openBlock(), createBlock(Teleport, {
    key: 1,
    to: $props.appendTo
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 8, ["to"])) : createCommentVNode("", true);
}
script$k.render = render$k;
var script$j = {
  name: "VirtualScroller",
  emits: ["update:numToleratedItems", "scroll", "scroll-index-change", "lazy-load"],
  props: {
    id: {
      type: String,
      default: null
    },
    style: null,
    class: null,
    items: {
      type: Array,
      default: null
    },
    itemSize: {
      type: [Number, Array],
      default: 0
    },
    scrollHeight: null,
    scrollWidth: null,
    orientation: {
      type: String,
      default: "vertical"
    },
    numToleratedItems: {
      type: Number,
      default: null
    },
    delay: {
      type: Number,
      default: 0
    },
    lazy: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loaderDisabled: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    showSpacer: {
      type: Boolean,
      default: true
    },
    showLoader: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      first: this.isBoth() ? { rows: 0, cols: 0 } : 0,
      last: this.isBoth() ? { rows: 0, cols: 0 } : 0,
      numItemsInViewport: this.isBoth() ? { rows: 0, cols: 0 } : 0,
      lastScrollPos: this.isBoth() ? { top: 0, left: 0 } : 0,
      d_numToleratedItems: this.numToleratedItems,
      d_loading: this.loading,
      loaderArr: [],
      spacerStyle: {},
      contentStyle: {}
    };
  },
  element: null,
  content: null,
  lastScrollPos: null,
  scrollTimeout: null,
  watch: {
    numToleratedItems(newValue) {
      this.d_numToleratedItems = newValue;
    },
    loading(newValue) {
      this.d_loading = newValue;
    },
    items(newValue, oldValue) {
      if (!oldValue || oldValue.length !== (newValue || []).length) {
        this.init();
      }
    },
    orientation() {
      this.lastScrollPos = this.isBoth() ? { top: 0, left: 0 } : 0;
    }
  },
  mounted() {
    this.init();
    this.lastScrollPos = this.isBoth() ? { top: 0, left: 0 } : 0;
  },
  methods: {
    init() {
      this.setSize();
      this.calculateOptions();
      this.setSpacerSize();
    },
    isVertical() {
      return this.orientation === "vertical";
    },
    isHorizontal() {
      return this.orientation === "horizontal";
    },
    isBoth() {
      return this.orientation === "both";
    },
    scrollTo(options) {
      this.element && this.element.scrollTo(options);
    },
    scrollToIndex(index, behavior = "auto") {
      const both = this.isBoth();
      const horizontal = this.isHorizontal();
      const first = this.first;
      const { numToleratedItems } = this.calculateNumItems();
      const itemSize = this.itemSize;
      const calculateFirst = (_index = 0, _numT) => _index <= _numT ? 0 : _index;
      const calculateCoord = (_first, _size) => _first * _size;
      const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
      if (both) {
        const newFirst = { rows: calculateFirst(index[0], numToleratedItems[0]), cols: calculateFirst(index[1], numToleratedItems[1]) };
        if (newFirst.rows !== first.rows || newFirst.cols !== first.cols) {
          scrollTo(calculateCoord(newFirst.cols, itemSize[1]), calculateCoord(newFirst.rows, itemSize[0]));
        }
      } else {
        const newFirst = calculateFirst(index, numToleratedItems);
        if (newFirst !== first) {
          horizontal ? scrollTo(calculateCoord(newFirst, itemSize), 0) : scrollTo(0, calculateCoord(newFirst, itemSize));
        }
      }
    },
    scrollInView(index, to, behavior = "auto") {
      if (to) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const { first, viewport } = this.getRenderedRange();
        const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
        const isToStart = to === "to-start";
        const isToEnd = to === "to-end";
        if (isToStart) {
          if (both) {
            if (viewport.first.rows - first.rows > index[0]) {
              scrollTo(viewport.first.cols * this.itemSize[1], (viewport.first.rows - 1) * this.itemSize[0]);
            } else if (viewport.first.cols - first.cols > index[1]) {
              scrollTo((viewport.first.cols - 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
            }
          } else {
            if (viewport.first - first > index) {
              const pos = (viewport.first - 1) * this.itemSize;
              horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
            }
          }
        } else if (isToEnd) {
          if (both) {
            if (viewport.last.rows - first.rows <= index[0] + 1) {
              scrollTo(viewport.first.cols * this.itemSize[1], (viewport.first.rows + 1) * this.itemSize[0]);
            } else if (viewport.last.cols - first.cols <= index[1] + 1) {
              scrollTo((viewport.first.cols + 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
            }
          } else {
            if (viewport.last - first <= index + 1) {
              const pos = (viewport.first + 1) * this.itemSize;
              horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
            }
          }
        }
      } else {
        this.scrollToIndex(index, behavior);
      }
    },
    getRenderedRange() {
      const calculateFirstInViewport = (_pos, _size) => Math.floor(_pos / (_size || _pos));
      let firstInViewport = this.first;
      let lastInViewport = 0;
      if (this.element) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const scrollTop = this.element.scrollTop;
        const scrollLeft = this.element.scrollLeft;
        if (both) {
          firstInViewport = { rows: calculateFirstInViewport(scrollTop, this.itemSize[0]), cols: calculateFirstInViewport(scrollLeft, this.itemSize[1]) };
          lastInViewport = { rows: firstInViewport.rows + this.numItemsInViewport.rows, cols: firstInViewport.cols + this.numItemsInViewport.cols };
        } else {
          const scrollPos = horizontal ? scrollLeft : scrollTop;
          firstInViewport = calculateFirstInViewport(scrollPos, this.itemSize);
          lastInViewport = firstInViewport + this.numItemsInViewport;
        }
      }
      return {
        first: this.first,
        last: this.last,
        viewport: {
          first: firstInViewport,
          last: lastInViewport
        }
      };
    },
    calculateNumItems() {
      const both = this.isBoth();
      const horizontal = this.isHorizontal();
      const itemSize = this.itemSize;
      const contentPos = this.getContentPosition();
      const contentWidth = this.element ? this.element.offsetWidth - contentPos.left : 0;
      const contentHeight = this.element ? this.element.offsetHeight - contentPos.top : 0;
      const calculateNumItemsInViewport = (_contentSize, _itemSize) => Math.ceil(_contentSize / (_itemSize || _contentSize));
      const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
      const numItemsInViewport = both ? { rows: calculateNumItemsInViewport(contentHeight, itemSize[0]), cols: calculateNumItemsInViewport(contentWidth, itemSize[1]) } : calculateNumItemsInViewport(horizontal ? contentWidth : contentHeight, itemSize);
      const numToleratedItems = this.d_numToleratedItems || (both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
      return { numItemsInViewport, numToleratedItems };
    },
    calculateOptions() {
      const both = this.isBoth();
      const first = this.first;
      const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
      const calculateLast = (_first, _num, _numT, _isCols) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
      const last = both ? { rows: calculateLast(first.rows, numItemsInViewport.rows, numToleratedItems[0]), cols: calculateLast(first.cols, numItemsInViewport.cols, numToleratedItems[1], true) } : calculateLast(first, numItemsInViewport, numToleratedItems);
      this.last = last;
      this.numItemsInViewport = numItemsInViewport;
      this.d_numToleratedItems = numToleratedItems;
      this.$emit("update:numToleratedItems", this.d_numToleratedItems);
      if (this.showLoader) {
        this.loaderArr = both ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) : Array.from({ length: numItemsInViewport });
      }
      if (this.lazy) {
        this.$emit("lazy-load", { first, last });
      }
    },
    getLast(last = 0, isCols) {
      if (this.items) {
        return Math.min(isCols ? (this.columns || this.items[0]).length : this.items.length, last);
      }
      return 0;
    },
    getContentPosition() {
      if (this.content) {
        const style = getComputedStyle(this.content);
        const left = parseInt(style.paddingLeft, 10) + Math.max(parseInt(style.left, 10), 0);
        const right = parseInt(style.paddingRight, 10) + Math.max(parseInt(style.right, 10), 0);
        const top = parseInt(style.paddingTop, 10) + Math.max(parseInt(style.top, 10), 0);
        const bottom = parseInt(style.paddingBottom, 10) + Math.max(parseInt(style.bottom, 10), 0);
        return { left, right, top, bottom, x: left + right, y: top + bottom };
      }
      return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
    },
    setSize() {
      if (this.element) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const parentElement = this.element.parentElement;
        const width = this.scrollWidth || `${this.element.offsetWidth || parentElement.offsetWidth}px`;
        const height = this.scrollHeight || `${this.element.offsetHeight || parentElement.offsetHeight}px`;
        const setProp = (_name, _value) => this.element.style[_name] = _value;
        if (both || horizontal) {
          setProp("height", height);
          setProp("width", width);
        } else {
          setProp("height", height);
        }
      }
    },
    setSpacerSize() {
      const items = this.items;
      if (items) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const contentPos = this.getContentPosition();
        const setProp = (_name, _value, _size, _cpos = 0) => this.spacerStyle = { ...this.spacerStyle, ...{ [`${_name}`]: (_value || []).length * _size + _cpos + "px" } };
        if (both) {
          setProp("height", items, this.itemSize[0], contentPos.y);
          setProp("width", this.columns || items[1], this.itemSize[1], contentPos.x);
        } else {
          horizontal ? setProp("width", this.columns || items, this.itemSize, contentPos.x) : setProp("height", items, this.itemSize, contentPos.y);
        }
      }
    },
    setContentPosition(pos) {
      if (this.content) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const first = pos ? pos.first : this.first;
        const calculateTranslateVal = (_first, _size) => _first * _size;
        const setTransform = (_x = 0, _y = 0) => {
          this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } };
        };
        if (both) {
          setTransform(calculateTranslateVal(first.cols, this.itemSize[1]), calculateTranslateVal(first.rows, this.itemSize[0]));
        } else {
          const translateVal = calculateTranslateVal(first, this.itemSize);
          horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
        }
      }
    },
    onScrollPositionChange(event) {
      const target = event.target;
      const both = this.isBoth();
      const horizontal = this.isHorizontal();
      const contentPos = this.getContentPosition();
      const calculateScrollPos = (_pos, _cpos) => _pos ? _pos > _cpos ? _pos - _cpos : _pos : 0;
      const calculateCurrentIndex = (_pos, _size) => Math.floor(_pos / (_size || _pos));
      const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
        return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
      };
      const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
        if (_currentIndex <= _numT) return 0;
        else return Math.max(0, _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
      };
      const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols) => {
        let lastValue = _first + _num + 2 * _numT;
        if (_currentIndex >= _numT) {
          lastValue += _numT + 1;
        }
        return this.getLast(lastValue, _isCols);
      };
      const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
      const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
      let newFirst = both ? { rows: 0, cols: 0 } : 0;
      let newLast = this.last;
      let isRangeChanged = false;
      let newScrollPos = this.lastScrollPos;
      if (both) {
        const isScrollDown = this.lastScrollPos.top <= scrollTop;
        const isScrollRight = this.lastScrollPos.left <= scrollLeft;
        const currentIndex = { rows: calculateCurrentIndex(scrollTop, this.itemSize[0]), cols: calculateCurrentIndex(scrollLeft, this.itemSize[1]) };
        const triggerIndex = {
          rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
          cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
        };
        newFirst = {
          rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
          cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
        };
        newLast = {
          rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
          cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
        };
        isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols;
        newScrollPos = { top: scrollTop, left: scrollLeft };
      } else {
        const scrollPos = horizontal ? scrollLeft : scrollTop;
        const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
        const currentIndex = calculateCurrentIndex(scrollPos, this.itemSize);
        const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
        newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
        newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
        isRangeChanged = newFirst !== this.first || newLast !== this.last;
        newScrollPos = scrollPos;
      }
      return {
        first: newFirst,
        last: newLast,
        isRangeChanged,
        scrollPos: newScrollPos
      };
    },
    onScrollChange(event) {
      const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);
      if (isRangeChanged) {
        const newState = { first, last };
        this.setContentPosition(newState);
        this.first = first;
        this.last = last;
        this.lastScrollPos = scrollPos;
        this.$emit("scroll-index-change", newState);
        if (this.lazy) {
          this.$emit("lazy-load", newState);
        }
      }
    },
    onScroll(event) {
      this.$emit("scroll", event);
      if (this.delay) {
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
        }
        if (!this.d_loading && this.showLoader) {
          const { isRangeChanged: changed } = this.onScrollPositionChange(event);
          changed && (this.d_loading = true);
        }
        this.scrollTimeout = setTimeout(() => {
          this.onScrollChange(event);
          if (this.d_loading && this.showLoader && !this.lazy) {
            this.d_loading = false;
          }
        }, this.delay);
      } else {
        this.onScrollChange(event);
      }
    },
    getOptions(renderedIndex) {
      const count = (this.items || []).length;
      const index = this.isBoth() ? this.first.rows + renderedIndex : this.first + renderedIndex;
      return {
        index,
        count,
        first: index === 0,
        last: index === count - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0
      };
    },
    getLoaderOptions(index, extOptions) {
      let count = this.loaderArr.length;
      return {
        index,
        count,
        first: index === 0,
        last: index === count - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0,
        ...extOptions
      };
    },
    elementRef(el) {
      this.element = el;
    },
    contentRef(el) {
      this.content = el;
    }
  },
  computed: {
    containerClass() {
      return [
        "p-virtualscroller",
        {
          "p-both-scroll": this.isBoth(),
          "p-horizontal-scroll": this.isHorizontal()
        },
        this.class
      ];
    },
    contentClass() {
      return [
        "p-virtualscroller-content",
        {
          "p-virtualscroller-loading": this.d_loading
        }
      ];
    },
    loaderClass() {
      return [
        "p-virtualscroller-loader",
        {
          "p-component-overlay": !this.$slots.loader
        }
      ];
    },
    loadedItems() {
      const items = this.items;
      if (items && !this.d_loading) {
        if (this.isBoth()) {
          return items.slice(this.first.rows, this.last.rows).map((item) => this.columns ? item : item.slice(this.first.cols, this.last.cols));
        } else if (this.isHorizontal() && this.columns) return items;
        else return items.slice(this.first, this.last);
      }
      return [];
    },
    loadedRows() {
      return this.d_loading ? this.loaderDisabled ? this.loaderArr : [] : this.loadedItems;
    },
    loadedColumns() {
      if (this.columns) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        if (both || horizontal) {
          return this.d_loading && this.loaderDisabled ? both ? this.loaderArr[0] : this.loaderArr : this.columns.slice(both ? this.first.cols : this.first, both ? this.last.cols : this.last);
        }
      }
      return this.columns;
    }
  }
};
const _hoisted_1$i = ["tabindex"];
const _hoisted_2$d = {
  key: 1,
  class: "p-virtualscroller-loading-icon pi pi-spinner pi-spin"
};
function render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return !$props.disabled ? (openBlock(), createElementBlock("div", {
    key: 0,
    ref: $options.elementRef,
    class: normalizeClass($options.containerClass),
    tabindex: $props.tabindex,
    style: normalizeStyle($props.style),
    onScroll: _cache[0] || (_cache[0] = (...args) => $options.onScroll && $options.onScroll(...args))
  }, [
    renderSlot(_ctx.$slots, "content", {
      styleClass: $options.contentClass,
      items: $options.loadedItems,
      getItemOptions: $options.getOptions,
      loading: $data.d_loading,
      getLoaderOptions: $options.getLoaderOptions,
      itemSize: $props.itemSize,
      rows: $options.loadedRows,
      columns: $options.loadedColumns,
      contentRef: $options.contentRef,
      spacerStyle: $data.spacerStyle,
      contentStyle: $data.contentStyle,
      vertical: $options.isVertical(),
      horizontal: $options.isHorizontal(),
      both: $options.isBoth()
    }, () => [
      createElementVNode("div", {
        ref: $options.contentRef,
        class: normalizeClass($options.contentClass),
        style: normalizeStyle($data.contentStyle)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.loadedItems, (item, index) => {
          return renderSlot(_ctx.$slots, "item", {
            key: index,
            item,
            options: $options.getOptions(index)
          });
        }), 128))
      ], 6)
    ]),
    $props.showSpacer ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "p-virtualscroller-spacer",
      style: normalizeStyle($data.spacerStyle)
    }, null, 4)) : createCommentVNode("", true),
    !$props.loaderDisabled && $props.showLoader && $data.d_loading ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass($options.loaderClass)
    }, [
      _ctx.$slots && _ctx.$slots.loader ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList($data.loaderArr, (_, index) => {
        return renderSlot(_ctx.$slots, "loader", {
          key: index,
          options: $options.getLoaderOptions(index, $options.isBoth() && { numCols: _ctx.d_numItemsInViewport.cols })
        });
      }), 128)) : (openBlock(), createElementBlock("i", _hoisted_2$d))
    ], 2)) : createCommentVNode("", true)
  ], 46, _hoisted_1$i)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
    renderSlot(_ctx.$slots, "default"),
    renderSlot(_ctx.$slots, "content", {
      items: $props.items,
      rows: $props.items,
      columns: $options.loadedColumns
    })
  ], 64));
}
function styleInject$f(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$f();
script$j.render = render$j;
var script$i = {
  name: "AutoComplete",
  emits: ["update:modelValue", "change", "focus", "blur", "item-select", "item-unselect", "dropdown-click", "clear", "complete", "before-show", "before-hide", "show", "hide"],
  props: {
    modelValue: null,
    suggestions: {
      type: Array,
      default: null
    },
    field: {
      // TODO: Deprecated since v3.16.0
      type: [String, Function],
      default: null
    },
    optionLabel: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    scrollHeight: {
      type: String,
      default: "200px"
    },
    dropdown: {
      type: Boolean,
      default: false
    },
    dropdownMode: {
      type: String,
      default: "blank"
    },
    autoHighlight: {
      // TODO: Deprecated since v3.16.0. Use selectOnFocus property instead.
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    dataKey: {
      type: String,
      default: null
    },
    minLength: {
      type: Number,
      default: 1
    },
    delay: {
      type: Number,
      default: 300
    },
    appendTo: {
      type: String,
      default: "body"
    },
    forceSelection: {
      type: Boolean,
      default: false
    },
    completeOnFocus: {
      type: Boolean,
      default: false
    },
    inputId: {
      type: String,
      default: null
    },
    inputStyle: {
      type: null,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    inputProps: {
      type: null,
      default: null
    },
    panelStyle: {
      type: null,
      default: null
    },
    panelClass: {
      type: String,
      default: null
    },
    panelProps: {
      type: null,
      default: null
    },
    dropdownIcon: {
      type: String,
      default: "pi pi-chevron-down"
    },
    dropdownClass: {
      type: String,
      default: null
    },
    loadingIcon: {
      type: String,
      default: "pi pi-spinner"
    },
    removeTokenIcon: {
      type: String,
      default: "pi pi-times-circle"
    },
    virtualScrollerOptions: {
      type: Object,
      default: null
    },
    autoOptionFocus: {
      type: Boolean,
      default: true
    },
    selectOnFocus: {
      type: Boolean,
      default: false
    },
    searchLocale: {
      type: String,
      default: void 0
    },
    searchMessage: {
      type: String,
      default: null
    },
    selectionMessage: {
      type: String,
      default: null
    },
    emptySelectionMessage: {
      type: String,
      default: null
    },
    emptySearchMessage: {
      type: String,
      default: null
    },
    tabindex: {
      type: Number,
      default: 0
    },
    "aria-label": {
      type: String,
      default: null
    },
    "aria-labelledby": {
      type: String,
      default: null
    }
  },
  outsideClickListener: null,
  resizeListener: null,
  scrollHandler: null,
  overlay: null,
  virtualScroller: null,
  searchTimeout: null,
  focusOnHover: false,
  dirty: false,
  data() {
    return {
      focused: false,
      focusedOptionIndex: -1,
      focusedMultipleOptionIndex: -1,
      overlayVisible: false,
      searching: false
    };
  },
  watch: {
    suggestions() {
      if (this.searching) {
        ObjectUtils.isNotEmpty(this.suggestions) ? this.show() : this.hide();
        this.focusedOptionIndex = this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.searching = false;
      }
      this.autoUpdateModel();
    }
  },
  mounted() {
    this.autoUpdateModel();
  },
  updated() {
    if (this.overlayVisible) {
      this.alignOverlay();
    }
  },
  beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    getOptionIndex(index, fn) {
      return this.virtualScrollerDisabled ? index : fn && fn(index)["index"];
    },
    getOptionLabel(option) {
      return this.field || this.optionLabel ? ObjectUtils.resolveFieldData(option, this.field || this.optionLabel) : option;
    },
    getOptionValue(option) {
      return option;
    },
    getOptionRenderKey(option, index) {
      return (this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + "_" + index;
    },
    isOptionDisabled(option) {
      return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
    },
    isOptionGroup(option) {
      return this.optionGroupLabel && option.optionGroup && option.group;
    },
    getOptionGroupLabel(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
    },
    getOptionGroupChildren(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
    },
    getAriaPosInset(index) {
      return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
    },
    show(isFocus) {
      this.$emit("before-show");
      this.dirty = true;
      this.overlayVisible = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      isFocus && DomHandler.focus(this.$refs.focusInput);
    },
    hide(isFocus) {
      const _hide = () => {
        this.$emit("before-hide");
        this.dirty = isFocus;
        this.overlayVisible = false;
        this.focusedOptionIndex = -1;
        isFocus && DomHandler.focus(this.$refs.focusInput);
      };
      setTimeout(() => {
        _hide();
      }, 0);
    },
    onFocus(event) {
      if (!this.dirty && this.completeOnFocus) {
        this.search(event, event.target.value, "focus");
      }
      this.dirty = true;
      this.focused = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      this.overlayVisible && this.scrollInView(this.focusedOptionIndex);
      this.$emit("focus", event);
    },
    onBlur(event) {
      this.dirty = false;
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.$emit("blur", event);
    },
    onKeyDown(event) {
      switch (event.code) {
        case "ArrowDown":
          this.onArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event);
          break;
        case "ArrowLeft":
          this.onArrowLeftKey(event);
          break;
        case "ArrowRight":
          this.onArrowRightKey(event);
          break;
        case "Home":
          this.onHomeKey(event);
          break;
        case "End":
          this.onEndKey(event);
          break;
        case "PageDown":
          this.onPageDownKey(event);
          break;
        case "PageUp":
          this.onPageUpKey(event);
          break;
        case "Enter":
          this.onEnterKey(event);
          break;
        case "Escape":
          this.onEscapeKey(event);
          break;
        case "Tab":
          this.onTabKey(event);
          break;
        case "Backspace":
          this.onBackspaceKey(event);
          break;
      }
    },
    onInput(event) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      let query = event.target.value;
      if (!this.multiple) {
        this.updateModel(event, query);
      }
      if (query.length === 0) {
        this.hide();
        this.$emit("clear");
      } else {
        if (query.length >= this.minLength) {
          this.focusedOptionIndex = -1;
          this.searchTimeout = setTimeout(() => {
            this.search(event, query, "input");
          }, this.delay);
        } else {
          this.hide();
        }
      }
    },
    onChange(event) {
      if (this.forceSelection) {
        let valid = false;
        if (this.visibleOptions) {
          const matchedValue = this.visibleOptions.find((option) => this.isOptionMatched(option, this.$refs.focusInput.value || ""));
          if (matchedValue !== void 0) {
            valid = true;
            !this.isSelected(matchedValue) && this.onOptionSelect(event, matchedValue);
          }
        }
        if (!valid) {
          this.$refs.focusInput.value = "";
          this.$emit("clear");
          !this.multiple && this.updateModel(event, null);
        }
      }
    },
    onMultipleContainerFocus() {
      this.focused = true;
    },
    onMultipleContainerBlur() {
      this.focusedMultipleOptionIndex = -1;
      this.focused = false;
    },
    onMultipleContainerKeyDown(event) {
      switch (event.code) {
        case "ArrowLeft":
          this.onArrowLeftKeyOnMultiple(event);
          break;
        case "ArrowRight":
          this.onArrowRightKeyOnMultiple(event);
          break;
        case "Backspace":
          this.onBackspaceKeyOnMultiple(event);
          break;
      }
    },
    onContainerClick(event) {
      if (this.disabled || this.searching || this.isInputClicked(event) || this.isDropdownClicked(event)) {
        return;
      }
      if (!this.overlay || !this.overlay.contains(event.target)) {
        DomHandler.focus(this.$refs.focusInput);
      }
    },
    onDropdownClick(event) {
      let query = void 0;
      if (this.overlayVisible) {
        this.hide(true);
      } else {
        DomHandler.focus(this.$refs.focusInput);
        query = this.$refs.focusInput.value;
        if (this.dropdownMode === "blank") this.search(event, "", "dropdown");
        else if (this.dropdownMode === "current") this.search(event, query, "dropdown");
      }
      this.$emit("dropdown-click", { originalEvent: event, query });
    },
    onOptionSelect(event, option, isHide = true) {
      const value = this.getOptionValue(option);
      if (this.multiple) {
        this.$refs.focusInput.value = "";
        if (!this.isSelected(option)) {
          this.updateModel(event, [...this.modelValue || [], value]);
        }
      } else {
        this.updateModel(event, value);
      }
      this.$emit("item-select", { originalEvent: event, value: option });
      isHide && this.hide(true);
    },
    onOptionMouseMove(event, index) {
      if (this.focusOnHover) {
        this.changeFocusedOptionIndex(event, index);
      }
    },
    onOverlayClick(event) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event,
        target: this.$el
      });
    },
    onOverlayKeyDown(event) {
      switch (event.code) {
        case "Escape":
          this.onEscapeKey(event);
          break;
      }
    },
    onArrowDownKey(event) {
      if (!this.overlayVisible) {
        return;
      }
      const optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();
      this.changeFocusedOptionIndex(event, optionIndex);
      event.preventDefault();
    },
    onArrowUpKey(event) {
      if (!this.overlayVisible) {
        return;
      }
      if (event.altKey) {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.overlayVisible && this.hide();
        event.preventDefault();
      } else {
        const optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();
        this.changeFocusedOptionIndex(event, optionIndex);
        event.preventDefault();
      }
    },
    onArrowLeftKey(event) {
      const target = event.currentTarget;
      this.focusedOptionIndex = -1;
      if (this.multiple) {
        if (ObjectUtils.isEmpty(target.value) && this.hasSelectedOption) {
          DomHandler.focus(this.$refs.multiContainer);
          this.focusedMultipleOptionIndex = this.modelValue.length;
        } else {
          event.stopPropagation();
        }
      }
    },
    onArrowRightKey(event) {
      this.focusedOptionIndex = -1;
      this.multiple && event.stopPropagation();
    },
    onHomeKey(event) {
      const target = event.currentTarget;
      const len = target.value.length;
      if (event.shiftKey) {
        event.currentTarget.setSelectionRange(0, len);
      } else {
        event.currentTarget.setSelectionRange(0, 0);
      }
      this.focusedOptionIndex = -1;
      event.preventDefault();
    },
    onEndKey(event) {
      const target = event.currentTarget;
      const len = target.value.length;
      if (event.shiftKey) {
        event.currentTarget.setSelectionRange(0, len);
      } else {
        target.setSelectionRange(len, len);
      }
      this.focusedOptionIndex = -1;
      event.preventDefault();
    },
    onPageUpKey(event) {
      this.scrollInView(0);
      event.preventDefault();
    },
    onPageDownKey(event) {
      this.scrollInView(this.visibleOptions.length - 1);
      event.preventDefault();
    },
    onEnterKey(event) {
      if (!this.overlayVisible) {
        this.onArrowDownKey(event);
      } else {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.hide();
      }
      event.preventDefault();
    },
    onEscapeKey(event) {
      this.overlayVisible && this.hide(true);
      event.preventDefault();
    },
    onTabKey(event) {
      if (this.focusedOptionIndex !== -1) {
        this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
      }
      this.overlayVisible && this.hide();
    },
    onBackspaceKey(event) {
      if (this.multiple) {
        if (ObjectUtils.isNotEmpty(this.modelValue) && !this.$refs.focusInput.value) {
          const removedValue = this.modelValue[this.modelValue.length - 1];
          const newValue = this.modelValue.slice(0, -1);
          this.$emit("update:modelValue", newValue);
          this.$emit("item-unselect", { originalEvent: event, value: removedValue });
        }
        event.stopPropagation();
      }
    },
    onArrowLeftKeyOnMultiple() {
      this.focusedMultipleOptionIndex = this.focusedMultipleOptionIndex < 1 ? 0 : this.focusedMultipleOptionIndex - 1;
    },
    onArrowRightKeyOnMultiple() {
      this.focusedMultipleOptionIndex++;
      if (this.focusedMultipleOptionIndex > this.modelValue.length - 1) {
        this.focusedMultipleOptionIndex = -1;
        DomHandler.focus(this.$refs.focusInput);
      }
    },
    onBackspaceKeyOnMultiple(event) {
      if (this.focusedMultipleOptionIndex !== -1) {
        this.removeOption(event, this.focusedMultipleOptionIndex);
      }
    },
    onOverlayEnter(el) {
      ZIndexUtils.set("overlay", el, this.$primevue.config.zIndex.overlay);
      this.alignOverlay();
    },
    onOverlayAfterEnter() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.$emit("show");
    },
    onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit("hide");
      this.overlay = null;
    },
    onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    alignOverlay() {
      let target = this.multiple ? this.$refs.multiContainer : this.$refs.focusInput;
      if (this.appendTo === "self") {
        DomHandler.relativePosition(this.overlay, target);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(target) + "px";
        DomHandler.absolutePosition(this.overlay, target);
      }
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.overlayVisible && this.overlay && this.isOutsideClicked(event)) {
            this.hide();
          }
        };
        (void 0).addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        (void 0).removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
          if (this.overlayVisible) {
            this.hide();
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hide();
          }
        };
        (void 0).addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        (void 0).removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    isOutsideClicked(event) {
      return !this.overlay.contains(event.target) && !this.isInputClicked(event) && !this.isDropdownClicked(event);
    },
    isInputClicked(event) {
      if (this.multiple) return event.target === this.$refs.multiContainer || this.$refs.multiContainer.contains(event.target);
      else return event.target === this.$refs.focusInput;
    },
    isDropdownClicked(event) {
      return this.$refs.dropdownButton ? event.target === this.$refs.dropdownButton || this.$refs.dropdownButton.$el.contains(event.target) : false;
    },
    isOptionMatched(option, value) {
      return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.searchLocale) === value.toLocaleLowerCase(this.searchLocale);
    },
    isValidOption(option) {
      return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    },
    isValidSelectedOption(option) {
      return this.isValidOption(option) && this.isSelected(option);
    },
    isSelected(option) {
      return ObjectUtils.equals(this.modelValue, this.getOptionValue(option), this.equalityKey);
    },
    findFirstOptionIndex() {
      return this.visibleOptions.findIndex((option) => this.isValidOption(option));
    },
    findLastOptionIndex() {
      return ObjectUtils.findLastIndex(this.visibleOptions, (option) => this.isValidOption(option));
    },
    findNextOptionIndex(index) {
      const matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    },
    findPrevOptionIndex(index) {
      const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), (option) => this.isValidOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findSelectedOptionIndex() {
      return this.hasSelectedOption ? this.visibleOptions.findIndex((option) => this.isValidSelectedOption(option)) : -1;
    },
    findFirstFocusedOptionIndex() {
      const selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    },
    findLastFocusedOptionIndex() {
      const selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    },
    search(event, query, source) {
      if (query === void 0 || query === null) {
        return;
      }
      if (source === "input" && query.trim().length === 0) {
        return;
      }
      this.searching = true;
      this.$emit("complete", { originalEvent: event, query });
    },
    removeOption(event, index) {
      const removedOption = this.modelValue[index];
      const value = this.modelValue.filter((_, i) => i !== index).map((option) => this.getOptionValue(option));
      this.updateModel(event, value);
      this.$emit("item-unselect", { originalEvent: event, value: removedOption });
      this.dirty = true;
      DomHandler.focus(this.$refs.focusInput);
    },
    changeFocusedOptionIndex(event, index) {
      if (this.focusedOptionIndex !== index) {
        this.focusedOptionIndex = index;
        this.scrollInView();
        if (this.selectOnFocus || this.autoHighlight) {
          this.onOptionSelect(event, this.visibleOptions[index], false);
        }
      }
    },
    scrollInView(index = -1) {
      const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
      const element = DomHandler.findSingle(this.list, `li[id="${id}"]`);
      if (element) {
        element.scrollIntoView && element.scrollIntoView({ block: "nearest", inline: "start" });
      } else if (!this.virtualScrollerDisabled) {
        setTimeout(() => {
          this.virtualScroller && this.virtualScroller.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex);
        }, 0);
      }
    },
    autoUpdateModel() {
      if ((this.selectOnFocus || this.autoHighlight) && this.autoOptionFocus && !this.hasSelectedOption) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], false);
      }
    },
    updateModel(event, value) {
      this.$emit("update:modelValue", value);
      this.$emit("change", { originalEvent: event, value });
    },
    flatOptions(options) {
      return (options || []).reduce((result, option, index) => {
        result.push({ optionGroup: option, group: true, index });
        const optionGroupChildren = this.getOptionGroupChildren(option);
        optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));
        return result;
      }, []);
    },
    overlayRef(el) {
      this.overlay = el;
    },
    listRef(el, contentRef) {
      this.list = el;
      contentRef && contentRef(el);
    },
    virtualScrollerRef(el) {
      this.virtualScroller = el;
    }
  },
  computed: {
    containerClass() {
      return [
        "p-autocomplete p-component p-inputwrapper",
        {
          "p-disabled": this.disabled,
          "p-focus": this.focused,
          "p-autocomplete-dd": this.dropdown,
          "p-autocomplete-multiple": this.multiple,
          "p-inputwrapper-filled": this.modelValue || ObjectUtils.isNotEmpty(this.inputValue),
          "p-inputwrapper-focus": this.focused,
          "p-overlay-open": this.overlayVisible
        }
      ];
    },
    inputStyleClass() {
      return [
        "p-autocomplete-input p-inputtext p-component",
        this.inputClass,
        {
          "p-autocomplete-dd-input": this.dropdown
        }
      ];
    },
    multiContainerClass() {
      return ["p-autocomplete-multiple-container p-component p-inputtext"];
    },
    panelStyleClass() {
      return [
        "p-autocomplete-panel p-component",
        this.panelClass,
        {
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false
        }
      ];
    },
    loadingIconClass() {
      return ["p-autocomplete-loader pi-spin", this.loadingIcon];
    },
    visibleOptions() {
      return this.optionGroupLabel ? this.flatOptions(this.suggestions) : this.suggestions || [];
    },
    inputValue() {
      if (this.modelValue) {
        if (typeof this.modelValue === "object") {
          const label = this.getOptionLabel(this.modelValue);
          return label != null ? label : this.modelValue;
        } else {
          return this.modelValue;
        }
      } else {
        return "";
      }
    },
    hasSelectedOption() {
      return ObjectUtils.isNotEmpty(this.modelValue);
    },
    equalityKey() {
      return this.dataKey;
    },
    searchResultMessageText() {
      return ObjectUtils.isNotEmpty(this.visibleOptions) && this.overlayVisible ? this.searchMessageText.replaceAll("{0}", this.visibleOptions.length) : this.emptySearchMessageText;
    },
    searchMessageText() {
      return this.searchMessage || this.$primevue.config.locale.searchMessage || "";
    },
    emptySearchMessageText() {
      return this.emptySearchMessage || this.$primevue.config.locale.emptySearchMessage || "";
    },
    selectionMessageText() {
      return this.selectionMessage || this.$primevue.config.locale.selectionMessage || "";
    },
    emptySelectionMessageText() {
      return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || "";
    },
    selectedMessageText() {
      return this.hasSelectedOption ? this.selectionMessageText.replaceAll("{0}", this.multiple ? this.modelValue.length : "1") : this.emptySelectionMessageText;
    },
    id() {
      return this.$attrs.id || UniqueComponentId();
    },
    focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? `${this.id}_${this.focusedOptionIndex}` : null;
    },
    focusedMultipleOptionId() {
      return this.focusedMultipleOptionIndex !== -1 ? `${this.id}_multiple_option_${this.focusedMultipleOptionIndex}` : null;
    },
    ariaSetSize() {
      return this.visibleOptions.filter((option) => !this.isOptionGroup(option)).length;
    },
    virtualScrollerDisabled() {
      return !this.virtualScrollerOptions;
    }
  },
  components: {
    Button: script$l,
    VirtualScroller: script$j,
    Portal: script$k
  },
  directives: {
    ripple: Ripple
  }
};
const _hoisted_1$h = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
const _hoisted_2$c = ["aria-activedescendant"];
const _hoisted_3$9 = ["id", "aria-label", "aria-setsize", "aria-posinset"];
const _hoisted_4$7 = { class: "p-autocomplete-token-label" };
const _hoisted_5$6 = ["onClick"];
const _hoisted_6$3 = {
  class: "p-autocomplete-input-token",
  role: "option"
};
const _hoisted_7$3 = ["id", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
const _hoisted_8$3 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_9$2 = ["id"];
const _hoisted_10$2 = ["id"];
const _hoisted_11$2 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove"];
const _hoisted_12$2 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
function render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  const _component_VirtualScroller = resolveComponent("VirtualScroller");
  const _component_Portal = resolveComponent("Portal");
  const _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", {
    ref: "container",
    class: normalizeClass($options.containerClass),
    onClick: _cache[15] || (_cache[15] = (...args) => $options.onContainerClick && $options.onContainerClick(...args))
  }, [
    !$props.multiple ? (openBlock(), createElementBlock("input", mergeProps({
      key: 0,
      ref: "focusInput",
      id: $props.inputId,
      type: "text",
      style: $props.inputStyle,
      class: $options.inputStyleClass,
      value: $options.inputValue,
      placeholder: $props.placeholder,
      tabindex: !$props.disabled ? $props.tabindex : -1,
      disabled: $props.disabled,
      autocomplete: "off",
      role: "combobox",
      "aria-label": _ctx.ariaLabel,
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-haspopup": "listbox",
      "aria-autocomplete": "list",
      "aria-expanded": $data.overlayVisible,
      "aria-controls": $options.id + "_list",
      "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
      onFocus: _cache[0] || (_cache[0] = (...args) => $options.onFocus && $options.onFocus(...args)),
      onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
      onKeydown: _cache[2] || (_cache[2] = (...args) => $options.onKeyDown && $options.onKeyDown(...args)),
      onInput: _cache[3] || (_cache[3] = (...args) => $options.onInput && $options.onInput(...args)),
      onChange: _cache[4] || (_cache[4] = (...args) => $options.onChange && $options.onChange(...args))
    }, $props.inputProps), null, 16, _hoisted_1$h)) : createCommentVNode("", true),
    $props.multiple ? (openBlock(), createElementBlock("ul", {
      key: 1,
      ref: "multiContainer",
      class: normalizeClass($options.multiContainerClass),
      tabindex: "-1",
      role: "listbox",
      "aria-orientation": "horizontal",
      "aria-activedescendant": $data.focused ? $options.focusedMultipleOptionId : void 0,
      onFocus: _cache[10] || (_cache[10] = (...args) => $options.onMultipleContainerFocus && $options.onMultipleContainerFocus(...args)),
      onBlur: _cache[11] || (_cache[11] = (...args) => $options.onMultipleContainerBlur && $options.onMultipleContainerBlur(...args)),
      onKeydown: _cache[12] || (_cache[12] = (...args) => $options.onMultipleContainerKeyDown && $options.onMultipleContainerKeyDown(...args))
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.modelValue, (option, i) => {
        return openBlock(), createElementBlock("li", {
          key: i,
          id: $options.id + "_multiple_option_" + i,
          class: normalizeClass(["p-autocomplete-token", { "p-focus": $data.focusedMultipleOptionIndex === i }]),
          role: "option",
          "aria-label": $options.getOptionLabel(option),
          "aria-selected": true,
          "aria-setsize": $props.modelValue.length,
          "aria-posinset": i + 1
        }, [
          renderSlot(_ctx.$slots, "chip", { value: option }, () => [
            createElementVNode("span", _hoisted_4$7, toDisplayString($options.getOptionLabel(option)), 1)
          ]),
          createElementVNode("span", {
            class: normalizeClass(["p-autocomplete-token-icon", $props.removeTokenIcon]),
            onClick: ($event) => $options.removeOption($event, i),
            "aria-hidden": "true"
          }, null, 10, _hoisted_5$6)
        ], 10, _hoisted_3$9);
      }), 128)),
      createElementVNode("li", _hoisted_6$3, [
        createElementVNode("input", mergeProps({
          ref: "focusInput",
          id: $props.inputId,
          type: "text",
          style: $props.inputStyle,
          class: $props.inputClass,
          placeholder: $props.placeholder,
          tabindex: !$props.disabled ? $props.tabindex : -1,
          disabled: $props.disabled,
          autocomplete: "off",
          role: "combobox",
          "aria-label": _ctx.ariaLabel,
          "aria-labelledby": _ctx.ariaLabelledby,
          "aria-haspopup": "listbox",
          "aria-autocomplete": "list",
          "aria-expanded": $data.overlayVisible,
          "aria-controls": $options.id + "_list",
          "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
          onFocus: _cache[5] || (_cache[5] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[6] || (_cache[6] = (...args) => $options.onBlur && $options.onBlur(...args)),
          onKeydown: _cache[7] || (_cache[7] = (...args) => $options.onKeyDown && $options.onKeyDown(...args)),
          onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
          onChange: _cache[9] || (_cache[9] = (...args) => $options.onChange && $options.onChange(...args))
        }, $props.inputProps), null, 16, _hoisted_7$3)
      ])
    ], 42, _hoisted_2$c)) : createCommentVNode("", true),
    $data.searching ? (openBlock(), createElementBlock("i", {
      key: 2,
      class: normalizeClass($options.loadingIconClass),
      "aria-hidden": "true"
    }, null, 2)) : createCommentVNode("", true),
    $props.dropdown ? (openBlock(), createBlock(_component_Button, {
      key: 3,
      ref: "dropdownButton",
      type: "button",
      icon: $props.dropdownIcon,
      class: normalizeClass(["p-autocomplete-dropdown", $props.dropdownClass]),
      tabindex: "-1",
      disabled: $props.disabled,
      "aria-hidden": "true",
      onClick: $options.onDropdownClick
    }, null, 8, ["icon", "class", "disabled", "onClick"])) : createCommentVNode("", true),
    createElementVNode("span", _hoisted_8$3, toDisplayString($options.searchResultMessageText), 1),
    createVNode(_component_Portal, { appendTo: $props.appendTo }, {
      default: withCtx(() => [
        createVNode(Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onAfterEnter: $options.onOverlayAfterEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: withCtx(() => [
            $data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref: $options.overlayRef,
              class: $options.panelStyleClass,
              style: { ...$props.panelStyle, "max-height": $options.virtualScrollerDisabled ? $props.scrollHeight : "" },
              onClick: _cache[13] || (_cache[13] = (...args) => $options.onOverlayClick && $options.onOverlayClick(...args)),
              onKeydown: _cache[14] || (_cache[14] = (...args) => $options.onOverlayKeyDown && $options.onOverlayKeyDown(...args))
            }, $props.panelProps), [
              renderSlot(_ctx.$slots, "header", {
                value: $props.modelValue,
                suggestions: $options.visibleOptions
              }),
              createVNode(_component_VirtualScroller, mergeProps({ ref: $options.virtualScrollerRef }, $props.virtualScrollerOptions, {
                style: { height: $props.scrollHeight },
                items: $options.visibleOptions,
                tabindex: -1,
                disabled: $options.virtualScrollerDisabled
              }), createSlots({
                content: withCtx(({ styleClass, contentRef, items, getItemOptions, contentStyle, itemSize }) => [
                  createElementVNode("ul", {
                    ref: (el) => $options.listRef(el, contentRef),
                    id: $options.id + "_list",
                    class: normalizeClass(["p-autocomplete-items", styleClass]),
                    style: normalizeStyle(contentStyle),
                    role: "listbox"
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(items, (option, i) => {
                      return openBlock(), createElementBlock(Fragment, {
                        key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
                      }, [
                        $options.isOptionGroup(option) ? (openBlock(), createElementBlock("li", {
                          key: 0,
                          id: $options.id + "_" + $options.getOptionIndex(i, getItemOptions),
                          style: normalizeStyle({ height: itemSize ? itemSize + "px" : void 0 }),
                          class: "p-autocomplete-item-group",
                          role: "option"
                        }, [
                          renderSlot(_ctx.$slots, "optiongroup", {
                            option: option.optionGroup,
                            item: option.optionGroup,
                            index: $options.getOptionIndex(i, getItemOptions)
                          }, () => [
                            createTextVNode(toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)
                          ])
                        ], 12, _hoisted_10$2)) : withDirectives((openBlock(), createElementBlock("li", {
                          key: 1,
                          id: $options.id + "_" + $options.getOptionIndex(i, getItemOptions),
                          style: normalizeStyle({ height: itemSize ? itemSize + "px" : void 0 }),
                          class: normalizeClass(["p-autocomplete-item", { "p-highlight": $options.isSelected(option), "p-focus": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions), "p-disabled": $options.isOptionDisabled(option) }]),
                          role: "option",
                          "aria-label": $options.getOptionLabel(option),
                          "aria-selected": $options.isSelected(option),
                          "aria-disabled": $options.isOptionDisabled(option),
                          "aria-setsize": $options.ariaSetSize,
                          "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                          onClick: ($event) => $options.onOptionSelect($event, option),
                          onMousemove: ($event) => $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions))
                        }, [
                          _ctx.$slots.option ? renderSlot(_ctx.$slots, "option", {
                            key: 0,
                            option,
                            index: $options.getOptionIndex(i, getItemOptions)
                          }, () => [
                            createTextVNode(toDisplayString($options.getOptionLabel(option)), 1)
                          ]) : renderSlot(_ctx.$slots, "item", {
                            key: 1,
                            item: option,
                            index: $options.getOptionIndex(i, getItemOptions)
                          }, () => [
                            createTextVNode(toDisplayString($options.getOptionLabel(option)), 1)
                          ])
                        ], 46, _hoisted_11$2)), [
                          [_directive_ripple]
                        ])
                      ], 64);
                    }), 128))
                  ], 14, _hoisted_9$2)
                ]),
                _: 2
              }, [
                _ctx.$slots.loader ? {
                  name: "loader",
                  fn: withCtx(({ options }) => [
                    renderSlot(_ctx.$slots, "loader", { options })
                  ]),
                  key: "0"
                } : void 0
              ]), 1040, ["style", "items", "disabled"]),
              renderSlot(_ctx.$slots, "footer", {
                value: $props.modelValue,
                suggestions: $options.visibleOptions
              }),
              createElementVNode("span", _hoisted_12$2, toDisplayString($options.selectedMessageText), 1)
            ], 16)) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 3
    }, 8, ["appendTo"])
  ], 2);
}
function styleInject$e(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$e();
script$i.render = render$i;
var script$h = {
  name: "Calendar",
  emits: ["show", "hide", "input", "month-change", "year-change", "date-select", "update:modelValue", "today-click", "clear-click", "focus", "blur", "keydown"],
  props: {
    modelValue: null,
    selectionMode: {
      type: String,
      default: "single"
    },
    dateFormat: {
      type: String,
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    },
    showOtherMonths: {
      type: Boolean,
      default: true
    },
    selectOtherMonths: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: "pi pi-calendar"
    },
    previousIcon: {
      type: String,
      default: "pi pi-chevron-left"
    },
    nextIcon: {
      type: String,
      default: "pi pi-chevron-right"
    },
    incrementIcon: {
      type: String,
      default: "pi pi-chevron-up"
    },
    decrementIcon: {
      type: String,
      default: "pi pi-chevron-down"
    },
    numberOfMonths: {
      type: Number,
      default: 1
    },
    responsiveOptions: Array,
    view: {
      type: String,
      default: "date"
    },
    touchUI: {
      type: Boolean,
      default: false
    },
    monthNavigator: {
      type: Boolean,
      default: false
    },
    yearNavigator: {
      type: Boolean,
      default: false
    },
    yearRange: {
      type: String,
      default: null
    },
    minDate: {
      type: Date,
      value: null
    },
    maxDate: {
      type: Date,
      value: null
    },
    disabledDates: {
      type: Array,
      value: null
    },
    disabledDays: {
      type: Array,
      value: null
    },
    maxDateCount: {
      type: Number,
      value: null
    },
    showOnFocus: {
      type: Boolean,
      default: true
    },
    autoZIndex: {
      type: Boolean,
      default: true
    },
    baseZIndex: {
      type: Number,
      default: 0
    },
    showButtonBar: {
      type: Boolean,
      default: false
    },
    shortYearCutoff: {
      type: String,
      default: "+10"
    },
    showTime: {
      type: Boolean,
      default: false
    },
    timeOnly: {
      type: Boolean,
      default: false
    },
    hourFormat: {
      type: String,
      default: "24"
    },
    stepHour: {
      type: Number,
      default: 1
    },
    stepMinute: {
      type: Number,
      default: 1
    },
    stepSecond: {
      type: Number,
      default: 1
    },
    showSeconds: {
      type: Boolean,
      default: false
    },
    hideOnDateTimeSelect: {
      type: Boolean,
      default: false
    },
    hideOnRangeSelection: {
      type: Boolean,
      default: false
    },
    timeSeparator: {
      type: String,
      default: ":"
    },
    showWeek: {
      type: Boolean,
      default: false
    },
    manualInput: {
      type: Boolean,
      default: true
    },
    appendTo: {
      type: String,
      default: "body"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    inputId: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    inputStyle: {
      type: null,
      default: null
    },
    inputProps: {
      type: null,
      default: null
    },
    panelClass: {
      type: String,
      default: null
    },
    panelStyle: {
      type: null,
      default: null
    },
    panelProps: {
      type: null,
      default: null
    },
    "aria-labelledby": {
      type: String,
      default: null
    },
    "aria-label": {
      type: String,
      default: null
    }
  },
  navigationState: null,
  timePickerChange: false,
  scrollHandler: null,
  outsideClickListener: null,
  maskClickListener: null,
  resizeListener: null,
  overlay: null,
  input: null,
  mask: null,
  timePickerTimer: null,
  preventFocus: false,
  typeUpdate: false,
  data() {
    return {
      currentMonth: null,
      currentYear: null,
      currentHour: null,
      currentMinute: null,
      currentSecond: null,
      pm: null,
      focused: false,
      overlayVisible: false,
      currentView: this.view
    };
  },
  watch: {
    modelValue(newValue) {
      this.updateCurrentMetaData();
      if (!this.typeUpdate && !this.inline && this.input) {
        this.input.value = this.formatValue(newValue);
      }
      this.typeUpdate = false;
    },
    showTime() {
      this.updateCurrentMetaData();
    },
    months() {
      if (this.overlay) {
        if (!this.focused) {
          if (this.inline) {
            this.preventFocus = true;
          }
          setTimeout(this.updateFocus, 0);
        }
      }
    },
    numberOfMonths() {
      this.destroyResponsiveStyleElement();
      this.createResponsiveStyle();
    },
    responsiveOptions() {
      this.destroyResponsiveStyleElement();
      this.createResponsiveStyle();
    },
    currentView() {
      Promise.resolve(null).then(() => this.alignOverlay());
    }
  },
  created() {
    this.updateCurrentMetaData();
  },
  mounted() {
    this.createResponsiveStyle();
    if (this.inline) {
      this.overlay && this.overlay.setAttribute(this.attributeSelector, "");
      if (!this.disabled) {
        this.preventFocus = true;
        this.initFocusableCell();
        if (this.numberOfMonths === 1) {
          this.overlay.style.width = DomHandler.getOuterWidth(this.$el) + "px";
        }
      }
    } else {
      this.input.value = this.formatValue(this.modelValue);
    }
  },
  updated() {
    if (this.overlay) {
      this.preventFocus = true;
      this.updateFocus();
    }
    if (this.input && this.selectionStart != null && this.selectionEnd != null) {
      this.input.selectionStart = this.selectionStart;
      this.input.selectionEnd = this.selectionEnd;
      this.selectionStart = null;
      this.selectionEnd = null;
    }
  },
  beforeUnmount() {
    if (this.timePickerTimer) {
      clearTimeout(this.timePickerTimer);
    }
    if (this.mask) {
      this.destroyMask();
    }
    this.destroyResponsiveStyleElement();
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay && this.autoZIndex) {
      ZIndexUtils.clear(this.overlay);
    }
    this.overlay = null;
  },
  methods: {
    isComparable() {
      return this.modelValue != null && typeof this.modelValue !== "string";
    },
    isSelected(dateMeta) {
      if (!this.isComparable()) {
        return false;
      }
      if (this.modelValue) {
        if (this.isSingleSelection()) {
          return this.isDateEquals(this.modelValue, dateMeta);
        } else if (this.isMultipleSelection()) {
          let selected = false;
          for (let date of this.modelValue) {
            selected = this.isDateEquals(date, dateMeta);
            if (selected) {
              break;
            }
          }
          return selected;
        } else if (this.isRangeSelection()) {
          if (this.modelValue[1]) return this.isDateEquals(this.modelValue[0], dateMeta) || this.isDateEquals(this.modelValue[1], dateMeta) || this.isDateBetween(this.modelValue[0], this.modelValue[1], dateMeta);
          else {
            return this.isDateEquals(this.modelValue[0], dateMeta);
          }
        }
      }
      return false;
    },
    isMonthSelected(month) {
      if (this.isComparable()) {
        let value = this.isRangeSelection() ? this.modelValue[0] : this.modelValue;
        return !this.isMultipleSelection() ? value.getMonth() === month && value.getFullYear() === this.currentYear : false;
      }
      return false;
    },
    isYearSelected(year) {
      if (this.isComparable()) {
        let value = this.isRangeSelection() ? this.modelValue[0] : this.modelValue;
        return !this.isMultipleSelection() && this.isComparable() ? value.getFullYear() === year : false;
      }
      return false;
    },
    isDateEquals(value, dateMeta) {
      if (value) return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
      else return false;
    },
    isDateBetween(start, end, dateMeta) {
      let between = false;
      if (start && end) {
        let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
      }
      return between;
    },
    getFirstDayOfMonthIndex(month, year) {
      let day = /* @__PURE__ */ new Date();
      day.setDate(1);
      day.setMonth(month);
      day.setFullYear(year);
      let dayIndex = day.getDay() + this.sundayIndex;
      return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    },
    getDaysCountInMonth(month, year) {
      return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    },
    getDaysCountInPrevMonth(month, year) {
      let prev = this.getPreviousMonthAndYear(month, year);
      return this.getDaysCountInMonth(prev.month, prev.year);
    },
    getPreviousMonthAndYear(month, year) {
      let m, y;
      if (month === 0) {
        m = 11;
        y = year - 1;
      } else {
        m = month - 1;
        y = year;
      }
      return { month: m, year: y };
    },
    getNextMonthAndYear(month, year) {
      let m, y;
      if (month === 11) {
        m = 0;
        y = year + 1;
      } else {
        m = month + 1;
        y = year;
      }
      return { month: m, year: y };
    },
    daylightSavingAdjust(date) {
      if (!date) {
        return null;
      }
      date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
      return date;
    },
    isToday(today, day, month, year) {
      return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    },
    isSelectable(day, month, year, otherMonth) {
      let validMin = true;
      let validMax = true;
      let validDate = true;
      let validDay = true;
      if (otherMonth && !this.selectOtherMonths) {
        return false;
      }
      if (this.minDate) {
        if (this.minDate.getFullYear() > year) {
          validMin = false;
        } else if (this.minDate.getFullYear() === year) {
          if (this.minDate.getMonth() > month) {
            validMin = false;
          } else if (this.minDate.getMonth() === month) {
            if (this.minDate.getDate() > day) {
              validMin = false;
            }
          }
        }
      }
      if (this.maxDate) {
        if (this.maxDate.getFullYear() < year) {
          validMax = false;
        } else if (this.maxDate.getFullYear() === year) {
          if (this.maxDate.getMonth() < month) {
            validMax = false;
          } else if (this.maxDate.getMonth() === month) {
            if (this.maxDate.getDate() < day) {
              validMax = false;
            }
          }
        }
      }
      if (this.disabledDates) {
        validDate = !this.isDateDisabled(day, month, year);
      }
      if (this.disabledDays) {
        validDay = !this.isDayDisabled(day, month, year);
      }
      return validMin && validMax && validDate && validDay;
    },
    onOverlayEnter(el) {
      el.setAttribute(this.attributeSelector, "");
      if (this.autoZIndex) {
        if (this.touchUI) ZIndexUtils.set("modal", el, this.baseZIndex || this.$primevue.config.zIndex.modal);
        else ZIndexUtils.set("overlay", el, this.baseZIndex || this.$primevue.config.zIndex.overlay);
      }
      this.alignOverlay();
      this.$emit("show");
    },
    onOverlayEnterComplete() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
    },
    onOverlayAfterLeave(el) {
      if (this.autoZIndex) {
        ZIndexUtils.clear(el);
      }
    },
    onOverlayLeave() {
      this.currentView = this.view;
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit("hide");
      if (this.mask) {
        this.disableModality();
      }
      this.overlay = null;
    },
    onPrevButtonClick(event) {
      if (this.showOtherMonths) {
        this.navigationState = { backward: true, button: true };
        this.navBackward(event);
      }
    },
    onNextButtonClick(event) {
      if (this.showOtherMonths) {
        this.navigationState = { backward: false, button: true };
        this.navForward(event);
      }
    },
    navBackward(event) {
      event.preventDefault();
      if (!this.isEnabled()) {
        return;
      }
      if (this.currentView === "month") {
        this.decrementYear();
      } else if (this.currentView === "year") {
        this.decrementDecade();
      } else {
        if (event.shiftKey) {
          this.decrementYear();
        } else {
          if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.decrementYear();
          } else {
            this.currentMonth--;
          }
          this.$emit("month-change", { month: this.currentMonth + 1, year: this.currentYear });
        }
      }
    },
    navForward(event) {
      event.preventDefault();
      if (!this.isEnabled()) {
        return;
      }
      if (this.currentView === "month") {
        this.incrementYear();
      } else if (this.currentView === "year") {
        this.incrementDecade();
      } else {
        if (event.shiftKey) {
          this.incrementYear();
        } else {
          if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.incrementYear();
          } else {
            this.currentMonth++;
          }
          this.$emit("month-change", { month: this.currentMonth + 1, year: this.currentYear });
        }
      }
    },
    decrementYear() {
      this.currentYear--;
    },
    decrementDecade() {
      this.currentYear = this.currentYear - 10;
    },
    incrementYear() {
      this.currentYear++;
    },
    incrementDecade() {
      this.currentYear = this.currentYear + 10;
    },
    switchToMonthView(event) {
      this.currentView = "month";
      setTimeout(this.updateFocus, 0);
      event.preventDefault();
    },
    switchToYearView(event) {
      this.currentView = "year";
      setTimeout(this.updateFocus, 0);
      event.preventDefault();
    },
    isEnabled() {
      return !this.disabled && !this.readonly;
    },
    updateCurrentTimeMeta(date) {
      let currentHour = date.getHours();
      if (this.hourFormat === "12") {
        this.pm = currentHour > 11;
        if (currentHour >= 12) currentHour = currentHour == 12 ? 12 : currentHour - 12;
        else currentHour = currentHour == 0 ? 12 : currentHour;
      }
      this.currentHour = Math.floor(currentHour / this.stepHour) * this.stepHour;
      this.currentMinute = Math.floor(date.getMinutes() / this.stepMinute) * this.stepMinute;
      this.currentSecond = Math.floor(date.getSeconds() / this.stepSecond) * this.stepSecond;
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.overlayVisible && this.isOutsideClicked(event)) {
            this.overlayVisible = false;
          }
        };
        (void 0).addEventListener("mousedown", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        (void 0).removeEventListener("mousedown", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
          if (this.overlayVisible) {
            this.overlayVisible = false;
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.overlayVisible = false;
          }
        };
        (void 0).addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        (void 0).removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    isOutsideClicked(event) {
      return !(this.$el.isSameNode(event.target) || this.isNavIconClicked(event) || this.$el.contains(event.target) || this.overlay && this.overlay.contains(event.target));
    },
    isNavIconClicked(event) {
      return DomHandler.hasClass(event.target, "p-datepicker-prev") || DomHandler.hasClass(event.target, "p-datepicker-prev-icon") || DomHandler.hasClass(event.target, "p-datepicker-next") || DomHandler.hasClass(event.target, "p-datepicker-next-icon");
    },
    alignOverlay() {
      if (this.touchUI) {
        this.enableModality();
      } else if (this.overlay) {
        if (this.appendTo === "self" || this.inline) {
          DomHandler.relativePosition(this.overlay, this.$el);
        } else {
          if (this.view === "date") {
            this.overlay.style.width = DomHandler.getOuterWidth(this.overlay) + "px";
            this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + "px";
          } else {
            this.overlay.style.width = DomHandler.getOuterWidth(this.$el) + "px";
          }
          DomHandler.absolutePosition(this.overlay, this.$el);
        }
      }
    },
    onButtonClick() {
      if (this.isEnabled()) {
        if (!this.overlayVisible) {
          this.input.focus();
          this.overlayVisible = true;
        } else {
          this.overlayVisible = false;
        }
      }
    },
    isDateDisabled(day, month, year) {
      if (this.disabledDates) {
        for (let disabledDate of this.disabledDates) {
          if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
            return true;
          }
        }
      }
      return false;
    },
    isDayDisabled(day, month, year) {
      if (this.disabledDays) {
        let weekday = new Date(year, month, day);
        let weekdayNumber = weekday.getDay();
        return this.disabledDays.indexOf(weekdayNumber) !== -1;
      }
      return false;
    },
    onMonthDropdownChange(value) {
      this.currentMonth = parseInt(value);
      this.$emit("month-change", { month: this.currentMonth + 1, year: this.currentYear });
    },
    onYearDropdownChange(value) {
      this.currentYear = parseInt(value);
      this.$emit("year-change", { month: this.currentMonth + 1, year: this.currentYear });
    },
    onDateSelect(event, dateMeta) {
      if (this.disabled || !dateMeta.selectable) {
        return;
      }
      DomHandler.find(this.overlay, ".p-datepicker-calendar td span:not(.p-disabled)").forEach((cell) => cell.tabIndex = -1);
      if (event) {
        event.currentTarget.focus();
      }
      if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
        let newValue = this.modelValue.filter((date) => !this.isDateEquals(date, dateMeta));
        this.updateModel(newValue);
      } else {
        if (this.shouldSelectDate(dateMeta)) {
          if (dateMeta.otherMonth) {
            this.currentMonth = dateMeta.month;
            this.currentYear = dateMeta.year;
            this.selectDate(dateMeta);
          } else {
            this.selectDate(dateMeta);
          }
        }
      }
      if (this.isSingleSelection() && (!this.showTime || this.hideOnDateTimeSelect)) {
        setTimeout(() => {
          if (this.input) {
            this.input.focus();
          }
          this.overlayVisible = false;
        }, 150);
      }
    },
    selectDate(dateMeta) {
      let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
      if (this.showTime) {
        if (this.hourFormat === "12" && this.pm && this.currentHour != 12) date.setHours(this.currentHour + 12);
        else date.setHours(this.currentHour);
        date.setMinutes(this.currentMinute);
        date.setSeconds(this.currentSecond);
      }
      if (this.minDate && this.minDate > date) {
        date = this.minDate;
        this.currentHour = date.getHours();
        this.currentMinute = date.getMinutes();
        this.currentSecond = date.getSeconds();
      }
      if (this.maxDate && this.maxDate < date) {
        date = this.maxDate;
        this.currentHour = date.getHours();
        this.currentMinute = date.getMinutes();
        this.currentSecond = date.getSeconds();
      }
      let modelVal = null;
      if (this.isSingleSelection()) {
        modelVal = date;
      } else if (this.isMultipleSelection()) {
        modelVal = this.modelValue ? [...this.modelValue, date] : [date];
      } else if (this.isRangeSelection()) {
        if (this.modelValue && this.modelValue.length) {
          let startDate = this.modelValue[0];
          let endDate = this.modelValue[1];
          if (!endDate && date.getTime() >= startDate.getTime()) {
            endDate = date;
          } else {
            startDate = date;
            endDate = null;
          }
          modelVal = [startDate, endDate];
        } else {
          modelVal = [date, null];
        }
      }
      if (modelVal !== null) {
        this.updateModel(modelVal);
      }
      if (this.isRangeSelection() && this.hideOnRangeSelection && modelVal[1] !== null) {
        setTimeout(() => {
          this.overlayVisible = false;
        }, 150);
      }
      this.$emit("date-select", date);
    },
    updateModel(value) {
      this.$emit("update:modelValue", value);
    },
    shouldSelectDate() {
      if (this.isMultipleSelection()) return this.maxDateCount != null ? this.maxDateCount > (this.modelValue ? this.modelValue.length : 0) : true;
      else return true;
    },
    isSingleSelection() {
      return this.selectionMode === "single";
    },
    isRangeSelection() {
      return this.selectionMode === "range";
    },
    isMultipleSelection() {
      return this.selectionMode === "multiple";
    },
    formatValue(value) {
      if (typeof value === "string") {
        return value;
      }
      let formattedValue = "";
      if (value) {
        try {
          if (this.isSingleSelection()) {
            formattedValue = this.formatDateTime(value);
          } else if (this.isMultipleSelection()) {
            for (let i = 0; i < value.length; i++) {
              let dateAsString = this.formatDateTime(value[i]);
              formattedValue += dateAsString;
              if (i !== value.length - 1) {
                formattedValue += ", ";
              }
            }
          } else if (this.isRangeSelection()) {
            if (value && value.length) {
              let startDate = value[0];
              let endDate = value[1];
              formattedValue = this.formatDateTime(startDate);
              if (endDate) {
                formattedValue += " - " + this.formatDateTime(endDate);
              }
            }
          }
        } catch (err) {
          formattedValue = value;
        }
      }
      return formattedValue;
    },
    formatDateTime(date) {
      let formattedValue = null;
      if (date) {
        if (this.timeOnly) {
          formattedValue = this.formatTime(date);
        } else {
          formattedValue = this.formatDate(date, this.datePattern);
          if (this.showTime) {
            formattedValue += " " + this.formatTime(date);
          }
        }
      }
      return formattedValue;
    },
    formatDate(date, format) {
      if (!date) {
        return "";
      }
      let iFormat;
      const lookAhead = (match) => {
        const matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      }, formatNumber = (match, value, len) => {
        let num = "" + value;
        if (lookAhead(match)) {
          while (num.length < len) {
            num = "0" + num;
          }
        }
        return num;
      }, formatName = (match, value, shortNames, longNames) => {
        return lookAhead(match) ? longNames[value] : shortNames[value];
      };
      let output = "";
      let literal = false;
      if (date) {
        for (iFormat = 0; iFormat < format.length; iFormat++) {
          if (literal) {
            if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
              literal = false;
            } else {
              output += format.charAt(iFormat);
            }
          } else {
            switch (format.charAt(iFormat)) {
              case "d":
                output += formatNumber("d", date.getDate(), 2);
                break;
              case "D":
                output += formatName("D", date.getDay(), this.$primevue.config.locale.dayNamesShort, this.$primevue.config.locale.dayNames);
                break;
              case "o":
                output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;
              case "m":
                output += formatNumber("m", date.getMonth() + 1, 2);
                break;
              case "M":
                output += formatName("M", date.getMonth(), this.$primevue.config.locale.monthNamesShort, this.$primevue.config.locale.monthNames);
                break;
              case "y":
                output += lookAhead("y") ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100;
                break;
              case "@":
                output += date.getTime();
                break;
              case "!":
                output += date.getTime() * 1e4 + this.ticksTo1970;
                break;
              case "'":
                if (lookAhead("'")) {
                  output += "'";
                } else {
                  literal = true;
                }
                break;
              default:
                output += format.charAt(iFormat);
            }
          }
        }
      }
      return output;
    },
    formatTime(date) {
      if (!date) {
        return "";
      }
      let output = "";
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (this.hourFormat === "12" && hours > 11 && hours !== 12) {
        hours -= 12;
      }
      if (this.hourFormat === "12") {
        output += hours === 0 ? 12 : hours < 10 ? "0" + hours : hours;
      } else {
        output += hours < 10 ? "0" + hours : hours;
      }
      output += ":";
      output += minutes < 10 ? "0" + minutes : minutes;
      if (this.showSeconds) {
        output += ":";
        output += seconds < 10 ? "0" + seconds : seconds;
      }
      if (this.hourFormat === "12") {
        output += date.getHours() > 11 ? ` ${this.$primevue.config.locale.pm}` : ` ${this.$primevue.config.locale.am}`;
      }
      return output;
    },
    onTodayButtonClick(event) {
      let date = /* @__PURE__ */ new Date();
      let dateMeta = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear,
        today: true,
        selectable: true
      };
      this.onDateSelect(null, dateMeta);
      this.$emit("today-click", date);
      event.preventDefault();
    },
    onClearButtonClick(event) {
      this.updateModel(null);
      this.overlayVisible = false;
      this.$emit("clear-click", event);
      event.preventDefault();
    },
    onTimePickerElementMouseDown(event, type, direction) {
      if (this.isEnabled()) {
        this.repeat(event, null, type, direction);
        event.preventDefault();
      }
    },
    onTimePickerElementMouseUp(event) {
      if (this.isEnabled()) {
        this.clearTimePickerTimer();
        this.updateModelTime();
        event.preventDefault();
      }
    },
    onTimePickerElementMouseLeave() {
      this.clearTimePickerTimer();
    },
    repeat(event, interval, type, direction) {
      let i = interval || 500;
      this.clearTimePickerTimer();
      this.timePickerTimer = setTimeout(() => {
        this.repeat(event, 100, type, direction);
      }, i);
      switch (type) {
        case 0:
          if (direction === 1) this.incrementHour(event);
          else this.decrementHour(event);
          break;
        case 1:
          if (direction === 1) this.incrementMinute(event);
          else this.decrementMinute(event);
          break;
        case 2:
          if (direction === 1) this.incrementSecond(event);
          else this.decrementSecond(event);
          break;
      }
    },
    convertTo24Hour(hours, pm) {
      if (this.hourFormat == "12") {
        if (hours === 12) {
          return pm ? 12 : 0;
        } else {
          return pm ? hours + 12 : hours;
        }
      }
      return hours;
    },
    validateTime(hour, minute, second, pm) {
      let value = this.isComparable() ? this.modelValue : this.viewDate;
      const convertedHour = this.convertTo24Hour(hour, pm);
      if (this.isRangeSelection()) {
        value = this.modelValue[1] || this.modelValue[0];
      }
      if (this.isMultipleSelection()) {
        value = this.modelValue[this.modelValue.length - 1];
      }
      const valueDateString = value ? value.toDateString() : null;
      if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
        if (this.minDate.getHours() > convertedHour) {
          return false;
        }
        if (this.minDate.getHours() === convertedHour) {
          if (this.minDate.getMinutes() > minute) {
            return false;
          }
          if (this.minDate.getMinutes() === minute) {
            if (this.minDate.getSeconds() > second) {
              return false;
            }
          }
        }
      }
      if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
        if (this.maxDate.getHours() < convertedHour) {
          return false;
        }
        if (this.maxDate.getHours() === convertedHour) {
          if (this.maxDate.getMinutes() < minute) {
            return false;
          }
          if (this.maxDate.getMinutes() === minute) {
            if (this.maxDate.getSeconds() < second) {
              return false;
            }
          }
        }
      }
      return true;
    },
    incrementHour(event) {
      let prevHour = this.currentHour;
      let newHour = this.currentHour + this.stepHour;
      let newPM = this.pm;
      if (this.hourFormat == "24") newHour = newHour >= 24 ? newHour - 24 : newHour;
      else if (this.hourFormat == "12") {
        if (prevHour < 12 && newHour > 11) {
          newPM = !this.pm;
        }
        newHour = newHour >= 13 ? newHour - 12 : newHour;
      }
      if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
        this.currentHour = newHour;
        this.pm = newPM;
      }
      event.preventDefault();
    },
    decrementHour(event) {
      let newHour = this.currentHour - this.stepHour;
      let newPM = this.pm;
      if (this.hourFormat == "24") newHour = newHour < 0 ? 24 + newHour : newHour;
      else if (this.hourFormat == "12") {
        if (this.currentHour === 12) {
          newPM = !this.pm;
        }
        newHour = newHour <= 0 ? 12 + newHour : newHour;
      }
      if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
        this.currentHour = newHour;
        this.pm = newPM;
      }
      event.preventDefault();
    },
    incrementMinute(event) {
      let newMinute = this.currentMinute + this.stepMinute;
      if (this.validateTime(this.currentHour, newMinute, this.currentSecond, true)) {
        this.currentMinute = newMinute > 59 ? newMinute - 60 : newMinute;
      }
      event.preventDefault();
    },
    decrementMinute(event) {
      let newMinute = this.currentMinute - this.stepMinute;
      newMinute = newMinute < 0 ? 60 + newMinute : newMinute;
      if (this.validateTime(this.currentHour, newMinute, this.currentSecond, true)) {
        this.currentMinute = newMinute;
      }
      event.preventDefault();
    },
    incrementSecond(event) {
      let newSecond = this.currentSecond + this.stepSecond;
      if (this.validateTime(this.currentHour, this.currentMinute, newSecond, true)) {
        this.currentSecond = newSecond > 59 ? newSecond - 60 : newSecond;
      }
      event.preventDefault();
    },
    decrementSecond(event) {
      let newSecond = this.currentSecond - this.stepSecond;
      newSecond = newSecond < 0 ? 60 + newSecond : newSecond;
      if (this.validateTime(this.currentHour, this.currentMinute, newSecond, true)) {
        this.currentSecond = newSecond;
      }
      event.preventDefault();
    },
    updateModelTime() {
      this.timePickerChange = true;
      let value = this.isComparable() ? this.modelValue : this.viewDate;
      if (this.isRangeSelection()) {
        value = this.modelValue[1] || this.modelValue[0];
      }
      if (this.isMultipleSelection()) {
        value = this.modelValue[this.modelValue.length - 1];
      }
      value = value ? new Date(value.getTime()) : /* @__PURE__ */ new Date();
      if (this.hourFormat == "12") {
        if (this.currentHour === 12) value.setHours(this.pm ? 12 : 0);
        else value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
      } else {
        value.setHours(this.currentHour);
      }
      value.setMinutes(this.currentMinute);
      value.setSeconds(this.currentSecond);
      if (this.isRangeSelection()) {
        if (this.modelValue[1]) value = [this.modelValue[0], value];
        else value = [value, null];
      }
      if (this.isMultipleSelection()) {
        value = [...this.modelValue.slice(0, -1), value];
      }
      this.updateModel(value);
      this.$emit("date-select", value);
      setTimeout(() => this.timePickerChange = false, 0);
    },
    toggleAMPM(event) {
      const validHour = this.validateTime(this.currentHour, this.currentMinute, this.currentSecond, !this.pm);
      if (!validHour && (this.maxDate || this.minDate)) return;
      this.pm = !this.pm;
      this.updateModelTime();
      event.preventDefault();
    },
    clearTimePickerTimer() {
      if (this.timePickerTimer) {
        clearInterval(this.timePickerTimer);
      }
    },
    onMonthSelect(event, index) {
      if (this.view === "month") {
        this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
      } else {
        this.currentMonth = index;
        this.currentView = "date";
        this.$emit("month-change", { month: this.currentMonth + 1, year: this.currentYear });
      }
      setTimeout(this.updateFocus, 0);
    },
    onYearSelect(event, year) {
      if (this.view === "year") {
        this.onDateSelect(event, { year, month: 0, day: 1, selectable: true });
      } else {
        this.currentYear = year;
        this.currentView = "month";
        this.$emit("year-change", { month: this.currentMonth + 1, year: this.currentYear });
      }
      setTimeout(this.updateFocus, 0);
    },
    enableModality() {
      if (!this.mask) {
        this.mask = (void 0).createElement("div");
        this.mask.style.zIndex = String(parseInt(this.overlay.style.zIndex, 10) - 1);
        DomHandler.addMultipleClasses(this.mask, "p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay p-component-overlay-enter");
        this.maskClickListener = () => {
          this.overlayVisible = false;
        };
        this.mask.addEventListener("click", this.maskClickListener);
        (void 0).body.appendChild(this.mask);
        DomHandler.addClass((void 0).body, "p-overflow-hidden");
      }
    },
    disableModality() {
      if (this.mask) {
        DomHandler.addClass(this.mask, "p-component-overlay-leave");
        this.mask.addEventListener("animationend", () => {
          this.destroyMask();
        });
      }
    },
    destroyMask() {
      this.mask.removeEventListener("click", this.maskClickListener);
      this.maskClickListener = null;
      (void 0).body.removeChild(this.mask);
      this.mask = null;
      let bodyChildren = (void 0).body.children;
      let hasBlockerMasks;
      for (let i = 0; i < bodyChildren.length; i++) {
        let bodyChild = bodyChildren[i];
        if (DomHandler.hasClass(bodyChild, "p-datepicker-mask-scrollblocker")) {
          hasBlockerMasks = true;
          break;
        }
      }
      if (!hasBlockerMasks) {
        DomHandler.removeClass((void 0).body, "p-overflow-hidden");
      }
    },
    updateCurrentMetaData() {
      const viewDate = this.viewDate;
      this.currentMonth = viewDate.getMonth();
      this.currentYear = viewDate.getFullYear();
      if (this.showTime || this.timeOnly) {
        this.updateCurrentTimeMeta(viewDate);
      }
    },
    isValidSelection(value) {
      if (value == null) {
        return true;
      }
      let isValid = true;
      if (this.isSingleSelection()) {
        if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
          isValid = false;
        }
      } else if (value.every((v) => this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false))) {
        if (this.isRangeSelection()) {
          isValid = value.length > 1 && value[1] > value[0] ? true : false;
        }
      }
      return isValid;
    },
    parseValue(text) {
      if (!text || text.trim().length === 0) {
        return null;
      }
      let value;
      if (this.isSingleSelection()) {
        value = this.parseDateTime(text);
      } else if (this.isMultipleSelection()) {
        let tokens = text.split(",");
        value = [];
        for (let token of tokens) {
          value.push(this.parseDateTime(token.trim()));
        }
      } else if (this.isRangeSelection()) {
        let tokens = text.split(" - ");
        value = [];
        for (let i = 0; i < tokens.length; i++) {
          value[i] = this.parseDateTime(tokens[i].trim());
        }
      }
      return value;
    },
    parseDateTime(text) {
      let date;
      let parts = text.split(" ");
      if (this.timeOnly) {
        date = /* @__PURE__ */ new Date();
        this.populateTime(date, parts[0], parts[1]);
      } else {
        const dateFormat = this.datePattern;
        if (this.showTime) {
          date = this.parseDate(parts[0], dateFormat);
          this.populateTime(date, parts[1], parts[2]);
        } else {
          date = this.parseDate(text, dateFormat);
        }
      }
      return date;
    },
    populateTime(value, timeString, ampm) {
      if (this.hourFormat == "12" && !ampm) {
        throw "Invalid Time";
      }
      this.pm = ampm === this.$primevue.config.locale.am || ampm === this.$primevue.config.locale.am.toLowerCase();
      let time = this.parseTime(timeString);
      value.setHours(time.hour);
      value.setMinutes(time.minute);
      value.setSeconds(time.second);
    },
    parseTime(value) {
      let tokens = value.split(":");
      let validTokenLength = this.showSeconds ? 3 : 2;
      let regex = /^[0-9][0-9]$/;
      if (tokens.length !== validTokenLength || !tokens[0].match(regex) || !tokens[1].match(regex) || this.showSeconds && !tokens[2].match(regex)) {
        throw "Invalid time";
      }
      let h2 = parseInt(tokens[0]);
      let m = parseInt(tokens[1]);
      let s = this.showSeconds ? parseInt(tokens[2]) : null;
      if (isNaN(h2) || isNaN(m) || h2 > 23 || m > 59 || this.hourFormat == "12" && h2 > 12 || this.showSeconds && (isNaN(s) || s > 59)) {
        throw "Invalid time";
      } else {
        if (this.hourFormat == "12" && h2 !== 12 && this.pm) {
          h2 += 12;
        }
        return { hour: h2, minute: m, second: s };
      }
    },
    parseDate(value, format) {
      if (format == null || value == null) {
        throw "Invalid arguments";
      }
      value = typeof value === "object" ? value.toString() : value + "";
      if (value === "") {
        return null;
      }
      let iFormat, dim, extra, iValue = 0, shortYearCutoff = typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : (/* @__PURE__ */ new Date()).getFullYear() % 100 + parseInt(this.shortYearCutoff, 10), year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = (match) => {
        let matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      }, getNumber = (match) => {
        let isDoubled = lookAhead(match), size = match === "@" ? 14 : match === "!" ? 20 : match === "y" && isDoubled ? 4 : match === "o" ? 3 : 2, minSize = match === "y" ? size : 1, digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
        if (!num) {
          throw "Missing number at position " + iValue;
        }
        iValue += num[0].length;
        return parseInt(num[0], 10);
      }, getName = (match, shortNames, longNames) => {
        let index = -1;
        let arr = lookAhead(match) ? longNames : shortNames;
        let names = [];
        for (let i = 0; i < arr.length; i++) {
          names.push([i, arr[i]]);
        }
        names.sort((a, b) => {
          return -(a[1].length - b[1].length);
        });
        for (let i = 0; i < names.length; i++) {
          let name = names[i][1];
          if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
            index = names[i][0];
            iValue += name.length;
            break;
          }
        }
        if (index !== -1) {
          return index + 1;
        } else {
          throw "Unknown name at position " + iValue;
        }
      }, checkLiteral = () => {
        if (value.charAt(iValue) !== format.charAt(iFormat)) {
          throw "Unexpected literal at position " + iValue;
        }
        iValue++;
      };
      if (this.currentView === "month") {
        day = 1;
      }
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            checkLiteral();
          }
        } else {
          switch (format.charAt(iFormat)) {
            case "d":
              day = getNumber("d");
              break;
            case "D":
              getName("D", this.$primevue.config.locale.dayNamesShort, this.$primevue.config.locale.dayNames);
              break;
            case "o":
              doy = getNumber("o");
              break;
            case "m":
              month = getNumber("m");
              break;
            case "M":
              month = getName("M", this.$primevue.config.locale.monthNamesShort, this.$primevue.config.locale.monthNames);
              break;
            case "y":
              year = getNumber("y");
              break;
            case "@":
              date = new Date(getNumber("@"));
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case "!":
              date = new Date((getNumber("!") - this.ticksTo1970) / 1e4);
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case "'":
              if (lookAhead("'")) {
                checkLiteral();
              } else {
                literal = true;
              }
              break;
            default:
              checkLiteral();
          }
        }
      }
      if (iValue < value.length) {
        extra = value.substr(iValue);
        if (!/^\s+/.test(extra)) {
          throw "Extra/unparsed characters found in date: " + extra;
        }
      }
      if (year === -1) {
        year = (/* @__PURE__ */ new Date()).getFullYear();
      } else if (year < 100) {
        year += (/* @__PURE__ */ new Date()).getFullYear() - (/* @__PURE__ */ new Date()).getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
      }
      if (doy > -1) {
        month = 1;
        day = doy;
        do {
          dim = this.getDaysCountInMonth(year, month - 1);
          if (day <= dim) {
            break;
          }
          month++;
          day -= dim;
        } while (true);
      }
      date = this.daylightSavingAdjust(new Date(year, month - 1, day));
      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        throw "Invalid date";
      }
      return date;
    },
    getWeekNumber(date) {
      let checkDate = new Date(date.getTime());
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      let time = checkDate.getTime();
      checkDate.setMonth(0);
      checkDate.setDate(1);
      return Math.floor(Math.round((time - checkDate.getTime()) / 864e5) / 7) + 1;
    },
    onDateCellKeydown(event, date, groupIndex) {
      const cellContent = event.currentTarget;
      const cell = cellContent.parentElement;
      const cellIndex = DomHandler.index(cell);
      switch (event.code) {
        case "ArrowDown": {
          cellContent.tabIndex = "-1";
          let nextRow = cell.parentElement.nextElementSibling;
          if (nextRow) {
            let tableRowIndex = DomHandler.index(cell.parentElement);
            const tableRows = Array.from(cell.parentElement.parentElement.children);
            const nextTableRows = tableRows.slice(tableRowIndex + 1);
            let hasNextFocusableDate = nextTableRows.find((el) => {
              let focusCell = el.children[cellIndex].children[0];
              return !DomHandler.hasClass(focusCell, "p-disabled");
            });
            if (hasNextFocusableDate) {
              let focusCell = hasNextFocusableDate.children[cellIndex].children[0];
              focusCell.tabIndex = "0";
              focusCell.focus();
            } else {
              this.navigationState = { backward: false };
              this.navForward(event);
            }
          } else {
            this.navigationState = { backward: false };
            this.navForward(event);
          }
          event.preventDefault();
          break;
        }
        case "ArrowUp": {
          cellContent.tabIndex = "-1";
          let prevRow = cell.parentElement.previousElementSibling;
          if (prevRow) {
            let tableRowIndex = DomHandler.index(cell.parentElement);
            const tableRows = Array.from(cell.parentElement.parentElement.children);
            const prevTableRows = tableRows.slice(0, tableRowIndex).reverse();
            let hasNextFocusableDate = prevTableRows.find((el) => {
              let focusCell = el.children[cellIndex].children[0];
              return !DomHandler.hasClass(focusCell, "p-disabled");
            });
            if (hasNextFocusableDate) {
              let focusCell = hasNextFocusableDate.children[cellIndex].children[0];
              focusCell.tabIndex = "0";
              focusCell.focus();
            } else {
              this.navigationState = { backward: true };
              this.navBackward(event);
            }
          } else {
            this.navigationState = { backward: true };
            this.navBackward(event);
          }
          event.preventDefault();
          break;
        }
        case "ArrowLeft": {
          cellContent.tabIndex = "-1";
          let prevCell = cell.previousElementSibling;
          if (prevCell) {
            const cells = Array.from(cell.parentElement.children);
            const prevCells = cells.slice(0, cellIndex).reverse();
            let hasNextFocusableDate = prevCells.find((el) => {
              let focusCell = el.children[0];
              return !DomHandler.hasClass(focusCell, "p-disabled");
            });
            if (hasNextFocusableDate) {
              let focusCell = hasNextFocusableDate.children[0];
              focusCell.tabIndex = "0";
              focusCell.focus();
            } else {
              this.navigateToMonth(event, true, groupIndex);
            }
          } else {
            this.navigateToMonth(event, true, groupIndex);
          }
          event.preventDefault();
          break;
        }
        case "ArrowRight": {
          cellContent.tabIndex = "-1";
          let nextCell = cell.nextElementSibling;
          if (nextCell) {
            const cells = Array.from(cell.parentElement.children);
            const nextCells = cells.slice(cellIndex + 1);
            let hasNextFocusableDate = nextCells.find((el) => {
              let focusCell = el.children[0];
              return !DomHandler.hasClass(focusCell, "p-disabled");
            });
            if (hasNextFocusableDate) {
              let focusCell = hasNextFocusableDate.children[0];
              focusCell.tabIndex = "0";
              focusCell.focus();
            } else {
              this.navigateToMonth(event, false, groupIndex);
            }
          } else {
            this.navigateToMonth(event, false, groupIndex);
          }
          event.preventDefault();
          break;
        }
        case "Enter":
        case "Space": {
          this.onDateSelect(event, date);
          event.preventDefault();
          break;
        }
        case "Escape": {
          this.overlayVisible = false;
          event.preventDefault();
          break;
        }
        case "Tab": {
          if (!this.inline) {
            this.trapFocus(event);
          }
          break;
        }
        case "Home": {
          cellContent.tabIndex = "-1";
          let currentRow = cell.parentElement;
          let focusCell = currentRow.children[0].children[0];
          if (DomHandler.hasClass(focusCell, "p-disabled")) {
            this.navigateToMonth(event, true, groupIndex);
          } else {
            focusCell.tabIndex = "0";
            focusCell.focus();
          }
          event.preventDefault();
          break;
        }
        case "End": {
          cellContent.tabIndex = "-1";
          let currentRow = cell.parentElement;
          let focusCell = currentRow.children[currentRow.children.length - 1].children[0];
          if (DomHandler.hasClass(focusCell, "p-disabled")) {
            this.navigateToMonth(event, false, groupIndex);
          } else {
            focusCell.tabIndex = "0";
            focusCell.focus();
          }
          event.preventDefault();
          break;
        }
        case "PageUp": {
          cellContent.tabIndex = "-1";
          if (event.shiftKey) {
            this.navigationState = { backward: true };
            this.navBackward(event);
          } else this.navigateToMonth(event, true, groupIndex);
          event.preventDefault();
          break;
        }
        case "PageDown": {
          cellContent.tabIndex = "-1";
          if (event.shiftKey) {
            this.navigationState = { backward: false };
            this.navForward(event);
          } else this.navigateToMonth(event, false, groupIndex);
          event.preventDefault();
          break;
        }
      }
    },
    navigateToMonth(event, prev, groupIndex) {
      if (prev) {
        if (this.numberOfMonths === 1 || groupIndex === 0) {
          this.navigationState = { backward: true };
          this.navBackward(event);
        } else {
          let prevMonthContainer = this.overlay.children[groupIndex - 1];
          let cells = DomHandler.find(prevMonthContainer, ".p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)");
          let focusCell = cells[cells.length - 1];
          focusCell.tabIndex = "0";
          focusCell.focus();
        }
      } else {
        if (this.numberOfMonths === 1 || groupIndex === this.numberOfMonths - 1) {
          this.navigationState = { backward: false };
          this.navForward(event);
        } else {
          let nextMonthContainer = this.overlay.children[groupIndex + 1];
          let focusCell = DomHandler.findSingle(nextMonthContainer, ".p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)");
          focusCell.tabIndex = "0";
          focusCell.focus();
        }
      }
    },
    onMonthCellKeydown(event, index) {
      const cell = event.currentTarget;
      switch (event.code) {
        case "ArrowUp":
        case "ArrowDown": {
          cell.tabIndex = "-1";
          var cells = cell.parentElement.children;
          var cellIndex = DomHandler.index(cell);
          let nextCell = cells[event.code === "ArrowDown" ? cellIndex + 3 : cellIndex - 3];
          if (nextCell) {
            nextCell.tabIndex = "0";
            nextCell.focus();
          }
          event.preventDefault();
          break;
        }
        case "ArrowLeft": {
          cell.tabIndex = "-1";
          let prevCell = cell.previousElementSibling;
          if (prevCell) {
            prevCell.tabIndex = "0";
            prevCell.focus();
          } else {
            this.navigationState = { backward: true };
            this.navBackward(event);
          }
          event.preventDefault();
          break;
        }
        case "ArrowRight": {
          cell.tabIndex = "-1";
          let nextCell = cell.nextElementSibling;
          if (nextCell) {
            nextCell.tabIndex = "0";
            nextCell.focus();
          } else {
            this.navigationState = { backward: false };
            this.navForward(event);
          }
          event.preventDefault();
          break;
        }
        case "PageUp": {
          if (event.shiftKey) return;
          this.navigationState = { backward: true };
          this.navBackward(event);
          break;
        }
        case "PageDown": {
          if (event.shiftKey) return;
          this.navigationState = { backward: false };
          this.navForward(event);
          break;
        }
        case "Enter":
        case "Space": {
          this.onMonthSelect(event, index);
          event.preventDefault();
          break;
        }
        case "Escape": {
          this.overlayVisible = false;
          event.preventDefault();
          break;
        }
        case "Tab": {
          this.trapFocus(event);
          break;
        }
      }
    },
    onYearCellKeydown(event, index) {
      const cell = event.currentTarget;
      switch (event.code) {
        case "ArrowUp":
        case "ArrowDown": {
          cell.tabIndex = "-1";
          var cells = cell.parentElement.children;
          var cellIndex = DomHandler.index(cell);
          let nextCell = cells[event.code === "ArrowDown" ? cellIndex + 2 : cellIndex - 2];
          if (nextCell) {
            nextCell.tabIndex = "0";
            nextCell.focus();
          }
          event.preventDefault();
          break;
        }
        case "ArrowLeft": {
          cell.tabIndex = "-1";
          let prevCell = cell.previousElementSibling;
          if (prevCell) {
            prevCell.tabIndex = "0";
            prevCell.focus();
          } else {
            this.navigationState = { backward: true };
            this.navBackward(event);
          }
          event.preventDefault();
          break;
        }
        case "ArrowRight": {
          cell.tabIndex = "-1";
          let nextCell = cell.nextElementSibling;
          if (nextCell) {
            nextCell.tabIndex = "0";
            nextCell.focus();
          } else {
            this.navigationState = { backward: false };
            this.navForward(event);
          }
          event.preventDefault();
          break;
        }
        case "PageUp": {
          if (event.shiftKey) return;
          this.navigationState = { backward: true };
          this.navBackward(event);
          break;
        }
        case "PageDown": {
          if (event.shiftKey) return;
          this.navigationState = { backward: false };
          this.navForward(event);
          break;
        }
        case "Enter":
        case "Space": {
          this.onYearSelect(event, index);
          event.preventDefault();
          break;
        }
        case "Escape": {
          this.overlayVisible = false;
          event.preventDefault();
          break;
        }
        case "Tab": {
          this.trapFocus(event);
          break;
        }
      }
    },
    updateFocus() {
      let cell;
      if (this.navigationState) {
        if (this.navigationState.button) {
          this.initFocusableCell();
          if (this.navigationState.backward) DomHandler.findSingle(this.overlay, ".p-datepicker-prev").focus();
          else DomHandler.findSingle(this.overlay, ".p-datepicker-next").focus();
        } else {
          if (this.navigationState.backward) {
            let cells;
            if (this.currentView === "month") {
              cells = DomHandler.find(this.overlay, ".p-monthpicker .p-monthpicker-month:not(.p-disabled)");
            } else if (this.currentView === "year") {
              cells = DomHandler.find(this.overlay, ".p-yearpicker .p-yearpicker-year:not(.p-disabled)");
            } else {
              cells = DomHandler.find(this.overlay, ".p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)");
            }
            if (cells && cells.length > 0) {
              cell = cells[cells.length - 1];
            }
          } else {
            if (this.currentView === "month") {
              cell = DomHandler.findSingle(this.overlay, ".p-monthpicker .p-monthpicker-month:not(.p-disabled)");
            } else if (this.currentView === "year") {
              cell = DomHandler.findSingle(this.overlay, ".p-yearpicker .p-yearpicker-year:not(.p-disabled)");
            } else {
              cell = DomHandler.findSingle(this.overlay, ".p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)");
            }
          }
          if (cell) {
            cell.tabIndex = "0";
            cell.focus();
          }
        }
        this.navigationState = null;
      } else {
        this.initFocusableCell();
      }
    },
    initFocusableCell() {
      let cell;
      if (this.currentView === "month") {
        let cells = DomHandler.find(this.overlay, ".p-monthpicker .p-monthpicker-month");
        let selectedCell = DomHandler.findSingle(this.overlay, ".p-monthpicker .p-monthpicker-month.p-highlight");
        cells.forEach((cell2) => cell2.tabIndex = -1);
        cell = selectedCell || cells[0];
      } else if (this.currentView === "year") {
        let cells = DomHandler.find(this.overlay, ".p-yearpicker .p-yearpicker-year");
        let selectedCell = DomHandler.findSingle(this.overlay, ".p-yearpicker .p-yearpicker-year.p-highlight");
        cells.forEach((cell2) => cell2.tabIndex = -1);
        cell = selectedCell || cells[0];
      } else {
        cell = DomHandler.findSingle(this.overlay, "span.p-highlight");
        if (!cell) {
          let todayCell = DomHandler.findSingle(this.overlay, "td.p-datepicker-today span:not(.p-disabled):not(.p-ink");
          if (todayCell) cell = todayCell;
          else cell = DomHandler.findSingle(this.overlay, ".p-datepicker-calendar td span:not(.p-disabled):not(.p-ink");
        }
      }
      if (cell) {
        cell.tabIndex = "0";
        if (!this.preventFocus && (!this.navigationState || !this.navigationState.button) && !this.timePickerChange) {
          cell.focus();
        }
        this.preventFocus = false;
      }
    },
    trapFocus(event) {
      event.preventDefault();
      let focusableElements = DomHandler.getFocusableElements(this.overlay);
      if (focusableElements && focusableElements.length > 0) {
        if (!(void 0).activeElement) {
          focusableElements[0].focus();
        } else {
          let focusedIndex = focusableElements.indexOf((void 0).activeElement);
          if (event.shiftKey) {
            if (focusedIndex === -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus();
            else focusableElements[focusedIndex - 1].focus();
          } else {
            if (focusedIndex === -1) {
              if (this.timeOnly) {
                focusableElements[0].focus();
              } else {
                let spanIndex = null;
                for (let i = 0; i < focusableElements.length; i++) {
                  if (focusableElements[i].tagName === "SPAN") spanIndex = i;
                }
                focusableElements[spanIndex].focus();
              }
            } else if (focusedIndex === focusableElements.length - 1) focusableElements[0].focus();
            else focusableElements[focusedIndex + 1].focus();
          }
        }
      }
    },
    onContainerButtonKeydown(event) {
      switch (event.code) {
        case "Tab":
          this.trapFocus(event);
          break;
        case "Escape":
          this.overlayVisible = false;
          event.preventDefault();
          break;
      }
      this.$emit("keydown", event);
    },
    onInput(event) {
      try {
        this.selectionStart = this.input.selectionStart;
        this.selectionEnd = this.input.selectionEnd;
        let value = this.parseValue(event.target.value);
        if (this.isValidSelection(value)) {
          this.typeUpdate = true;
          this.updateModel(value);
        }
      } catch (err) {
      }
      this.$emit("input", event);
    },
    onInputClick() {
      if (this.showOnFocus && this.isEnabled() && !this.overlayVisible) {
        this.overlayVisible = true;
      }
    },
    onFocus(event) {
      if (this.showOnFocus && this.isEnabled()) {
        this.overlayVisible = true;
      }
      this.focused = true;
      this.$emit("focus", event);
    },
    onBlur(event) {
      this.$emit("blur", { originalEvent: event, value: event.target.value });
      this.focused = false;
      event.target.value = this.formatValue(this.modelValue);
    },
    onKeyDown(event) {
      if (event.code === "ArrowDown" && this.overlay) {
        this.trapFocus(event);
      } else if (event.code === "ArrowDown" && !this.overlay) {
        this.overlayVisible = true;
      } else if (event.code === "Escape") {
        if (this.overlayVisible) {
          this.overlayVisible = false;
          event.preventDefault();
        }
      } else if (event.code === "Tab") {
        if (this.overlay) {
          DomHandler.getFocusableElements(this.overlay).forEach((el) => el.tabIndex = "-1");
        }
        if (this.overlayVisible) {
          this.overlayVisible = false;
        }
      }
    },
    overlayRef(el) {
      this.overlay = el;
    },
    inputRef(el) {
      this.input = el;
    },
    getMonthName(index) {
      return this.$primevue.config.locale.monthNames[index];
    },
    getYear(month) {
      return this.currentView === "month" ? this.currentYear : month.year;
    },
    onOverlayClick(event) {
      if (!this.inline) {
        OverlayEventBus.emit("overlay-click", {
          originalEvent: event,
          target: this.$el
        });
      }
    },
    onOverlayKeyDown(event) {
      switch (event.code) {
        case "Escape":
          this.input.focus();
          this.overlayVisible = false;
          break;
      }
    },
    onOverlayMouseUp(event) {
      this.onOverlayClick(event);
    },
    createResponsiveStyle() {
      if (this.numberOfMonths > 1 && this.responsiveOptions) {
        if (!this.responsiveStyleElement) {
          this.responsiveStyleElement = (void 0).createElement("style");
          this.responsiveStyleElement.type = "text/css";
          (void 0).body.appendChild(this.responsiveStyleElement);
        }
        let innerHTML = "";
        if (this.responsiveOptions) {
          let responsiveOptions = [...this.responsiveOptions].filter((o) => !!(o.breakpoint && o.numMonths)).sort((o1, o2) => -1 * o1.breakpoint.localeCompare(o2.breakpoint, void 0, { numeric: true }));
          for (let i = 0; i < responsiveOptions.length; i++) {
            let { breakpoint, numMonths } = responsiveOptions[i];
            let styles = `
                            .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${numMonths}) .p-datepicker-next {
                                display: inline-flex !important;
                            }
                        `;
            for (let j = numMonths; j < this.numberOfMonths; j++) {
              styles += `
                                .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${j + 1}) {
                                    display: none !important;
                                }
                            `;
            }
            innerHTML += `
                            @media screen and (max-width: ${breakpoint}) {
                                ${styles}
                            }
                        `;
          }
        }
        this.responsiveStyleElement.innerHTML = innerHTML;
      }
    },
    destroyResponsiveStyleElement() {
      if (this.responsiveStyleElement) {
        this.responsiveStyleElement.remove();
        this.responsiveStyleElement = null;
      }
    }
  },
  computed: {
    viewDate() {
      let propValue = this.modelValue;
      if (propValue && Array.isArray(propValue)) {
        if (this.isRangeSelection()) {
          propValue = this.inline ? propValue[0] : propValue[1] || propValue[0];
        } else if (this.isMultipleSelection()) {
          propValue = propValue[propValue.length - 1];
        }
      }
      if (propValue && typeof propValue !== "string") {
        return propValue;
      } else {
        let today = /* @__PURE__ */ new Date();
        if (this.maxDate && this.maxDate < today) {
          return this.maxDate;
        }
        if (this.minDate && this.minDate > today) {
          return this.minDate;
        }
        return today;
      }
    },
    inputFieldValue() {
      return this.formatValue(this.modelValue);
    },
    containerClass() {
      return [
        "p-calendar p-component p-inputwrapper",
        {
          "p-calendar-w-btn": this.showIcon,
          "p-calendar-timeonly": this.timeOnly,
          "p-calendar-disabled": this.disabled,
          "p-inputwrapper-filled": this.modelValue,
          "p-inputwrapper-focus": this.focused
        }
      ];
    },
    panelStyleClass() {
      return [
        "p-datepicker p-component",
        this.panelClass,
        {
          "p-datepicker-inline": this.inline,
          "p-disabled": this.disabled,
          "p-datepicker-timeonly": this.timeOnly,
          "p-datepicker-multiple-month": this.numberOfMonths > 1,
          "p-datepicker-monthpicker": this.currentView === "month",
          "p-datepicker-yearpicker": this.currentView === "year",
          "p-datepicker-touch-ui": this.touchUI,
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false
        }
      ];
    },
    months() {
      let months = [];
      for (let i = 0; i < this.numberOfMonths; i++) {
        let month = this.currentMonth + i;
        let year = this.currentYear;
        if (month > 11) {
          month = month % 11 - 1;
          year = year + 1;
        }
        let dates = [];
        let firstDay = this.getFirstDayOfMonthIndex(month, year);
        let daysLength = this.getDaysCountInMonth(month, year);
        let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        let dayNo = 1;
        let today = /* @__PURE__ */ new Date();
        let weekNumbers = [];
        let monthRows = Math.ceil((daysLength + firstDay) / 7);
        for (let i2 = 0; i2 < monthRows; i2++) {
          let week = [];
          if (i2 == 0) {
            for (let j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
              let prev = this.getPreviousMonthAndYear(month, year);
              week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true, today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true) });
            }
            let remainingDaysLength = 7 - week.length;
            for (let j = 0; j < remainingDaysLength; j++) {
              week.push({ day: dayNo, month, year, today: this.isToday(today, dayNo, month, year), selectable: this.isSelectable(dayNo, month, year, false) });
              dayNo++;
            }
          } else {
            for (let j = 0; j < 7; j++) {
              if (dayNo > daysLength) {
                let next = this.getNextMonthAndYear(month, year);
                week.push({
                  day: dayNo - daysLength,
                  month: next.month,
                  year: next.year,
                  otherMonth: true,
                  today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                  selectable: this.isSelectable(dayNo - daysLength, next.month, next.year, true)
                });
              } else {
                week.push({ day: dayNo, month, year, today: this.isToday(today, dayNo, month, year), selectable: this.isSelectable(dayNo, month, year, false) });
              }
              dayNo++;
            }
          }
          if (this.showWeek) {
            weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
          }
          dates.push(week);
        }
        months.push({
          month,
          year,
          dates,
          weekNumbers
        });
      }
      return months;
    },
    weekDays() {
      let weekDays = [];
      let dayIndex = this.$primevue.config.locale.firstDayOfWeek;
      for (let i = 0; i < 7; i++) {
        weekDays.push(this.$primevue.config.locale.dayNamesMin[dayIndex]);
        dayIndex = dayIndex == 6 ? 0 : ++dayIndex;
      }
      return weekDays;
    },
    ticksTo1970() {
      return ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 1e7;
    },
    sundayIndex() {
      return this.$primevue.config.locale.firstDayOfWeek > 0 ? 7 - this.$primevue.config.locale.firstDayOfWeek : 0;
    },
    datePattern() {
      return this.dateFormat || this.$primevue.config.locale.dateFormat;
    },
    yearOptions() {
      if (this.yearRange) {
        let $vm = this;
        const years = this.yearRange.split(":");
        let yearStart = parseInt(years[0]);
        let yearEnd = parseInt(years[1]);
        let yearOptions = [];
        if (this.currentYear < yearStart) {
          $vm.currentYear = yearEnd;
        } else if (this.currentYear > yearEnd) {
          $vm.currentYear = yearStart;
        }
        for (let i = yearStart; i <= yearEnd; i++) {
          yearOptions.push(i);
        }
        return yearOptions;
      } else {
        return null;
      }
    },
    monthPickerValues() {
      let monthPickerValues = [];
      for (let i = 0; i <= 11; i++) {
        monthPickerValues.push(this.$primevue.config.locale.monthNamesShort[i]);
      }
      return monthPickerValues;
    },
    yearPickerValues() {
      let yearPickerValues = [];
      let base = this.currentYear - this.currentYear % 10;
      for (let i = 0; i < 10; i++) {
        yearPickerValues.push(base + i);
      }
      return yearPickerValues;
    },
    formattedCurrentHour() {
      return this.currentHour < 10 ? "0" + this.currentHour : this.currentHour;
    },
    formattedCurrentMinute() {
      return this.currentMinute < 10 ? "0" + this.currentMinute : this.currentMinute;
    },
    formattedCurrentSecond() {
      return this.currentSecond < 10 ? "0" + this.currentSecond : this.currentSecond;
    },
    todayLabel() {
      return this.$primevue.config.locale.today;
    },
    clearLabel() {
      return this.$primevue.config.locale.clear;
    },
    weekHeaderLabel() {
      return this.$primevue.config.locale.weekHeader;
    },
    monthNames() {
      return this.$primevue.config.locale.monthNames;
    },
    attributeSelector() {
      return UniqueComponentId();
    },
    switchViewButtonDisabled() {
      return this.numberOfMonths > 1 || this.disabled;
    },
    panelId() {
      return UniqueComponentId() + "_panel";
    }
  },
  components: {
    CalendarButton: script$l,
    Portal: script$k
  },
  directives: {
    ripple: Ripple
  }
};
const _hoisted_1$g = ["id"];
const _hoisted_2$b = ["id", "placeholder", "aria-expanded", "aria-controls", "aria-labelledby", "aria-label", "disabled", "readonly"];
const _hoisted_3$8 = ["id", "role", "aria-modal", "aria-label"];
const _hoisted_4$6 = { class: "p-datepicker-group-container" };
const _hoisted_5$5 = { class: "p-datepicker-header" };
const _hoisted_6$2 = ["disabled", "aria-label"];
const _hoisted_7$2 = { class: "p-datepicker-title" };
const _hoisted_8$2 = ["disabled", "aria-label"];
const _hoisted_9$1 = ["disabled", "aria-label"];
const _hoisted_10$1 = {
  key: 2,
  class: "p-datepicker-decade"
};
const _hoisted_11$1 = ["disabled", "aria-label"];
const _hoisted_12$1 = {
  key: 0,
  class: "p-datepicker-calendar-container"
};
const _hoisted_13$1 = {
  class: "p-datepicker-calendar",
  role: "grid"
};
const _hoisted_14$1 = {
  key: 0,
  scope: "col",
  class: "p-datepicker-weekheader p-disabled"
};
const _hoisted_15$1 = ["abbr"];
const _hoisted_16 = {
  key: 0,
  class: "p-datepicker-weeknumber"
};
const _hoisted_17 = { class: "p-disabled" };
const _hoisted_18 = {
  key: 0,
  style: { "visibility": "hidden" }
};
const _hoisted_19 = ["aria-label"];
const _hoisted_20 = ["onClick", "onKeydown", "aria-selected"];
const _hoisted_21 = {
  key: 0,
  class: "p-hidden-accessible",
  "aria-live": "polite"
};
const _hoisted_22 = {
  key: 0,
  class: "p-monthpicker"
};
const _hoisted_23 = ["onClick", "onKeydown"];
const _hoisted_24 = {
  key: 0,
  class: "p-hidden-accessible",
  "aria-live": "polite"
};
const _hoisted_25 = {
  key: 1,
  class: "p-yearpicker"
};
const _hoisted_26 = ["onClick", "onKeydown"];
const _hoisted_27 = {
  key: 0,
  class: "p-hidden-accessible",
  "aria-live": "polite"
};
const _hoisted_28 = {
  key: 1,
  class: "p-timepicker"
};
const _hoisted_29 = { class: "p-hour-picker" };
const _hoisted_30 = ["aria-label"];
const _hoisted_31 = ["aria-label"];
const _hoisted_32 = { class: "p-separator" };
const _hoisted_33 = { class: "p-minute-picker" };
const _hoisted_34 = ["aria-label", "disabled"];
const _hoisted_35 = ["aria-label", "disabled"];
const _hoisted_36 = {
  key: 0,
  class: "p-separator"
};
const _hoisted_37 = {
  key: 1,
  class: "p-second-picker"
};
const _hoisted_38 = ["aria-label", "disabled"];
const _hoisted_39 = ["aria-label", "disabled"];
const _hoisted_40 = {
  key: 2,
  class: "p-separator"
};
const _hoisted_41 = {
  key: 3,
  class: "p-ampm-picker"
};
const _hoisted_42 = ["aria-label", "disabled"];
const _hoisted_43 = ["aria-label", "disabled"];
const _hoisted_44 = {
  key: 2,
  class: "p-datepicker-buttonbar"
};
function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CalendarButton = resolveComponent("CalendarButton");
  const _component_Portal = resolveComponent("Portal");
  const _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("span", {
    ref: "container",
    id: $props.id,
    class: normalizeClass($options.containerClass)
  }, [
    !$props.inline ? (openBlock(), createElementBlock("input", mergeProps({
      key: 0,
      ref: $options.inputRef,
      id: $props.inputId,
      type: "text",
      role: "combobox",
      class: ["p-inputtext p-component", $props.inputClass],
      style: $props.inputStyle,
      placeholder: $props.placeholder,
      autocomplete: "off",
      "aria-autocomplete": "none",
      "aria-haspopup": "dialog",
      "aria-expanded": $data.overlayVisible,
      "aria-controls": $options.panelId,
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-label": _ctx.ariaLabel,
      inputmode: "none",
      disabled: $props.disabled,
      readonly: !$props.manualInput || $props.readonly,
      tabindex: 0,
      onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
      onClick: _cache[1] || (_cache[1] = (...args) => $options.onInputClick && $options.onInputClick(...args)),
      onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
      onBlur: _cache[3] || (_cache[3] = (...args) => $options.onBlur && $options.onBlur(...args)),
      onKeydown: _cache[4] || (_cache[4] = (...args) => $options.onKeyDown && $options.onKeyDown(...args))
    }, $props.inputProps), null, 16, _hoisted_2$b)) : createCommentVNode("", true),
    $props.showIcon ? (openBlock(), createBlock(_component_CalendarButton, {
      key: 1,
      icon: $props.icon,
      class: "p-datepicker-trigger",
      disabled: $props.disabled,
      onClick: $options.onButtonClick,
      type: "button",
      "aria-label": _ctx.$primevue.config.locale.chooseDate,
      "aria-haspopup": "dialog",
      "aria-expanded": $data.overlayVisible,
      "aria-controls": $options.panelId
    }, null, 8, ["icon", "disabled", "onClick", "aria-label", "aria-expanded", "aria-controls"])) : createCommentVNode("", true),
    createVNode(_component_Portal, {
      appendTo: $props.appendTo,
      disabled: $props.inline
    }, {
      default: withCtx(() => [
        createVNode(Transition, {
          name: "p-connected-overlay",
          onEnter: _cache[68] || (_cache[68] = ($event) => $options.onOverlayEnter($event)),
          onAfterEnter: $options.onOverlayEnterComplete,
          onAfterLeave: $options.onOverlayAfterLeave,
          onLeave: $options.onOverlayLeave
        }, {
          default: withCtx(() => [
            $props.inline || $data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref: $options.overlayRef,
              id: $options.panelId,
              class: $options.panelStyleClass,
              style: $props.panelStyle,
              role: $props.inline ? null : "dialog",
              "aria-modal": $props.inline ? null : "true",
              "aria-label": _ctx.$primevue.config.locale.chooseDate,
              onClick: _cache[65] || (_cache[65] = (...args) => $options.onOverlayClick && $options.onOverlayClick(...args)),
              onKeydown: _cache[66] || (_cache[66] = (...args) => $options.onOverlayKeyDown && $options.onOverlayKeyDown(...args)),
              onMouseup: _cache[67] || (_cache[67] = (...args) => $options.onOverlayMouseUp && $options.onOverlayMouseUp(...args))
            }, $props.panelProps), [
              !$props.timeOnly ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createElementVNode("div", _hoisted_4$6, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($options.months, (month, groupIndex) => {
                    return openBlock(), createElementBlock("div", {
                      key: month.month + month.year,
                      class: "p-datepicker-group"
                    }, [
                      createElementVNode("div", _hoisted_5$5, [
                        renderSlot(_ctx.$slots, "header"),
                        withDirectives((openBlock(), createElementBlock("button", {
                          class: "p-datepicker-prev p-link",
                          onClick: _cache[5] || (_cache[5] = (...args) => $options.onPrevButtonClick && $options.onPrevButtonClick(...args)),
                          type: "button",
                          onKeydown: _cache[6] || (_cache[6] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                          disabled: $props.disabled,
                          "aria-label": $data.currentView === "year" ? _ctx.$primevue.config.locale.prevDecade : $data.currentView === "month" ? _ctx.$primevue.config.locale.prevYear : _ctx.$primevue.config.locale.prevMonth
                        }, [
                          createElementVNode("span", {
                            class: normalizeClass(["p-datepicker-prev-icon", $props.previousIcon])
                          }, null, 2)
                        ], 40, _hoisted_6$2)), [
                          [vShow, $props.showOtherMonths ? groupIndex === 0 : false],
                          [_directive_ripple]
                        ]),
                        createElementVNode("div", _hoisted_7$2, [
                          $data.currentView === "date" ? (openBlock(), createElementBlock("button", {
                            key: 0,
                            type: "button",
                            onClick: _cache[7] || (_cache[7] = (...args) => $options.switchToMonthView && $options.switchToMonthView(...args)),
                            onKeydown: _cache[8] || (_cache[8] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                            class: "p-datepicker-month p-link",
                            disabled: $options.switchViewButtonDisabled,
                            "aria-label": _ctx.$primevue.config.locale.chooseMonth
                          }, toDisplayString($options.getMonthName(month.month)), 41, _hoisted_8$2)) : createCommentVNode("", true),
                          $data.currentView !== "year" ? (openBlock(), createElementBlock("button", {
                            key: 1,
                            type: "button",
                            onClick: _cache[9] || (_cache[9] = (...args) => $options.switchToYearView && $options.switchToYearView(...args)),
                            onKeydown: _cache[10] || (_cache[10] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                            class: "p-datepicker-year p-link",
                            disabled: $options.switchViewButtonDisabled,
                            "aria-label": _ctx.$primevue.config.locale.chooseYear
                          }, toDisplayString($options.getYear(month)), 41, _hoisted_9$1)) : createCommentVNode("", true),
                          $data.currentView === "year" ? (openBlock(), createElementBlock("span", _hoisted_10$1, [
                            renderSlot(_ctx.$slots, "decade", { years: $options.yearPickerValues }, () => [
                              createTextVNode(toDisplayString($options.yearPickerValues[0]) + " - " + toDisplayString($options.yearPickerValues[$options.yearPickerValues.length - 1]), 1)
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        withDirectives((openBlock(), createElementBlock("button", {
                          class: "p-datepicker-next p-link",
                          onClick: _cache[11] || (_cache[11] = (...args) => $options.onNextButtonClick && $options.onNextButtonClick(...args)),
                          type: "button",
                          onKeydown: _cache[12] || (_cache[12] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                          disabled: $props.disabled,
                          "aria-label": $data.currentView === "year" ? _ctx.$primevue.config.locale.nextDecade : $data.currentView === "month" ? _ctx.$primevue.config.locale.nextYear : _ctx.$primevue.config.locale.nextMonth
                        }, [
                          createElementVNode("span", {
                            class: normalizeClass(["p-datepicker-next-icon", $props.nextIcon])
                          }, null, 2)
                        ], 40, _hoisted_11$1)), [
                          [vShow, $props.showOtherMonths ? $props.numberOfMonths === 1 ? true : groupIndex === $props.numberOfMonths - 1 : false],
                          [_directive_ripple]
                        ])
                      ]),
                      $data.currentView === "date" ? (openBlock(), createElementBlock("div", _hoisted_12$1, [
                        createElementVNode("table", _hoisted_13$1, [
                          createElementVNode("thead", null, [
                            createElementVNode("tr", null, [
                              $props.showWeek ? (openBlock(), createElementBlock("th", _hoisted_14$1, [
                                createElementVNode("span", null, toDisplayString($options.weekHeaderLabel), 1)
                              ])) : createCommentVNode("", true),
                              (openBlock(true), createElementBlock(Fragment, null, renderList($options.weekDays, (weekDay) => {
                                return openBlock(), createElementBlock("th", {
                                  key: weekDay,
                                  scope: "col",
                                  abbr: weekDay
                                }, [
                                  createElementVNode("span", null, toDisplayString(weekDay), 1)
                                ], 8, _hoisted_15$1);
                              }), 128))
                            ])
                          ]),
                          createElementVNode("tbody", null, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(month.dates, (week, i) => {
                              return openBlock(), createElementBlock("tr", {
                                key: week[0].day + "" + week[0].month
                              }, [
                                $props.showWeek ? (openBlock(), createElementBlock("td", _hoisted_16, [
                                  createElementVNode("span", _hoisted_17, [
                                    month.weekNumbers[i] < 10 ? (openBlock(), createElementBlock("span", _hoisted_18, "0")) : createCommentVNode("", true),
                                    createTextVNode(" " + toDisplayString(month.weekNumbers[i]), 1)
                                  ])
                                ])) : createCommentVNode("", true),
                                (openBlock(true), createElementBlock(Fragment, null, renderList(week, (date) => {
                                  return openBlock(), createElementBlock("td", {
                                    key: date.day + "" + date.month,
                                    "aria-label": date.day,
                                    class: normalizeClass({ "p-datepicker-other-month": date.otherMonth, "p-datepicker-today": date.today })
                                  }, [
                                    withDirectives((openBlock(), createElementBlock("span", {
                                      class: normalizeClass({ "p-highlight": $options.isSelected(date), "p-disabled": !date.selectable }),
                                      onClick: ($event) => $options.onDateSelect($event, date),
                                      draggable: "false",
                                      onKeydown: ($event) => $options.onDateCellKeydown($event, date, groupIndex),
                                      "aria-selected": $options.isSelected(date)
                                    }, [
                                      renderSlot(_ctx.$slots, "date", { date }, () => [
                                        createTextVNode(toDisplayString(date.day), 1)
                                      ])
                                    ], 42, _hoisted_20)), [
                                      [_directive_ripple]
                                    ]),
                                    $options.isSelected(date) ? (openBlock(), createElementBlock("div", _hoisted_21, toDisplayString(date.day), 1)) : createCommentVNode("", true)
                                  ], 10, _hoisted_19);
                                }), 128))
                              ]);
                            }), 128))
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ]);
                  }), 128))
                ]),
                $data.currentView === "month" ? (openBlock(), createElementBlock("div", _hoisted_22, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($options.monthPickerValues, (m, i) => {
                    return withDirectives((openBlock(), createElementBlock("span", {
                      key: m,
                      onClick: ($event) => $options.onMonthSelect($event, i),
                      onKeydown: ($event) => $options.onMonthCellKeydown($event, i),
                      class: normalizeClass(["p-monthpicker-month", { "p-highlight": $options.isMonthSelected(i) }])
                    }, [
                      createTextVNode(toDisplayString(m) + " ", 1),
                      $options.isMonthSelected(i) ? (openBlock(), createElementBlock("div", _hoisted_24, toDisplayString(m), 1)) : createCommentVNode("", true)
                    ], 42, _hoisted_23)), [
                      [_directive_ripple]
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true),
                $data.currentView === "year" ? (openBlock(), createElementBlock("div", _hoisted_25, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($options.yearPickerValues, (y) => {
                    return withDirectives((openBlock(), createElementBlock("span", {
                      key: y,
                      onClick: ($event) => $options.onYearSelect($event, y),
                      onKeydown: ($event) => $options.onYearCellKeydown($event, y),
                      class: normalizeClass(["p-yearpicker-year", { "p-highlight": $options.isYearSelected(y) }])
                    }, [
                      createTextVNode(toDisplayString(y) + " ", 1),
                      $options.isYearSelected(y) ? (openBlock(), createElementBlock("div", _hoisted_27, toDisplayString(y), 1)) : createCommentVNode("", true)
                    ], 42, _hoisted_26)), [
                      [_directive_ripple]
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true),
              ($props.showTime || $props.timeOnly) && $data.currentView === "date" ? (openBlock(), createElementBlock("div", _hoisted_28, [
                createElementVNode("div", _hoisted_29, [
                  withDirectives((openBlock(), createElementBlock("button", {
                    class: "p-link",
                    "aria-label": _ctx.$primevue.config.locale.nextHour,
                    onMousedown: _cache[13] || (_cache[13] = ($event) => $options.onTimePickerElementMouseDown($event, 0, 1)),
                    onMouseup: _cache[14] || (_cache[14] = ($event) => $options.onTimePickerElementMouseUp($event)),
                    onKeydown: [
                      _cache[15] || (_cache[15] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                      _cache[17] || (_cache[17] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 0, 1), ["enter"])),
                      _cache[18] || (_cache[18] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 0, 1), ["space"]))
                    ],
                    onMouseleave: _cache[16] || (_cache[16] = ($event) => $options.onTimePickerElementMouseLeave()),
                    onKeyup: [
                      _cache[19] || (_cache[19] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                      _cache[20] || (_cache[20] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["space"]))
                    ],
                    type: "button"
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass($props.incrementIcon)
                    }, null, 2)
                  ], 40, _hoisted_30)), [
                    [_directive_ripple]
                  ]),
                  createElementVNode("span", null, toDisplayString($options.formattedCurrentHour), 1),
                  withDirectives((openBlock(), createElementBlock("button", {
                    class: "p-link",
                    "aria-label": _ctx.$primevue.config.locale.prevHour,
                    onMousedown: _cache[21] || (_cache[21] = ($event) => $options.onTimePickerElementMouseDown($event, 0, -1)),
                    onMouseup: _cache[22] || (_cache[22] = ($event) => $options.onTimePickerElementMouseUp($event)),
                    onKeydown: [
                      _cache[23] || (_cache[23] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                      _cache[25] || (_cache[25] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 0, -1), ["enter"])),
                      _cache[26] || (_cache[26] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 0, -1), ["space"]))
                    ],
                    onMouseleave: _cache[24] || (_cache[24] = ($event) => $options.onTimePickerElementMouseLeave()),
                    onKeyup: [
                      _cache[27] || (_cache[27] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                      _cache[28] || (_cache[28] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["space"]))
                    ],
                    type: "button"
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass($props.decrementIcon)
                    }, null, 2)
                  ], 40, _hoisted_31)), [
                    [_directive_ripple]
                  ])
                ]),
                createElementVNode("div", _hoisted_32, [
                  createElementVNode("span", null, toDisplayString($props.timeSeparator), 1)
                ]),
                createElementVNode("div", _hoisted_33, [
                  withDirectives((openBlock(), createElementBlock("button", {
                    class: "p-link",
                    "aria-label": _ctx.$primevue.config.locale.nextMinute,
                    onMousedown: _cache[29] || (_cache[29] = ($event) => $options.onTimePickerElementMouseDown($event, 1, 1)),
                    onMouseup: _cache[30] || (_cache[30] = ($event) => $options.onTimePickerElementMouseUp($event)),
                    onKeydown: [
                      _cache[31] || (_cache[31] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                      _cache[33] || (_cache[33] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 1, 1), ["enter"])),
                      _cache[34] || (_cache[34] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 1, 1), ["space"]))
                    ],
                    disabled: $props.disabled,
                    onMouseleave: _cache[32] || (_cache[32] = ($event) => $options.onTimePickerElementMouseLeave()),
                    onKeyup: [
                      _cache[35] || (_cache[35] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                      _cache[36] || (_cache[36] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["space"]))
                    ],
                    type: "button"
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass($props.incrementIcon)
                    }, null, 2)
                  ], 40, _hoisted_34)), [
                    [_directive_ripple]
                  ]),
                  createElementVNode("span", null, toDisplayString($options.formattedCurrentMinute), 1),
                  withDirectives((openBlock(), createElementBlock("button", {
                    class: "p-link",
                    "aria-label": _ctx.$primevue.config.locale.prevMinute,
                    onMousedown: _cache[37] || (_cache[37] = ($event) => $options.onTimePickerElementMouseDown($event, 1, -1)),
                    onMouseup: _cache[38] || (_cache[38] = ($event) => $options.onTimePickerElementMouseUp($event)),
                    onKeydown: [
                      _cache[39] || (_cache[39] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                      _cache[41] || (_cache[41] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 1, -1), ["enter"])),
                      _cache[42] || (_cache[42] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 1, -1), ["space"]))
                    ],
                    disabled: $props.disabled,
                    onMouseleave: _cache[40] || (_cache[40] = ($event) => $options.onTimePickerElementMouseLeave()),
                    onKeyup: [
                      _cache[43] || (_cache[43] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                      _cache[44] || (_cache[44] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["space"]))
                    ],
                    type: "button"
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass($props.decrementIcon)
                    }, null, 2)
                  ], 40, _hoisted_35)), [
                    [_directive_ripple]
                  ])
                ]),
                $props.showSeconds ? (openBlock(), createElementBlock("div", _hoisted_36, [
                  createElementVNode("span", null, toDisplayString($props.timeSeparator), 1)
                ])) : createCommentVNode("", true),
                $props.showSeconds ? (openBlock(), createElementBlock("div", _hoisted_37, [
                  withDirectives((openBlock(), createElementBlock("button", {
                    class: "p-link",
                    "aria-label": _ctx.$primevue.config.locale.nextSecond,
                    onMousedown: _cache[45] || (_cache[45] = ($event) => $options.onTimePickerElementMouseDown($event, 2, 1)),
                    onMouseup: _cache[46] || (_cache[46] = ($event) => $options.onTimePickerElementMouseUp($event)),
                    onKeydown: [
                      _cache[47] || (_cache[47] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                      _cache[49] || (_cache[49] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 2, 1), ["enter"])),
                      _cache[50] || (_cache[50] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 2, 1), ["space"]))
                    ],
                    disabled: $props.disabled,
                    onMouseleave: _cache[48] || (_cache[48] = ($event) => $options.onTimePickerElementMouseLeave()),
                    onKeyup: [
                      _cache[51] || (_cache[51] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                      _cache[52] || (_cache[52] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["space"]))
                    ],
                    type: "button"
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass($props.incrementIcon)
                    }, null, 2)
                  ], 40, _hoisted_38)), [
                    [_directive_ripple]
                  ]),
                  createElementVNode("span", null, toDisplayString($options.formattedCurrentSecond), 1),
                  withDirectives((openBlock(), createElementBlock("button", {
                    class: "p-link",
                    "aria-label": _ctx.$primevue.config.locale.prevSecond,
                    onMousedown: _cache[53] || (_cache[53] = ($event) => $options.onTimePickerElementMouseDown($event, 2, -1)),
                    onMouseup: _cache[54] || (_cache[54] = ($event) => $options.onTimePickerElementMouseUp($event)),
                    onKeydown: [
                      _cache[55] || (_cache[55] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                      _cache[57] || (_cache[57] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 2, -1), ["enter"])),
                      _cache[58] || (_cache[58] = withKeys(($event) => $options.onTimePickerElementMouseDown($event, 2, -1), ["space"]))
                    ],
                    disabled: $props.disabled,
                    onMouseleave: _cache[56] || (_cache[56] = ($event) => $options.onTimePickerElementMouseLeave()),
                    onKeyup: [
                      _cache[59] || (_cache[59] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                      _cache[60] || (_cache[60] = withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["space"]))
                    ],
                    type: "button"
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass($props.decrementIcon)
                    }, null, 2)
                  ], 40, _hoisted_39)), [
                    [_directive_ripple]
                  ])
                ])) : createCommentVNode("", true),
                $props.hourFormat == "12" ? (openBlock(), createElementBlock("div", _hoisted_40, [
                  createElementVNode("span", null, toDisplayString($props.timeSeparator), 1)
                ])) : createCommentVNode("", true),
                $props.hourFormat == "12" ? (openBlock(), createElementBlock("div", _hoisted_41, [
                  withDirectives((openBlock(), createElementBlock("button", {
                    class: "p-link",
                    "aria-label": _ctx.$primevue.config.locale.am,
                    onClick: _cache[61] || (_cache[61] = ($event) => $options.toggleAMPM($event)),
                    type: "button",
                    disabled: $props.disabled
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass($props.incrementIcon)
                    }, null, 2)
                  ], 8, _hoisted_42)), [
                    [_directive_ripple]
                  ]),
                  createElementVNode("span", null, toDisplayString($data.pm ? _ctx.$primevue.config.locale.pm : _ctx.$primevue.config.locale.am), 1),
                  withDirectives((openBlock(), createElementBlock("button", {
                    class: "p-link",
                    "aria-label": _ctx.$primevue.config.locale.pm,
                    onClick: _cache[62] || (_cache[62] = ($event) => $options.toggleAMPM($event)),
                    type: "button",
                    disabled: $props.disabled
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass($props.decrementIcon)
                    }, null, 2)
                  ], 8, _hoisted_43)), [
                    [_directive_ripple]
                  ])
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              $props.showButtonBar ? (openBlock(), createElementBlock("div", _hoisted_44, [
                createVNode(_component_CalendarButton, {
                  type: "button",
                  label: $options.todayLabel,
                  onClick: _cache[63] || (_cache[63] = ($event) => $options.onTodayButtonClick($event)),
                  class: "p-button-text",
                  onKeydown: $options.onContainerButtonKeydown
                }, null, 8, ["label", "onKeydown"]),
                createVNode(_component_CalendarButton, {
                  type: "button",
                  label: $options.clearLabel,
                  onClick: _cache[64] || (_cache[64] = ($event) => $options.onClearButtonClick($event)),
                  class: "p-button-text",
                  onKeydown: $options.onContainerButtonKeydown
                }, null, 8, ["label", "onKeydown"])
              ])) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "footer")
            ], 16, _hoisted_3$8)) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onAfterEnter", "onAfterLeave", "onLeave"])
      ]),
      _: 3
    }, 8, ["appendTo", "disabled"])
  ], 10, _hoisted_1$g);
}
function styleInject$d(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$d();
script$h.render = render$h;
var script$g = {
  name: "Checkbox",
  emits: ["click", "update:modelValue", "change", "input", "focus", "blur"],
  props: {
    value: null,
    modelValue: null,
    binary: Boolean,
    name: {
      type: String,
      default: null
    },
    trueValue: {
      type: null,
      default: true
    },
    falseValue: {
      type: null,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: null
    },
    inputId: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    inputStyle: {
      type: null,
      default: null
    },
    inputProps: {
      type: null,
      default: null
    },
    "aria-labelledby": {
      type: String,
      default: null
    },
    "aria-label": {
      type: String,
      default: null
    }
  },
  data() {
    return {
      focused: false
    };
  },
  methods: {
    onClick(event) {
      if (!this.disabled) {
        let newModelValue;
        if (this.binary) {
          newModelValue = this.checked ? this.falseValue : this.trueValue;
        } else {
          if (this.checked) newModelValue = this.modelValue.filter((val) => !ObjectUtils.equals(val, this.value));
          else newModelValue = this.modelValue ? [...this.modelValue, this.value] : [this.value];
        }
        this.$emit("click", event);
        this.$emit("update:modelValue", newModelValue);
        this.$emit("change", event);
        this.$emit("input", newModelValue);
        this.$refs.input.focus();
      }
    },
    onFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    onBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
    }
  },
  computed: {
    checked() {
      return this.binary ? this.modelValue === this.trueValue : ObjectUtils.contains(this.value, this.modelValue);
    },
    containerClass() {
      return [
        "p-checkbox p-component",
        {
          "p-checkbox-checked": this.checked,
          "p-checkbox-disabled": this.disabled,
          "p-checkbox-focused": this.focused
        }
      ];
    }
  }
};
const _hoisted_1$f = { class: "p-hidden-accessible" };
const _hoisted_2$a = ["id", "value", "name", "checked", "tabindex", "disabled", "readonly", "required", "aria-labelledby", "aria-label"];
function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.containerClass),
    onClick: _cache[2] || (_cache[2] = ($event) => $options.onClick($event))
  }, [
    createElementVNode("div", _hoisted_1$f, [
      createElementVNode("input", mergeProps({
        ref: "input",
        id: $props.inputId,
        type: "checkbox",
        value: $props.value,
        class: $props.inputClass,
        style: $props.inputStyle,
        name: $props.name,
        checked: $options.checked,
        tabindex: $props.tabindex,
        disabled: $props.disabled,
        readonly: $props.readonly,
        required: $props.required,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        onFocus: _cache[0] || (_cache[0] = ($event) => $options.onFocus($event)),
        onBlur: _cache[1] || (_cache[1] = ($event) => $options.onBlur($event))
      }, $props.inputProps), null, 16, _hoisted_2$a)
    ]),
    createElementVNode("div", {
      ref: "box",
      class: normalizeClass(["p-checkbox-box", { "p-highlight": $options.checked, "p-disabled": $props.disabled, "p-focus": $data.focused }])
    }, [
      createElementVNode("span", {
        class: normalizeClass(["p-checkbox-icon", { "pi pi-check": $options.checked }])
      }, null, 2)
    ], 2)
  ], 2);
}
script$g.render = render$g;
function bind(el, binding) {
  const { onFocusIn, onFocusOut } = binding.value || {};
  el.$_pfocustrap_mutationobserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.type === "childList" && !el.contains((void 0).activeElement)) {
        const findNextFocusableElement = (el2) => {
          const focusableElement = DomHandler.isFocusableElement(el2) ? el2 : DomHandler.getFirstFocusableElement(el2);
          return ObjectUtils.isNotEmpty(focusableElement) ? focusableElement : findNextFocusableElement(el2.nextSibling);
        };
        DomHandler.focus(findNextFocusableElement(mutation.nextSibling));
      }
    });
  });
  el.$_pfocustrap_mutationobserver.disconnect();
  el.$_pfocustrap_mutationobserver.observe(el, {
    childList: true
  });
  el.$_pfocustrap_focusinlistener = (event) => onFocusIn && onFocusIn(event);
  el.$_pfocustrap_focusoutlistener = (event) => onFocusOut && onFocusOut(event);
  el.addEventListener("focusin", el.$_pfocustrap_focusinlistener);
  el.addEventListener("focusout", el.$_pfocustrap_focusoutlistener);
}
function unbind(el) {
  el.$_pfocustrap_mutationobserver && el.$_pfocustrap_mutationobserver.disconnect();
  el.$_pfocustrap_focusinlistener && el.removeEventListener("focusin", el.$_pfocustrap_focusinlistener) && (el.$_pfocustrap_focusinlistener = null);
  el.$_pfocustrap_focusoutlistener && el.removeEventListener("focusout", el.$_pfocustrap_focusoutlistener) && (el.$_pfocustrap_focusoutlistener = null);
}
function autoFocus(el, binding) {
  const { autoFocusSelector = "", firstFocusableSelector = "", autoFocus: autoFocus2 = false } = binding.value || {};
  let focusableElement = DomHandler.getFirstFocusableElement(el, `[autofocus]:not(.p-hidden-focusable)${autoFocusSelector}`);
  autoFocus2 && !focusableElement && (focusableElement = DomHandler.getFirstFocusableElement(el, `:not(.p-hidden-focusable)${firstFocusableSelector}`));
  DomHandler.focus(focusableElement);
}
function onFirstHiddenElementFocus(event) {
  const { currentTarget, relatedTarget } = event;
  const focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement ? DomHandler.getFirstFocusableElement(currentTarget.parentElement, `:not(.p-hidden-focusable)${currentTarget.$_pfocustrap_focusableselector}`) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
  DomHandler.focus(focusableElement);
}
function onLastHiddenElementFocus(event) {
  const { currentTarget, relatedTarget } = event;
  const focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement ? DomHandler.getLastFocusableElement(currentTarget.parentElement, `:not(.p-hidden-focusable)${currentTarget.$_pfocustrap_focusableselector}`) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
  DomHandler.focus(focusableElement);
}
function createHiddenFocusableElements(el, binding) {
  const { tabIndex = 0, firstFocusableSelector = "", lastFocusableSelector = "" } = binding.value || {};
  const createFocusableElement = (onFocus2) => {
    const element = (void 0).createElement("span");
    element.classList = "p-hidden-accessible p-hidden-focusable";
    element.tabIndex = tabIndex;
    element.setAttribute("aria-hidden", "true");
    element.setAttribute("role", "presentation");
    element.addEventListener("focus", onFocus2);
    return element;
  };
  const firstFocusableElement = createFocusableElement(onFirstHiddenElementFocus);
  const lastFocusableElement = createFocusableElement(onLastHiddenElementFocus);
  firstFocusableElement.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement;
  firstFocusableElement.$_pfocustrap_focusableselector = firstFocusableSelector;
  lastFocusableElement.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement;
  lastFocusableElement.$_pfocustrap_focusableselector = lastFocusableSelector;
  el.prepend(firstFocusableElement);
  el.append(lastFocusableElement);
}
const FocusTrap = {
  mounted(el, binding) {
    const { disabled } = binding.value || {};
    if (!disabled) {
      createHiddenFocusableElements(el, binding);
      bind(el, binding);
      autoFocus(el, binding);
    }
  },
  updated(el, binding) {
    const { disabled } = binding.value || {};
    disabled && unbind(el);
  },
  unmounted(el) {
    unbind(el);
  }
};
var script$f = {
  name: "Dialog",
  inheritAttrs: false,
  emits: ["update:visible", "show", "hide", "after-hide", "maximize", "unmaximize", "dragend"],
  props: {
    header: {
      type: null,
      default: null
    },
    footer: {
      type: null,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: null
    },
    contentStyle: {
      type: null,
      default: null
    },
    contentClass: {
      type: String,
      default: null
    },
    contentProps: {
      type: null,
      default: null
    },
    rtl: {
      type: Boolean,
      default: null
    },
    maximizable: {
      type: Boolean,
      default: false
    },
    dismissableMask: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeOnEscape: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    baseZIndex: {
      type: Number,
      default: 0
    },
    autoZIndex: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: "center"
    },
    breakpoints: {
      type: Object,
      default: null
    },
    draggable: {
      type: Boolean,
      default: true
    },
    keepInViewport: {
      type: Boolean,
      default: true
    },
    minX: {
      type: Number,
      default: 0
    },
    minY: {
      type: Number,
      default: 0
    },
    appendTo: {
      type: String,
      default: "body"
    },
    closeIcon: {
      type: String,
      default: "pi pi-times"
    },
    maximizeIcon: {
      type: String,
      default: "pi pi-window-maximize"
    },
    minimizeIcon: {
      type: String,
      default: "pi pi-window-minimize"
    },
    closeButtonProps: {
      type: null,
      default: null
    },
    _instance: null
  },
  provide() {
    return {
      dialogRef: computed(() => this._instance)
    };
  },
  data() {
    return {
      containerVisible: this.visible,
      maximized: false,
      focusable: false
    };
  },
  documentKeydownListener: null,
  container: null,
  mask: null,
  content: null,
  headerContainer: null,
  footerContainer: null,
  maximizableButton: null,
  closeButton: null,
  styleElement: null,
  dragging: null,
  documentDragListener: null,
  documentDragEndListener: null,
  lastPageX: null,
  lastPageY: null,
  updated() {
    if (this.visible) {
      this.containerVisible = this.visible;
    }
  },
  beforeUnmount() {
    this.unbindDocumentState();
    this.unbindGlobalListeners();
    this.destroyStyle();
    if (this.mask && this.autoZIndex) {
      ZIndexUtils.clear(this.mask);
    }
    this.container = null;
    this.mask = null;
  },
  mounted() {
    if (this.breakpoints) {
      this.createStyle();
    }
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    onBeforeEnter(el) {
      el.setAttribute(this.attributeSelector, "");
    },
    onEnter() {
      this.$emit("show");
      this.focus();
      this.enableDocumentSettings();
      this.bindGlobalListeners();
      if (this.autoZIndex) {
        ZIndexUtils.set("modal", this.mask, this.baseZIndex + this.$primevue.config.zIndex.modal);
      }
    },
    onBeforeLeave() {
      if (this.modal) {
        DomHandler.addClass(this.mask, "p-component-overlay-leave");
      }
    },
    onLeave() {
      this.$emit("hide");
      this.focusable = false;
    },
    onAfterLeave() {
      if (this.autoZIndex) {
        ZIndexUtils.clear(this.mask);
      }
      this.containerVisible = false;
      this.unbindDocumentState();
      this.unbindGlobalListeners();
      this.$emit("after-hide");
    },
    onMaskClick(event) {
      if (this.dismissableMask && this.closable && this.modal && this.mask === event.target) {
        this.close();
      }
    },
    focus() {
      const findFocusableElement = (container) => {
        return container.querySelector("[autofocus]");
      };
      let focusTarget = this.$slots.footer && findFocusableElement(this.footerContainer);
      if (!focusTarget) {
        focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);
        if (!focusTarget) {
          focusTarget = this.$slots.default && findFocusableElement(this.content);
          if (!focusTarget) {
            focusTarget = findFocusableElement(this.container);
          }
        }
      }
      if (focusTarget) {
        this.focusable = true;
        focusTarget.focus();
      }
    },
    maximize(event) {
      if (this.maximized) {
        this.maximized = false;
        this.$emit("unmaximize", event);
      } else {
        this.maximized = true;
        this.$emit("maximize", event);
      }
      if (!this.modal) {
        if (this.maximized) DomHandler.addClass((void 0).body, "p-overflow-hidden");
        else DomHandler.removeClass((void 0).body, "p-overflow-hidden");
      }
    },
    enableDocumentSettings() {
      if (this.modal || this.maximizable && this.maximized) {
        DomHandler.addClass((void 0).body, "p-overflow-hidden");
      }
    },
    unbindDocumentState() {
      if (this.modal || this.maximizable && this.maximized) {
        DomHandler.removeClass((void 0).body, "p-overflow-hidden");
      }
    },
    onKeyDown(event) {
      if (event.code === "Escape" && this.closeOnEscape) {
        this.close();
      }
    },
    bindDocumentKeyDownListener() {
      if (!this.documentKeydownListener) {
        this.documentKeydownListener = this.onKeyDown.bind(this);
        (void 0).document.addEventListener("keydown", this.documentKeydownListener);
      }
    },
    unbindDocumentKeyDownListener() {
      if (this.documentKeydownListener) {
        (void 0).document.removeEventListener("keydown", this.documentKeydownListener);
        this.documentKeydownListener = null;
      }
    },
    getPositionClass() {
      const positions = ["left", "right", "top", "topleft", "topright", "bottom", "bottomleft", "bottomright"];
      const pos = positions.find((item) => item === this.position);
      return pos ? `p-dialog-${pos}` : "";
    },
    containerRef(el) {
      this.container = el;
    },
    maskRef(el) {
      this.mask = el;
    },
    contentRef(el) {
      this.content = el;
    },
    headerContainerRef(el) {
      this.headerContainer = el;
    },
    footerContainerRef(el) {
      this.footerContainer = el;
    },
    maximizableRef(el) {
      this.maximizableButton = el;
    },
    closeButtonRef(el) {
      this.closeButton = el;
    },
    createStyle() {
      if (!this.styleElement) {
        this.styleElement = (void 0).createElement("style");
        this.styleElement.type = "text/css";
        (void 0).head.appendChild(this.styleElement);
        let innerHTML = "";
        for (let breakpoint in this.breakpoints) {
          innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            .p-dialog[${this.attributeSelector}] {
                                width: ${this.breakpoints[breakpoint]} !important;
                            }
                        }
                    `;
        }
        this.styleElement.innerHTML = innerHTML;
      }
    },
    destroyStyle() {
      if (this.styleElement) {
        (void 0).head.removeChild(this.styleElement);
        this.styleElement = null;
      }
    },
    initDrag(event) {
      if (DomHandler.hasClass(event.target, "p-dialog-header-icon") || DomHandler.hasClass(event.target.parentElement, "p-dialog-header-icon")) {
        return;
      }
      if (this.draggable) {
        this.dragging = true;
        this.lastPageX = event.pageX;
        this.lastPageY = event.pageY;
        this.container.style.margin = "0";
        DomHandler.addClass((void 0).body, "p-unselectable-text");
      }
    },
    bindGlobalListeners() {
      if (this.draggable) {
        this.bindDocumentDragListener();
        this.bindDocumentDragEndListener();
      }
      if (this.closeOnEscape && this.closable) {
        this.bindDocumentKeyDownListener();
      }
    },
    unbindGlobalListeners() {
      this.unbindDocumentDragListener();
      this.unbindDocumentDragEndListener();
      this.unbindDocumentKeyDownListener();
    },
    bindDocumentDragListener() {
      this.documentDragListener = (event) => {
        if (this.dragging) {
          let width = DomHandler.getOuterWidth(this.container);
          let height = DomHandler.getOuterHeight(this.container);
          let deltaX = event.pageX - this.lastPageX;
          let deltaY = event.pageY - this.lastPageY;
          let offset = this.container.getBoundingClientRect();
          let leftPos = offset.left + deltaX;
          let topPos = offset.top + deltaY;
          let viewport = DomHandler.getViewport();
          this.container.style.position = "fixed";
          if (this.keepInViewport) {
            if (leftPos >= this.minX && leftPos + width < viewport.width) {
              this.lastPageX = event.pageX;
              this.container.style.left = leftPos + "px";
            }
            if (topPos >= this.minY && topPos + height < viewport.height) {
              this.lastPageY = event.pageY;
              this.container.style.top = topPos + "px";
            }
          } else {
            this.lastPageX = event.pageX;
            this.container.style.left = leftPos + "px";
            this.lastPageY = event.pageY;
            this.container.style.top = topPos + "px";
          }
        }
      };
      (void 0).document.addEventListener("mousemove", this.documentDragListener);
    },
    unbindDocumentDragListener() {
      if (this.documentDragListener) {
        (void 0).document.removeEventListener("mousemove", this.documentDragListener);
        this.documentDragListener = null;
      }
    },
    bindDocumentDragEndListener() {
      this.documentDragEndListener = (event) => {
        if (this.dragging) {
          this.dragging = false;
          DomHandler.removeClass((void 0).body, "p-unselectable-text");
          this.$emit("dragend", event);
        }
      };
      (void 0).document.addEventListener("mouseup", this.documentDragEndListener);
    },
    unbindDocumentDragEndListener() {
      if (this.documentDragEndListener) {
        (void 0).document.removeEventListener("mouseup", this.documentDragEndListener);
        this.documentDragEndListener = null;
      }
    }
  },
  computed: {
    maskClass() {
      return ["p-dialog-mask", { "p-component-overlay p-component-overlay-enter": this.modal }, this.getPositionClass()];
    },
    dialogClass() {
      return [
        "p-dialog p-component",
        {
          "p-dialog-rtl": this.rtl,
          "p-dialog-maximized": this.maximizable && this.maximized,
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false
        }
      ];
    },
    maximizeIconClass() {
      return [
        "p-dialog-header-maximize-icon",
        {
          [this.maximizeIcon]: !this.maximized,
          [this.minimizeIcon]: this.maximized
        }
      ];
    },
    ariaId() {
      return UniqueComponentId();
    },
    ariaLabelledById() {
      return this.header != null || this.$attrs["aria-labelledby"] !== null ? this.ariaId + "_header" : null;
    },
    closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    },
    attributeSelector() {
      return UniqueComponentId();
    },
    contentStyleClass() {
      return ["p-dialog-content", this.contentClass];
    }
  },
  directives: {
    ripple: Ripple,
    focustrap: FocusTrap
  },
  components: {
    Portal: script$k
  }
};
const _hoisted_1$e = ["aria-labelledby", "aria-modal"];
const _hoisted_2$9 = ["id"];
const _hoisted_3$7 = { class: "p-dialog-header-icons" };
const _hoisted_4$5 = ["autofocus", "tabindex"];
const _hoisted_5$4 = ["autofocus", "aria-label"];
function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Portal = resolveComponent("Portal");
  const _directive_ripple = resolveDirective("ripple");
  const _directive_focustrap = resolveDirective("focustrap");
  return openBlock(), createBlock(_component_Portal, { appendTo: $props.appendTo }, {
    default: withCtx(() => [
      $data.containerVisible ? (openBlock(), createElementBlock("div", {
        key: 0,
        ref: $options.maskRef,
        class: normalizeClass($options.maskClass),
        onClick: _cache[3] || (_cache[3] = (...args) => $options.onMaskClick && $options.onMaskClick(...args))
      }, [
        createVNode(Transition, {
          name: "p-dialog",
          onBeforeEnter: $options.onBeforeEnter,
          onEnter: $options.onEnter,
          onBeforeLeave: $options.onBeforeLeave,
          onLeave: $options.onLeave,
          onAfterLeave: $options.onAfterLeave,
          appear: ""
        }, {
          default: withCtx(() => [
            $props.visible ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref: $options.containerRef,
              class: $options.dialogClass,
              role: "dialog",
              "aria-labelledby": $options.ariaLabelledById,
              "aria-modal": $props.modal
            }, _ctx.$attrs), [
              $props.showHeader ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref: $options.headerContainerRef,
                class: "p-dialog-header",
                onMousedown: _cache[2] || (_cache[2] = (...args) => $options.initDrag && $options.initDrag(...args))
              }, [
                renderSlot(_ctx.$slots, "header", {}, () => [
                  $props.header ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    id: $options.ariaLabelledById,
                    class: "p-dialog-title"
                  }, toDisplayString($props.header), 9, _hoisted_2$9)) : createCommentVNode("", true)
                ]),
                createElementVNode("div", _hoisted_3$7, [
                  $props.maximizable ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 0,
                    ref: $options.maximizableRef,
                    autofocus: $data.focusable,
                    class: "p-dialog-header-icon p-dialog-header-maximize p-link",
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.maximize && $options.maximize(...args)),
                    type: "button",
                    tabindex: $props.maximizable ? "0" : "-1"
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass($options.maximizeIconClass)
                    }, null, 2)
                  ], 8, _hoisted_4$5)), [
                    [_directive_ripple]
                  ]) : createCommentVNode("", true),
                  $props.closable ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
                    key: 1,
                    ref: $options.closeButtonRef,
                    autofocus: $data.focusable,
                    class: "p-dialog-header-icon p-dialog-header-close p-link",
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.close && $options.close(...args)),
                    "aria-label": $options.closeAriaLabel,
                    type: "button"
                  }, $props.closeButtonProps), [
                    createElementVNode("span", {
                      class: normalizeClass(["p-dialog-header-close-icon", $props.closeIcon])
                    }, null, 2)
                  ], 16, _hoisted_5$4)), [
                    [_directive_ripple]
                  ]) : createCommentVNode("", true)
                ])
              ], 544)) : createCommentVNode("", true),
              createElementVNode("div", mergeProps({
                ref: $options.contentRef,
                class: $options.contentStyleClass,
                style: $props.contentStyle
              }, $props.contentProps), [
                renderSlot(_ctx.$slots, "default")
              ], 16),
              $props.footer || _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
                key: 1,
                ref: $options.footerContainerRef,
                class: "p-dialog-footer"
              }, [
                renderSlot(_ctx.$slots, "footer", {}, () => [
                  createTextVNode(toDisplayString($props.footer), 1)
                ])
              ], 512)) : createCommentVNode("", true)
            ], 16, _hoisted_1$e)), [
              [_directive_focustrap, { disabled: !$props.modal }]
            ]) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onBeforeEnter", "onEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
      ], 2)) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["appendTo"]);
}
function styleInject$c(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$c();
script$f.render = render$f;
var script$e = {
  name: "Divider",
  props: {
    align: {
      type: String,
      default: null
    },
    layout: {
      type: String,
      default: "horizontal"
    },
    type: {
      type: String,
      default: "solid"
    }
  },
  computed: {
    containerClass() {
      return [
        "p-divider p-component",
        "p-divider-" + this.layout,
        "p-divider-" + this.type,
        { "p-divider-left": this.layout === "horizontal" && (!this.align || this.align === "left") },
        { "p-divider-center": this.layout === "horizontal" && this.align === "center" },
        { "p-divider-right": this.layout === "horizontal" && this.align === "right" },
        { "p-divider-top": this.layout === "vertical" && this.align === "top" },
        { "p-divider-center": this.layout === "vertical" && (!this.align || this.align === "center") },
        { "p-divider-bottom": this.layout === "vertical" && this.align === "bottom" }
      ];
    }
  }
};
const _hoisted_1$d = ["aria-orientation"];
const _hoisted_2$8 = {
  key: 0,
  class: "p-divider-content"
};
function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.containerClass),
    role: "separator",
    "aria-orientation": $props.layout
  }, [
    _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_2$8, [
      renderSlot(_ctx.$slots, "default")
    ])) : createCommentVNode("", true)
  ], 10, _hoisted_1$d);
}
function styleInject$b(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$b();
script$e.render = render$e;
var script$d = {
  name: "Dropdown",
  emits: ["update:modelValue", "change", "focus", "blur", "before-show", "before-hide", "show", "hide", "filter"],
  props: {
    modelValue: null,
    options: Array,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    scrollHeight: {
      type: String,
      default: "200px"
    },
    filter: Boolean,
    filterPlaceholder: String,
    filterLocale: String,
    filterMatchMode: {
      type: String,
      default: "contains"
    },
    filterFields: {
      type: Array,
      default: null
    },
    editable: Boolean,
    placeholder: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dataKey: null,
    showClear: {
      type: Boolean,
      default: false
    },
    inputId: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    inputStyle: {
      type: null,
      default: null
    },
    inputProps: {
      type: null,
      default: null
    },
    panelClass: {
      type: String,
      default: null
    },
    panelStyle: {
      type: null,
      default: null
    },
    panelProps: {
      type: null,
      default: null
    },
    filterInputProps: {
      type: null,
      default: null
    },
    clearIconProps: {
      type: null,
      default: null
    },
    appendTo: {
      type: String,
      default: "body"
    },
    loading: {
      type: Boolean,
      default: false
    },
    clearIcon: {
      type: String,
      default: "pi pi-times"
    },
    dropdownIcon: {
      type: String,
      default: "pi pi-chevron-down"
    },
    filterIcon: {
      type: String,
      default: "pi pi-search"
    },
    loadingIcon: {
      type: String,
      default: "pi pi-spinner pi-spin"
    },
    resetFilterOnHide: {
      type: Boolean,
      default: false
    },
    virtualScrollerOptions: {
      type: Object,
      default: null
    },
    autoOptionFocus: {
      type: Boolean,
      default: true
    },
    autoFilterFocus: {
      type: Boolean,
      default: false
    },
    selectOnFocus: {
      type: Boolean,
      default: false
    },
    filterMessage: {
      type: String,
      default: null
    },
    selectionMessage: {
      type: String,
      default: null
    },
    emptySelectionMessage: {
      type: String,
      default: null
    },
    emptyFilterMessage: {
      type: String,
      default: null
    },
    emptyMessage: {
      type: String,
      default: null
    },
    tabindex: {
      type: Number,
      default: 0
    },
    "aria-label": {
      type: String,
      default: null
    },
    "aria-labelledby": {
      type: String,
      default: null
    }
  },
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  overlay: null,
  list: null,
  virtualScroller: null,
  searchTimeout: null,
  searchValue: null,
  isModelValueChanged: false,
  focusOnHover: false,
  data() {
    return {
      focused: false,
      focusedOptionIndex: -1,
      filterValue: null,
      overlayVisible: false
    };
  },
  watch: {
    modelValue() {
      this.isModelValueChanged = true;
    },
    options() {
      this.autoUpdateModel();
    }
  },
  mounted() {
    this.autoUpdateModel();
  },
  updated() {
    if (this.overlayVisible && this.isModelValueChanged) {
      this.scrollInView(this.findSelectedOptionIndex());
    }
    this.isModelValueChanged = false;
  },
  beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    getOptionIndex(index, fn) {
      return this.virtualScrollerDisabled ? index : fn && fn(index)["index"];
    },
    getOptionLabel(option) {
      return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    },
    getOptionValue(option) {
      return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    },
    getOptionRenderKey(option, index) {
      return (this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + "_" + index;
    },
    isOptionDisabled(option) {
      return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
    },
    isOptionGroup(option) {
      return this.optionGroupLabel && option.optionGroup && option.group;
    },
    getOptionGroupLabel(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
    },
    getOptionGroupChildren(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
    },
    getAriaPosInset(index) {
      return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
    },
    show(isFocus) {
      this.$emit("before-show");
      this.overlayVisible = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      isFocus && DomHandler.focus(this.$refs.focusInput);
    },
    hide(isFocus) {
      const _hide = () => {
        this.$emit("before-hide");
        this.overlayVisible = false;
        this.focusedOptionIndex = -1;
        this.searchValue = "";
        this.resetFilterOnHide && (this.filterValue = null);
        isFocus && DomHandler.focus(this.$refs.focusInput);
      };
      setTimeout(() => {
        _hide();
      }, 0);
    },
    onFocus(event) {
      this.focused = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      this.overlayVisible && this.scrollInView(this.focusedOptionIndex);
      this.$emit("focus", event);
    },
    onBlur(event) {
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.searchValue = "";
      this.$emit("blur", event);
    },
    onKeyDown(event) {
      const metaKey = event.metaKey || event.ctrlKey;
      switch (event.code) {
        case "ArrowDown":
          this.onArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event, this.editable);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(event, this.editable);
          break;
        case "Home":
          this.onHomeKey(event, this.editable);
          break;
        case "End":
          this.onEndKey(event, this.editable);
          break;
        case "PageDown":
          this.onPageDownKey(event);
          break;
        case "PageUp":
          this.onPageUpKey(event);
          break;
        case "Space":
          this.onSpaceKey(event, this.editable);
          break;
        case "Enter":
        case "NumpadEnter":
          this.onEnterKey(event);
          break;
        case "Escape":
          this.onEscapeKey(event);
          break;
        case "Tab":
          this.onTabKey(event);
          break;
        case "Backspace":
          this.onBackspaceKey(event, this.editable);
          break;
        case "ShiftLeft":
        case "ShiftRight":
          break;
        default:
          if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
            !this.overlayVisible && this.show();
            !this.editable && this.searchOptions(event, event.key);
          }
          break;
      }
    },
    onEditableInput(event) {
      const value = event.target.value;
      this.searchValue = "";
      const matched = this.searchOptions(event, value);
      !matched && (this.focusedOptionIndex = -1);
      this.$emit("update:modelValue", value);
    },
    onContainerClick(event) {
      if (this.disabled || this.loading) {
        return;
      }
      if (DomHandler.hasClass(event.target, "p-dropdown-clear-icon") || event.target.tagName === "INPUT") {
        return;
      } else if (!this.overlay || !this.overlay.contains(event.target)) {
        this.overlayVisible ? this.hide(true) : this.show(true);
      }
    },
    onClearClick(event) {
      this.updateModel(event, null);
    },
    onFirstHiddenFocus(event) {
      const focusableEl = event.relatedTarget === this.$refs.focusInput ? DomHandler.getFirstFocusableElement(this.overlay, ":not(.p-hidden-focusable)") : this.$refs.focusInput;
      DomHandler.focus(focusableEl);
    },
    onLastHiddenFocus(event) {
      const focusableEl = event.relatedTarget === this.$refs.focusInput ? DomHandler.getLastFocusableElement(this.overlay, ":not(.p-hidden-focusable)") : this.$refs.focusInput;
      DomHandler.focus(focusableEl);
    },
    onOptionSelect(event, option, isHide = true) {
      const value = this.getOptionValue(option);
      this.updateModel(event, value);
      isHide && this.hide(true);
    },
    onOptionMouseMove(event, index) {
      if (this.focusOnHover) {
        this.changeFocusedOptionIndex(event, index);
      }
    },
    onFilterChange(event) {
      const value = event.target.value;
      this.filterValue = value;
      this.focusedOptionIndex = -1;
      this.$emit("filter", { originalEvent: event, value });
      !this.virtualScrollerDisabled && this.virtualScroller.scrollToIndex(0);
    },
    onFilterKeyDown(event) {
      switch (event.code) {
        case "ArrowDown":
          this.onArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event, true);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(event, true);
          break;
        case "Home":
          this.onHomeKey(event, true);
          break;
        case "End":
          this.onEndKey(event, true);
          break;
        case "Enter":
          this.onEnterKey(event);
          break;
        case "Escape":
          this.onEscapeKey(event);
          break;
        case "Tab":
          this.onTabKey(event, true);
          break;
      }
    },
    onFilterBlur() {
      this.focusedOptionIndex = -1;
    },
    onFilterUpdated() {
      if (this.overlayVisible) {
        this.alignOverlay();
      }
    },
    onOverlayClick(event) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event,
        target: this.$el
      });
    },
    onOverlayKeyDown(event) {
      switch (event.code) {
        case "Escape":
          this.onEscapeKey(event);
          break;
      }
    },
    onArrowDownKey(event) {
      const optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
      event.preventDefault();
    },
    onArrowUpKey(event, pressedInInputText = false) {
      if (event.altKey && !pressedInInputText) {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.overlayVisible && this.hide();
        event.preventDefault();
      } else {
        const optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();
        this.changeFocusedOptionIndex(event, optionIndex);
        !this.overlayVisible && this.show();
        event.preventDefault();
      }
    },
    onArrowLeftKey(event, pressedInInputText = false) {
      pressedInInputText && (this.focusedOptionIndex = -1);
    },
    onHomeKey(event, pressedInInputText = false) {
      if (pressedInInputText) {
        event.currentTarget.setSelectionRange(0, 0);
        this.focusedOptionIndex = -1;
      } else {
        this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());
        !this.overlayVisible && this.show();
      }
      event.preventDefault();
    },
    onEndKey(event, pressedInInputText = false) {
      if (pressedInInputText) {
        const target = event.currentTarget;
        const len = target.value.length;
        target.setSelectionRange(len, len);
        this.focusedOptionIndex = -1;
      } else {
        this.changeFocusedOptionIndex(event, this.findLastOptionIndex());
        !this.overlayVisible && this.show();
      }
      event.preventDefault();
    },
    onPageUpKey(event) {
      this.scrollInView(0);
      event.preventDefault();
    },
    onPageDownKey(event) {
      this.scrollInView(this.visibleOptions.length - 1);
      event.preventDefault();
    },
    onEnterKey(event) {
      if (!this.overlayVisible) {
        this.onArrowDownKey(event);
      } else {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.hide();
      }
      event.preventDefault();
    },
    onSpaceKey(event, pressedInInputText = false) {
      !pressedInInputText && this.onEnterKey(event);
    },
    onEscapeKey(event) {
      this.overlayVisible && this.hide(true);
      event.preventDefault();
    },
    onTabKey(event, pressedInInputText = false) {
      if (!pressedInInputText) {
        if (this.overlayVisible && this.hasFocusableElements()) {
          DomHandler.focus(this.$refs.firstHiddenFocusableElementOnOverlay);
          event.preventDefault();
        } else {
          if (this.focusedOptionIndex !== -1) {
            this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
          }
          this.overlayVisible && this.hide(this.filter);
        }
      }
    },
    onBackspaceKey(event, pressedInInputText = false) {
      if (pressedInInputText) {
        !this.overlayVisible && this.show();
      }
    },
    onOverlayEnter(el) {
      ZIndexUtils.set("overlay", el, this.$primevue.config.zIndex.overlay);
      this.alignOverlay();
      this.scrollInView();
      this.autoFilterFocus && DomHandler.focus(this.$refs.filterInput);
    },
    onOverlayAfterEnter() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.$emit("show");
    },
    onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit("hide");
      this.overlay = null;
    },
    onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    alignOverlay() {
      if (this.appendTo === "self") {
        DomHandler.relativePosition(this.overlay, this.$el);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + "px";
        DomHandler.absolutePosition(this.overlay, this.$el);
      }
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.overlayVisible && this.overlay && !this.$el.contains(event.target) && !this.overlay.contains(event.target)) {
            this.hide();
          }
        };
        (void 0).addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        (void 0).removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
          if (this.overlayVisible) {
            this.hide();
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hide();
          }
        };
        (void 0).addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        (void 0).removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    hasFocusableElements() {
      return DomHandler.getFocusableElements(this.overlay, ":not(.p-hidden-focusable)").length > 0;
    },
    isOptionMatched(option) {
      return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
    },
    isValidOption(option) {
      return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    },
    isValidSelectedOption(option) {
      return this.isValidOption(option) && this.isSelected(option);
    },
    isSelected(option) {
      return ObjectUtils.equals(this.modelValue, this.getOptionValue(option), this.equalityKey);
    },
    findFirstOptionIndex() {
      return this.visibleOptions.findIndex((option) => this.isValidOption(option));
    },
    findLastOptionIndex() {
      return ObjectUtils.findLastIndex(this.visibleOptions, (option) => this.isValidOption(option));
    },
    findNextOptionIndex(index) {
      const matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    },
    findPrevOptionIndex(index) {
      const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), (option) => this.isValidOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findSelectedOptionIndex() {
      return this.hasSelectedOption ? this.visibleOptions.findIndex((option) => this.isValidSelectedOption(option)) : -1;
    },
    findFirstFocusedOptionIndex() {
      const selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    },
    findLastFocusedOptionIndex() {
      const selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    },
    searchOptions(event, char) {
      this.searchValue = (this.searchValue || "") + char;
      let optionIndex = -1;
      let matched = false;
      if (this.focusedOptionIndex !== -1) {
        optionIndex = this.visibleOptions.slice(this.focusedOptionIndex).findIndex((option) => this.isOptionMatched(option));
        optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex((option) => this.isOptionMatched(option)) : optionIndex + this.focusedOptionIndex;
      } else {
        optionIndex = this.visibleOptions.findIndex((option) => this.isOptionMatched(option));
      }
      if (optionIndex !== -1) {
        matched = true;
      }
      if (optionIndex === -1 && this.focusedOptionIndex === -1) {
        optionIndex = this.findFirstFocusedOptionIndex();
      }
      if (optionIndex !== -1) {
        this.changeFocusedOptionIndex(event, optionIndex);
      }
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchValue = "";
        this.searchTimeout = null;
      }, 500);
      return matched;
    },
    changeFocusedOptionIndex(event, index) {
      if (this.focusedOptionIndex !== index) {
        this.focusedOptionIndex = index;
        this.scrollInView();
        if (this.selectOnFocus) {
          this.onOptionSelect(event, this.visibleOptions[index], false);
        }
      }
    },
    scrollInView(index = -1) {
      const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
      const element = DomHandler.findSingle(this.list, `li[id="${id}"]`);
      if (element) {
        element.scrollIntoView && element.scrollIntoView({ block: "nearest", inline: "start" });
      } else if (!this.virtualScrollerDisabled) {
        setTimeout(() => {
          this.virtualScroller && this.virtualScroller.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex);
        }, 0);
      }
    },
    autoUpdateModel() {
      if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], false);
      }
    },
    updateModel(event, value) {
      this.$emit("update:modelValue", value);
      this.$emit("change", { originalEvent: event, value });
    },
    flatOptions(options) {
      return (options || []).reduce((result, option, index) => {
        result.push({ optionGroup: option, group: true, index });
        const optionGroupChildren = this.getOptionGroupChildren(option);
        optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));
        return result;
      }, []);
    },
    overlayRef(el) {
      this.overlay = el;
    },
    listRef(el, contentRef) {
      this.list = el;
      contentRef && contentRef(el);
    },
    virtualScrollerRef(el) {
      this.virtualScroller = el;
    }
  },
  computed: {
    containerClass() {
      return [
        "p-dropdown p-component p-inputwrapper",
        {
          "p-disabled": this.disabled,
          "p-dropdown-clearable": this.showClear && !this.disabled,
          "p-focus": this.focused,
          "p-inputwrapper-filled": this.modelValue,
          "p-inputwrapper-focus": this.focused || this.overlayVisible,
          "p-overlay-open": this.overlayVisible
        }
      ];
    },
    inputStyleClass() {
      return [
        "p-dropdown-label p-inputtext",
        this.inputClass,
        {
          "p-placeholder": !this.editable && this.label === this.placeholder,
          "p-dropdown-label-empty": !this.editable && !this.$slots["value"] && (this.label === "p-emptylabel" || this.label.length === 0)
        }
      ];
    },
    panelStyleClass() {
      return [
        "p-dropdown-panel p-component",
        this.panelClass,
        {
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false
        }
      ];
    },
    dropdownIconClass() {
      return ["p-dropdown-trigger-icon", this.loading ? this.loadingIcon : this.dropdownIcon];
    },
    visibleOptions() {
      const options = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
      if (this.filterValue) {
        const filteredOptions = FilterService.filter(options, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
        if (this.optionGroupLabel) {
          const optionGroups = this.options || [];
          const filtered = [];
          optionGroups.forEach((group) => {
            const filteredItems = group.items.filter((item) => filteredOptions.includes(item));
            if (filteredItems.length > 0) filtered.push({ ...group, items: [...filteredItems] });
          });
          return this.flatOptions(filtered);
        }
        return filteredOptions;
      }
      return options;
    },
    hasSelectedOption() {
      return ObjectUtils.isNotEmpty(this.modelValue);
    },
    label() {
      const selectedOptionIndex = this.findSelectedOptionIndex();
      return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.placeholder || "p-emptylabel";
    },
    editableInputValue() {
      const selectedOptionIndex = this.findSelectedOptionIndex();
      return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.modelValue || "";
    },
    equalityKey() {
      return this.optionValue ? null : this.dataKey;
    },
    searchFields() {
      return this.filterFields || [this.optionLabel];
    },
    filterResultMessageText() {
      return ObjectUtils.isNotEmpty(this.visibleOptions) ? this.filterMessageText.replaceAll("{0}", this.visibleOptions.length) : this.emptyFilterMessageText;
    },
    filterMessageText() {
      return this.filterMessage || this.$primevue.config.locale.searchMessage || "";
    },
    emptyFilterMessageText() {
      return this.emptyFilterMessage || this.$primevue.config.locale.emptySearchMessage || this.$primevue.config.locale.emptyFilterMessage || "";
    },
    emptyMessageText() {
      return this.emptyMessage || this.$primevue.config.locale.emptyMessage || "";
    },
    selectionMessageText() {
      return this.selectionMessage || this.$primevue.config.locale.selectionMessage || "";
    },
    emptySelectionMessageText() {
      return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || "";
    },
    selectedMessageText() {
      return this.hasSelectedOption ? this.selectionMessageText.replaceAll("{0}", "1") : this.emptySelectionMessageText;
    },
    id() {
      return this.$attrs.id || UniqueComponentId();
    },
    focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? `${this.id}_${this.focusedOptionIndex}` : null;
    },
    ariaSetSize() {
      return this.visibleOptions.filter((option) => !this.isOptionGroup(option)).length;
    },
    virtualScrollerDisabled() {
      return !this.virtualScrollerOptions;
    }
  },
  directives: {
    ripple: Ripple
  },
  components: {
    VirtualScroller: script$j,
    Portal: script$k
  }
};
const _hoisted_1$c = ["id"];
const _hoisted_2$7 = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
const _hoisted_3$6 = ["id", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-disabled"];
const _hoisted_4$4 = { class: "p-dropdown-trigger" };
const _hoisted_5$3 = {
  key: 0,
  class: "p-dropdown-header"
};
const _hoisted_6$1 = { class: "p-dropdown-filter-container" };
const _hoisted_7$1 = ["value", "placeholder", "aria-owns", "aria-activedescendant"];
const _hoisted_8$1 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_9 = ["id"];
const _hoisted_10 = ["id"];
const _hoisted_11 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove"];
const _hoisted_12 = {
  key: 0,
  class: "p-dropdown-empty-message",
  role: "option"
};
const _hoisted_13 = {
  key: 1,
  class: "p-dropdown-empty-message",
  role: "option"
};
const _hoisted_14 = {
  key: 1,
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_15 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VirtualScroller = resolveComponent("VirtualScroller");
  const _component_Portal = resolveComponent("Portal");
  const _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", {
    ref: "container",
    id: $options.id,
    class: normalizeClass($options.containerClass),
    onClick: _cache[16] || (_cache[16] = (...args) => $options.onContainerClick && $options.onContainerClick(...args))
  }, [
    $props.editable ? (openBlock(), createElementBlock("input", mergeProps({
      key: 0,
      ref: "focusInput",
      id: $props.inputId,
      type: "text",
      style: $props.inputStyle,
      class: $options.inputStyleClass,
      value: $options.editableInputValue,
      placeholder: $props.placeholder,
      tabindex: !$props.disabled ? $props.tabindex : -1,
      disabled: $props.disabled,
      autocomplete: "off",
      role: "combobox",
      "aria-label": _ctx.ariaLabel,
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-haspopup": "listbox",
      "aria-expanded": $data.overlayVisible,
      "aria-controls": $options.id + "_list",
      "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
      onFocus: _cache[0] || (_cache[0] = (...args) => $options.onFocus && $options.onFocus(...args)),
      onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
      onKeydown: _cache[2] || (_cache[2] = (...args) => $options.onKeyDown && $options.onKeyDown(...args)),
      onInput: _cache[3] || (_cache[3] = (...args) => $options.onEditableInput && $options.onEditableInput(...args))
    }, $props.inputProps), null, 16, _hoisted_2$7)) : (openBlock(), createElementBlock("span", mergeProps({
      key: 1,
      ref: "focusInput",
      id: $props.inputId,
      style: $props.inputStyle,
      class: $options.inputStyleClass,
      tabindex: !$props.disabled ? $props.tabindex : -1,
      role: "combobox",
      "aria-label": _ctx.ariaLabel || ($options.label === "p-emptylabel" ? void 0 : $options.label),
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-haspopup": "listbox",
      "aria-expanded": $data.overlayVisible,
      "aria-controls": $options.id + "_list",
      "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
      "aria-disabled": $props.disabled,
      onFocus: _cache[4] || (_cache[4] = (...args) => $options.onFocus && $options.onFocus(...args)),
      onBlur: _cache[5] || (_cache[5] = (...args) => $options.onBlur && $options.onBlur(...args)),
      onKeydown: _cache[6] || (_cache[6] = (...args) => $options.onKeyDown && $options.onKeyDown(...args))
    }, $props.inputProps), [
      renderSlot(_ctx.$slots, "value", {
        value: $props.modelValue,
        placeholder: $props.placeholder
      }, () => [
        createTextVNode(toDisplayString($options.label === "p-emptylabel" ? " " : $options.label || "empty"), 1)
      ])
    ], 16, _hoisted_3$6)),
    $props.showClear && $props.modelValue != null ? (openBlock(), createElementBlock("i", mergeProps({
      key: 2,
      class: ["p-dropdown-clear-icon", $props.clearIcon],
      onClick: _cache[7] || (_cache[7] = (...args) => $options.onClearClick && $options.onClearClick(...args))
    }, $props.clearIconProps), null, 16)) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_4$4, [
      renderSlot(_ctx.$slots, "indicator", {}, () => [
        createElementVNode("span", {
          class: normalizeClass($options.dropdownIconClass),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ]),
    createVNode(_component_Portal, { appendTo: $props.appendTo }, {
      default: withCtx(() => [
        createVNode(Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onAfterEnter: $options.onOverlayAfterEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: withCtx(() => [
            $data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref: $options.overlayRef,
              style: $props.panelStyle,
              class: $options.panelStyleClass,
              onClick: _cache[14] || (_cache[14] = (...args) => $options.onOverlayClick && $options.onOverlayClick(...args)),
              onKeydown: _cache[15] || (_cache[15] = (...args) => $options.onOverlayKeyDown && $options.onOverlayKeyDown(...args))
            }, $props.panelProps), [
              createElementVNode("span", {
                ref: "firstHiddenFocusableElementOnOverlay",
                role: "presentation",
                "aria-hidden": "true",
                class: "p-hidden-accessible p-hidden-focusable",
                tabindex: 0,
                onFocus: _cache[8] || (_cache[8] = (...args) => $options.onFirstHiddenFocus && $options.onFirstHiddenFocus(...args))
              }, null, 544),
              renderSlot(_ctx.$slots, "header", {
                value: $props.modelValue,
                options: $options.visibleOptions
              }),
              $props.filter ? (openBlock(), createElementBlock("div", _hoisted_5$3, [
                createElementVNode("div", _hoisted_6$1, [
                  createElementVNode("input", mergeProps({
                    ref: "filterInput",
                    type: "text",
                    value: $data.filterValue,
                    onVnodeUpdated: _cache[9] || (_cache[9] = (...args) => $options.onFilterUpdated && $options.onFilterUpdated(...args)),
                    class: "p-dropdown-filter p-inputtext p-component",
                    placeholder: $props.filterPlaceholder,
                    role: "searchbox",
                    autocomplete: "off",
                    "aria-owns": $options.id + "_list",
                    "aria-activedescendant": $options.focusedOptionId,
                    onKeydown: _cache[10] || (_cache[10] = (...args) => $options.onFilterKeyDown && $options.onFilterKeyDown(...args)),
                    onBlur: _cache[11] || (_cache[11] = (...args) => $options.onFilterBlur && $options.onFilterBlur(...args)),
                    onInput: _cache[12] || (_cache[12] = (...args) => $options.onFilterChange && $options.onFilterChange(...args))
                  }, $props.filterInputProps), null, 16, _hoisted_7$1),
                  createElementVNode("span", {
                    class: normalizeClass(["p-dropdown-filter-icon", $props.filterIcon])
                  }, null, 2)
                ]),
                createElementVNode("span", _hoisted_8$1, toDisplayString($options.filterResultMessageText), 1)
              ])) : createCommentVNode("", true),
              createElementVNode("div", {
                class: "p-dropdown-items-wrapper",
                style: normalizeStyle({ "max-height": $options.virtualScrollerDisabled ? $props.scrollHeight : "" })
              }, [
                createVNode(_component_VirtualScroller, mergeProps({ ref: $options.virtualScrollerRef }, $props.virtualScrollerOptions, {
                  items: $options.visibleOptions,
                  style: { height: $props.scrollHeight },
                  tabindex: -1,
                  disabled: $options.virtualScrollerDisabled
                }), createSlots({
                  content: withCtx(({ styleClass, contentRef, items, getItemOptions, contentStyle, itemSize }) => [
                    createElementVNode("ul", {
                      ref: (el) => $options.listRef(el, contentRef),
                      id: $options.id + "_list",
                      class: normalizeClass(["p-dropdown-items", styleClass]),
                      style: normalizeStyle(contentStyle),
                      role: "listbox"
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(items, (option, i) => {
                        return openBlock(), createElementBlock(Fragment, {
                          key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
                        }, [
                          $options.isOptionGroup(option) ? (openBlock(), createElementBlock("li", {
                            key: 0,
                            id: $options.id + "_" + $options.getOptionIndex(i, getItemOptions),
                            style: normalizeStyle({ height: itemSize ? itemSize + "px" : void 0 }),
                            class: "p-dropdown-item-group",
                            role: "option"
                          }, [
                            renderSlot(_ctx.$slots, "optiongroup", {
                              option: option.optionGroup,
                              index: $options.getOptionIndex(i, getItemOptions)
                            }, () => [
                              createTextVNode(toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)
                            ])
                          ], 12, _hoisted_10)) : withDirectives((openBlock(), createElementBlock("li", {
                            key: 1,
                            id: $options.id + "_" + $options.getOptionIndex(i, getItemOptions),
                            style: normalizeStyle({ height: itemSize ? itemSize + "px" : void 0 }),
                            class: normalizeClass(["p-dropdown-item", { "p-highlight": $options.isSelected(option), "p-focus": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions), "p-disabled": $options.isOptionDisabled(option) }]),
                            role: "option",
                            "aria-label": $options.getOptionLabel(option),
                            "aria-selected": $options.isSelected(option),
                            "aria-disabled": $options.isOptionDisabled(option),
                            "aria-setsize": $options.ariaSetSize,
                            "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                            onClick: ($event) => $options.onOptionSelect($event, option),
                            onMousemove: ($event) => $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions))
                          }, [
                            renderSlot(_ctx.$slots, "option", {
                              option,
                              index: $options.getOptionIndex(i, getItemOptions)
                            }, () => [
                              createTextVNode(toDisplayString($options.getOptionLabel(option)), 1)
                            ])
                          ], 46, _hoisted_11)), [
                            [_directive_ripple]
                          ])
                        ], 64);
                      }), 128)),
                      $data.filterValue && (!items || items && items.length === 0) ? (openBlock(), createElementBlock("li", _hoisted_12, [
                        renderSlot(_ctx.$slots, "emptyfilter", {}, () => [
                          createTextVNode(toDisplayString($options.emptyFilterMessageText), 1)
                        ])
                      ])) : !$props.options || $props.options && $props.options.length === 0 ? (openBlock(), createElementBlock("li", _hoisted_13, [
                        renderSlot(_ctx.$slots, "empty", {}, () => [
                          createTextVNode(toDisplayString($options.emptyMessageText), 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ], 14, _hoisted_9)
                  ]),
                  _: 2
                }, [
                  _ctx.$slots.loader ? {
                    name: "loader",
                    fn: withCtx(({ options }) => [
                      renderSlot(_ctx.$slots, "loader", { options })
                    ]),
                    key: "0"
                  } : void 0
                ]), 1040, ["items", "style", "disabled"])
              ], 4),
              renderSlot(_ctx.$slots, "footer", {
                value: $props.modelValue,
                options: $options.visibleOptions
              }),
              !$props.options || $props.options && $props.options.length === 0 ? (openBlock(), createElementBlock("span", _hoisted_14, toDisplayString($options.emptyMessageText), 1)) : createCommentVNode("", true),
              createElementVNode("span", _hoisted_15, toDisplayString($options.selectedMessageText), 1),
              createElementVNode("span", {
                ref: "lastHiddenFocusableElementOnOverlay",
                role: "presentation",
                "aria-hidden": "true",
                class: "p-hidden-accessible p-hidden-focusable",
                tabindex: 0,
                onFocus: _cache[13] || (_cache[13] = (...args) => $options.onLastHiddenFocus && $options.onLastHiddenFocus(...args))
              }, null, 544)
            ], 16)) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 3
    }, 8, ["appendTo"])
  ], 10, _hoisted_1$c);
}
function styleInject$a(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$a();
script$d.render = render$d;
var script$c = {
  name: "Message",
  emits: ["close"],
  props: {
    severity: {
      type: String,
      default: "info"
    },
    closable: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: true
    },
    life: {
      type: Number,
      default: 3e3
    },
    icon: {
      type: String,
      default: null
    },
    closeIcon: {
      type: String,
      default: "pi pi-times"
    },
    closeButtonProps: {
      type: null,
      default: null
    }
  },
  timeout: null,
  data() {
    return {
      visible: true
    };
  },
  mounted() {
    if (!this.sticky) {
      setTimeout(() => {
        this.visible = false;
      }, this.life);
    }
  },
  methods: {
    close(event) {
      this.visible = false;
      this.$emit("close", event);
    }
  },
  computed: {
    containerClass() {
      return "p-message p-component p-message-" + this.severity;
    },
    iconClass() {
      return [
        "p-message-icon pi",
        this.icon ? this.icon : {
          "pi-info-circle": this.severity === "info",
          "pi-check": this.severity === "success",
          "pi-exclamation-triangle": this.severity === "warn",
          "pi-times-circle": this.severity === "error"
        }
      ];
    },
    closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    }
  },
  directives: {
    ripple: Ripple
  }
};
const _hoisted_1$b = { class: "p-message-wrapper" };
const _hoisted_2$6 = { class: "p-message-text" };
const _hoisted_3$5 = ["aria-label"];
function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = resolveDirective("ripple");
  return openBlock(), createBlock(Transition, {
    name: "p-message",
    appear: ""
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        class: normalizeClass($options.containerClass),
        role: "alert",
        "aria-live": "assertive",
        "aria-atomic": "true"
      }, [
        createElementVNode("div", _hoisted_1$b, [
          createElementVNode("span", {
            class: normalizeClass($options.iconClass)
          }, null, 2),
          createElementVNode("div", _hoisted_2$6, [
            renderSlot(_ctx.$slots, "default")
          ]),
          $props.closable ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
            key: 0,
            class: "p-message-close p-link",
            "aria-label": $options.closeAriaLabel,
            type: "button",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.close($event))
          }, $props.closeButtonProps), [
            createElementVNode("i", {
              class: normalizeClass(["p-message-close-icon", $props.closeIcon])
            }, null, 2)
          ], 16, _hoisted_3$5)), [
            [_directive_ripple]
          ]) : createCommentVNode("", true)
        ])
      ], 2), [
        [vShow, $data.visible]
      ])
    ]),
    _: 3
  });
}
function styleInject$9(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$9();
script$c.render = render$c;
var script$b = {
  name: "ProgressBar",
  props: {
    value: {
      type: Number,
      default: null
    },
    mode: {
      type: String,
      default: "determinate"
    },
    showValue: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    containerClass() {
      return [
        "p-progressbar p-component",
        {
          "p-progressbar-determinate": this.determinate,
          "p-progressbar-indeterminate": this.indeterminate
        }
      ];
    },
    progressStyle() {
      return {
        width: this.value + "%",
        display: "flex"
      };
    },
    indeterminate() {
      return this.mode === "indeterminate";
    },
    determinate() {
      return this.mode === "determinate";
    }
  }
};
const _hoisted_1$a = ["aria-valuenow"];
const _hoisted_2$5 = {
  key: 0,
  class: "p-progressbar-label"
};
const _hoisted_3$4 = {
  key: 1,
  class: "p-progressbar-indeterminate-container"
};
const _hoisted_4$3 = /* @__PURE__ */ createElementVNode("div", { class: "p-progressbar-value p-progressbar-value-animate" }, null, -1);
const _hoisted_5$2 = [
  _hoisted_4$3
];
function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    role: "progressbar",
    class: normalizeClass($options.containerClass),
    "aria-valuemin": "0",
    "aria-valuenow": $props.value,
    "aria-valuemax": "100"
  }, [
    $options.determinate ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "p-progressbar-value p-progressbar-value-animate",
      style: normalizeStyle($options.progressStyle)
    }, [
      $props.value != null && $props.value !== 0 && $props.showValue ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString($props.value + "%"), 1)
        ])
      ])) : createCommentVNode("", true)
    ], 4)) : createCommentVNode("", true),
    $options.indeterminate ? (openBlock(), createElementBlock("div", _hoisted_3$4, _hoisted_5$2)) : createCommentVNode("", true)
  ], 10, _hoisted_1$a);
}
function styleInject$8(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$8();
script$b.render = render$b;
var script$a = {
  name: "Badge",
  props: {
    value: null,
    severity: null,
    size: null
  },
  computed: {
    containerClass() {
      return this.$slots.default ? "p-overlay-badge" : this.badgeClass;
    },
    badgeClass() {
      return [
        "p-badge p-component",
        {
          "p-badge-no-gutter": this.value && String(this.value).length === 1,
          "p-badge-dot": !this.value && !this.$slots.default,
          "p-badge-lg": this.size === "large",
          "p-badge-xl": this.size === "xlarge",
          "p-badge-info": this.severity === "info",
          "p-badge-success": this.severity === "success",
          "p-badge-warning": this.severity === "warning",
          "p-badge-danger": this.severity === "danger"
        }
      ];
    }
  }
};
function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", {
    class: normalizeClass($options.badgeClass)
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createTextVNode(toDisplayString($props.value), 1)
    ])
  ], 2);
}
script$a.render = render$a;
var script$1$1 = {
  emits: ["remove"],
  props: {
    files: {
      type: Array,
      default: () => []
    },
    badgeSeverity: {
      type: String,
      default: "warning"
    },
    badgeValue: {
      type: String,
      default: null
    },
    previewWidth: {
      type: Number,
      default: 50
    }
  },
  methods: {
    formatSize(bytes) {
      if (bytes === 0) {
        return "0 B";
      }
      let k = 1e3, dm = 3, sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }
  },
  components: {
    FileUploadButton: script$l,
    FileUploadBadge: script$a
  }
};
const _hoisted_1$1$1 = ["alt", "src", "width"];
const _hoisted_2$1$1 = { class: "p-fileupload-file-details" };
const _hoisted_3$1$1 = { class: "p-fileupload-file-name" };
const _hoisted_4$1 = { class: "p-fileupload-file-size" };
const _hoisted_5$1 = { class: "p-fileupload-file-actions" };
function render$1$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FileUploadBadge = resolveComponent("FileUploadBadge");
  const _component_FileUploadButton = resolveComponent("FileUploadButton");
  return openBlock(true), createElementBlock(Fragment, null, renderList($props.files, (file, index) => {
    return openBlock(), createElementBlock("div", {
      key: file.name + file.type + file.size,
      class: "p-fileupload-file"
    }, [
      createElementVNode("img", {
        role: "presentation",
        class: "p-fileupload-file-thumbnail",
        alt: file.name,
        src: file.objectURL,
        width: $props.previewWidth
      }, null, 8, _hoisted_1$1$1),
      createElementVNode("div", _hoisted_2$1$1, [
        createElementVNode("div", _hoisted_3$1$1, toDisplayString(file.name), 1),
        createElementVNode("span", _hoisted_4$1, toDisplayString($options.formatSize(file.size)), 1),
        createVNode(_component_FileUploadBadge, {
          value: $props.badgeValue,
          class: "p-fileupload-file-badge",
          severity: $props.badgeSeverity
        }, null, 8, ["value", "severity"])
      ]),
      createElementVNode("div", _hoisted_5$1, [
        createVNode(_component_FileUploadButton, {
          icon: "pi pi-times",
          onClick: ($event) => _ctx.$emit("remove", index),
          class: "p-fileupload-file-remove p-button-text p-button-danger p-button-rounded"
        }, null, 8, ["onClick"])
      ])
    ]);
  }), 128);
}
script$1$1.render = render$1$1;
var script$9 = {
  name: "FileUpload",
  emits: ["select", "uploader", "before-upload", "progress", "upload", "error", "before-send", "clear", "remove", "remove-uploaded-file"],
  props: {
    name: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    mode: {
      type: String,
      default: "advanced"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: false
    },
    maxFileSize: {
      type: Number,
      default: null
    },
    invalidFileSizeMessage: {
      type: String,
      default: "{0}: Invalid file size, file size should be smaller than {1}."
    },
    invalidFileTypeMessage: {
      type: String,
      default: "{0}: Invalid file type, allowed file types: {1}."
    },
    fileLimit: {
      type: Number,
      default: null
    },
    invalidFileLimitMessage: {
      type: String,
      default: "Maximum number of files exceeded, limit is {0} at most."
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    previewWidth: {
      type: Number,
      default: 50
    },
    chooseLabel: {
      type: String,
      default: null
    },
    uploadLabel: {
      type: String,
      default: null
    },
    cancelLabel: {
      type: String,
      default: null
    },
    customUpload: {
      type: Boolean,
      default: false
    },
    showUploadButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    chooseIcon: {
      type: String,
      default: "pi pi-plus"
    },
    uploadIcon: {
      type: String,
      default: "pi pi-upload"
    },
    cancelIcon: {
      type: String,
      default: "pi pi-times"
    },
    style: null,
    class: null
  },
  duplicateIEEvent: false,
  data() {
    return {
      uploadedFileCount: 0,
      files: [],
      messages: [],
      focused: false,
      progress: null,
      uploadedFiles: []
    };
  },
  methods: {
    onFileSelect(event) {
      if (event.type !== "drop" && this.isIE11() && this.duplicateIEEvent) {
        this.duplicateIEEvent = false;
        return;
      }
      this.messages = [];
      this.files = this.files || [];
      let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      for (let file of files) {
        if (!this.isFileSelected(file)) {
          if (this.validate(file)) {
            if (this.isImage(file)) {
              file.objectURL = (void 0).URL.createObjectURL(file);
            }
            this.files.push(file);
          }
        }
      }
      this.$emit("select", { originalEvent: event, files: this.files });
      if (this.fileLimit) {
        this.checkFileLimit();
      }
      if (this.auto && this.hasFiles && !this.isFileLimitExceeded()) {
        this.upload();
      }
      if (event.type !== "drop" && this.isIE11()) {
        this.clearIEInput();
      } else {
        this.clearInputElement();
      }
    },
    choose() {
      this.$refs.fileInput.click();
    },
    upload() {
      if (this.customUpload) {
        if (this.fileLimit) {
          this.uploadedFileCount += this.files.length;
        }
        this.$emit("uploader", { files: this.files });
        this.clear();
      } else {
        let xhr = new (void 0)();
        let formData = new FormData();
        this.$emit("before-upload", {
          xhr,
          formData
        });
        for (let file of this.files) {
          formData.append(this.name, file, file.name);
        }
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            this.progress = Math.round(event.loaded * 100 / event.total);
          }
          this.$emit("progress", {
            originalEvent: event,
            progress: this.progress
          });
        });
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            this.progress = 0;
            if (xhr.status >= 200 && xhr.status < 300) {
              if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
              }
              this.$emit("upload", {
                xhr,
                files: this.files
              });
            } else {
              this.$emit("error", {
                xhr,
                files: this.files
              });
            }
            this.uploadedFiles.push(...this.files);
            this.clear();
          }
        };
        xhr.open("POST", this.url, true);
        this.$emit("before-send", {
          xhr,
          formData
        });
        xhr.withCredentials = this.withCredentials;
        xhr.send(formData);
      }
    },
    clear() {
      this.files = [];
      this.messages = null;
      this.$emit("clear");
      if (this.isAdvanced) {
        this.clearInputElement();
      }
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    isFileSelected(file) {
      if (this.files && this.files.length) {
        for (let sFile of this.files) {
          if (sFile.name + sFile.type + sFile.size === file.name + file.type + file.size) return true;
        }
      }
      return false;
    },
    isIE11() {
      return !!(void 0)["MSInputMethodContext"] && !!(void 0)["documentMode"];
    },
    validate(file) {
      if (this.accept && !this.isFileTypeValid(file)) {
        this.messages.push(this.invalidFileTypeMessage.replace("{0}", file.name).replace("{1}", this.accept));
        return false;
      }
      if (this.maxFileSize && file.size > this.maxFileSize) {
        this.messages.push(this.invalidFileSizeMessage.replace("{0}", file.name).replace("{1}", this.formatSize(this.maxFileSize)));
        return false;
      }
      return true;
    },
    isFileTypeValid(file) {
      let acceptableTypes = this.accept.split(",").map((type) => type.trim());
      for (let type of acceptableTypes) {
        let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type) : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
        if (acceptable) {
          return true;
        }
      }
      return false;
    },
    getTypeClass(fileType) {
      return fileType.substring(0, fileType.indexOf("/"));
    },
    isWildcard(fileType) {
      return fileType.indexOf("*") !== -1;
    },
    getFileExtension(file) {
      return "." + file.name.split(".").pop();
    },
    isImage(file) {
      return /^image\//.test(file.type);
    },
    onDragEnter(event) {
      if (!this.disabled) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    onDragOver(event) {
      if (!this.disabled) {
        DomHandler.addClass(this.$refs.content, "p-fileupload-highlight");
        event.stopPropagation();
        event.preventDefault();
      }
    },
    onDragLeave() {
      if (!this.disabled) {
        DomHandler.removeClass(this.$refs.content, "p-fileupload-highlight");
      }
    },
    onDrop(event) {
      if (!this.disabled) {
        DomHandler.removeClass(this.$refs.content, "p-fileupload-highlight");
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        const allowDrop = this.multiple || files && files.length === 1;
        if (allowDrop) {
          this.onFileSelect(event);
        }
      }
    },
    onBasicUploaderClick() {
      if (this.hasFiles) this.upload();
      else this.$refs.fileInput.click();
    },
    remove(index) {
      this.clearInputElement();
      let removedFile = this.files.splice(index, 1)[0];
      this.files = [...this.files];
      this.$emit("remove", {
        file: removedFile,
        files: this.files
      });
    },
    removeUploadedFile(index) {
      let removedFile = this.uploadedFiles.splice(index, 1)[0];
      this.uploadedFiles = [...this.uploadedFiles];
      this.$emit("remove-uploaded-file", {
        file: removedFile,
        files: this.uploadedFiles
      });
    },
    clearInputElement() {
      this.$refs.fileInput.value = "";
    },
    clearIEInput() {
      if (this.$refs.fileInput) {
        this.duplicateIEEvent = true;
        this.$refs.fileInput.value = "";
      }
    },
    formatSize(bytes) {
      if (bytes === 0) {
        return "0 B";
      }
      let k = 1e3, dm = 3, sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    isFileLimitExceeded() {
      if (this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount && this.focused) {
        this.focused = false;
      }
      return this.fileLimit && this.fileLimit < this.files.length + this.uploadedFileCount;
    },
    checkFileLimit() {
      if (this.isFileLimitExceeded()) {
        this.messages.push(this.invalidFileLimitMessage.replace("{0}", this.fileLimit.toString()));
      }
    },
    onMessageClose() {
      this.messages = null;
    }
  },
  computed: {
    isAdvanced() {
      return this.mode === "advanced";
    },
    isBasic() {
      return this.mode === "basic";
    },
    advancedChooseButtonClass() {
      return [
        "p-button p-component p-fileupload-choose",
        this.class,
        {
          "p-disabled": this.disabled,
          "p-focus": this.focused
        }
      ];
    },
    basicChooseButtonClass() {
      return [
        "p-button p-component p-fileupload-choose",
        this.class,
        {
          "p-fileupload-choose-selected": this.hasFiles,
          "p-disabled": this.disabled,
          "p-focus": this.focused
        }
      ];
    },
    advancedChooseIconClass() {
      return ["p-button-icon p-button-icon-left pi-fw", this.chooseIcon];
    },
    basicChooseButtonIconClass() {
      return ["p-button-icon p-button-icon-left", !this.hasFiles || this.auto ? this.uploadIcon : this.chooseIcon];
    },
    basicChooseButtonLabel() {
      return this.auto ? this.chooseButtonLabel : this.hasFiles ? this.files.map((f) => f.name).join(", ") : this.chooseButtonLabel;
    },
    hasFiles() {
      return this.files && this.files.length > 0;
    },
    hasUploadedFiles() {
      return this.uploadedFiles && this.uploadedFiles.length > 0;
    },
    chooseDisabled() {
      return this.disabled || this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
    },
    uploadDisabled() {
      return this.disabled || !this.hasFiles || this.fileLimit && this.fileLimit < this.files.length;
    },
    cancelDisabled() {
      return this.disabled || !this.hasFiles;
    },
    chooseButtonLabel() {
      return this.chooseLabel || this.$primevue.config.locale.choose;
    },
    uploadButtonLabel() {
      return this.uploadLabel || this.$primevue.config.locale.upload;
    },
    cancelButtonLabel() {
      return this.cancelLabel || this.$primevue.config.locale.cancel;
    },
    completedLabel() {
      return this.$primevue.config.locale.completed;
    },
    pendingLabel() {
      return this.$primevue.config.locale.pending;
    }
  },
  components: {
    FileUploadButton: script$l,
    FileUploadProgressBar: script$b,
    FileUploadMessage: script$c,
    FileContent: script$1$1
  },
  directives: {
    ripple: Ripple
  }
};
const _hoisted_1$9 = {
  key: 0,
  class: "p-fileupload p-fileupload-advanced p-component"
};
const _hoisted_2$4 = ["multiple", "accept", "disabled"];
const _hoisted_3$3 = { class: "p-fileupload-buttonbar" };
const _hoisted_4$2 = { class: "p-button-label" };
const _hoisted_5 = {
  key: 0,
  class: "p-fileupload-empty"
};
const _hoisted_6 = {
  key: 1,
  class: "p-fileupload p-fileupload-basic p-component"
};
const _hoisted_7 = { class: "p-button-label" };
const _hoisted_8 = ["accept", "disabled", "multiple"];
function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FileUploadButton = resolveComponent("FileUploadButton");
  const _component_FileUploadProgressBar = resolveComponent("FileUploadProgressBar");
  const _component_FileUploadMessage = resolveComponent("FileUploadMessage");
  const _component_FileContent = resolveComponent("FileContent");
  const _directive_ripple = resolveDirective("ripple");
  return $options.isAdvanced ? (openBlock(), createElementBlock("div", _hoisted_1$9, [
    createElementVNode("input", {
      ref: "fileInput",
      type: "file",
      onChange: _cache[0] || (_cache[0] = (...args) => $options.onFileSelect && $options.onFileSelect(...args)),
      multiple: $props.multiple,
      accept: $props.accept,
      disabled: $options.chooseDisabled
    }, null, 40, _hoisted_2$4),
    createElementVNode("div", _hoisted_3$3, [
      renderSlot(_ctx.$slots, "header", {
        files: $data.files,
        uploadedFiles: $data.uploadedFiles,
        chooseCallback: $options.choose,
        uploadCallback: $options.upload,
        clearCallback: $options.clear
      }, () => [
        withDirectives((openBlock(), createElementBlock("span", {
          class: normalizeClass($options.advancedChooseButtonClass),
          style: normalizeStyle($props.style),
          onClick: _cache[1] || (_cache[1] = (...args) => $options.choose && $options.choose(...args)),
          onKeydown: _cache[2] || (_cache[2] = withKeys((...args) => $options.choose && $options.choose(...args), ["enter"])),
          onFocus: _cache[3] || (_cache[3] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[4] || (_cache[4] = (...args) => $options.onBlur && $options.onBlur(...args)),
          tabindex: "0"
        }, [
          createElementVNode("span", {
            class: normalizeClass($options.advancedChooseIconClass)
          }, null, 2),
          createElementVNode("span", _hoisted_4$2, toDisplayString($options.chooseButtonLabel), 1)
        ], 38)), [
          [_directive_ripple]
        ]),
        $props.showUploadButton ? (openBlock(), createBlock(_component_FileUploadButton, {
          key: 0,
          label: $options.uploadButtonLabel,
          icon: $props.uploadIcon,
          onClick: $options.upload,
          disabled: $options.uploadDisabled
        }, null, 8, ["label", "icon", "onClick", "disabled"])) : createCommentVNode("", true),
        $props.showCancelButton ? (openBlock(), createBlock(_component_FileUploadButton, {
          key: 1,
          label: $options.cancelButtonLabel,
          icon: $props.cancelIcon,
          onClick: $options.clear,
          disabled: $options.cancelDisabled
        }, null, 8, ["label", "icon", "onClick", "disabled"])) : createCommentVNode("", true)
      ])
    ]),
    createElementVNode("div", {
      ref: "content",
      class: "p-fileupload-content",
      onDragenter: _cache[5] || (_cache[5] = (...args) => $options.onDragEnter && $options.onDragEnter(...args)),
      onDragover: _cache[6] || (_cache[6] = (...args) => $options.onDragOver && $options.onDragOver(...args)),
      onDragleave: _cache[7] || (_cache[7] = (...args) => $options.onDragLeave && $options.onDragLeave(...args)),
      onDrop: _cache[8] || (_cache[8] = (...args) => $options.onDrop && $options.onDrop(...args))
    }, [
      renderSlot(_ctx.$slots, "content", {
        files: $data.files,
        uploadedFiles: $data.uploadedFiles,
        removeUploadedFileCallback: $options.removeUploadedFile,
        removeFileCallback: $options.remove,
        progress: $data.progress,
        messages: $data.messages
      }, () => [
        $options.hasFiles ? (openBlock(), createBlock(_component_FileUploadProgressBar, {
          key: 0,
          value: $data.progress,
          showValue: false
        }, null, 8, ["value"])) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.messages, (msg) => {
          return openBlock(), createBlock(_component_FileUploadMessage, {
            key: msg,
            severity: "error",
            onClose: $options.onMessageClose
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(msg), 1)
            ]),
            _: 2
          }, 1032, ["onClose"]);
        }), 128)),
        $options.hasFiles ? (openBlock(), createBlock(_component_FileContent, {
          key: 1,
          files: $data.files,
          onRemove: $options.remove,
          badgeValue: $options.pendingLabel,
          previewWidth: $props.previewWidth
        }, null, 8, ["files", "onRemove", "badgeValue", "previewWidth"])) : createCommentVNode("", true),
        createVNode(_component_FileContent, {
          files: $data.uploadedFiles,
          onRemove: $options.removeUploadedFile,
          badgeValue: $options.completedLabel,
          badgeSeverity: "success",
          previewWidth: $props.previewWidth
        }, null, 8, ["files", "onRemove", "badgeValue", "previewWidth"])
      ]),
      _ctx.$slots.empty && !$options.hasFiles && !$options.hasUploadedFiles ? (openBlock(), createElementBlock("div", _hoisted_5, [
        renderSlot(_ctx.$slots, "empty")
      ])) : createCommentVNode("", true)
    ], 544)
  ])) : $options.isBasic ? (openBlock(), createElementBlock("div", _hoisted_6, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($data.messages, (msg) => {
      return openBlock(), createBlock(_component_FileUploadMessage, {
        key: msg,
        severity: "error",
        onClose: $options.onMessageClose
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(msg), 1)
        ]),
        _: 2
      }, 1032, ["onClose"]);
    }), 128)),
    withDirectives((openBlock(), createElementBlock("span", {
      class: normalizeClass($options.basicChooseButtonClass),
      style: normalizeStyle($props.style),
      onMouseup: _cache[12] || (_cache[12] = (...args) => $options.onBasicUploaderClick && $options.onBasicUploaderClick(...args)),
      onKeydown: _cache[13] || (_cache[13] = withKeys((...args) => $options.choose && $options.choose(...args), ["enter"])),
      onFocus: _cache[14] || (_cache[14] = (...args) => $options.onFocus && $options.onFocus(...args)),
      onBlur: _cache[15] || (_cache[15] = (...args) => $options.onBlur && $options.onBlur(...args)),
      tabindex: "0"
    }, [
      createElementVNode("span", {
        class: normalizeClass($options.basicChooseButtonIconClass)
      }, null, 2),
      createElementVNode("span", _hoisted_7, toDisplayString($options.basicChooseButtonLabel), 1),
      !$options.hasFiles ? (openBlock(), createElementBlock("input", {
        key: 0,
        ref: "fileInput",
        type: "file",
        accept: $props.accept,
        disabled: $props.disabled,
        multiple: $props.multiple,
        onChange: _cache[9] || (_cache[9] = (...args) => $options.onFileSelect && $options.onFileSelect(...args)),
        onFocus: _cache[10] || (_cache[10] = (...args) => $options.onFocus && $options.onFocus(...args)),
        onBlur: _cache[11] || (_cache[11] = (...args) => $options.onBlur && $options.onBlur(...args))
      }, null, 40, _hoisted_8)) : createCommentVNode("", true)
    ], 38)), [
      [_directive_ripple]
    ])
  ])) : createCommentVNode("", true);
}
function styleInject$7(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$7();
script$9.render = render$9;
var script$8 = {
  name: "InlineMessage",
  props: {
    severity: {
      type: String,
      default: "error"
    }
  },
  timeout: null,
  data() {
    return {
      visible: true
    };
  },
  mounted() {
    if (!this.sticky) {
      setTimeout(() => {
        this.visible = false;
      }, this.life);
    }
  },
  computed: {
    containerClass() {
      return ["p-inline-message p-component p-inline-message-" + this.severity, { "p-inline-message-icon-only": !this.$slots.default }];
    },
    iconClass() {
      return [
        "p-inline-message-icon pi",
        {
          "pi-info-circle": this.severity === "info",
          "pi-check": this.severity === "success",
          "pi-exclamation-triangle": this.severity === "warn",
          "pi-times-circle": this.severity === "error"
        }
      ];
    }
  }
};
const _hoisted_1$8 = { class: "p-inline-message-text" };
function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    "aria-live": "polite",
    class: normalizeClass($options.containerClass)
  }, [
    createElementVNode("span", {
      class: normalizeClass($options.iconClass)
    }, null, 2),
    createElementVNode("span", _hoisted_1$8, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(" ")
      ])
    ])
  ], 2);
}
function styleInject$6(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$6();
script$8.render = render$8;
var script$7 = {
  name: "InputMask",
  emits: ["update:modelValue", "focus", "blur", "keydown", "complete", "keypress", "paste"],
  props: {
    modelValue: null,
    slotChar: {
      type: String,
      default: "_"
    },
    mask: {
      type: String,
      default: null
    },
    autoClear: {
      type: Boolean,
      default: true
    },
    unmask: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.tests = [];
    this.partialPosition = this.mask.length;
    this.len = this.mask.length;
    this.firstNonMaskPos = null;
    this.defs = {
      9: "[0-9]",
      a: "[A-Za-z]",
      "*": "[A-Za-z0-9]"
    };
    let ua = DomHandler.getUserAgent();
    this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
    let maskTokens = this.mask.split("");
    for (let i = 0; i < maskTokens.length; i++) {
      let c = maskTokens[i];
      if (c === "?") {
        this.len--;
        this.partialPosition = i;
      } else if (this.defs[c]) {
        this.tests.push(new RegExp(this.defs[c]));
        if (this.firstNonMaskPos === null) {
          this.firstNonMaskPos = this.tests.length - 1;
        }
        if (i < this.partialPosition) {
          this.lastRequiredNonMaskPos = this.tests.length - 1;
        }
      } else {
        this.tests.push(null);
      }
    }
    this.buffer = [];
    for (let i = 0; i < maskTokens.length; i++) {
      let c = maskTokens[i];
      if (c !== "?") {
        if (this.defs[c]) this.buffer.push(this.getPlaceholder(i));
        else this.buffer.push(c);
      }
    }
    this.defaultBuffer = this.buffer.join("");
    this.updateValue(false);
  },
  updated() {
    if (this.isValueUpdated()) {
      this.updateValue();
    }
  },
  methods: {
    onInput(event) {
      if (this.androidChrome) this.handleAndroidInput(event);
      else this.handleInputChange(event);
      this.$emit("update:modelValue", event.target.value);
    },
    onFocus(event) {
      if (this.readonly) {
        return;
      }
      this.focus = true;
      clearTimeout(this.caretTimeoutId);
      let pos;
      this.focusText = this.$el.value;
      pos = this.checkVal();
      this.caretTimeoutId = setTimeout(() => {
        if (this.$el !== (void 0).activeElement) {
          return;
        }
        this.writeBuffer();
        if (pos === this.mask.replace("?", "").length) {
          this.caret(0, pos);
        } else {
          this.caret(pos);
        }
      }, 10);
      this.$emit("focus", event);
    },
    onBlur(event) {
      this.focus = false;
      this.checkVal();
      this.updateModel(event);
      if (this.$el.value !== this.focusText) {
        let e = (void 0).createEvent("HTMLEvents");
        e.initEvent("change", true, false);
        this.$el.dispatchEvent(e);
      }
      this.$emit("blur", event);
    },
    onKeyDown(event) {
      if (this.readonly) {
        return;
      }
      let k = event.which || event.keyCode, pos, begin, end;
      let iPhone = /iphone/i.test(DomHandler.getUserAgent());
      this.oldVal = this.$el.value;
      if (k === 8 || k === 46 || iPhone && k === 127) {
        pos = this.caret();
        begin = pos.begin;
        end = pos.end;
        if (end - begin === 0) {
          begin = k !== 46 ? this.seekPrev(begin) : end = this.seekNext(begin - 1);
          end = k === 46 ? this.seekNext(end) : end;
        }
        this.clearBuffer(begin, end);
        this.shiftL(begin, end - 1);
        this.updateModel(event);
        event.preventDefault();
      } else if (k === 13) {
        this.$el.blur();
        this.updateModel(event);
      } else if (k === 27) {
        this.$el.value = this.focusText;
        this.caret(0, this.checkVal());
        this.updateModel(event);
        event.preventDefault();
      }
      this.$emit("keydown", event);
    },
    onKeyPress(event) {
      if (this.readonly) {
        return;
      }
      var k = event.which || event.keyCode, pos = this.caret(), p, c, next, completed;
      if (event.ctrlKey || event.altKey || event.metaKey || k < 32) {
        return;
      } else if (k && k !== 13) {
        if (pos.end - pos.begin !== 0) {
          this.clearBuffer(pos.begin, pos.end);
          this.shiftL(pos.begin, pos.end - 1);
        }
        p = this.seekNext(pos.begin - 1);
        if (p < this.len) {
          c = String.fromCharCode(k);
          if (this.tests[p].test(c)) {
            this.shiftR(p);
            this.buffer[p] = c;
            this.writeBuffer();
            next = this.seekNext(p);
            if (/android/i.test(DomHandler.getUserAgent())) {
              let proxy = () => {
                this.caret(next);
              };
              setTimeout(proxy, 0);
            } else {
              this.caret(next);
            }
            if (pos.begin <= this.lastRequiredNonMaskPos) {
              completed = this.isCompleted();
            }
          }
        }
        event.preventDefault();
      }
      this.updateModel(event);
      if (completed) {
        this.$emit("complete", event);
      }
      this.$emit("keypress", event);
    },
    onPaste(event) {
      this.handleInputChange(event);
      this.$emit("paste", event);
    },
    caret(first, last) {
      let range, begin, end;
      if (!this.$el.offsetParent || this.$el !== (void 0).activeElement) {
        return;
      }
      if (typeof first === "number") {
        begin = first;
        end = typeof last === "number" ? last : begin;
        if (this.$el.setSelectionRange) {
          this.$el.setSelectionRange(begin, end);
        } else if (this.$el["createTextRange"]) {
          range = this.$el["createTextRange"]();
          range.collapse(true);
          range.moveEnd("character", end);
          range.moveStart("character", begin);
          range.select();
        }
      } else {
        if (this.$el.setSelectionRange) {
          begin = this.$el.selectionStart;
          end = this.$el.selectionEnd;
        } else if ((void 0)["selection"] && (void 0)["selection"].createRange) {
          range = (void 0)["selection"].createRange();
          begin = 0 - range.duplicate().moveStart("character", -1e5);
          end = begin + range.text.length;
        }
        return { begin, end };
      }
    },
    isCompleted() {
      for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
        if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
          return false;
        }
      }
      return true;
    },
    getPlaceholder(i) {
      if (i < this.slotChar.length) {
        return this.slotChar.charAt(i);
      }
      return this.slotChar.charAt(0);
    },
    seekNext(pos) {
      while (++pos < this.len && !this.tests[pos]) ;
      return pos;
    },
    seekPrev(pos) {
      while (--pos >= 0 && !this.tests[pos]) ;
      return pos;
    },
    shiftL(begin, end) {
      let i, j;
      if (begin < 0) {
        return;
      }
      for (i = begin, j = this.seekNext(end); i < this.len; i++) {
        if (this.tests[i]) {
          if (j < this.len && this.tests[i].test(this.buffer[j])) {
            this.buffer[i] = this.buffer[j];
            this.buffer[j] = this.getPlaceholder(j);
          } else {
            break;
          }
          j = this.seekNext(j);
        }
      }
      this.writeBuffer();
      this.caret(Math.max(this.firstNonMaskPos, begin));
    },
    shiftR(pos) {
      let i, c, j, t;
      for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
        if (this.tests[i]) {
          j = this.seekNext(i);
          t = this.buffer[i];
          this.buffer[i] = c;
          if (j < this.len && this.tests[j].test(t)) {
            c = t;
          } else {
            break;
          }
        }
      }
    },
    handleAndroidInput(event) {
      var curVal = this.$el.value;
      var pos = this.caret();
      if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
        this.checkVal(true);
        while (pos.begin > 0 && !this.tests[pos.begin - 1]) pos.begin--;
        if (pos.begin === 0) {
          while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin]) pos.begin++;
        }
        this.caret(pos.begin, pos.begin);
      } else {
        this.checkVal(true);
        while (pos.begin < this.len && !this.tests[pos.begin]) pos.begin++;
        this.caret(pos.begin, pos.begin);
      }
      if (this.isCompleted()) {
        this.$emit("complete", event);
      }
    },
    clearBuffer(start, end) {
      let i;
      for (i = start; i < end && i < this.len; i++) {
        if (this.tests[i]) {
          this.buffer[i] = this.getPlaceholder(i);
        }
      }
    },
    writeBuffer() {
      this.$el.value = this.buffer.join("");
    },
    checkVal(allow) {
      this.isValueChecked = true;
      let test = this.$el.value, lastMatch = -1, i, c, pos;
      for (i = 0, pos = 0; i < this.len; i++) {
        if (this.tests[i]) {
          this.buffer[i] = this.getPlaceholder(i);
          while (pos++ < test.length) {
            c = test.charAt(pos - 1);
            if (this.tests[i].test(c)) {
              this.buffer[i] = c;
              lastMatch = i;
              break;
            }
          }
          if (pos > test.length) {
            this.clearBuffer(i + 1, this.len);
            break;
          }
        } else {
          if (this.buffer[i] === test.charAt(pos)) {
            pos++;
          }
          if (i < this.partialPosition) {
            lastMatch = i;
          }
        }
      }
      if (allow) {
        this.writeBuffer();
      } else if (lastMatch + 1 < this.partialPosition) {
        if (this.autoClear || this.buffer.join("") === this.defaultBuffer) {
          if (this.$el.value) this.$el.value = "";
          this.clearBuffer(0, this.len);
        } else {
          this.writeBuffer();
        }
      } else {
        this.writeBuffer();
        this.$el.value = this.$el.value.substring(0, lastMatch + 1);
      }
      return this.partialPosition ? i : this.firstNonMaskPos;
    },
    handleInputChange(event) {
      if (this.readonly) {
        return;
      }
      var pos = this.checkVal(true);
      this.caret(pos);
      this.updateModel(event);
      if (this.isCompleted()) {
        this.$emit("complete", event);
      }
    },
    getUnmaskedValue() {
      let unmaskedBuffer = [];
      for (let i = 0; i < this.buffer.length; i++) {
        let c = this.buffer[i];
        if (this.tests[i] && c !== this.getPlaceholder(i)) {
          unmaskedBuffer.push(c);
        }
      }
      return unmaskedBuffer.join("");
    },
    updateModel(e) {
      let val = this.unmask ? this.getUnmaskedValue() : e.target.value;
      this.$emit("update:modelValue", this.defaultBuffer !== val ? val : "");
    },
    updateValue(updateModel = true) {
      if (this.$el) {
        if (this.modelValue == null) {
          this.$el.value = "";
          updateModel && this.$emit("update:modelValue", "");
        } else {
          this.$el.value = this.modelValue;
          this.checkVal();
          setTimeout(() => {
            if (this.$el) {
              this.writeBuffer();
              this.checkVal();
              if (updateModel) {
                let val = this.unmask ? this.getUnmaskedValue() : this.$el.value;
                this.$emit("update:modelValue", this.defaultBuffer !== val ? val : "");
              }
            }
          }, 10);
        }
        this.focusText = this.$el.value;
      }
    },
    isValueUpdated() {
      return this.unmask ? this.modelValue != this.getUnmaskedValue() : this.defaultBuffer !== this.$el.value && this.$el.value !== this.modelValue;
    }
  },
  computed: {
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    inputClass() {
      return [
        "p-inputmask p-inputtext p-component",
        {
          "p-filled": this.filled
        }
      ];
    }
  }
};
const _hoisted_1$7 = ["readonly"];
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", {
    class: normalizeClass($options.inputClass),
    readonly: $props.readonly,
    onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
    onFocus: _cache[1] || (_cache[1] = (...args) => $options.onFocus && $options.onFocus(...args)),
    onBlur: _cache[2] || (_cache[2] = (...args) => $options.onBlur && $options.onBlur(...args)),
    onKeydown: _cache[3] || (_cache[3] = (...args) => $options.onKeyDown && $options.onKeyDown(...args)),
    onKeypress: _cache[4] || (_cache[4] = (...args) => $options.onKeyPress && $options.onKeyPress(...args)),
    onPaste: _cache[5] || (_cache[5] = (...args) => $options.onPaste && $options.onPaste(...args))
  }, null, 42, _hoisted_1$7);
}
script$7.render = render$7;
var script$6 = {
  name: "InputText",
  emits: ["update:modelValue"],
  props: {
    modelValue: null
  },
  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  },
  computed: {
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    }
  }
};
const _hoisted_1$6 = ["value"];
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", {
    class: normalizeClass(["p-inputtext p-component", { "p-filled": $options.filled }]),
    value: $props.modelValue,
    onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args))
  }, null, 42, _hoisted_1$6);
}
script$6.render = render$6;
var script$5 = {
  name: "InputNumber",
  emits: ["update:modelValue", "input", "focus", "blur"],
  props: {
    modelValue: {
      type: Number,
      default: null
    },
    format: {
      type: Boolean,
      default: true
    },
    showButtons: {
      type: Boolean,
      default: false
    },
    buttonLayout: {
      type: String,
      default: "stacked"
    },
    incrementButtonClass: {
      type: String,
      default: null
    },
    decrementButtonClass: {
      type: String,
      default: null
    },
    incrementButtonIcon: {
      type: String,
      default: "pi pi-angle-up"
    },
    decrementButtonIcon: {
      type: String,
      default: "pi pi-angle-down"
    },
    locale: {
      type: String,
      default: void 0
    },
    localeMatcher: {
      type: String,
      default: void 0
    },
    mode: {
      type: String,
      default: "decimal"
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    currency: {
      type: String,
      default: void 0
    },
    currencyDisplay: {
      type: String,
      default: void 0
    },
    useGrouping: {
      type: Boolean,
      default: true
    },
    minFractionDigits: {
      type: Number,
      default: void 0
    },
    maxFractionDigits: {
      type: Number,
      default: void 0
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
      default: 1
    },
    allowEmpty: {
      type: Boolean,
      default: true
    },
    highlightOnFocus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    inputId: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    inputStyle: {
      type: null,
      default: null
    },
    inputProps: {
      type: null,
      default: null
    },
    incrementButtonProps: {
      type: null,
      default: null
    },
    decrementButtonProps: {
      type: null,
      default: null
    },
    "aria-labelledby": {
      type: String,
      default: null
    },
    "aria-label": {
      type: String,
      default: null
    }
  },
  numberFormat: null,
  _numeral: null,
  _decimal: null,
  _group: null,
  _minusSign: null,
  _currency: null,
  _suffix: null,
  _prefix: null,
  _index: null,
  groupChar: "",
  isSpecialChar: null,
  prefixChar: null,
  suffixChar: null,
  timer: null,
  data() {
    return {
      d_modelValue: this.modelValue,
      focused: false
    };
  },
  watch: {
    modelValue(newValue) {
      this.d_modelValue = newValue;
    },
    locale(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    localeMatcher(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    mode(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    currency(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    currencyDisplay(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    useGrouping(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    minFractionDigits(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    maxFractionDigits(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    suffix(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    prefix(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    }
  },
  created() {
    this.constructParser();
  },
  methods: {
    getOptions() {
      return {
        localeMatcher: this.localeMatcher,
        style: this.mode,
        currency: this.currency,
        currencyDisplay: this.currencyDisplay,
        useGrouping: this.useGrouping,
        minimumFractionDigits: this.minFractionDigits,
        maximumFractionDigits: this.maxFractionDigits
      };
    },
    constructParser() {
      this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
      const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
      const index = new Map(numerals.map((d, i) => [d, i]));
      this._numeral = new RegExp(`[${numerals.join("")}]`, "g");
      this._group = this.getGroupingExpression();
      this._minusSign = this.getMinusSignExpression();
      this._currency = this.getCurrencyExpression();
      this._decimal = this.getDecimalExpression();
      this._suffix = this.getSuffixExpression();
      this._prefix = this.getPrefixExpression();
      this._index = (d) => index.get(d);
    },
    updateConstructParser(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.constructParser();
      }
    },
    escapeRegExp(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },
    getDecimalExpression() {
      const formatter = new Intl.NumberFormat(this.locale, { ...this.getOptions(), useGrouping: false });
      return new RegExp(`[${formatter.format(1.1).replace(this._currency, "").trim().replace(this._numeral, "")}]`, "g");
    },
    getGroupingExpression() {
      const formatter = new Intl.NumberFormat(this.locale, { useGrouping: true });
      this.groupChar = formatter.format(1e6).trim().replace(this._numeral, "").charAt(0);
      return new RegExp(`[${this.groupChar}]`, "g");
    },
    getMinusSignExpression() {
      const formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
      return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, "")}]`, "g");
    },
    getCurrencyExpression() {
      if (this.currency) {
        const formatter = new Intl.NumberFormat(this.locale, { style: "currency", currency: this.currency, currencyDisplay: this.currencyDisplay, minimumFractionDigits: 0, maximumFractionDigits: 0 });
        return new RegExp(`[${formatter.format(1).replace(/\s/g, "").replace(this._numeral, "").replace(this._group, "")}]`, "g");
      }
      return new RegExp(`[]`, "g");
    },
    getPrefixExpression() {
      if (this.prefix) {
        this.prefixChar = this.prefix;
      } else {
        const formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay });
        this.prefixChar = formatter.format(1).split("1")[0];
      }
      return new RegExp(`${this.escapeRegExp(this.prefixChar || "")}`, "g");
    },
    getSuffixExpression() {
      if (this.suffix) {
        this.suffixChar = this.suffix;
      } else {
        const formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay, minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.suffixChar = formatter.format(1).split("1")[1];
      }
      return new RegExp(`${this.escapeRegExp(this.suffixChar || "")}`, "g");
    },
    formatValue(value) {
      if (value != null) {
        if (value === "-") {
          return value;
        }
        if (this.format) {
          let formatter = new Intl.NumberFormat(this.locale, this.getOptions());
          let formattedValue = formatter.format(value);
          if (this.prefix) {
            formattedValue = this.prefix + formattedValue;
          }
          if (this.suffix) {
            formattedValue = formattedValue + this.suffix;
          }
          return formattedValue;
        }
        return value.toString();
      }
      return "";
    },
    parseValue(text) {
      let filteredText = text.replace(this._suffix, "").replace(this._prefix, "").trim().replace(/\s/g, "").replace(this._currency, "").replace(this._group, "").replace(this._minusSign, "-").replace(this._decimal, ".").replace(this._numeral, this._index);
      if (filteredText) {
        if (filteredText === "-")
          return filteredText;
        let parsedValue = +filteredText;
        return isNaN(parsedValue) ? null : parsedValue;
      }
      return null;
    },
    repeat(event, interval, dir) {
      if (this.readonly) {
        return;
      }
      let i = interval || 500;
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.repeat(event, 40, dir);
      }, i);
      this.spin(event, dir);
    },
    spin(event, dir) {
      if (this.$refs.input) {
        let step = this.step * dir;
        let currentValue = this.parseValue(this.$refs.input.$el.value) || 0;
        let newValue = this.validateValue(currentValue + step);
        this.updateInput(newValue, null, "spin");
        this.updateModel(event, newValue);
        this.handleOnInput(event, currentValue, newValue);
      }
    },
    onUpButtonMouseDown(event) {
      if (!this.disabled) {
        this.$refs.input.$el.focus();
        this.repeat(event, null, 1);
        event.preventDefault();
      }
    },
    onUpButtonMouseUp() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onUpButtonMouseLeave() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onUpButtonKeyUp() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onUpButtonKeyDown(event) {
      if (event.keyCode === 32 || event.keyCode === 13) {
        this.repeat(event, null, 1);
      }
    },
    onDownButtonMouseDown(event) {
      if (!this.disabled) {
        this.$refs.input.$el.focus();
        this.repeat(event, null, -1);
        event.preventDefault();
      }
    },
    onDownButtonMouseUp() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onDownButtonMouseLeave() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onDownButtonKeyUp() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onDownButtonKeyDown(event) {
      if (event.keyCode === 32 || event.keyCode === 13) {
        this.repeat(event, null, -1);
      }
    },
    onUserInput() {
      if (this.isSpecialChar) {
        this.$refs.input.$el.value = this.lastValue;
      }
      this.isSpecialChar = false;
    },
    onInputKeyDown(event) {
      if (this.readonly) {
        return;
      }
      this.lastValue = event.target.value;
      if (event.shiftKey || event.altKey) {
        this.isSpecialChar = true;
        return;
      }
      let selectionStart = event.target.selectionStart;
      let selectionEnd = event.target.selectionEnd;
      let inputValue = event.target.value;
      let newValueStr = null;
      if (event.altKey) {
        event.preventDefault();
      }
      switch (event.code) {
        case "ArrowUp":
          this.spin(event, 1);
          event.preventDefault();
          break;
        case "ArrowDown":
          this.spin(event, -1);
          event.preventDefault();
          break;
        case "ArrowLeft":
          if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
            event.preventDefault();
          }
          break;
        case "ArrowRight":
          if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
            event.preventDefault();
          }
          break;
        case "Tab":
        case "Enter":
          newValueStr = this.validateValue(this.parseValue(inputValue));
          this.$refs.input.$el.value = this.formatValue(newValueStr);
          this.$refs.input.$el.setAttribute("aria-valuenow", newValueStr);
          this.updateModel(event, newValueStr);
          break;
        case "Backspace": {
          event.preventDefault();
          if (selectionStart === selectionEnd) {
            const deleteChar = inputValue.charAt(selectionStart - 1);
            const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);
            if (this.isNumeralChar(deleteChar)) {
              const decimalLength = this.getDecimalLength(inputValue);
              if (this._group.test(deleteChar)) {
                this._group.lastIndex = 0;
                newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
              } else if (this._decimal.test(deleteChar)) {
                this._decimal.lastIndex = 0;
                if (decimalLength) {
                  this.$refs.input.$el.setSelectionRange(selectionStart - 1, selectionStart - 1);
                } else {
                  newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                }
              } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? "" : "0";
                newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
              } else if (decimalCharIndexWithoutPrefix === 1) {
                newValueStr = inputValue.slice(0, selectionStart - 1) + "0" + inputValue.slice(selectionStart);
                newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : "";
              } else {
                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
              }
            }
            this.updateValue(event, newValueStr, null, "delete-single");
          } else {
            newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
            this.updateValue(event, newValueStr, null, "delete-range");
          }
          break;
        }
        case "Delete":
          event.preventDefault();
          if (selectionStart === selectionEnd) {
            const deleteChar = inputValue.charAt(selectionStart);
            const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);
            if (this.isNumeralChar(deleteChar)) {
              const decimalLength = this.getDecimalLength(inputValue);
              if (this._group.test(deleteChar)) {
                this._group.lastIndex = 0;
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
              } else if (this._decimal.test(deleteChar)) {
                this._decimal.lastIndex = 0;
                if (decimalLength) {
                  this.$refs.input.$el.setSelectionRange(selectionStart + 1, selectionStart + 1);
                } else {
                  newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                }
              } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? "" : "0";
                newValueStr = inputValue.slice(0, selectionStart) + insertedText + inputValue.slice(selectionStart + 1);
              } else if (decimalCharIndexWithoutPrefix === 1) {
                newValueStr = inputValue.slice(0, selectionStart) + "0" + inputValue.slice(selectionStart + 1);
                newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : "";
              } else {
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
              }
            }
            this.updateValue(event, newValueStr, null, "delete-back-single");
          } else {
            newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
            this.updateValue(event, newValueStr, null, "delete-range");
          }
          break;
        case "Home":
          if (this.min) {
            this.updateModel(event, this.min);
            event.preventDefault();
          }
          break;
        case "End":
          if (this.max) {
            this.updateModel(event, this.max);
            event.preventDefault();
          }
          break;
      }
    },
    onInputKeyPress(event) {
      if (this.readonly) {
        return;
      }
      event.preventDefault();
      let code = event.which || event.keyCode;
      let char = String.fromCharCode(code);
      const isDecimalSign = this.isDecimalSign(char);
      const isMinusSign = this.isMinusSign(char);
      if (48 <= code && code <= 57 || isMinusSign || isDecimalSign) {
        this.insert(event, char, { isDecimalSign, isMinusSign });
      }
    },
    onPaste(event) {
      event.preventDefault();
      let data = (event.clipboardData || (void 0)["clipboardData"]).getData("Text");
      if (data) {
        let filteredData = this.parseValue(data);
        if (filteredData != null) {
          this.insert(event, filteredData.toString());
        }
      }
    },
    allowMinusSign() {
      return this.min === null || this.min < 0;
    },
    isMinusSign(char) {
      if (this._minusSign.test(char) || char === "-") {
        this._minusSign.lastIndex = 0;
        return true;
      }
      return false;
    },
    isDecimalSign(char) {
      if (this._decimal.test(char)) {
        this._decimal.lastIndex = 0;
        return true;
      }
      return false;
    },
    isDecimalMode() {
      return this.mode === "decimal";
    },
    getDecimalCharIndexes(val) {
      let decimalCharIndex = val.search(this._decimal);
      this._decimal.lastIndex = 0;
      const filteredVal = val.replace(this._prefix, "").trim().replace(/\s/g, "").replace(this._currency, "");
      const decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
      this._decimal.lastIndex = 0;
      return { decimalCharIndex, decimalCharIndexWithoutPrefix };
    },
    getCharIndexes(val) {
      const decimalCharIndex = val.search(this._decimal);
      this._decimal.lastIndex = 0;
      const minusCharIndex = val.search(this._minusSign);
      this._minusSign.lastIndex = 0;
      const suffixCharIndex = val.search(this._suffix);
      this._suffix.lastIndex = 0;
      const currencyCharIndex = val.search(this._currency);
      this._currency.lastIndex = 0;
      return { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex };
    },
    insert(event, text, sign = { isDecimalSign: false, isMinusSign: false }) {
      const minusCharIndexOnText = text.search(this._minusSign);
      this._minusSign.lastIndex = 0;
      if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
        return;
      }
      const selectionStart = this.$refs.input.$el.selectionStart;
      const selectionEnd = this.$refs.input.$el.selectionEnd;
      let inputValue = this.$refs.input.$el.value.trim();
      const { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex } = this.getCharIndexes(inputValue);
      let newValueStr;
      if (sign.isMinusSign) {
        if (selectionStart === 0) {
          newValueStr = inputValue;
          if (minusCharIndex === -1 || selectionEnd !== 0) {
            newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
          }
          this.updateValue(event, newValueStr, text, "insert");
        }
      } else if (sign.isDecimalSign) {
        if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
          this.updateValue(event, inputValue, text, "insert");
        } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
          newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
          this.updateValue(event, newValueStr, text, "insert");
        } else if (decimalCharIndex === -1 && this.maxFractionDigits) {
          newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
          this.updateValue(event, newValueStr, text, "insert");
        }
      } else {
        const maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
        const operation = selectionStart !== selectionEnd ? "range-insert" : "insert";
        if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
          if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
            const charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;
            newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
            this.updateValue(event, newValueStr, text, operation);
          }
        } else {
          newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
          this.updateValue(event, newValueStr, text, operation);
        }
      }
    },
    insertText(value, text, start, end) {
      let textSplit = text === "." ? text : text.split(".");
      if (textSplit.length === 2) {
        const decimalCharIndex = value.slice(start, end).search(this._decimal);
        this._decimal.lastIndex = 0;
        return decimalCharIndex > 0 ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : value || this.formatValue(text);
      } else if (end - start === value.length) {
        return this.formatValue(text);
      } else if (start === 0) {
        return text + value.slice(end);
      } else if (end === value.length) {
        return value.slice(0, start) + text;
      } else {
        return value.slice(0, start) + text + value.slice(end);
      }
    },
    deleteRange(value, start, end) {
      let newValueStr;
      if (end - start === value.length) newValueStr = "";
      else if (start === 0) newValueStr = value.slice(end);
      else if (end === value.length) newValueStr = value.slice(0, start);
      else newValueStr = value.slice(0, start) + value.slice(end);
      return newValueStr;
    },
    initCursor() {
      let selectionStart = this.$refs.input.$el.selectionStart;
      let inputValue = this.$refs.input.$el.value;
      let valueLength = inputValue.length;
      let index = null;
      let prefixLength = (this.prefixChar || "").length;
      inputValue = inputValue.replace(this._prefix, "");
      selectionStart = selectionStart - prefixLength;
      let char = inputValue.charAt(selectionStart);
      if (this.isNumeralChar(char)) {
        return selectionStart + prefixLength;
      }
      let i = selectionStart - 1;
      while (i >= 0) {
        char = inputValue.charAt(i);
        if (this.isNumeralChar(char)) {
          index = i + prefixLength;
          break;
        } else {
          i--;
        }
      }
      if (index !== null) {
        this.$refs.input.$el.setSelectionRange(index + 1, index + 1);
      } else {
        i = selectionStart;
        while (i < valueLength) {
          char = inputValue.charAt(i);
          if (this.isNumeralChar(char)) {
            index = i + prefixLength;
            break;
          } else {
            i++;
          }
        }
        if (index !== null) {
          this.$refs.input.$el.setSelectionRange(index, index);
        }
      }
      return index || 0;
    },
    onInputClick() {
      const currentValue = this.$refs.input.$el.value;
      if (!this.readonly && currentValue !== DomHandler.getSelection()) {
        this.initCursor();
      }
    },
    isNumeralChar(char) {
      if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
        this.resetRegex();
        return true;
      }
      return false;
    },
    resetRegex() {
      this._numeral.lastIndex = 0;
      this._decimal.lastIndex = 0;
      this._group.lastIndex = 0;
      this._minusSign.lastIndex = 0;
    },
    updateValue(event, valueStr, insertedValueStr, operation) {
      let currentValue = this.$refs.input.$el.value;
      let newValue = null;
      if (valueStr != null) {
        newValue = this.parseValue(valueStr);
        newValue = !newValue && !this.allowEmpty ? 0 : newValue;
        this.updateInput(newValue, insertedValueStr, operation, valueStr);
        this.handleOnInput(event, currentValue, newValue);
      }
    },
    handleOnInput(event, currentValue, newValue) {
      if (this.isValueChanged(currentValue, newValue)) {
        this.$emit("input", { originalEvent: event, value: newValue, formattedValue: currentValue });
      }
    },
    isValueChanged(currentValue, newValue) {
      if (newValue === null && currentValue !== null) {
        return true;
      }
      if (newValue != null) {
        let parsedCurrentValue = typeof currentValue === "string" ? this.parseValue(currentValue) : currentValue;
        return newValue !== parsedCurrentValue;
      }
      return false;
    },
    validateValue(value) {
      if (value === "-" || value == null) {
        return null;
      }
      if (this.min != null && value < this.min) {
        return this.min;
      }
      if (this.max != null && value > this.max) {
        return this.max;
      }
      return value;
    },
    updateInput(value, insertedValueStr, operation, valueStr) {
      insertedValueStr = insertedValueStr || "";
      let inputValue = this.$refs.input.$el.value;
      let newValue = this.formatValue(value);
      let currentLength = inputValue.length;
      if (newValue !== valueStr) {
        newValue = this.concatValues(newValue, valueStr);
      }
      if (currentLength === 0) {
        this.$refs.input.$el.value = newValue;
        this.$refs.input.$el.setSelectionRange(0, 0);
        const index = this.initCursor();
        const selectionEnd = index + insertedValueStr.length;
        this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
      } else {
        let selectionStart = this.$refs.input.$el.selectionStart;
        let selectionEnd = this.$refs.input.$el.selectionEnd;
        this.$refs.input.$el.value = newValue;
        let newLength = newValue.length;
        if (operation === "range-insert") {
          const startValue = this.parseValue((inputValue || "").slice(0, selectionStart));
          const startValueStr = startValue !== null ? startValue.toString() : "";
          const startExpr = startValueStr.split("").join(`(${this.groupChar})?`);
          const sRegex = new RegExp(startExpr, "g");
          sRegex.test(newValue);
          const tExpr = insertedValueStr.split("").join(`(${this.groupChar})?`);
          const tRegex = new RegExp(tExpr, "g");
          tRegex.test(newValue.slice(sRegex.lastIndex));
          selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
          this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
        } else if (newLength === currentLength) {
          if (operation === "insert" || operation === "delete-back-single") this.$refs.input.$el.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
          else if (operation === "delete-single") this.$refs.input.$el.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
          else if (operation === "delete-range" || operation === "spin") this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
        } else if (operation === "delete-back-single") {
          let prevChar = inputValue.charAt(selectionEnd - 1);
          let nextChar = inputValue.charAt(selectionEnd);
          let diff = currentLength - newLength;
          let isGroupChar = this._group.test(nextChar);
          if (isGroupChar && diff === 1) {
            selectionEnd += 1;
          } else if (!isGroupChar && this.isNumeralChar(prevChar)) {
            selectionEnd += -1 * diff + 1;
          }
          this._group.lastIndex = 0;
          this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
        } else if (inputValue === "-" && operation === "insert") {
          this.$refs.input.$el.setSelectionRange(0, 0);
          const index = this.initCursor();
          const selectionEnd2 = index + insertedValueStr.length + 1;
          this.$refs.input.$el.setSelectionRange(selectionEnd2, selectionEnd2);
        } else {
          selectionEnd = selectionEnd + (newLength - currentLength);
          this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
        }
      }
      this.$refs.input.$el.setAttribute("aria-valuenow", value);
    },
    concatValues(val1, val2) {
      if (val1 && val2) {
        let decimalCharIndex = val2.search(this._decimal);
        this._decimal.lastIndex = 0;
        if (this.suffixChar) {
          return val1.replace(this.suffixChar, "").split(this._decimal)[0] + val2.replace(this.suffixChar, "").slice(decimalCharIndex) + this.suffixChar;
        } else {
          return decimalCharIndex !== -1 ? val1.split(this._decimal)[0] + val2.slice(decimalCharIndex) : val1;
        }
      }
      return val1;
    },
    getDecimalLength(value) {
      if (value) {
        const valueSplit = value.split(this._decimal);
        if (valueSplit.length === 2) {
          return valueSplit[1].replace(this._suffix, "").trim().replace(/\s/g, "").replace(this._currency, "").length;
        }
      }
      return 0;
    },
    updateModel(event, value) {
      this.d_modelValue = value;
      this.$emit("update:modelValue", value);
    },
    onInputFocus(event) {
      this.focused = true;
      if (!this.disabled && !this.readonly && this.$refs.input.$el.value !== DomHandler.getSelection() && this.highlightOnFocus) {
        event.target.select();
      }
      this.$emit("focus", event);
    },
    onInputBlur(event) {
      this.focused = false;
      let input = event.target;
      let newValue = this.validateValue(this.parseValue(input.value));
      this.$emit("blur", { originalEvent: event, value: input.value });
      input.value = this.formatValue(newValue);
      input.setAttribute("aria-valuenow", newValue);
      this.updateModel(event, newValue);
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    maxBoundry() {
      return this.d_modelValue >= this.max;
    },
    minBoundry() {
      return this.d_modelValue <= this.min;
    }
  },
  computed: {
    containerClass() {
      return [
        "p-inputnumber p-component p-inputwrapper",
        {
          "p-inputwrapper-filled": this.filled,
          "p-inputwrapper-focus": this.focused,
          "p-inputnumber-buttons-stacked": this.showButtons && this.buttonLayout === "stacked",
          "p-inputnumber-buttons-horizontal": this.showButtons && this.buttonLayout === "horizontal",
          "p-inputnumber-buttons-vertical": this.showButtons && this.buttonLayout === "vertical"
        }
      ];
    },
    upButtonClass() {
      return [
        "p-inputnumber-button p-inputnumber-button-up",
        this.incrementButtonClass,
        {
          "p-disabled": this.showButtons && this.max !== null && this.maxBoundry()
        }
      ];
    },
    downButtonClass() {
      return [
        "p-inputnumber-button p-inputnumber-button-down",
        this.decrementButtonClass,
        {
          "p-disabled": this.showButtons && this.min !== null && this.minBoundry()
        }
      ];
    },
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    upButtonListeners() {
      return {
        mousedown: (event) => this.onUpButtonMouseDown(event),
        mouseup: (event) => this.onUpButtonMouseUp(event),
        mouseleave: (event) => this.onUpButtonMouseLeave(event),
        keydown: (event) => this.onUpButtonKeyDown(event),
        keyup: (event) => this.onUpButtonKeyUp(event)
      };
    },
    downButtonListeners() {
      return {
        mousedown: (event) => this.onDownButtonMouseDown(event),
        mouseup: (event) => this.onDownButtonMouseUp(event),
        mouseleave: (event) => this.onDownButtonMouseLeave(event),
        keydown: (event) => this.onDownButtonKeyDown(event),
        keyup: (event) => this.onDownButtonKeyUp(event)
      };
    },
    formattedValue() {
      const val = !this.modelValue && !this.allowEmpty ? 0 : this.modelValue;
      return this.formatValue(val);
    },
    getFormatter() {
      return this.numberFormat;
    }
  },
  components: {
    INInputText: script$6,
    INButton: script$l
  }
};
const _hoisted_1$5 = {
  key: 0,
  class: "p-inputnumber-button-group"
};
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_INInputText = resolveComponent("INInputText");
  const _component_INButton = resolveComponent("INButton");
  return openBlock(), createElementBlock("span", {
    class: normalizeClass($options.containerClass)
  }, [
    createVNode(_component_INInputText, mergeProps({
      ref: "input",
      id: $props.inputId,
      class: ["p-inputnumber-input", $props.inputClass],
      role: "spinbutton",
      style: $props.inputStyle,
      value: $options.formattedValue,
      "aria-valuemin": $props.min,
      "aria-valuemax": $props.max,
      "aria-valuenow": $props.modelValue,
      disabled: $props.disabled,
      readonly: $props.readonly,
      placeholder: $props.placeholder,
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-label": _ctx.ariaLabel,
      onInput: $options.onUserInput,
      onKeydown: $options.onInputKeyDown,
      onKeypress: $options.onInputKeyPress,
      onPaste: $options.onPaste,
      onClick: $options.onInputClick,
      onFocus: $options.onInputFocus,
      onBlur: $options.onInputBlur
    }, $props.inputProps), null, 16, ["id", "class", "style", "value", "aria-valuemin", "aria-valuemax", "aria-valuenow", "disabled", "readonly", "placeholder", "aria-labelledby", "aria-label", "onInput", "onKeydown", "onKeypress", "onPaste", "onClick", "onFocus", "onBlur"]),
    $props.showButtons && $props.buttonLayout === "stacked" ? (openBlock(), createElementBlock("span", _hoisted_1$5, [
      createVNode(_component_INButton, mergeProps({
        class: $options.upButtonClass,
        icon: $props.incrementButtonIcon
      }, toHandlers($options.upButtonListeners), {
        disabled: $props.disabled,
        tabindex: -1,
        "aria-hidden": "true"
      }, $props.incrementButtonProps), null, 16, ["class", "icon", "disabled"]),
      createVNode(_component_INButton, mergeProps({
        class: $options.downButtonClass,
        icon: $props.decrementButtonIcon
      }, toHandlers($options.downButtonListeners), {
        disabled: $props.disabled,
        tabindex: -1,
        "aria-hidden": "true"
      }, $props.decrementButtonProps), null, 16, ["class", "icon", "disabled"])
    ])) : createCommentVNode("", true),
    $props.showButtons && $props.buttonLayout !== "stacked" ? (openBlock(), createBlock(_component_INButton, mergeProps({
      key: 1,
      class: $options.upButtonClass,
      icon: $props.incrementButtonIcon
    }, toHandlers($options.upButtonListeners), {
      disabled: $props.disabled,
      tabindex: -1,
      "aria-hidden": "true"
    }, $props.incrementButtonProps), null, 16, ["class", "icon", "disabled"])) : createCommentVNode("", true),
    $props.showButtons && $props.buttonLayout !== "stacked" ? (openBlock(), createBlock(_component_INButton, mergeProps({
      key: 2,
      class: $options.downButtonClass,
      icon: $props.decrementButtonIcon
    }, toHandlers($options.downButtonListeners), {
      disabled: $props.disabled,
      tabindex: -1,
      "aria-hidden": "true"
    }, $props.decrementButtonProps), null, 16, ["class", "icon", "disabled"])) : createCommentVNode("", true)
  ], 2);
}
function styleInject$5(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$5();
script$5.render = render$5;
var script$4 = {
  name: "InputSwitch",
  emits: ["click", "update:modelValue", "change", "input", "focus", "blur"],
  props: {
    modelValue: {
      type: null,
      default: false
    },
    trueValue: {
      type: null,
      default: true
    },
    falseValue: {
      type: null,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inputId: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    inputStyle: {
      type: null,
      default: null
    },
    inputProps: {
      type: null,
      default: null
    },
    "aria-labelledby": {
      type: String,
      default: null
    },
    "aria-label": {
      type: String,
      default: null
    }
  },
  data() {
    return {
      focused: false
    };
  },
  methods: {
    onClick(event) {
      if (!this.disabled) {
        const newValue = this.checked ? this.falseValue : this.trueValue;
        this.$emit("click", event);
        this.$emit("update:modelValue", newValue);
        this.$emit("change", event);
        this.$emit("input", newValue);
        this.$refs.input.focus();
      }
      event.preventDefault();
    },
    onFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    onBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
    }
  },
  computed: {
    containerClass() {
      return [
        "p-inputswitch p-component",
        {
          "p-inputswitch-checked": this.checked,
          "p-disabled": this.disabled,
          "p-focus": this.focused
        }
      ];
    },
    checked() {
      return this.modelValue === this.trueValue;
    }
  }
};
const _hoisted_1$4 = { class: "p-hidden-accessible" };
const _hoisted_2$3 = ["id", "checked", "disabled", "aria-checked", "aria-labelledby", "aria-label"];
const _hoisted_3$2 = /* @__PURE__ */ createElementVNode("span", { class: "p-inputswitch-slider" }, null, -1);
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.containerClass),
    onClick: _cache[2] || (_cache[2] = ($event) => $options.onClick($event))
  }, [
    createElementVNode("div", _hoisted_1$4, [
      createElementVNode("input", mergeProps({
        ref: "input",
        id: $props.inputId,
        type: "checkbox",
        role: "switch",
        class: $props.inputClass,
        style: $props.inputStyle,
        checked: $options.checked,
        disabled: $props.disabled,
        "aria-checked": $options.checked,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        onFocus: _cache[0] || (_cache[0] = ($event) => $options.onFocus($event)),
        onBlur: _cache[1] || (_cache[1] = ($event) => $options.onBlur($event))
      }, $props.inputProps), null, 16, _hoisted_2$3)
    ]),
    _hoisted_3$2
  ], 2);
}
function styleInject$4(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$4();
script$4.render = render$4;
var script$3 = {
  name: "Password",
  emits: ["update:modelValue", "change", "focus", "blur", "invalid"],
  props: {
    modelValue: String,
    promptLabel: {
      type: String,
      default: null
    },
    mediumRegex: {
      type: String,
      default: "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
      // eslint-disable-line
    },
    strongRegex: {
      type: String,
      default: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
      // eslint-disable-line
    },
    weakLabel: {
      type: String,
      default: null
    },
    mediumLabel: {
      type: String,
      default: null
    },
    strongLabel: {
      type: String,
      default: null
    },
    feedback: {
      type: Boolean,
      default: true
    },
    appendTo: {
      type: String,
      default: "body"
    },
    toggleMask: {
      type: Boolean,
      default: false
    },
    hideIcon: {
      type: String,
      default: "pi pi-eye-slash"
    },
    showIcon: {
      type: String,
      default: "pi pi-eye"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    inputId: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    inputStyle: {
      type: null,
      default: null
    },
    inputProps: {
      type: null,
      default: null
    },
    panelId: {
      type: String,
      default: null
    },
    panelClass: {
      type: String,
      default: null
    },
    panelStyle: {
      type: null,
      default: null
    },
    panelProps: {
      type: null,
      default: null
    },
    "aria-labelledby": {
      type: String,
      default: null
    },
    "aria-label": {
      type: String,
      default: null
    }
  },
  data() {
    return {
      overlayVisible: false,
      meter: null,
      infoText: null,
      focused: false,
      unmasked: false
    };
  },
  mediumCheckRegExp: null,
  strongCheckRegExp: null,
  resizeListener: null,
  scrollHandler: null,
  overlay: null,
  mounted() {
    this.infoText = this.promptText;
    this.mediumCheckRegExp = new RegExp(this.mediumRegex);
    this.strongCheckRegExp = new RegExp(this.strongRegex);
  },
  beforeUnmount() {
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    onOverlayEnter(el) {
      ZIndexUtils.set("overlay", el, this.$primevue.config.zIndex.overlay);
      this.alignOverlay();
      this.bindScrollListener();
      this.bindResizeListener();
    },
    onOverlayLeave() {
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.overlay = null;
    },
    onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    alignOverlay() {
      if (this.appendTo === "self") {
        DomHandler.relativePosition(this.overlay, this.$refs.input.$el);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$refs.input.$el) + "px";
        DomHandler.absolutePosition(this.overlay, this.$refs.input.$el);
      }
    },
    testStrength(str) {
      let level = 0;
      if (this.strongCheckRegExp.test(str)) level = 3;
      else if (this.mediumCheckRegExp.test(str)) level = 2;
      else if (str.length) level = 1;
      return level;
    },
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    onFocus(event) {
      this.focused = true;
      if (this.feedback) {
        this.setPasswordMeter(this.modelValue);
        this.overlayVisible = true;
      }
      this.$emit("focus", event);
    },
    onBlur(event) {
      this.focused = false;
      if (this.feedback) {
        this.overlayVisible = false;
      }
      this.$emit("blur", event);
    },
    onKeyUp(event) {
      if (this.feedback) {
        const value = event.target.value;
        const { meter, label } = this.checkPasswordStrength(value);
        this.meter = meter;
        this.infoText = label;
        if (event.code === "Escape") {
          this.overlayVisible && (this.overlayVisible = false);
          return;
        }
        if (!this.overlayVisible) {
          this.overlayVisible = true;
        }
      }
    },
    setPasswordMeter() {
      if (!this.modelValue) return;
      const { meter, label } = this.checkPasswordStrength(this.modelValue);
      this.meter = meter;
      this.infoText = label;
      if (!this.overlayVisible) {
        this.overlayVisible = true;
      }
    },
    checkPasswordStrength(value) {
      let label = null;
      let meter = null;
      switch (this.testStrength(value)) {
        case 1:
          label = this.weakText;
          meter = {
            strength: "weak",
            width: "33.33%"
          };
          break;
        case 2:
          label = this.mediumText;
          meter = {
            strength: "medium",
            width: "66.66%"
          };
          break;
        case 3:
          label = this.strongText;
          meter = {
            strength: "strong",
            width: "100%"
          };
          break;
        default:
          label = this.promptText;
          meter = null;
          break;
      }
      return { label, meter };
    },
    onInvalid(event) {
      this.$emit("invalid", event);
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.input.$el, () => {
          if (this.overlayVisible) {
            this.overlayVisible = false;
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.overlayVisible = false;
          }
        };
        (void 0).addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        (void 0).removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    overlayRef(el) {
      this.overlay = el;
    },
    onMaskToggle() {
      this.unmasked = !this.unmasked;
    },
    onOverlayClick(event) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event,
        target: this.$el
      });
    }
  },
  computed: {
    containerClass() {
      return [
        "p-password p-component p-inputwrapper",
        {
          "p-inputwrapper-filled": this.filled,
          "p-inputwrapper-focus": this.focused,
          "p-input-icon-right": this.toggleMask
        }
      ];
    },
    inputFieldClass() {
      return [
        "p-password-input",
        this.inputClass,
        {
          "p-disabled": this.disabled
        }
      ];
    },
    panelStyleClass() {
      return [
        "p-password-panel p-component",
        this.panelClass,
        {
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false
        }
      ];
    },
    toggleIconClass() {
      return this.unmasked ? this.hideIcon : this.showIcon;
    },
    strengthClass() {
      return `p-password-strength ${this.meter ? this.meter.strength : ""}`;
    },
    inputType() {
      return this.unmasked ? "text" : "password";
    },
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    weakText() {
      return this.weakLabel || this.$primevue.config.locale.weak;
    },
    mediumText() {
      return this.mediumLabel || this.$primevue.config.locale.medium;
    },
    strongText() {
      return this.strongLabel || this.$primevue.config.locale.strong;
    },
    promptText() {
      return this.promptLabel || this.$primevue.config.locale.passwordPrompt;
    },
    panelUniqueId() {
      return UniqueComponentId() + "_panel";
    }
  },
  components: {
    PInputText: script$6,
    Portal: script$k
  }
};
const _hoisted_1$3 = {
  class: "p-hidden-accessible",
  "aria-live": "polite"
};
const _hoisted_2$2 = ["id"];
const _hoisted_3$1 = { class: "p-password-meter" };
const _hoisted_4 = { class: "p-password-info" };
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PInputText = resolveComponent("PInputText");
  const _component_Portal = resolveComponent("Portal");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.containerClass)
  }, [
    createVNode(_component_PInputText, mergeProps({
      ref: "input",
      id: $props.inputId,
      type: $options.inputType,
      class: $options.inputFieldClass,
      style: $props.inputStyle,
      value: $props.modelValue,
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-label": _ctx.ariaLabel,
      "aria-controls": $props.panelProps && $props.panelProps.id || $props.panelId || $options.panelUniqueId,
      "aria-expanded": $data.overlayVisible,
      "aria-haspopup": true,
      placeholder: $props.placeholder,
      required: $props.required,
      onInput: $options.onInput,
      onFocus: $options.onFocus,
      onBlur: $options.onBlur,
      onKeyup: $options.onKeyUp,
      onInvalid: $options.onInvalid
    }, $props.inputProps), null, 16, ["id", "type", "class", "style", "value", "aria-labelledby", "aria-label", "aria-controls", "aria-expanded", "placeholder", "required", "onInput", "onFocus", "onBlur", "onKeyup", "onInvalid"]),
    $props.toggleMask ? (openBlock(), createElementBlock("i", {
      key: 0,
      class: normalizeClass($options.toggleIconClass),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onMaskToggle && $options.onMaskToggle(...args))
    }, null, 2)) : createCommentVNode("", true),
    createElementVNode("span", _hoisted_1$3, toDisplayString($data.infoText), 1),
    createVNode(_component_Portal, { appendTo: $props.appendTo }, {
      default: withCtx(() => [
        createVNode(Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: withCtx(() => [
            $data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref: $options.overlayRef,
              id: $props.panelId || $options.panelUniqueId,
              class: $options.panelStyleClass,
              style: $props.panelStyle,
              onClick: _cache[1] || (_cache[1] = (...args) => $options.onOverlayClick && $options.onOverlayClick(...args))
            }, $props.panelProps), [
              renderSlot(_ctx.$slots, "header"),
              renderSlot(_ctx.$slots, "content", {}, () => [
                createElementVNode("div", _hoisted_3$1, [
                  createElementVNode("div", {
                    class: normalizeClass($options.strengthClass),
                    style: normalizeStyle({ width: $data.meter ? $data.meter.width : "" })
                  }, null, 6)
                ]),
                createElementVNode("div", _hoisted_4, toDisplayString($data.infoText), 1)
              ]),
              renderSlot(_ctx.$slots, "footer")
            ], 16, _hoisted_2$2)) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 3
    }, 8, ["appendTo"])
  ], 2);
}
function styleInject$3(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$3();
script$3.render = render$3;
var script$2 = {
  name: "ProgressSpinner",
  props: {
    strokeWidth: {
      type: String,
      default: "2"
    },
    fill: {
      type: String,
      default: "none"
    },
    animationDuration: {
      type: String,
      default: "2s"
    }
  },
  computed: {
    svgStyle() {
      return {
        "animation-duration": this.animationDuration
      };
    }
  }
};
const _hoisted_1$2 = {
  class: "p-progress-spinner",
  role: "progressbar"
};
const _hoisted_2$1 = ["fill", "stroke-width"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    (openBlock(), createElementBlock("svg", {
      class: "p-progress-spinner-svg",
      viewBox: "25 25 50 50",
      style: normalizeStyle($options.svgStyle)
    }, [
      createElementVNode("circle", {
        class: "p-progress-spinner-circle",
        cx: "50",
        cy: "50",
        r: "20",
        fill: $props.fill,
        "stroke-width": $props.strokeWidth,
        strokeMiterlimit: "10"
      }, null, 8, _hoisted_2$1)
    ], 4))
  ]);
}
function styleInject$2(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$2();
script$2.render = render$2;
var script$1 = {
  name: "Sidebar",
  inheritAttrs: false,
  emits: ["update:visible", "show", "hide"],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "left"
    },
    baseZIndex: {
      type: Number,
      default: 0
    },
    autoZIndex: {
      type: Boolean,
      default: true
    },
    dismissable: {
      type: Boolean,
      default: true
    },
    showCloseIcon: {
      type: Boolean,
      default: true
    },
    closeIcon: {
      type: String,
      default: "pi pi-times"
    },
    modal: {
      type: Boolean,
      default: true
    }
  },
  mask: null,
  maskClickListener: null,
  container: null,
  content: null,
  headerContainer: null,
  closeButton: null,
  beforeUnmount() {
    this.destroyModal();
    if (this.container && this.autoZIndex) {
      ZIndexUtils.clear(this.container);
    }
    this.container = null;
  },
  methods: {
    hide() {
      this.$emit("update:visible", false);
    },
    onEnter(el) {
      this.$emit("show");
      if (this.autoZIndex) {
        ZIndexUtils.set("modal", el, this.baseZIndex || this.$primevue.config.zIndex.modal);
      }
      this.focus();
      if (this.modal && !this.fullScreen) {
        this.enableModality();
      }
    },
    onLeave() {
      this.$emit("hide");
      if (this.modal && !this.fullScreen) {
        this.disableModality();
      }
    },
    onAfterLeave(el) {
      if (this.autoZIndex) {
        ZIndexUtils.clear(el);
      }
    },
    focus() {
      const findFocusableElement = (container) => {
        return container.querySelector("[autofocus]");
      };
      let focusTarget = this.$slots.default && findFocusableElement(this.content);
      if (!focusTarget) {
        focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);
        if (!focusTarget) {
          focusTarget = findFocusableElement(this.container);
        }
      }
      focusTarget && focusTarget.focus();
    },
    enableModality() {
      if (!this.mask) {
        this.mask = (void 0).createElement("div");
        this.mask.setAttribute("class", "p-sidebar-mask p-component-overlay p-component-overlay-enter");
        this.mask.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
        if (this.dismissable) {
          this.bindMaskClickListener();
        }
        (void 0).body.appendChild(this.mask);
        DomHandler.addClass((void 0).body, "p-overflow-hidden");
      }
    },
    disableModality() {
      if (this.mask) {
        DomHandler.addClass(this.mask, "p-component-overlay-leave");
        this.mask.addEventListener("animationend", () => {
          this.destroyModal();
        });
      }
    },
    bindMaskClickListener() {
      if (!this.maskClickListener) {
        this.maskClickListener = () => {
          this.hide();
        };
        this.mask.addEventListener("click", this.maskClickListener);
      }
    },
    onKeydown(event) {
      if (event.code === "Escape") {
        this.hide();
      }
    },
    unbindMaskClickListener() {
      if (this.maskClickListener) {
        this.mask.removeEventListener("click", this.maskClickListener);
        this.maskClickListener = null;
      }
    },
    destroyModal() {
      if (this.mask) {
        this.unbindMaskClickListener();
        (void 0).body.removeChild(this.mask);
        DomHandler.removeClass((void 0).body, "p-overflow-hidden");
        this.mask = null;
      }
    },
    containerRef(el) {
      this.container = el;
    },
    contentRef(el) {
      this.content = el;
    },
    headerContainerRef(el) {
      this.headerContainer = el;
    },
    closeButtonRef(el) {
      this.closeButton = el;
    }
  },
  computed: {
    containerClass() {
      return [
        "p-sidebar p-component p-sidebar-" + this.position,
        {
          "p-sidebar-active": this.visible,
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false
        }
      ];
    },
    fullScreen() {
      return this.position === "full";
    },
    closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    }
  },
  directives: {
    focustrap: FocusTrap,
    ripple: Ripple
  },
  components: {
    Portal: script$k
  }
};
const _hoisted_1$1 = ["aria-modal"];
const _hoisted_2 = {
  key: 0,
  class: "p-sidebar-header-content"
};
const _hoisted_3 = ["aria-label"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Portal = resolveComponent("Portal");
  const _directive_ripple = resolveDirective("ripple");
  const _directive_focustrap = resolveDirective("focustrap");
  return openBlock(), createBlock(_component_Portal, null, {
    default: withCtx(() => [
      createVNode(Transition, {
        name: "p-sidebar",
        onEnter: $options.onEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave,
        appear: ""
      }, {
        default: withCtx(() => [
          $props.visible ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.containerRef,
            class: $options.containerClass,
            role: "complementary",
            "aria-modal": $props.modal,
            onKeydown: _cache[1] || (_cache[1] = (...args) => $options.onKeydown && $options.onKeydown(...args))
          }, _ctx.$attrs), [
            createElementVNode("div", {
              ref: $options.headerContainerRef,
              class: "p-sidebar-header"
            }, [
              _ctx.$slots.header ? (openBlock(), createElementBlock("div", _hoisted_2, [
                renderSlot(_ctx.$slots, "header")
              ])) : createCommentVNode("", true),
              $props.showCloseIcon ? withDirectives((openBlock(), createElementBlock("button", {
                key: 1,
                ref: $options.closeButtonRef,
                autofocus: "",
                type: "button",
                class: "p-sidebar-close p-sidebar-icon p-link",
                "aria-label": $options.closeAriaLabel,
                onClick: _cache[0] || (_cache[0] = (...args) => $options.hide && $options.hide(...args))
              }, [
                createElementVNode("span", {
                  class: normalizeClass(["p-sidebar-close-icon", $props.closeIcon])
                }, null, 2)
              ], 8, _hoisted_3)), [
                [_directive_ripple]
              ]) : createCommentVNode("", true)
            ], 512),
            createElementVNode("div", {
              ref: $options.contentRef,
              class: "p-sidebar-content"
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 512)
          ], 16, _hoisted_1$1)), [
            [_directive_focustrap]
          ]) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["onEnter", "onLeave", "onAfterLeave"])
    ]),
    _: 3
  });
}
function styleInject$1(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject$1();
script$1.render = render$1;
function bindEvents(el) {
  const modifiers = el.$_ptooltipModifiers;
  if (modifiers.focus) {
    el.addEventListener("focus", onFocus);
    el.addEventListener("blur", onBlur);
  } else {
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("click", onClick);
  }
  el.addEventListener("keydown", onKeydown);
}
function unbindEvents(el) {
  const modifiers = el.$_ptooltipModifiers;
  if (modifiers.focus) {
    el.removeEventListener("focus", onFocus);
    el.removeEventListener("blur", onBlur);
  } else {
    el.removeEventListener("mouseenter", onMouseEnter);
    el.removeEventListener("mouseleave", onMouseLeave);
    el.removeEventListener("click", onClick);
  }
  el.removeEventListener("keydown", onKeydown);
}
function bindScrollListener(el) {
  if (!el.$_ptooltipScrollHandler) {
    el.$_ptooltipScrollHandler = new ConnectedOverlayScrollHandler(el, function() {
      hide(el);
    });
  }
  el.$_ptooltipScrollHandler.bindScrollListener();
}
function unbindScrollListener(el) {
  if (el.$_ptooltipScrollHandler) {
    el.$_ptooltipScrollHandler.unbindScrollListener();
  }
}
function onMouseEnter(event) {
  show(event.currentTarget);
}
function onMouseLeave(event) {
  hide(event.currentTarget);
}
function onFocus(event) {
  show(event.currentTarget);
}
function onBlur(event) {
  hide(event.currentTarget);
}
function onClick(event) {
  hide(event.currentTarget);
}
function onKeydown(event) {
  event.code === "Escape" && hide(event.currentTarget);
}
function show(el) {
  if (el.$_ptooltipDisabled) {
    return;
  }
  let tooltipElement = create(el);
  align(el);
  DomHandler.fadeIn(tooltipElement, 250);
  (void 0).addEventListener("resize", function onWindowResize() {
    if (!DomHandler.isTouchDevice()) {
      hide(el);
    }
    this.removeEventListener("resize", onWindowResize);
  });
  bindScrollListener(el);
  ZIndexUtils.set("tooltip", tooltipElement, el.$_ptooltipZIndex);
}
function hide(el) {
  remove(el);
  unbindScrollListener(el);
}
function getTooltipElement(el) {
  return (void 0).getElementById(el.$_ptooltipId);
}
function create(el) {
  const id = el.$_ptooltipIdAttr !== "" ? el.$_ptooltipIdAttr : UniqueComponentId() + "_tooltip";
  el.$_ptooltipId = id;
  let container = (void 0).createElement("div");
  container.id = id;
  let tooltipArrow = (void 0).createElement("div");
  tooltipArrow.className = "p-tooltip-arrow";
  container.appendChild(tooltipArrow);
  let tooltipText = (void 0).createElement("div");
  tooltipText.className = "p-tooltip-text";
  if (el.$_ptooltipEscape) {
    tooltipText.innerHTML = el.$_ptooltipValue;
  } else {
    tooltipText.innerHTML = "";
    tooltipText.appendChild((void 0).createTextNode(el.$_ptooltipValue));
  }
  container.setAttribute("role", "tooltip");
  container.appendChild(tooltipText);
  (void 0).body.appendChild(container);
  container.style.display = "inline-block";
  if (el.$_ptooltipFitContent) {
    container.style.width = "fit-content";
  }
  return container;
}
function remove(el) {
  if (el) {
    let tooltipElement = getTooltipElement(el);
    if (tooltipElement && tooltipElement.parentElement) {
      ZIndexUtils.clear(tooltipElement);
      (void 0).body.removeChild(tooltipElement);
    }
    el.$_ptooltipId = null;
  }
}
function align(el) {
  const modifiers = el.$_ptooltipModifiers;
  if (modifiers.top) {
    alignTop(el);
    if (isOutOfBounds(el)) {
      alignBottom(el);
      if (isOutOfBounds(el)) {
        alignTop(el);
      }
    }
  } else if (modifiers.left) {
    alignLeft(el);
    if (isOutOfBounds(el)) {
      alignRight(el);
      if (isOutOfBounds(el)) {
        alignTop(el);
        if (isOutOfBounds(el)) {
          alignBottom(el);
          if (isOutOfBounds(el)) {
            alignLeft(el);
          }
        }
      }
    }
  } else if (modifiers.bottom) {
    alignBottom(el);
    if (isOutOfBounds(el)) {
      alignTop(el);
      if (isOutOfBounds(el)) {
        alignBottom(el);
      }
    }
  } else {
    alignRight(el);
    if (isOutOfBounds(el)) {
      alignLeft(el);
      if (isOutOfBounds(el)) {
        alignTop(el);
        if (isOutOfBounds(el)) {
          alignBottom(el);
          if (isOutOfBounds(el)) {
            alignRight(el);
          }
        }
      }
    }
  }
}
function getHostOffset(el) {
  let offset = el.getBoundingClientRect();
  let targetLeft = offset.left + DomHandler.getWindowScrollLeft();
  let targetTop = offset.top + DomHandler.getWindowScrollTop();
  return { left: targetLeft, top: targetTop };
}
function alignRight(el) {
  preAlign(el, "right");
  let tooltipElement = getTooltipElement(el);
  let hostOffset = getHostOffset(el);
  let left = hostOffset.left + DomHandler.getOuterWidth(el);
  let top = hostOffset.top + (DomHandler.getOuterHeight(el) - DomHandler.getOuterHeight(tooltipElement)) / 2;
  tooltipElement.style.left = left + "px";
  tooltipElement.style.top = top + "px";
}
function alignLeft(el) {
  preAlign(el, "left");
  let tooltipElement = getTooltipElement(el);
  let hostOffset = getHostOffset(el);
  let left = hostOffset.left - DomHandler.getOuterWidth(tooltipElement);
  let top = hostOffset.top + (DomHandler.getOuterHeight(el) - DomHandler.getOuterHeight(tooltipElement)) / 2;
  tooltipElement.style.left = left + "px";
  tooltipElement.style.top = top + "px";
}
function alignTop(el) {
  preAlign(el, "top");
  let tooltipElement = getTooltipElement(el);
  let hostOffset = getHostOffset(el);
  let left = hostOffset.left + (DomHandler.getOuterWidth(el) - DomHandler.getOuterWidth(tooltipElement)) / 2;
  let top = hostOffset.top - DomHandler.getOuterHeight(tooltipElement);
  tooltipElement.style.left = left + "px";
  tooltipElement.style.top = top + "px";
}
function alignBottom(el) {
  preAlign(el, "bottom");
  let tooltipElement = getTooltipElement(el);
  let hostOffset = getHostOffset(el);
  let left = hostOffset.left + (DomHandler.getOuterWidth(el) - DomHandler.getOuterWidth(tooltipElement)) / 2;
  let top = hostOffset.top + DomHandler.getOuterHeight(el);
  tooltipElement.style.left = left + "px";
  tooltipElement.style.top = top + "px";
}
function preAlign(el, position) {
  let tooltipElement = getTooltipElement(el);
  tooltipElement.style.left = "-999px";
  tooltipElement.style.top = "-999px";
  tooltipElement.className = `p-tooltip p-component p-tooltip-${position} ${el.$_ptooltipClass || ""}`;
}
function isOutOfBounds(el) {
  let tooltipElement = getTooltipElement(el);
  let offset = tooltipElement.getBoundingClientRect();
  let targetTop = offset.top;
  let targetLeft = offset.left;
  let width = DomHandler.getOuterWidth(tooltipElement);
  let height = DomHandler.getOuterHeight(tooltipElement);
  let viewport = DomHandler.getViewport();
  return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
}
function getTarget(el) {
  return DomHandler.hasClass(el, "p-inputwrapper") ? DomHandler.findSingle(el, "input") : el;
}
function getModifiers(options) {
  if (options.modifiers && Object.keys(options.modifiers).length) {
    return options.modifiers;
  }
  if (options.arg && typeof options.arg === "object") {
    return Object.entries(options.arg).reduce((acc, [key, val]) => {
      if (key === "event" || key === "position") acc[val] = true;
      return acc;
    }, {});
  }
  return {};
}
const Tooltip = {
  beforeMount(el, options) {
    let target = getTarget(el);
    target.$_ptooltipModifiers = getModifiers(options);
    if (!options.value) return;
    else if (typeof options.value === "string") {
      target.$_ptooltipValue = options.value;
      target.$_ptooltipDisabled = false;
      target.$_ptooltipEscape = false;
      target.$_ptooltipClass = null;
      target.$_ptooltipFitContent = true;
      target.$_ptooltipIdAttr = "";
    } else if (typeof options.value === "object" && options.value) {
      if (ObjectUtils.isEmpty(options.value.value) || options.value.value.trim() === "") return;
      else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
        target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : false;
        target.$_ptooltipClass = options.value.class;
        target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
        target.$_ptooltipIdAttr = options.value.id || "";
      }
    }
    target.$_ptooltipZIndex = options.instance.$primevue && options.instance.$primevue.config && options.instance.$primevue.config.zIndex.tooltip;
    bindEvents(target);
  },
  unmounted(el) {
    let target = getTarget(el);
    remove(target);
    unbindEvents(target);
    if (target.$_ptooltipScrollHandler) {
      target.$_ptooltipScrollHandler.destroy();
      target.$_ptooltipScrollHandler = null;
    }
    ZIndexUtils.clear(el);
  },
  updated(el, options) {
    let target = getTarget(el);
    target.$_ptooltipModifiers = getModifiers(options);
    if (!options.value) {
      unbindEvents(target);
      return;
    }
    if (typeof options.value === "string") {
      target.$_ptooltipValue = options.value;
      target.$_ptooltipDisabled = false;
      target.$_ptooltipEscape = false;
      target.$_ptooltipClass = null;
      target.$_ptooltipIdAttr = "";
      bindEvents(target);
    } else if (typeof options.value === "object" && options.value) {
      if (ObjectUtils.isEmpty(options.value.value || options.value.value.trim() === "")) {
        unbindEvents(target);
        return;
      } else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
        target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : false;
        target.$_ptooltipClass = options.value.class;
        target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
        target.$_ptooltipIdAttr = options.value.id || "";
        bindEvents(target);
      }
    }
  }
};
var script = {
  name: "Textarea",
  emits: ["update:modelValue"],
  props: {
    modelValue: null,
    autoResize: Boolean
  },
  mounted() {
    if (this.$el.offsetParent && this.autoResize) {
      this.resize();
    }
  },
  updated() {
    if (this.$el.offsetParent && this.autoResize) {
      this.resize();
    }
  },
  methods: {
    resize() {
      const style = (void 0).getComputedStyle(this.$el);
      this.$el.style.height = "auto";
      this.$el.style.height = `calc(${style.borderTopWidth} + ${style.borderBottomWidth} + ${this.$el.scrollHeight}px)`;
      if (parseFloat(this.$el.style.height) >= parseFloat(this.$el.style.maxHeight)) {
        this.$el.style.overflowY = "scroll";
        this.$el.style.height = this.$el.style.maxHeight;
      } else {
        this.$el.style.overflow = "hidden";
      }
    },
    onInput(event) {
      if (this.autoResize) {
        this.resize();
      }
      this.$emit("update:modelValue", event.target.value);
    }
  },
  computed: {
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    }
  }
};
const _hoisted_1 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("textarea", {
    class: normalizeClass(["p-inputtextarea p-inputtext p-component", { "p-filled": $options.filled, "p-inputtextarea-resizable ": $props.autoResize }]),
    value: $props.modelValue,
    onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args))
  }, null, 42, _hoisted_1);
}
function styleInject(css, ref2) {
  if (ref2 === void 0) ref2 = {};
  ref2.insertAt;
  {
    return;
  }
}
styleInject();
script.render = render;
const primevue_TdXjRgL1MA = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true
  });
  nuxtApp.vueApp.component("Accordion", script$o);
  nuxtApp.vueApp.component("AccordionTab", script$n);
  nuxtApp.vueApp.component("Avatar", script$m);
  nuxtApp.vueApp.component("AutoComplete", script$i);
  nuxtApp.vueApp.component("Button", script$l);
  nuxtApp.vueApp.component("Calendar", script$h);
  nuxtApp.vueApp.component("Checkbox", script$g);
  nuxtApp.vueApp.component("Dialog", script$f);
  nuxtApp.vueApp.component("Divider", script$e);
  nuxtApp.vueApp.component("Dropdown", script$d);
  nuxtApp.vueApp.component("FileUpload", script$9);
  nuxtApp.vueApp.component("InlineMessage", script$8);
  nuxtApp.vueApp.component("InputSwitch", script$4);
  nuxtApp.vueApp.component("InputText", script$6);
  nuxtApp.vueApp.component("InputMask", script$7);
  nuxtApp.vueApp.component("InputNumber", script$5);
  nuxtApp.vueApp.component("Message", script$c);
  nuxtApp.vueApp.component("Password", script$3);
  nuxtApp.vueApp.component("ProgressBar", script$b);
  nuxtApp.vueApp.component("ProgressSpinner", script$2);
  nuxtApp.vueApp.component("Sidebar", script$1);
  nuxtApp.vueApp.component("Textarea", script);
  nuxtApp.vueApp.component("Tooltip", Tooltip);
  nuxtApp.vueApp.directive("tooltip", Tooltip);
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  auth_redirect_hxxEaFfrIx,
  supabase_server_6VOknHCOlQ,
  primevue_TdXjRgL1MA
];
const layouts = {
  default: () => import('./default-CRL5Vqf3.mjs').then((m) => m.default || m)
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: slots.default ? h(Fragment, void 0, slots.default(routeProps)) : routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-BQFo-Q0t.mjs').then((r) => r.default || r));
    const _Error = defineAsyncComponent(() => import('./error-500-aQMaenQB.mjs').then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { _export_sfc as _, useRuntimeConfig as a, useState as b, useRouter as c, nuxtLinkDefaults as d, entry$1 as default, useNuxtApp as e, resolveUnrefHeadInput as f, useSupabaseToken as g, defineNuxtRouteMiddleware as h, injectHead as i, executeAsync as j, __nuxt_component_1 as k, navigateTo as n, resolveRouteObject as r, useSupabaseUser as u };
//# sourceMappingURL=server.mjs.map
