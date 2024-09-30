import { H as Html, a as Head, T as Title } from './components-Cri3VEmS.mjs';
import { _ as _sfc_main$1, a as __nuxt_component_3 } from './UploadImage-b8NuMdzL.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DEwdlpsP.mjs';
import { ref, computed, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, isRef, useSSRContext } from 'vue';
import { u as useSupabaseUser } from './server.mjs';
import { u as useCurrentUserProfile } from './states-BYYVDn8G.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-UvtrGvQR.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import './index-DyoJ9r-N.mjs';
import '@unhead/shared';
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
import '@supabase/supabase-js';

const _sfc_main = {
  __name: "onboarding",
  __ssrInlineRender: true,
  setup(__props) {
    const currentUser = useSupabaseUser();
    const currentUserProfile = useCurrentUserProfile();
    const supabase = useSupabaseClient();
    const referredBy = ref(null);
    const step = ref(0);
    const referrers = [
      "Google",
      "Facebook",
      "Instagram",
      "Twitter",
      "LinkedIn",
      "Friend",
      "Other"
    ];
    const progress = computed(() => {
      if (step.value === 0)
        return 0;
      else if (step.value === 1)
        return 33;
      else if (step.value === 2)
        return 66;
      return 100;
    });
    const updateProfile = async () => {
      const { error } = await supabase.from("profiles").upsert({
        id: currentUser.value.id,
        updated_at: (/* @__PURE__ */ new Date()).toISOString(),
        referred_by: referredBy.value
      }).match({ id: currentUser.value.id });
      if (error) {
        console.log("updateProfile error", error);
      } else {
        successMessage.value = true;
        currentUserProfile.value.referred_by = referredBy.value;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_Html = Html;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_ProgressBar = resolveComponent("ProgressBar");
      const _component_ManageUserProfile = _sfc_main$1;
      const _component_Button = resolveComponent("Button");
      const _component_SupabaseUploadImage = __nuxt_component_3;
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard container p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Html, { lang: "en" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Just Day Space | Let&#39;s Get Started!`);
                      } else {
                        return [
                          createTextVNode("Just Day Space | Let's Get Started!")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Title, null, {
                      default: withCtx(() => [
                        createTextVNode("Just Day Space | Let's Get Started!")
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
                      createTextVNode("Just Day Space | Let's Get Started!")
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
      _push(`<h1 class="mb-4">Let&#39;s Get Started!</h1>`);
      _push(ssrRenderComponent(_component_ProgressBar, {
        value: unref(progress),
        class: "mb-4"
      }, null, _parent));
      if (unref(step) === 0) {
        _push(`<div><h2 class="mb-4">First, tell us about yourself</h2>`);
        _push(ssrRenderComponent(_component_ManageUserProfile, null, null, _parent));
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => step.value++,
          disabled: !((_a = unref(currentUserProfile)) == null ? void 0 : _a.birthday),
          class: "mt-4",
          label: "Continue"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(step) === 1) {
        _push(`<div><h2 class="mb-4">Next, upload a profile picture</h2>`);
        _push(ssrRenderComponent(_component_SupabaseUploadImage, {
          image: ((_b = unref(currentUserProfile)) == null ? void 0 : _b.avatar_url) || "",
          onImageUploaded: ($event) => _ctx.hasProfilePic = true,
          class: "mb-4"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => step.value--,
          class: "mr-4 p-button-outlined",
          label: "Back"
        }, null, _parent));
        if ((_c = unref(currentUserProfile)) == null ? void 0 : _c.avatar_url) {
          _push(ssrRenderComponent(_component_Button, {
            onClick: ($event) => step.value++,
            label: "Continue"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Button, {
            onClick: ($event) => step.value++,
            label: "Skip"
          }, null, _parent));
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(step) === 2) {
        _push(`<div><h2 class="mb-4">How did you hear about us?</h2>`);
        _push(ssrRenderComponent(_component_Dropdown, {
          modelValue: unref(referredBy),
          "onUpdate:modelValue": ($event) => isRef(referredBy) ? referredBy.value = $event : null,
          options: referrers,
          placeholder: "Select an option",
          onChange: updateProfile,
          class: "mb-4"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => step.value--,
          class: "mr-4 p-button-outlined",
          label: "Back"
        }, null, _parent));
        if (unref(referredBy)) {
          _push(ssrRenderComponent(_component_Button, {
            onClick: ($event) => step.value++,
            label: "Continue"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Button, {
            onClick: ($event) => step.value++,
            label: "Skip"
          }, null, _parent));
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(step) === 3) {
        _push(`<div><h2 class="mb-4">Thanks, you&#39;re all set up!</h2><p class="mb-4"> You can always update your profile later in your account settings. </p>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "/dashboard",
          class: "plain"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Button, {
                label: "Add Your First Space",
                icon: "pi pi-plus"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Button, {
                  label: "Add Your First Space",
                  icon: "pi pi-plus"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/onboarding.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=onboarding-BN3ihNvJ.mjs.map
