import { H as Html, a as Head, T as Title } from "./components-B5YiI0jC.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-CGAgwIMo.js";
import { _ as _sfc_main$1 } from "./LoginWithMagicLink-CmD0cXPU.js";
import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "./index-BabADJUJ.js";
import "@unhead/shared";
import "ufo";
import "hookable";
import "./useSupabaseClient-BXGsZWBZ.js";
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
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Html = Html;
  const _component_Head = Head;
  const _component_Title = Title;
  const _component_nuxt_link = __nuxt_component_0;
  const _component_cuetip_logo = resolveComponent("cuetip-logo");
  const _component_divider = resolveComponent("divider");
  const _component_Divider = resolveComponent("Divider");
  const _component_supabase_login_with_magic_link = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "forgot-password" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Html, { lang: "en" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Head, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_Title, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Just Day Space | Forgot Password`);
                  } else {
                    return [
                      createTextVNode("Just Day Space | Forgot Password")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_Title, null, {
                  default: withCtx(() => [
                    createTextVNode("Just Day Space | Forgot Password")
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
                  createTextVNode("Just Day Space | Forgot Password")
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
  _push(`<p class="small"> Already have an account? `);
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
  _push(ssrRenderComponent(_component_divider, { class: "mb-6" }, null, _parent));
  _push(`<h1 class="mb-3">Forgot Your Password?</h1><h2 class="mb-2">Sign in with a magic link</h2><p> Enter the email address you used when you joined cuetip and we&#39;ll send you a magic link you can use to sign in. Once you are logged in, you may reset your password. </p>`);
  _push(ssrRenderComponent(_component_Divider, { class: "mb-4 pt-6 w-4 lg:w-2" }, null, _parent));
  _push(ssrRenderComponent(_component_supabase_login_with_magic_link, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forgot-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const forgotPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  forgotPassword as default
};
//# sourceMappingURL=forgot-password-CXjZ4PO3.js.map
