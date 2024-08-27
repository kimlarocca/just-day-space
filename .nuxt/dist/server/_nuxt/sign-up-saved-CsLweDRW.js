import { H as Html, a as Head, T as Title } from "./components-B5YiI0jC.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-CGAgwIMo.js";
import { u as useSupabaseClient } from "./useSupabaseClient-BXGsZWBZ.js";
import { ref, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, isRef, useSSRContext, withAsyncContext, mergeProps, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./LoginWithGoogle-BHxM2J69.js";
import { a as useCurrentUser } from "./states-B9d6VW4c.js";
import "./index-BabADJUJ.js";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "devalue";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
import "@supabase/supabase-js";
const _sfc_main$1 = {
  __name: "SignupWithEmail",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Message = resolveComponent("Message");
      const _component_InputText = resolveComponent("InputText");
      const _component_Password = resolveComponent("Password");
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(errorMessage)) {
        _push(ssrRenderComponent(_component_Message, {
          class: "mb-4",
          severity: "error"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(errorMessage))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(errorMessage)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(successMessage)) {
        _push(ssrRenderComponent(_component_Message, {
          class: "mb-4",
          severity: "success"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(successMessage))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(successMessage)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(successMessage)) {
        _push(`<form class="width400"><div class="mb-4"><span class="p-float-label inline">`);
        _push(ssrRenderComponent(_component_InputText, {
          id: "email",
          modelValue: unref(email),
          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
          class: "w-full",
          type: "email",
          placeholder: "Email Address",
          required: ""
        }, null, _parent));
        _push(`<label for="email">Email Address</label></span></div><div class="mb-4"><span class="p-float-label inline">`);
        _push(ssrRenderComponent(_component_Password, {
          id: "password",
          toggleMask: "",
          feedback: false,
          modelValue: unref(password),
          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
          class: "w-full mb-2",
          type: "password",
          placeholder: "Password",
          required: ""
        }, null, _parent));
        _push(`<label for="password">Password</label></span></div>`);
        _push(ssrRenderComponent(_component_Button, {
          label: "sign up With Email & Password",
          class: "w-full",
          type: "submit"
        }, null, _parent));
        _push(`</form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/supabase/SignupWithEmail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "sign-up-saved",
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
      const _component_Html = Html;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_nuxt_link = __nuxt_component_0;
      const _component_cuetip_logo = resolveComponent("cuetip-logo");
      const _component_divider = resolveComponent("divider");
      const _component_supabase_signup_with_email = _sfc_main$1;
      const _component_supabase_login_with_google = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sign-up" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Html, { lang: "en" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Just Day Space | Sign Up`);
                      } else {
                        return [
                          createTextVNode("Just Day Space | Sign Up")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Title, null, {
                      default: withCtx(() => [
                        createTextVNode("Just Day Space | Sign Up")
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
                      createTextVNode("Just Day Space | Sign Up")
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
      _push(`<h1 class="mb-3">Welcome To Cuetip</h1><h2 class="mb-2">Tech and data provider in the cannabis space</h2><p> Cuetip is a Tech and Data provider of premium technology and services to the entire supply chain in the cannabis space. cuetip provides exclusive insights into the rapidly evolving cannabis market and captures current data. </p>`);
      _push(ssrRenderComponent(_component_divider, { class: "my-6 w-2" }, null, _parent));
      _push(`<h4 class="mb-4">Fill out the form below to register</h4>`);
      _push(ssrRenderComponent(_component_supabase_signup_with_email, null, null, _parent));
      _push(ssrRenderComponent(_component_divider, { class: "mt-5 mb-4 w-2" }, null, _parent));
      _push(`<p class="mb-3">Or sign in with social:</p>`);
      _push(ssrRenderComponent(_component_supabase_login_with_google, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sign-up-saved.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=sign-up-saved-CsLweDRW.js.map
