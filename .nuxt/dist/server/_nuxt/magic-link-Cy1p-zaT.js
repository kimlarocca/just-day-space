import { _ as __nuxt_component_0 } from "./nuxt-link-CGAgwIMo.js";
import { u as useSupabaseClient } from "./useSupabaseClient-BXGsZWBZ.js";
import { withAsyncContext, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { a as useCurrentUser } from "./states-B9d6VW4c.js";
import "ufo";
import "hookable";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "devalue";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
import "@supabase/supabase-js";
const _sfc_main = {
  __name: "magic-link",
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
      const _component_nuxt_link = __nuxt_component_0;
      const _component_cuetip_logo = resolveComponent("cuetip-logo");
      const _component_divider = resolveComponent("divider");
      const _component_Message = resolveComponent("Message");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "magic-link" }, _attrs))}><header class="flex align-items-end justify-content-between">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/",
        class: "plain"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_cuetip_logo, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_cuetip_logo)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header>`);
      _push(ssrRenderComponent(_component_divider, { class: "mb-6" }, null, _parent));
      _push(`<h1 class="mb-3">Magic Link</h1><h2 class="mb-2">Logging into your account...</h2>`);
      _push(ssrRenderComponent(_component_divider, { class: "my-6 w-2" }, null, _parent));
      if (_ctx.errorMessage) {
        _push(ssrRenderComponent(_component_Message, {
          class: "mb-4",
          severity: "error"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sorry, there was a problem logging in to your account. `);
            } else {
              return [
                createTextVNode(" Sorry, there was a problem logging in to your account. ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="mb-4">Please wait a few moments.</p><p><a href="/">Click here if you are not automatically logged in.</a> Your magic link may have expired! </p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/magic-link.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=magic-link-Cy1p-zaT.js.map
