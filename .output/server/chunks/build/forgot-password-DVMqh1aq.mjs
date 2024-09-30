import { H as Html, a as Head, T as Title } from './components-Cri3VEmS.mjs';
import { _ as _sfc_main$1 } from './LoginWithMagicLink-DKekz16n.mjs';
import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import './index-DyoJ9r-N.mjs';
import '@unhead/shared';
import './useSupabaseClient-UvtrGvQR.mjs';
import '@supabase/supabase-js';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import 'vue-router';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Html = Html;
  const _component_Head = Head;
  const _component_Title = Title;
  const _component_Divider = resolveComponent("Divider");
  const _component_supabase_login_with_magic_link = _sfc_main$1;
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
  _push(`<h1 class="mb-3">Forgot Your Password?</h1><h3 class="mb-3">Sign in with a magic link</h3><p> Enter the email address you used when you signed up and we&#39;ll send you a magic link you can use to sign in. Once you are logged in, you may reset your password. </p>`);
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

export { forgotPassword as default };
//# sourceMappingURL=forgot-password-DVMqh1aq.mjs.map
