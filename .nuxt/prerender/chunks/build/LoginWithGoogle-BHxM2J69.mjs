import { u as useSupabaseClient } from './useSupabaseClient-BXGsZWBZ.mjs';
import { c as useRuntimeConfig } from './server.mjs';
import { ref, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/server-renderer/index.mjs';

const _sfc_main = {
  __name: "LoginWithGoogle",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      default: "Sign In With Google"
    }
  },
  setup(__props) {
    const client = useSupabaseClient();
    const config = useRuntimeConfig();
    const errorMessage = ref("");
    const login = async () => {
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
        class: "p-button-outlined width400 w-full mb-2",
        onClick: login
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/supabase/LoginWithGoogle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=LoginWithGoogle-BHxM2J69.mjs.map
