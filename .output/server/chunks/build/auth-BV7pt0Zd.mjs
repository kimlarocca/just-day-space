import { h as defineNuxtRouteMiddleware, u as useSupabaseUser, j as executeAsync, n as navigateTo } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-UvtrGvQR.mjs';
import { u as useCurrentUserProfile } from './states-BYYVDn8G.mjs';
import 'vue';
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
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@supabase/supabase-js';

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
//# sourceMappingURL=auth-BV7pt0Zd.mjs.map
