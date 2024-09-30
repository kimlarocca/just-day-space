import { e as useNuxtApp, g as useSupabaseToken, a as useRuntimeConfig } from './server.mjs';
import { createClient } from '@supabase/supabase-js';
import { p as defu } from '../runtime.mjs';

const useSupabaseClient = () => {
  var _a;
  const nuxtApp = useNuxtApp();
  const token = useSupabaseToken();
  const Authorization = token.value ? `Bearer ${token.value}` : void 0;
  const { supabase: { url, key, client: clientOptions } } = useRuntimeConfig().public;
  const options = Authorization ? defu(clientOptions, { global: { headers: { Authorization } } }) : clientOptions;
  const recreateClient = ((_a = nuxtApp._supabaseClient) == null ? void 0 : _a.headers.Authorization) !== Authorization;
  if (!nuxtApp._supabaseClient || recreateClient) {
    nuxtApp._supabaseClient = createClient(url, key, options);
  }
  return nuxtApp._supabaseClient;
};

export { useSupabaseClient as u };
//# sourceMappingURL=useSupabaseClient-UvtrGvQR.mjs.map
