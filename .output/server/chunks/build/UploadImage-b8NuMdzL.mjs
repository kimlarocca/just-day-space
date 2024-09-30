import { u as useSupabaseUser, _ as _export_sfc } from './server.mjs';
import { u as useCurrentUserProfile } from './states-BYYVDn8G.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-UvtrGvQR.mjs';
import { ref, withAsyncContext, resolveComponent, unref, isRef, withCtx, createTextVNode, useSSRContext, mergeProps, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main$1 = {
  __name: "ManageUserProfile",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c;
    let __temp, __restore;
    const currentUser = useSupabaseUser();
    const currentUserProfile = useCurrentUserProfile();
    const supabase = useSupabaseClient();
    const fullName = ref(null);
    const birthday = ref(null);
    const bio = ref(null);
    const profile = ref([]);
    const successMessage = ref(false);
    const maxBirthdayDate = /* @__PURE__ */ new Date();
    maxBirthdayDate.setFullYear(maxBirthdayDate.getFullYear() - 18);
    let { data } = ([__temp, __restore] = withAsyncContext(() => supabase.from("profiles").select("*").eq("id", currentUser.value.id).limit(1)), __temp = await __temp, __restore(), __temp);
    if (data) {
      profile.value = data;
      fullName.value = (_a = data[0]) == null ? void 0 : _a.full_name;
      birthday.value = (_b = data[0]) == null ? void 0 : _b.birthday;
      bio.value = (_c = data[0]) == null ? void 0 : _c.bio;
    }
    const updateProfile = async () => {
      successMessage.value = false;
      const { error } = await supabase.from("profiles").upsert({
        id: currentUser.value.id,
        updated_at: (/* @__PURE__ */ new Date()).toISOString(),
        full_name: fullName.value,
        birthday: birthday.value,
        bio: bio.value
      }).match({ id: currentUser.value.id });
      if (error) {
        console.log("updateProfile error", error);
      } else {
        successMessage.value = true;
        currentUserProfile.value.full_name = fullName.value;
        currentUserProfile.value.birthday = birthday.value;
        currentUserProfile.value.bio = bio.value;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Calendar = resolveComponent("Calendar");
      const _component_InputText = resolveComponent("InputText");
      const _component_Textarea = resolveComponent("Textarea");
      const _component_Message = resolveComponent("Message");
      _push(`<!--[-->`);
      if (unref(profile) && unref(profile).length > 0) {
        _push(`<div><h6 class="mb-2">Date of Birth</h6>`);
        _push(ssrRenderComponent(_component_Calendar, {
          modelValue: unref(birthday),
          "onUpdate:modelValue": ($event) => isRef(birthday) ? birthday.value = $event : null,
          maxDate: unref(maxBirthdayDate),
          showIcon: "",
          placeholder: "Select A Date",
          class: "mb-2 w-full",
          onDateSelect: updateProfile
        }, null, _parent));
        _push(`<p class="small font-italic mb-4"> Your date of birth is required - you must be 18 or older to book or list on Just Day Space. </p><h6 class="mb-2">Name</h6>`);
        _push(ssrRenderComponent(_component_InputText, {
          modelValue: unref(fullName),
          "onUpdate:modelValue": ($event) => isRef(fullName) ? fullName.value = $event : null,
          placeholder: "Enter your full name here",
          onChange: updateProfile,
          class: "mb-4"
        }, null, _parent));
        _push(`<h6 class="mb-2">Bio</h6>`);
        _push(ssrRenderComponent(_component_Textarea, {
          modelValue: unref(bio),
          "onUpdate:modelValue": ($event) => isRef(bio) ? bio.value = $event : null,
          rows: "5",
          placeholder: "Enter a brief paragraph about yourself - this may lead to more bookings!",
          onChange: updateProfile
        }, null, _parent));
        _push(`</div>`);
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ManageUserProfile.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "UploadImage",
  __ssrInlineRender: true,
  props: {
    image: {
      type: String,
      default: "",
      required: true
    }
  },
  emits: ["imageUploaded"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
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
          emit("imageUploaded");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "upload-image" }, _attrs))} data-v-a51024b3><h6 class="mb-4" data-v-a51024b3>Profile Image</h6>`);
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
        _push(`<p data-v-a51024b3><em data-v-a51024b3> You are using your <strong data-v-a51024b3>${ssrInterpolate(unref(currentUser).email)}</strong> Google account to login. To change your profile picture, you must do so through your Google account. </em></p>`);
      } else {
        _push(`<!--[-->`);
        if (!unref(imageUrl)) {
          _push(`<p class="mb-3" data-v-a51024b3> You have not added a profile image yet. </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex" data-v-a51024b3>`);
        _push(ssrRenderComponent(_component_FileUpload, {
          mode: "basic",
          customUpload: true,
          onUploader: uploadImage,
          accept: "image/*",
          maxFileSize: 1e6,
          fileLimit: 1,
          "choose-label": "Update",
          auto: true,
          "upload-icon": "pi pi-image",
          class: "mr-2 fit-width black",
          style: { "height": "36px", "text-transform": "capitalize" }
        }, null, _parent));
        if (unref(imageUrl)) {
          _push(ssrRenderComponent(_component_Button, {
            onClick: deleteImage,
            class: "black p-button-rounded",
            icon: "pi pi-trash"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!unref(imageUrl)) {
          _push(`<p class="small mt-3" data-v-a51024b3><em data-v-a51024b3> Image files must be less than 1MB in size, and should ideally be a square.<br data-v-a51024b3>jpg, png, webp, and gif files are accepted. </em></p>`);
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/supabase/UploadImage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a51024b3"]]);

export { _sfc_main$1 as _, __nuxt_component_3 as a };
//# sourceMappingURL=UploadImage-b8NuMdzL.mjs.map
