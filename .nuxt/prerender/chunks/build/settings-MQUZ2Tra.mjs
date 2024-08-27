import { H as Html, a as Head, T as Title } from './components-B5YiI0jC.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CGAgwIMo.mjs';
import { a as useSupabaseUser, b as useRoute, _ as _export_sfc } from './server.mjs';
import { u as useCurrentUserProfile } from './states-B9d6VW4c.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-BXGsZWBZ.mjs';
import { ref, watch, withAsyncContext, resolveComponent, unref, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext, toDisplayString, isRef } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'file:///Users/kimlarocca/Websites/just-day-space/node_modules/vue/server-renderer/index.mjs';
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

const _sfc_main$3 = {
  __name: "UploadImage",
  __ssrInlineRender: true,
  props: {
    image: {
      type: String,
      default: "",
      required: true
    }
  },
  setup(__props) {
    const currentUser = useSupabaseUser();
    const currentUserProfile = useCurrentUserProfile();
    const supabase = useSupabaseClient();
    const props = __props;
    const uploading = ref(false);
    const errorMessage = ref();
    const successMessage = ref();
    const imageUrl = ref(props.image);
    const uploadImage = async (event) => {
      try {
        uploading.value = true;
        const file = event.files[0];
        const fileExt = file.name.split(".").pop();
        const filePath = `${props.userId}-${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);
        if (uploadError)
          throw uploadError;
        const { data: imagePublicUrl } = await supabase.storage.from("avatars").getPublicUrl(filePath);
        imageUrl.value = imagePublicUrl.publicUrl;
        const { error } = await supabase.from("profiles").upsert({
          id: currentUser.value.id,
          updated_at: (/* @__PURE__ */ new Date()).toISOString(),
          avatar_url: imageUrl.value
        }).match({ id: currentUser.value.id });
        if (error) {
          console.log(error);
          errorMessage.value = `Error: ${error}`;
        } else {
          successMessage.value = "Success! Your image has been saved.";
          currentUserProfile.value.avatar_url = imageUrl.value;
        }
      } catch (error) {
        errorMessage.value = `Error: ${error}`;
      } finally {
        uploading.value = false;
      }
    };
    const deleteImage = async () => {
      const { error } = await supabase.from("profiles").upsert({
        id: currentUser.value.id,
        updated_at: (/* @__PURE__ */ new Date()).toISOString(),
        avatar_url: null
      }).match({ id: currentUser.value.id });
      if (error) {
        console.log(error);
        errorMessage.value = `Error: ${error}`;
      } else {
        successMessage.value = "Success! Your photo has been deleted.";
        imageUrl.value = null;
        currentUserProfile.value.avatar_url = null;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_Avatar = resolveComponent("Avatar");
      const _component_FileUpload = resolveComponent("FileUpload");
      const _component_Button = resolveComponent("Button");
      const _component_Message = resolveComponent("Message");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "upload-image" }, _attrs))} data-v-1c789c2b>`);
      if (unref(uploading)) {
        _push(ssrRenderComponent(_component_ProgressSpinner, { class: "inline-block mb-4" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(imageUrl)) {
        _push(ssrRenderComponent(_component_Avatar, {
          image: unref(imageUrl),
          size: "xlarge",
          shape: "circle",
          alt: "profile photo",
          class: "mb-4"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(currentUser).app_metadata.provider === "google") {
        _push(`<p data-v-1c789c2b><em data-v-1c789c2b> You are using your <strong data-v-1c789c2b>${ssrInterpolate(unref(currentUser).email)}</strong> Google account to login. To change your profile picture, you must do so through your Google account. </em></p>`);
      } else {
        _push(`<!--[-->`);
        if (!unref(imageUrl)) {
          _push(`<p class="mb-3" data-v-1c789c2b> You have not added a profile photo yet. </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-column lg:flex-row" data-v-1c789c2b>`);
        _push(ssrRenderComponent(_component_FileUpload, {
          mode: "basic",
          customUpload: true,
          onUploader: uploadImage,
          accept: "image/*",
          maxFileSize: 1e6,
          fileLimit: 1,
          "choose-label": "Update Photo",
          auto: true,
          "upload-icon": "pi pi-image"
        }, null, _parent));
        if (unref(imageUrl)) {
          _push(ssrRenderComponent(_component_Button, {
            onClick: deleteImage,
            class: "mt-3 lg:mt-0 lg:ml-3 p-button-outlined fit-width",
            label: "Delete",
            icon: "pi pi-trash"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!unref(imageUrl)) {
          _push(`<p class="small mt-3" data-v-1c789c2b><em data-v-1c789c2b> Image files must be less than 1MB in size, and should ideally be a square.<br data-v-1c789c2b>jpg, png, webp, and gif files are accepted. </em></p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      if (unref(errorMessage)) {
        _push(ssrRenderComponent(_component_Message, {
          class: "mt-4",
          severity: "error"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(errorMessage))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(errorMessage)), 1)
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
          sticky: false,
          life: 5e3,
          class: "mt-4",
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
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/supabase/UploadImage.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1c789c2b"]]);
const _sfc_main$2 = {
  __name: "ManageUserProfile",
  __ssrInlineRender: true,
  props: {
    hideUserType: {
      type: Boolean,
      default: false
    }
  },
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g;
    let __temp, __restore;
    const currentUser = useSupabaseUser();
    const currentUserProfile = useCurrentUserProfile();
    const supabase = useSupabaseClient();
    const farmOwner = ref(null);
    const hempFarmOwner = ref(null);
    const fullName = ref(null);
    const labOwner = ref(null);
    const lights = ref(null);
    const phone = ref(null);
    const profile = ref([]);
    const successMessage = ref(false);
    const userTypeInvalid = ref(false);
    const workers = ref(null);
    let { data } = ([__temp, __restore] = withAsyncContext(() => supabase.from("profiles").select("*").eq("id", currentUser.value.id).limit(1)), __temp = await __temp, __restore(), __temp);
    if (data) {
      profile.value = data;
      farmOwner.value = (_a = data[0]) == null ? void 0 : _a.farm_owner;
      hempFarmOwner.value = (_b = data[0]) == null ? void 0 : _b.hemp_farm_owner;
      fullName.value = (_c = data[0]) == null ? void 0 : _c.full_name;
      labOwner.value = (_d = data[0]) == null ? void 0 : _d.lab_owner;
      lights.value = (_e = data[0]) == null ? void 0 : _e.number_of_lights;
      phone.value = (_f = data[0]) == null ? void 0 : _f.phone;
      workers.value = (_g = data[0]) == null ? void 0 : _g.number_of_workers;
      if (!farmOwner.value && !labOwner.value && !hempFarmOwner.value) {
        userTypeInvalid.value = true;
      }
    }
    const updateProfile = async () => {
      if (!farmOwner.value && !labOwner.value && !hempFarmOwner.value) {
        userTypeInvalid.value = true;
        return;
      }
      userTypeInvalid.value = false;
      successMessage.value = false;
      const { error } = await supabase.from("profiles").upsert({
        id: currentUser.value.id,
        updated_at: (/* @__PURE__ */ new Date()).toISOString(),
        farm_owner: farmOwner.value,
        hemp_farm_owner: hempFarmOwner.value,
        full_name: fullName.value,
        lab_owner: labOwner.value,
        number_of_lights: lights.value,
        number_of_workers: workers.value,
        phone: phone.value
      }).match({ id: currentUser.value.id });
      if (error) {
        console.log("updateProfile error", error);
      } else {
        successMessage.value = true;
        currentUserProfile.value.farm_owner = farmOwner.value;
        currentUserProfile.value.hemp_farm_owner = hempFarmOwner.value;
        currentUserProfile.value.full_name = fullName.value;
        currentUserProfile.value.lab_owner = labOwner.value;
        currentUserProfile.value.number_of_lights = lights.value;
        currentUserProfile.value.number_of_workers = workers.value;
        currentUserProfile.value.phone = phone.value;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_Message = resolveComponent("Message");
      const _component_Checkbox = resolveComponent("Checkbox");
      const _component_InputText = resolveComponent("InputText");
      const _component_InputMask = resolveComponent("InputMask");
      const _component_InputNumber = resolveComponent("InputNumber");
      _push(`<!--[-->`);
      if (unref(profile) && unref(profile).length > 0) {
        _push(`<div><p class="text-sm mb-4">Username: ${ssrInterpolate((_a2 = unref(currentUser)) == null ? void 0 : _a2.email)}</p>`);
        if (unref(userTypeInvalid) && !__props.hideUserType) {
          _push(ssrRenderComponent(_component_Message, {
            severity: "error",
            closable: false,
            class: "mb-4"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Please select at least one user type! `);
              } else {
                return [
                  createTextVNode(" Please select at least one user type! ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (!__props.hideUserType) {
          _push(`<div class="flex flex-column lg:flex-row lg:align-items-center mb-5"><p class="mb-3 lg:mb-0 lg:mr-3 block md:inline text-sm">User Type:</p><div class="mb-3 lg:mb-0 lg:mr-3 block lg:inline">`);
          _push(ssrRenderComponent(_component_Checkbox, {
            id: "farm_owner",
            modelValue: unref(farmOwner),
            "onUpdate:modelValue": ($event) => isRef(farmOwner) ? farmOwner.value = $event : null,
            binary: true,
            class: "mr-2",
            onChange: updateProfile
          }, null, _parent));
          _push(`<label for="farm_owner">Cannabis Farm Owner</label></div><div class="mb-3 lg:mb-0 lg:mr-3 block lg:inline">`);
          _push(ssrRenderComponent(_component_Checkbox, {
            id: "hemp_farm_owner",
            modelValue: unref(hempFarmOwner),
            "onUpdate:modelValue": ($event) => isRef(hempFarmOwner) ? hempFarmOwner.value = $event : null,
            binary: true,
            class: "mr-2",
            onChange: updateProfile
          }, null, _parent));
          _push(`<label for="hemp_farm_owner">Hemp Farm Owner</label></div><div class="mb-3 lg:mb-0 lg:mr-3 block lg:inline">`);
          _push(ssrRenderComponent(_component_Checkbox, {
            id: "lab_owner",
            modelValue: unref(labOwner),
            "onUpdate:modelValue": ($event) => isRef(labOwner) ? labOwner.value = $event : null,
            binary: true,
            class: "mr-2",
            onChange: updateProfile
          }, null, _parent));
          _push(`<label for="lab_owner">Extraction Lab Owner</label></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mb-4"><span class="p-float-label inline">`);
        _push(ssrRenderComponent(_component_InputText, {
          id: "full_name",
          modelValue: unref(fullName),
          "onUpdate:modelValue": ($event) => isRef(fullName) ? fullName.value = $event : null,
          onChange: updateProfile
        }, null, _parent));
        _push(`<label for="full_name">Full Name</label></span></div><div class="mb-4"><span class="p-float-label inline">`);
        _push(ssrRenderComponent(_component_InputMask, {
          modelValue: unref(phone),
          "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
          date: "phone",
          mask: "(999) 999-9999",
          placeholder: "(999) 999-9999",
          onChange: updateProfile
        }, null, _parent));
        _push(`<label for="phone">Phone Number</label></span></div><div class="mb-4"><span class="p-float-label inline">`);
        _push(ssrRenderComponent(_component_InputNumber, {
          id: "workers",
          modelValue: unref(workers),
          "onUpdate:modelValue": [($event) => isRef(workers) ? workers.value = $event : null, updateProfile],
          onInput: updateProfile
        }, null, _parent));
        _push(`<label for="workers">Total Number Of Workers</label></span></div><div class="mb-4"><span class="p-float-label inline">`);
        _push(ssrRenderComponent(_component_InputNumber, {
          id: "lights",
          modelValue: unref(lights),
          "onUpdate:modelValue": [($event) => isRef(lights) ? lights.value = $event : null, updateProfile],
          onInput: updateProfile
        }, null, _parent));
        _push(`<label for="lights">Total Number Of Lights</label></span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="changes-saved-toast">`);
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
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ManageUserProfile.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
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
        _push(`<div class="width400"><div class="mb-4">`);
        if (!unref(successMessage)) {
          _push(`<span class="p-float-label inline">`);
          _push(ssrRenderComponent(_component_Password, {
            id: "password",
            toggleMask: "",
            modelValue: unref(password),
            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
            type: "password",
            placeholder: "New Password",
            required: ""
          }, null, _parent));
          _push(`<label for="password">New Password</label></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
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
    const route = useRoute();
    const avatarImage = ref(null);
    const hash = ref(null);
    const profile = ref([]);
    const successMessage = ref(false);
    const userType = ref(null);
    watch(
      () => route.hash,
      (newVal) => {
        hash.value = newVal;
      }
    );
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
      const _component_nuxt_link = __nuxt_component_0;
      const _component_divider = resolveComponent("divider");
      const _component_supabase_upload_image = __nuxt_component_4;
      const _component_manage_user_profile = _sfc_main$2;
      const _component_manage_user_locations = resolveComponent("manage-user-locations");
      const _component_supabase_reset_password = _sfc_main$1;
      const _component_Message = resolveComponent("Message");
      if (unref(profile) && unref(profile).length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_Html, { lang: "en" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Head, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Title, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Just Day Space | Profile Settings`);
                        } else {
                          return [
                            createTextVNode("Just Day Space | Profile Settings")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Title, null, {
                        default: withCtx(() => [
                          createTextVNode("Just Day Space | Profile Settings")
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
                        createTextVNode("Just Day Space | Profile Settings")
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
        _push(`<div class="grid"><div class="col hidden col-12 lg:col-3 lg:flex mb-4"><nav class="container-white w-full h-fit p-4"><p>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "#profile",
          class: ["plain", unref(hash) === "#profile" ? "active" : ""]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-cog mr-2"${_scopeId}></i> Profile `);
            } else {
              return [
                createVNode("i", { class: "pi pi-cog mr-2" }),
                createTextVNode(" Profile ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p>`);
        _push(ssrRenderComponent(_component_divider, { class: "my-3" }, null, _parent));
        _push(`<p>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "#locations",
          class: ["plain", unref(hash) === "#profile" ? "active" : ""]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-map-marker mr-2"${_scopeId}></i> Locations `);
            } else {
              return [
                createVNode("i", { class: "pi pi-map-marker mr-2" }),
                createTextVNode(" Locations ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p>`);
        _push(ssrRenderComponent(_component_divider, { class: "my-3" }, null, _parent));
        _push(`<p>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "#password",
          class: ["plain", unref(hash) === "#password" ? "active" : ""]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-lock mr-2"${_scopeId}></i> Change Password `);
            } else {
              return [
                createVNode("i", { class: "pi pi-lock mr-2" }),
                createTextVNode(" Change Password ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p>`);
        _push(ssrRenderComponent(_component_divider, { class: "my-3" }, null, _parent));
        _push(`<p>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "#delete",
          class: ["plain", unref(hash) === "#delete" ? "active" : ""]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-trash mr-2"${_scopeId}></i> Delete Account `);
            } else {
              return [
                createVNode("i", { class: "pi pi-trash mr-2" }),
                createTextVNode(" Delete Account ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p></nav></div><div class="col col-12 lg:col-9"><div id="profile" class="container-white p-4 mb-4"><h4 class="mb-4">Profile</h4>`);
        _push(ssrRenderComponent(_component_supabase_upload_image, {
          image: unref(avatarImage) || "",
          class: "mb-5"
        }, null, _parent));
        _push(ssrRenderComponent(_component_manage_user_profile, null, null, _parent));
        _push(`</div><div id="locations" class="container-white p-4 mb-4"><h4 class="mb-4">Projects</h4>`);
        _push(ssrRenderComponent(_component_manage_user_locations, null, null, _parent));
        _push(`</div><div id="password" class="container-white p-4 mb-4">`);
        _push(ssrRenderComponent(_component_supabase_reset_password, null, null, _parent));
        _push(`</div><div id="delete" class="container-white p-4 mb-4"><h4 class="mb-4">Delete Account</h4><p> Please <a href="mailto:help@cuetip.com">contact us</a> if you wish to delete your account. </p></div><div class="changes-saved-toast">`);
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
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
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
//# sourceMappingURL=settings-MQUZ2Tra.mjs.map
