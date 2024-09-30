import { H as Html, a as Head, T as Title } from "./components-Cri3VEmS.js";
import { u as useSupabaseClient } from "./useSupabaseClient-UvtrGvQR.js";
import { b as useState } from "../server.mjs";
import { u as useCurrentUserProfile, a as useCurrentUser } from "./states-BYYVDn8G.js";
import { withAsyncContext, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "./index-DyoJ9r-N.js";
import "@unhead/shared";
import "@supabase/supabase-js";
import "defu";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "logout container p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Html, { lang: "en" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Just Day Space | You&#39;ve Been Logged Out`);
                      } else {
                        return [
                          createTextVNode("Just Day Space | You've Been Logged Out")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Title, null, {
                      default: withCtx(() => [
                        createTextVNode("Just Day Space | You've Been Logged Out")
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
                      createTextVNode("Just Day Space | You've Been Logged Out")
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
      _push(`<h1 class="mb-4">You&#39;ve Been Logged Out</h1><p><a href="/">Click here</a> to return to the home page.</p></div>`);
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
//# sourceMappingURL=logout-Bvoxan-B.js.map
