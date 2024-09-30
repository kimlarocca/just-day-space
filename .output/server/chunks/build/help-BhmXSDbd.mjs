import { H as Html, a as Head, T as Title } from './components-Cri3VEmS.mjs';
import { useSSRContext, mergeProps, withCtx, createTextVNode, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main$1 = {
  __name: "SecondaryHero",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: null,
      required: true
    },
    subTitle: {
      type: String,
      default: null,
      required: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "secondary-hero p-4" }, _attrs))} data-v-f663560b><h1 data-v-f663560b>${ssrInterpolate(__props.title)}</h1>`);
      if (__props.subTitle) {
        _push(`<h2 class="mt-2 mb-6" data-v-f663560b>${ssrInterpolate(__props.subTitle)}</h2>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SecondaryHero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f663560b"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Html = Html;
  const _component_Head = Head;
  const _component_Title = Title;
  const _component_SecondaryHero = __nuxt_component_3;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "help" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Html, { lang: "en" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Head, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_Title, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Just Day Space | Help Center`);
                  } else {
                    return [
                      createTextVNode("Just Day Space | Help Center")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_Title, null, {
                  default: withCtx(() => [
                    createTextVNode("Just Day Space | Help Center")
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
                  createTextVNode("Just Day Space | Help Center")
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
  _push(ssrRenderComponent(_component_SecondaryHero, {
    title: "Help Center",
    class: "mb-6"
  }, null, _parent));
  _push(`<div class="container p-4"><p class="mb-4">Our help center is coming soon!</p><p> In the meantime, please <a href="mailto:help@justdayspace.com">send us an email</a> if you need assistance. </p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/help.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const help = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { help as default };
//# sourceMappingURL=help-BhmXSDbd.mjs.map
