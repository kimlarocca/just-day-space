import { u as useSupabaseClient } from './useSupabaseClient-BXGsZWBZ.mjs';
import { withAsyncContext, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext, ref, unref, toDisplayString, isRef } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/server-renderer/index.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CGAgwIMo.mjs';
import { _ as _sfc_main$2 } from './LoginWithGoogle-BHxM2J69.mjs';
import { _ as _sfc_main$3 } from './LoginWithMagicLink-CmD0cXPU.mjs';
import { a as useCurrentUser } from './states-B9d6VW4c.mjs';
import './server.mjs';
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

const _sfc_main$1 = {
  __name: "LoginWithEmail",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
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
              _push2(` Sorry, there was a problem logging in to your account: ${ssrInterpolate(unref(errorMessage))}`);
            } else {
              return [
                createTextVNode(" Sorry, there was a problem logging in to your account: " + toDisplayString(unref(errorMessage)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="width400"><div class="mb-3"><span class="p-float-label inline">`);
      _push(ssrRenderComponent(_component_InputText, {
        id: "email",
        modelValue: unref(email),
        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
        class: "w-full",
        type: "email",
        placeholder: "Email Address",
        required: ""
      }, null, _parent));
      _push(`<label for="email">Email Address</label></span></div><div class="mb-2"><span class="p-float-label inline">`);
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
        label: "Sign In With Email & Password",
        class: "w-full",
        type: "submit"
      }, null, _parent));
      _push(`</form></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/supabase/LoginWithEmail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "login",
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
      const _component_supabase_login_with_email = _sfc_main$1;
      const _component_nuxt_link = __nuxt_component_0;
      const _component_Divider = resolveComponent("Divider");
      const _component_supabase_login_with_google = _sfc_main$2;
      const _component_supabase_login_with_magic_link = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sign-in" }, _attrs))}><h1 class="mb-3 flex align-items-center"> Connecting empty spaces with people who need them. </h1><p class="mb-4 lg:mb-6">Enter your credentials to access your account.</p>`);
      _push(ssrRenderComponent(_component_supabase_login_with_email, { class: "mb-4" }, null, _parent));
      _push(`<p class="like-h6">`);
      _push(ssrRenderComponent(_component_nuxt_link, { to: "/forgot-password" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Forgot Password?`);
          } else {
            return [
              createTextVNode("Forgot Password?")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p>`);
      _push(ssrRenderComponent(_component_Divider, { class: "mb-2 pt-6 w-4 lg:w-2" }, null, _parent));
      _push(`<p class="mb-3">Or sign in with social:</p>`);
      _push(ssrRenderComponent(_component_supabase_login_with_google, null, null, _parent));
      _push(ssrRenderComponent(_component_Divider, { class: "mb-4 pt-6 w-4 lg:w-2" }, null, _parent));
      _push(`<p class="mb-3">Or sign in with a magic link:</p>`);
      _push(ssrRenderComponent(_component_supabase_login_with_magic_link, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-D2QxmlNG.mjs.map
