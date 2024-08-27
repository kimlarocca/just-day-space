import { u as useSupabaseClient } from "./useSupabaseClient-BXGsZWBZ.js";
import { ref, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, isRef, useSSRContext } from "vue";
import "hookable";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "LoginWithMagicLink",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      default: "Sign In With Magic Link"
    }
  },
  setup(__props) {
    useSupabaseClient();
    const email = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Message = resolveComponent("Message");
      const _component_InputText = resolveComponent("InputText");
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
      _push(`<form class="width400"><div class="mb-3"><span class="p-float-label inline">`);
      _push(ssrRenderComponent(_component_InputText, {
        id: "magic-link-email",
        modelValue: unref(email),
        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
        class: "w-full",
        type: "email",
        placeholder: "Email Address",
        required: ""
      }, null, _parent));
      _push(`<label for="magic-link-email">Email Address</label></span></div>`);
      _push(ssrRenderComponent(_component_Button, {
        label: __props.label,
        class: "w-full",
        type: "submit"
      }, null, _parent));
      _push(`</form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/supabase/LoginWithMagicLink.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=LoginWithMagicLink-CmD0cXPU.js.map
