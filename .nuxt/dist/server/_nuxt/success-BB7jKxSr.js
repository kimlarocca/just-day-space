import { H as Html, a as Head, T as Title } from "./components-Cri3VEmS.js";
import { _ as _sfc_main$1 } from "./LoginWithEmail-Dk7DTNWa.js";
import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "./index-DyoJ9r-N.js";
import "@unhead/shared";
import "./useSupabaseClient-UvtrGvQR.js";
import "@supabase/supabase-js";
import "defu";
import "hookable";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "vue-router";
import "radix3";
import "ufo";
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
  const _component_Divider = resolveComponent("Divider");
  const _component_SupabaseLoginWithEmail = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "forgot-password container p-4" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Html, { lang: "en" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Head, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_Title, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Just Day Space | Success!`);
                  } else {
                    return [
                      createTextVNode("Just Day Space | Success!")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_Title, null, {
                  default: withCtx(() => [
                    createTextVNode("Just Day Space | Success!")
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
                  createTextVNode("Just Day Space | Success!")
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
  _push(`<h1 class="mb-3">Success!</h1><h3 class="mb-2">Your email was successfully verified</h3>`);
  _push(ssrRenderComponent(_component_Divider, { class: "mb-4 pt-6 w-4 lg:w-2" }, null, _parent));
  _push(`<p class="mb-4">Please login to your new account to continue:</p>`);
  _push(ssrRenderComponent(_component_SupabaseLoginWithEmail, { class: "width400" }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const success = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  success as default
};
//# sourceMappingURL=success-BB7jKxSr.js.map
