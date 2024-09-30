import { H as Html, a as Head, T as Title } from './components-Cri3VEmS.mjs';
import { a as __nuxt_component_3, _ as _sfc_main$1$1 } from './UploadImage-b8NuMdzL.mjs';
import { u as useSupabaseUser } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-UvtrGvQR.mjs';
import { ref, withAsyncContext, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext, isRef, toDisplayString } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/server-renderer/index.mjs';
import './index-DyoJ9r-N.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/@unhead/shared/dist/index.mjs';
import './states-BYYVDn8G.mjs';
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
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/unctx/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/@supabase/supabase-js/dist/main/index.js';

const _sfc_main$1 = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const currentUser = useSupabaseUser();
    useSupabaseClient();
    const errorMessage = ref("");
    const password = ref("");
    const pending = ref(false);
    const successMessage = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Password = resolveComponent("Password");
      const _component_Button = resolveComponent("Button");
      const _component_Message = resolveComponent("Message");
      _push(`<div${ssrRenderAttrs(_attrs)}><form class="password-reset"><h4 class="mb-4">Change Password</h4>`);
      if (unref(currentUser).app_metadata.provider !== "email") {
        _push(`<p><em> You are using your <strong>${ssrInterpolate(unref(currentUser).email)}</strong> ${ssrInterpolate(unref(currentUser).app_metadata.provider)} account to login. To change your password, you must do so through your ${ssrInterpolate(unref(currentUser).app_metadata.provider)} account. </em></p>`);
      } else {
        _push(`<div class="width400">`);
        if (!unref(successMessage)) {
          _push(`<div class="mb-4">`);
          _push(ssrRenderComponent(_component_Password, {
            id: "password",
            toggleMask: "",
            modelValue: unref(password),
            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
            type: "password",
            placeholder: "New Password",
            required: ""
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(successMessage)) {
          _push(ssrRenderComponent(_component_Button, {
            loading: unref(pending),
            type: "submit",
            class: "full-width",
            label: "Update Password"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (unref(errorMessage)) {
        _push(ssrRenderComponent(_component_Message, {
          sticky: false,
          life: 5e3,
          class: "mt-4",
          severity: "error",
          onClose: ($event) => errorMessage.value = ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sorry, there was an error updating your password: ${ssrInterpolate(unref(errorMessage))}`);
            } else {
              return [
                createTextVNode(" Sorry, there was an error updating your password: " + toDisplayString(unref(errorMessage)), 1)
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
          sticky: true,
          life: 5e3,
          class: "mt-4",
          severity: "success",
          onClose: ($event) => successMessage.value = ""
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
      _push(`</form></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/supabase/ResetPassword.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "settings",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b;
    let __temp, __restore;
    const currentUser = useSupabaseUser();
    const supabase = useSupabaseClient();
    const avatarImage = ref(null);
    const profile = ref([]);
    const successMessage = ref(false);
    const userType = ref(null);
    let { data } = ([__temp, __restore] = withAsyncContext(() => {
      var _a2;
      return supabase.from("profiles").select("*").eq("id", (_a2 = currentUser.value) == null ? void 0 : _a2.id).limit(1);
    }), __temp = await __temp, __restore(), __temp);
    if (data) {
      profile.value = data;
      avatarImage.value = (_a = data[0]) == null ? void 0 : _a.avatar_url;
      userType.value = (_b = data[0]) == null ? void 0 : _b.user_type;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Html = Html;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_supabase_upload_image = __nuxt_component_3;
      const _component_manage_user_profile = _sfc_main$1$1;
      const _component_divider = resolveComponent("divider");
      const _component_supabase_reset_password = _sfc_main$1;
      const _component_Message = resolveComponent("Message");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings container p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Html, { lang: "en" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Just Day Space | Account Settings`);
                      } else {
                        return [
                          createTextVNode("Just Day Space | Account Settings")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Title, null, {
                      default: withCtx(() => [
                        createTextVNode("Just Day Space | Account Settings")
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
                      createTextVNode("Just Day Space | Account Settings")
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
      _push(`<h1 class="mb-5">Account Settings</h1>`);
      _push(ssrRenderComponent(_component_supabase_upload_image, {
        image: unref(avatarImage) || "",
        class: "mb-5"
      }, null, _parent));
      _push(ssrRenderComponent(_component_manage_user_profile, null, null, _parent));
      _push(ssrRenderComponent(_component_divider, { class: "my-6 w-2" }, null, _parent));
      _push(`<div id="password">`);
      _push(ssrRenderComponent(_component_supabase_reset_password, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_divider, { class: "my-6 w-2" }, null, _parent));
      _push(`<div id="delete"><h4 class="mb-4">Delete Account</h4><p> Please <a href="mailto:help@justdayspace.com">contact us</a> if you wish to delete your account. </p></div><div class="changes-saved-toast">`);
      if (unref(successMessage)) {
        _push(ssrRenderComponent(_component_Message, {
          class: "mb-4",
          severity: "success",
          closable: false,
          sticky: false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Your changes have been saved. `);
            } else {
              return [
                createTextVNode(" Your changes have been saved. ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settings-DHk6R4o5.mjs.map
