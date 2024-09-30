import { H as Html, a as Head, T as Title } from "./components-Cri3VEmS.js";
import { u as useSupabaseClient } from "./useSupabaseClient-UvtrGvQR.js";
import { ref, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, isRef, useSSRContext, mergeProps, createVNode } from "vue";
import "hookable";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { _ as _export_sfc } from "../server.mjs";
import "./index-DyoJ9r-N.js";
import "@unhead/shared";
import "@supabase/supabase-js";
import "defu";
import "ofetch";
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
        _push(`<form><div class="mb-3">`);
        _push(ssrRenderComponent(_component_InputText, {
          id: "email",
          modelValue: unref(email),
          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
          class: "w-full",
          type: "email",
          placeholder: "Email Address",
          required: ""
        }, null, _parent));
        _push(`</div><div class="mb-3">`);
        _push(ssrRenderComponent(_component_Password, {
          id: "password",
          toggleMask: "",
          feedback: false,
          modelValue: unref(password),
          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
          class: "w-full",
          type: "password",
          placeholder: "Password",
          required: ""
        }, null, _parent));
        _push(`</div>`);
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
const _imports_0 = publicAssetsURL("/images/hero.jpg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Html = Html;
  const _component_Head = Head;
  const _component_Title = Title;
  const _component_divider = resolveComponent("divider");
  const _component_supabase_signup_with_email = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "signup container p-4" }, _attrs))} data-v-9d8c427a>`);
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
  _push(`<div class="grid" data-v-9d8c427a><div class="col col-12 lg:col-5" data-v-9d8c427a><h1 class="mb-3" data-v-9d8c427a>Get started for free</h1><h3 data-v-9d8c427a>Let&#39;s make some money from your empty space!</h3>`);
  _push(ssrRenderComponent(_component_divider, { class: "my-6 w-2" }, null, _parent));
  _push(`<p class="mb-4" data-v-9d8c427a>Please fill out the form below to sign up:</p><div class="width400" data-v-9d8c427a>`);
  _push(ssrRenderComponent(_component_supabase_signup_with_email, { class: "mb-6" }, null, _parent));
  _push(`</div></div><div class="col col-7 hidden lg:flex" data-v-9d8c427a><img class="signup-image"${ssrRenderAttr("src", _imports_0)} alt="Signup for just day space" data-v-9d8c427a></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const signup = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-9d8c427a"]]);
export {
  signup as default
};
//# sourceMappingURL=signup-DkfNuedM.js.map
