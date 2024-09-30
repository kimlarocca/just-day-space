import { _ as _sfc_main$2 } from "./LoginWithEmail-Dk7DTNWa.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-DEwdlpsP.js";
import { u as useSupabaseClient } from "./useSupabaseClient-UvtrGvQR.js";
import { a as useRuntimeConfig } from "../server.mjs";
import { ref, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, withAsyncContext, mergeProps } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./LoginWithMagicLink-DKekz16n.js";
import { a as useCurrentUser } from "./states-BYYVDn8G.js";
import "hookable";
import "ufo";
import "@supabase/supabase-js";
import "defu";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "devalue";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
const _sfc_main$1 = {
  __name: "LoginWithGoogle",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      default: "Sign In With Google"
    }
  },
  emits: ["closePanel"],
  setup(__props, { emit: __emit }) {
    const client = useSupabaseClient();
    const config = useRuntimeConfig();
    const emit = __emit;
    const errorMessage = ref("");
    const login = async () => {
      emit("closePanel");
      const error = await client.auth.signInWithOAuth(
        { provider: "google" },
        { redirectTo: config.supabaseAuthSignInRedirectTo }
      );
      if (error.value) {
        console.log(error);
        errorMessage.value = `Sorry, there was a problem creating this account. Please try again! Error message: ${error}`;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Message = resolveComponent("Message");
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
      _push(ssrRenderComponent(_component_Button, {
        label: __props.label,
        icon: "pi pi-google",
        class: "p-button-outlined w-full mb-2",
        onClick: login
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/supabase/LoginWithGoogle.vue");
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
      const _component_supabase_login_with_email = _sfc_main$2;
      const _component_nuxt_link = __nuxt_component_0;
      const _component_Divider = resolveComponent("Divider");
      const _component_supabase_login_with_google = _sfc_main$1;
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
export {
  _sfc_main as default
};
//# sourceMappingURL=login-DBxarG_V.js.map
