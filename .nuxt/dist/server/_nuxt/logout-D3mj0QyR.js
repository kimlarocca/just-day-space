import { H as Html, a as Head, T as Title } from "./components-B5YiI0jC.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-CGAgwIMo.js";
import { u as useSupabaseClient } from "./useSupabaseClient-BXGsZWBZ.js";
import { u as useState } from "../server.mjs";
import { u as useCurrentUserProfile, a as useCurrentUser } from "./states-B9d6VW4c.js";
import { withAsyncContext, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "./index-BabADJUJ.js";
import "@unhead/shared";
import "ufo";
import "hookable";
import "@supabase/supabase-js";
import "defu";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "vue-router";
import "radix3";
import "devalue";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
const _sfc_main = {
  __name: "logout",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const client = useSupabaseClient();
    const { error } = ([__temp, __restore] = withAsyncContext(() => client.auth.signOut()), __temp = await __temp, __restore(), __temp);
    if (error) {
      console.log("error");
    }
    const currentUser = useState(useCurrentUser, "$e4Da6cJJYV");
    currentUser.value = null;
    const currentUserProfile = useCurrentUserProfile();
    currentUserProfile.value = null;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Html = Html;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_nuxt_link = __nuxt_component_0;
      const _component_cuetip_logo = resolveComponent("cuetip-logo");
      const _component_divider = resolveComponent("divider");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "logout" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Html, { lang: "en" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Just Day Space | Logout`);
                      } else {
                        return [
                          createTextVNode("Just Day Space | Logout")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Title, null, {
                      default: withCtx(() => [
                        createTextVNode("Just Day Space | Logout")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Head, null, {
                default: withCtx(() => [
                  createVNode(_component_Title, null, {
                    default: withCtx(() => [
                      createTextVNode("Just Day Space | Logout")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<header class="flex align-items-end justify-content-between">`);
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
      _push(`<p class="small">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/",
        class: "like-h6"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign In`);
          } else {
            return [
              createTextVNode("Sign In")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></header>`);
      _push(ssrRenderComponent(_component_divider, { class: "mb-7" }, null, _parent));
      _push(`<h1 class="mb-3">Logout</h1><h2 class="mb-3">You have been logged out</h2><p><a href="/">Click here</a> to return to the sign in page.</p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/logout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=logout-D3mj0QyR.js.map
