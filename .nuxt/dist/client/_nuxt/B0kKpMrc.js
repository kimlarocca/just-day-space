import{H as I,T as N,a as D}from"./CobuwM1x.js";import{_ as F,a as G}from"./ysaB0ENP.js";import{_ as L}from"./Soh8fuTW.js";import{h as M,g,v as O,c as d,b as t,w as r,u as a,T as m,a as i,r as k,o as n,d as Y,f as _,k as f,i as A}from"./8BKww6Vf.js";import{u as E}from"./BrLtfxac.js";import{u as J}from"./CuZozit4.js";import"./_mjepWPq.js";const R={class:"dashboard container p-4"},j=i("h1",{class:"mb-4"},"Let's Get Started!",-1),q={key:0},z=i("h2",{class:"mb-4"},"First, tell us about yourself",-1),K={key:0},Q=i("h2",{class:"mb-4"},"Next, upload a profile picture",-1),W={key:0},X=i("h2",{class:"mb-4"},"How did you hear about us?",-1),Z={key:0},ee=i("h2",{class:"mb-4"},"Thanks, you're all set up!",-1),te=i("p",{class:"mb-4"}," You can always update your profile later in your account settings. ",-1),de={__name:"onboarding",setup(oe){const y=M(),c=E(),C=J(),u=g(null),o=g(0),S=["Google","Facebook","Instagram","Twitter","LinkedIn","Friend","Other"],h=O(()=>o.value===0?0:o.value===1?33:o.value===2?66:100),B=async()=>{const{error:p}=await C.from("profiles").upsert({id:y.value.id,updated_at:new Date().toISOString(),referred_by:u.value}).match({id:y.value.id});p?console.log("updateProfile error",p):(successMessage.value=!0,c.value.referred_by=u.value)};return(p,e)=>{const w=N,P=D,$=I,T=k("ProgressBar"),U=F,l=k("Button"),x=G,V=k("Dropdown"),H=L;return n(),d("div",R,[t($,{lang:"en"},{default:r(()=>[t(P,null,{default:r(()=>[t(w,null,{default:r(()=>[Y("Just Day Space | Let's Get Started!")]),_:1})]),_:1})]),_:1}),j,t(T,{value:a(h),class:"mb-4"},null,8,["value"]),t(m,{name:"slide-fade"},{default:r(()=>{var s;return[a(o)===0?(n(),d("div",q,[z,t(U),t(l,{onClick:e[0]||(e[0]=v=>o.value++),disabled:!((s=a(c))!=null&&s.birthday),class:"mt-4",label:"Continue"},null,8,["disabled"])])):_("",!0)]}),_:1}),t(m,{name:"slide-fade"},{default:r(()=>{var s,v;return[a(o)===1?(n(),d("div",K,[Q,t(x,{image:((s=a(c))==null?void 0:s.avatar_url)||"",onImageUploaded:e[1]||(e[1]=b=>p.hasProfilePic=!0),class:"mb-4"},null,8,["image"]),t(l,{onClick:e[2]||(e[2]=b=>o.value--),class:"mr-4 p-button-outlined",label:"Back"}),(v=a(c))!=null&&v.avatar_url?(n(),f(l,{key:0,onClick:e[3]||(e[3]=b=>o.value++),label:"Continue"})):(n(),f(l,{key:1,onClick:e[4]||(e[4]=b=>o.value++),label:"Skip"}))])):_("",!0)]}),_:1}),t(m,{name:"slide-fade"},{default:r(()=>[a(o)===2?(n(),d("div",W,[X,t(V,{modelValue:a(u),"onUpdate:modelValue":e[5]||(e[5]=s=>A(u)?u.value=s:null),options:S,placeholder:"Select an option",onChange:B,class:"mb-4"},null,8,["modelValue"]),t(l,{onClick:e[6]||(e[6]=s=>o.value--),class:"mr-4 p-button-outlined",label:"Back"}),a(u)?(n(),f(l,{key:0,onClick:e[7]||(e[7]=s=>o.value++),label:"Continue"})):(n(),f(l,{key:1,onClick:e[8]||(e[8]=s=>o.value++),label:"Skip"}))])):_("",!0)]),_:1}),t(m,{name:"slide-fade"},{default:r(()=>[a(o)===3?(n(),d("div",Z,[ee,te,t(H,{to:"/dashboard",class:"plain"},{default:r(()=>[t(l,{label:"Add Your First Space",icon:"pi pi-plus"})]),_:1})])):_("",!0)]),_:1})])}}};export{de as default};
