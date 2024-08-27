import { H as Html, a as Head, T as Title } from './components-B5YiI0jC.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CGAgwIMo.mjs';
import { ref, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, createVNode, unref, isRef, useSSRContext } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/server-renderer/index.mjs';
import './index-BabADJUJ.mjs';
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

const _sfc_main = {
  __name: "styleguide",
  __ssrInlineRender: true,
  setup(__props) {
    const checked = ref(true);
    const cities = ref([
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" }
    ]);
    const selectedCity = ref();
    const value = ref("sample text");
    const timelineData = ref([
      {
        title: "Step 1",
        description: "Description of step 1",
        completed: true
      },
      {
        title: "Step 2",
        completed: true
      },
      {
        title: "Step 3",
        completed: false
      },
      {
        title: "Step 4",
        description: "Description of step 3",
        completed: false
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Html = Html;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_divider = resolveComponent("divider");
      const _component_nuxt_link = __nuxt_component_0;
      const _component_InputText = resolveComponent("InputText");
      const _component_Password = resolveComponent("Password");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_InputSwitch = resolveComponent("InputSwitch");
      const _component_Button = resolveComponent("Button");
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_v_timeline = resolveComponent("v-timeline");
      const _component_Message = resolveComponent("Message");
      const _directive_tooltip = resolveDirective("tooltip");
      let _temp0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "styleguide container" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Html, { lang: "en" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Just Day Space | Styleguide`);
                      } else {
                        return [
                          createTextVNode("Just Day Space | Styleguide")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Title, null, {
                      default: withCtx(() => [
                        createTextVNode("Just Day Space | Styleguide")
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
                      createTextVNode("Just Day Space | Styleguide")
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
      _push(`<h1>Styleguide</h1>`);
      _push(ssrRenderComponent(_component_divider, { class: "my-7" }, null, _parent));
      _push(`<h1 class="mb-4">H1 Lorem Ipsum Dolor Sit Amet</h1><h2 class="mb-4">H2 Lorem Ipsum Dolor Sit Amet</h2><h3 class="mb-4">H3 Lorem Ipsum Dolor Sit Amet</h3><h4 class="mb-4">H4 Lorem Ipsum Dolor Sit Amet</h4><h5 class="mb-4">H5 Lorem Ipsum Dolor Sit Amet</h5><h6 class="mb-4">H6 Lorem Ipsum Dolor Sit Amet</h6><p class="mb-2"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, esse eum ex explicabo facere maiores minus mollitia nulla qui saepe tempora veritatis. Dolore ducimus fuga provident sed temporibus. Ab, perspiciatis. </p><p class="mb-2">`);
      _push(ssrRenderComponent(_component_nuxt_link, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`this is an inline link`);
          } else {
            return [
              createTextVNode("this is an inline link")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p class="mb-2"> Text with a tooltip! <i${ssrRenderAttrs(_temp0 = mergeProps({ class: "pi pi-info-circle cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Here is the tooltip!", void 0, { right: true })))}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}</i></p><p class="mb-2"> Here is some <strong>bold text</strong> and some <em>italic text</em>. </p><p class="mb-4 small">Here is a paragraph with small text.</p><div class="tag mb-4">this is a tag</div>`);
      _push(ssrRenderComponent(_component_divider, { class: "my-7" }, null, _parent));
      _push(`<div class="mb-3"><span class="p-float-label inline">`);
      _push(ssrRenderComponent(_component_InputText, {
        id: "username",
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null
      }, null, _parent));
      _push(`<label for="username">Username</label></span></div>`);
      _push(ssrRenderComponent(_component_InputText, {
        placeholder: "Email Address",
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        class: "block mb-3"
      }, null, _parent));
      _push(`<div class="mb-3">`);
      _push(ssrRenderComponent(_component_Password, {
        toggleMask: "",
        placeholder: "Password",
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_InputText, {
        disabled: "",
        placeholder: "Disabled",
        class: "block mb-3"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Dropdown, {
        modelValue: unref(selectedCity),
        "onUpdate:modelValue": ($event) => isRef(selectedCity) ? selectedCity.value = $event : null,
        options: unref(cities),
        optionLabel: "name",
        placeholder: "Select a City",
        class: "mb-3"
      }, null, _parent));
      _push(ssrRenderComponent(_component_InputSwitch, {
        modelValue: unref(checked),
        "onUpdate:modelValue": ($event) => isRef(checked) ? checked.value = $event : null,
        class: "block mb-3"
      }, null, _parent));
      _push(`<div class="p-inputgroup flex-1 mb-6">`);
      _push(ssrRenderComponent(_component_InputText, { placeholder: "Search" }, null, _parent));
      _push(ssrRenderComponent(_component_Button, { icon: "pi pi-search" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_divider, { class: "my-7" }, null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        label: "example button",
        class: "block mb-3"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        label: "outlined button",
        class: "block mb-3 p-button-outlined"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        label: "Disabled",
        disabled: "",
        class: "block mb-3"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        label: "Loading State",
        icon: "pi pi-check",
        loading: true,
        class: "block mb-6"
      }, null, _parent));
      _push(ssrRenderComponent(_component_ProgressSpinner, { class: "mb-6" }, null, _parent));
      _push(`<div class="width400">`);
      _push(ssrRenderComponent(_component_v_timeline, {
        "timeline-items": unref(timelineData),
        class: "mb-6"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Message, { severity: "info" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`An informative message goes here.`);
          } else {
            return [
              createTextVNode("An informative message goes here.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Message, { severity: "warn" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`A warning message goes here.`);
          } else {
            return [
              createTextVNode("A warning message goes here.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Message, { severity: "error" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sorry, there was a problem logging in to your account. `);
          } else {
            return [
              createTextVNode(" Sorry, there was a problem logging in to your account. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Message, {
        class: "mb-4",
        severity: "success"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Success! Please check your email for the magic link. `);
          } else {
            return [
              createTextVNode(" Success! Please check your email for the magic link. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/styleguide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=styleguide-HpxphKME.mjs.map
