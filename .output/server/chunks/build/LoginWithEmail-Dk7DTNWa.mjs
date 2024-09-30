import { u as useSupabaseClient } from './useSupabaseClient-UvtrGvQR.mjs';
import { ref, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "LoginWithEmail",
  __ssrInlineRender: true,
  emits: ["closePanel"],
  setup(__props, { emit: __emit }) {
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
        label: "Login With Email & Password",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/supabase/LoginWithEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=LoginWithEmail-Dk7DTNWa.mjs.map
