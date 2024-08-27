import { withAsyncContext, mergeProps, useSSRContext, ref, resolveComponent, unref, isRef, withCtx, createTextVNode, toDisplayString, createVNode } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-CGAgwIMo.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-BXGsZWBZ.mjs';
import { a as useCurrentUser } from './states-B9d6VW4c.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/h3/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/devalue/index.js';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/ufo/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/@unhead/ssr/dist/index.mjs';
import '../runtime.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/destr/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/hookable/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/klona/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/scule/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/defu/dist/defu.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/ohash/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/pathe/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/unhead/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/unctx/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/@supabase/supabase-js/dist/main/index.js';

const _sfc_main$3 = {
  __name: "Hero",
  __ssrInlineRender: true,
  setup(__props) {
    const location = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputText = resolveComponent("InputText");
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hero p-4" }, _attrs))} data-v-db40f39a><h1 class="mb-2" data-v-db40f39a>Find Your Escape</h1><h2 class="mb-6" data-v-db40f39a>Connecting empty spaces with people who need them</h2><div class="p-inputgroup w-fit" data-v-db40f39a><span class="p-float-label inline" data-v-db40f39a>`);
      _push(ssrRenderComponent(_component_InputText, {
        id: "location",
        modelValue: unref(location),
        "onUpdate:modelValue": ($event) => isRef(location) ? location.value = $event : null,
        required: "",
        style: { "width": "300px" }
      }, null, _parent));
      _push(`<label for="location" data-v-db40f39a>Set Your Location</label></span>`);
      _push(ssrRenderComponent(_component_Button, {
        icon: "pi pi-search",
        class: "px-4"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Hero.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-db40f39a"]]);
const formatCurrency = (number) => {
  if (typeof number === "number") {
    if (number === 0)
      return "$0";
    if (number < 0) {
      number = number * -1;
      return "-$" + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "$" + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
const _sfc_main$2 = {
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    image: {
      type: String,
      default: false
    },
    title: {
      type: String,
      default: false
    },
    location: {
      type: String,
      default: false
    },
    price: {
      type: Number,
      default: false
    },
    hourly: {
      type: Boolean,
      default: false
    },
    daily: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-card" }, _attrs))} data-v-fbe38e53><div class="p-card-image mb-2" data-v-fbe38e53><img${ssrRenderAttr("src", __props.image)} alt="card image" data-v-fbe38e53></div><div class="p-card-body" data-v-fbe38e53><p class="font-bold" data-v-fbe38e53>${ssrInterpolate(__props.title)}</p><p class="text-base" data-v-fbe38e53>Location: ${ssrInterpolate(__props.location)}</p><p class="text-base" data-v-fbe38e53><span class="green font-bold" data-v-fbe38e53>${ssrInterpolate(("formatCurrency" in _ctx ? _ctx.formatCurrency : unref(formatCurrency))(__props.price))}</span> ${ssrInterpolate(__props.daily ? "daily" : "")} ${ssrInterpolate(__props.hourly ? "hourly" : "")}</p></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Card.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-fbe38e53"]]);
const _sfc_main$1 = {
  __name: "Collection",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "collection" }, _attrs))}><h2 class="mb-4">${ssrInterpolate(__props.title)}</h2><div class="grid mb-3"><div class="col col-12 md:col-6 lg:col-3">`);
      _push(ssrRenderComponent(_component_Card, {
        image: "https://plus.unsplash.com/premium_photo-1683133267429-7915ba56827a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Relaxing Yoga Studio",
        location: "Portland, OR",
        price: 49,
        hourly: ""
      }, null, _parent));
      _push(`</div><div class="col col-12 md:col-6 lg:col-3">`);
      _push(ssrRenderComponent(_component_Card, {
        image: "https://plus.unsplash.com/premium_photo-1675745329659-29044cb6adbb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Private Plunge Pool",
        location: "Los Angeles, CA",
        price: 149,
        hourly: ""
      }, null, _parent));
      _push(`</div><div class="col col-12 md:col-6 lg:col-3">`);
      _push(ssrRenderComponent(_component_Card, {
        image: "https://images.unsplash.com/photo-1692986134127-f906b1a02599?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Beach House with Pool",
        location: "Oregon Coast, OR",
        price: 499,
        daily: ""
      }, null, _parent));
      _push(`</div><div class="col col-12 md:col-6 lg:col-3">`);
      _push(ssrRenderComponent(_component_Card, {
        image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Modern Home Office With Views",
        location: "Seattle, WA",
        price: 29,
        hourly: ""
      }, null, _parent));
      _push(`</div></div><p class="text-base">`);
      _push(ssrRenderComponent(_component_nuxt_link, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View more ${ssrInterpolate(__props.title)} <i class="pi pi-angle-right"${_scopeId}></i>`);
          } else {
            return [
              createTextVNode(" View more " + toDisplayString(__props.title) + " ", 1),
              createVNode("i", { class: "pi pi-angle-right" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Collection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    let __temp, __restore;
    const currentUser = useCurrentUser();
    const client = useSupabaseClient();
    const user = ([__temp, __restore] = withAsyncContext(() => client.auth.getUser()), __temp = await __temp, __restore(), __temp);
    const session = ([__temp, __restore] = withAsyncContext(() => client.auth.getSession()), __temp = await __temp, __restore(), __temp);
    if ((_a = user == null ? void 0 : user.data) == null ? void 0 : _a.user) {
      currentUser.value = (_b = user == null ? void 0 : user.data) == null ? void 0 : _b.user;
    } else if ((_d = (_c = session == null ? void 0 : session.data) == null ? void 0 : _c.session) == null ? void 0 : _d.user) {
      currentUser.value = (_f = (_e = session == null ? void 0 : session.data) == null ? void 0 : _e.session) == null ? void 0 : _f.user;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Hero = __nuxt_component_0$1;
      const _component_Collection = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "index" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Hero, { class: "mb-6" }, null, _parent));
      _push(`<div class="container-gray"><p>filtering icons go here</p></div><div class="p-4">`);
      _push(ssrRenderComponent(_component_Collection, {
        title: "Popular Places",
        class: "mb-6"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Collection, {
        title: "Quiet Places",
        class: "mb-6"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Collection, {
        title: "Places To Work",
        class: "mb-6"
      }, null, _parent));
      _push(`</div><div class="container-gray"><p>CTA for hosting a space goes here</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C9Wl6omj.mjs.map
