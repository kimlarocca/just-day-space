import{H as D,T as Y,a as j}from"./CobuwM1x.js";import{a as q,_ as R}from"./ysaB0ENP.js";import{h as C,g as r,r as y,o as n,c as v,a as t,u as e,d as c,t as f,b as o,i as E,f as g,k as S,w as m,m as I,j as J}from"./8BKww6Vf.js";import{u as $}from"./CuZozit4.js";import"./_mjepWPq.js";import"./BrLtfxac.js";const z=t("h4",{class:"mb-4"},"Change Password",-1),F={key:0},G={key:1,class:"width400"},K={key:0,class:"mb-4"},L={__name:"ResetPassword",setup(x){const a=C(),h=$(),u=r(""),d=r(""),_=r(!1),l=r(null),M=async()=>{_.value=!0;const{error:i}=await h.auth.updateUser({email:a.value.email,password:d.value});_.value=!1,i?(console.log(i),i.toString().includes("8 characters")?u.value="Password should be at least 8 characters.":u.value=i):l.value="Success! Your password has been updated."};return(i,s)=>{const w=y("Password"),b=y("Button"),p=y("Message");return n(),v("div",null,[t("form",{class:"password-reset",onSubmit:I(M,["prevent"])},[z,e(a).app_metadata.provider!=="email"?(n(),v("p",F,[t("em",null,[c(" You are using your "),t("strong",null,f(e(a).email),1),c(" "+f(e(a).app_metadata.provider)+" account to login. To change your password, you must do so through your "+f(e(a).app_metadata.provider)+" account. ",1)])])):(n(),v("div",G,[e(l)?g("",!0):(n(),v("div",K,[o(w,{id:"password",toggleMask:"",modelValue:e(d),"onUpdate:modelValue":s[0]||(s[0]=k=>E(d)?d.value=k:null),type:"password",placeholder:"New Password",required:""},null,8,["modelValue"])])),e(l)?g("",!0):(n(),S(b,{key:1,loading:e(_),type:"submit",class:"full-width",label:"Update Password"},null,8,["loading"]))])),e(u)?(n(),S(p,{key:2,sticky:!1,life:5e3,class:"mt-4",severity:"error",onClose:s[1]||(s[1]=k=>u.value="")},{default:m(()=>[c(" Sorry, there was an error updating your password: "+f(e(u)),1)]),_:1})):g("",!0),e(l)?(n(),S(p,{key:3,sticky:!0,life:5e3,class:"mt-4",severity:"success",onClose:s[2]||(s[2]=k=>l.value="")},{default:m(()=>[c(f(e(l)),1)]),_:1})):g("",!0)],32)])}}},O={class:"settings container p-4"},Q=t("h1",{class:"mb-5"},"Account Settings",-1),W={id:"password"},X=t("div",{id:"delete"},[t("h4",{class:"mb-4"},"Delete Account"),t("p",null,[c(" Please "),t("a",{href:"mailto:help@justdayspace.com"},"contact us"),c(" if you wish to delete your account. ")])],-1),Z={class:"changes-saved-toast"},le={__name:"settings",async setup(x){var w,b;let a,h;const u=C(),d=$(),_=r(null),l=r([]),M=r(!1),i=r(null);let{data:s}=([a,h]=J(()=>{var p;return d.from("profiles").select("*").eq("id",(p=u.value)==null?void 0:p.id).limit(1)}),a=await a,h(),a);return s&&(l.value=s,_.value=(w=s[0])==null?void 0:w.avatar_url,i.value=(b=s[0])==null?void 0:b.user_type),(p,k)=>{const V=Y,B=j,T=D,U=q,H=R,P=y("divider"),N=L,A=y("Message");return n(),v("div",O,[o(T,{lang:"en"},{default:m(()=>[o(B,null,{default:m(()=>[o(V,null,{default:m(()=>[c("Just Day Space | Account Settings")]),_:1})]),_:1})]),_:1}),Q,o(U,{image:e(_)||"",class:"mb-5"},null,8,["image"]),o(H),o(P,{class:"my-6 w-2"}),t("div",W,[o(N)]),o(P,{class:"my-6 w-2"}),X,t("div",Z,[e(M)?(n(),S(A,{key:0,class:"mb-4",severity:"success",closable:!1,sticky:!1},{default:m(()=>[c(" Your changes have been saved. ")]),_:1})):g("",!0)])])}}};export{le as default};