import { H as Html, a as Head, T as Title } from './components-B5YiI0jC.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CGAgwIMo.mjs';
import { withAsyncContext, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/index.mjs';
import { a as useSupabaseUser } from './server.mjs';
import { u as useCurrentUserProfile } from './states-B9d6VW4c.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-BXGsZWBZ.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/server-renderer/index.mjs';
import './index-BabADJUJ.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/ufo/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/h3/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/devalue/index.js';
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

const _sfc_main = {
  __name: "success",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g;
    let __temp, __restore;
    const currentUser = useSupabaseUser();
    const currentUserProfile = useCurrentUserProfile();
    const supabase = useSupabaseClient();
    [__temp, __restore] = withAsyncContext(() => supabase.from("profiles").update({
      onboarded: true
    }).eq("id", currentUser.value.id)), await __temp, __restore();
    let { data } = ([__temp, __restore] = withAsyncContext(() => supabase.from("profiles").select("*").eq("id", currentUser.value.id).limit(1)), __temp = await __temp, __restore(), __temp);
    if (data) {
      currentUserProfile.value.farm_owner = (_a = data[0]) == null ? void 0 : _a.farm_owner;
      currentUserProfile.value.hemp_farm_owner = (_b = data[0]) == null ? void 0 : _b.hemp_farm_owner;
      currentUserProfile.value.lab_owner = (_c = data[0]) == null ? void 0 : _c.lab_owner;
      currentUserProfile.value.full_name = (_d = data[0]) == null ? void 0 : _d.full_name;
      currentUserProfile.value.phone = (_e = data[0]) == null ? void 0 : _e.phone;
      currentUserProfile.value.number_of_workers = (_f = data[0]) == null ? void 0 : _f.number_of_workers;
      currentUserProfile.value.onboarded = (_g = data[0]) == null ? void 0 : _g.onboarded;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Html = Html;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_icons_large_check = resolveComponent("icons-large-check");
      const _component_nuxt_link = __nuxt_component_0;
      const _component_Button = resolveComponent("Button");
      const _component_Divider = resolveComponent("Divider");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hemp" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Html, { lang: "en" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Just Day Space | Success!`);
                      } else {
                        return [
                          createTextVNode("Just Day Space | Success!")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Title, null, {
                      default: withCtx(() => [
                        createTextVNode("Just Day Space | Success!")
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
                      createTextVNode("Just Day Space | Success!")
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
      _push(`<h2 class="mb-4">Success!</h2><div class="container-white p-4">`);
      _push(ssrRenderComponent(_component_icons_large_check, { class: "mb-4" }, null, _parent));
      _push(`<h4 class="mb-4">Your account setup is complete!</h4><p class="mb-4">What&#39;s next?</p>`);
      if (unref(currentUserProfile).farm_owner) {
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "/cannabis",
          class: "plain"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Button, {
                label: "add your strains",
                class: "block mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Button, {
                  label: "add your strains",
                  class: "block mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(currentUserProfile).hemp_farm_owner) {
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "/hemp",
          class: "plain"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Button, {
                label: "add your hemp strains",
                class: "block mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Button, {
                  label: "add your hemp strains",
                  class: "block mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(currentUserProfile).lab_owner) {
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "/concentrates",
          class: "plain"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Button, {
                label: "add your concentrates",
                class: "block mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Button, {
                  label: "add your concentrates",
                  class: "block mb-3 md:mb-0 md:mr-3 md:inline-block w-full md:w-fit"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Divider, { class: "mb-2 pt-6 w-4 lg:w-2" }, null, _parent));
      _push(`<p class="mb-4">Or</p>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/dashboard",
        class: "plain"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              label: "check out your dashboard",
              class: "block mb-3 md:mb-0 md:mr-3 md:inline-block p-button-outlined w-full md:w-fit"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                label: "check out your dashboard",
                class: "block mb-3 md:mb-0 md:mr-3 md:inline-block p-button-outlined w-full md:w-fit"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=success-DksWiA1i.mjs.map
