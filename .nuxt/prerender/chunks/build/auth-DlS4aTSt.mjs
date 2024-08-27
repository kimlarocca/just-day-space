import { d as defineNuxtRouteMiddleware, a as useSupabaseUser, e as executeAsync, n as navigateTo } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-BXGsZWBZ.mjs';
import { u as useCurrentUserProfile } from './states-B9d6VW4c.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/h3/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/devalue/index.js';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/ufo/dist/index.mjs';
import 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/server-renderer/index.mjs';
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

const auth = defineNuxtRouteMiddleware(async () => {
  var _a, _b, _c, _d, _e, _f;
  let __temp, __restore;
  const currentUser = useSupabaseUser();
  const currentUserProfile = useCurrentUserProfile();
  const client = useSupabaseClient();
  let user = ([__temp, __restore] = executeAsync(() => client.auth.getUser()), __temp = await __temp, __restore(), __temp);
  const session = ([__temp, __restore] = executeAsync(() => client.auth.getSession()), __temp = await __temp, __restore(), __temp);
  client.auth.onAuthStateChange(async () => {
    user = await client.auth.getUser();
  });
  const getProfile = async () => {
    const {
      data,
      error
    } = await client.from("profiles").select("*").eq("id", currentUser.value.id).single();
    if (error) {
      console.error(error);
    } else if (data) {
      currentUserProfile.value = data;
    }
  };
  if ((_a = user == null ? void 0 : user.data) == null ? void 0 : _a.user) {
    currentUser.value = (_b = user == null ? void 0 : user.data) == null ? void 0 : _b.user;
  } else if ((_d = (_c = session == null ? void 0 : session.data) == null ? void 0 : _c.session) == null ? void 0 : _d.user) {
    currentUser.value = (_f = (_e = session == null ? void 0 : session.data) == null ? void 0 : _e.session) == null ? void 0 : _f.user;
  }
  if (!currentUser.value) {
    return navigateTo("/");
  } else if (!currentUserProfile.value) {
    getProfile();
  }
});

export { auth as default };
//# sourceMappingURL=auth-DlS4aTSt.mjs.map
