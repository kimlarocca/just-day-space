import{H as N,T as j,a as D}from"./xoGKI7zM.js";import{_ as W}from"./3NSENS5s.js";import{u as C}from"./CpgKnvAJ.js";import{h as y,r as _,o as p,c as x,f as u,k as V,w as d,d as h,t as P,g as k,l as q,a as s,b as e,i as T,j as $,s as F}from"./BgijtkFZ.js";import{_ as J}from"./CJ2hYhj6.js";import{a as L}from"./BtaJPrrX.js";const O={class:"mb-4"},R={class:"p-float-label inline"},z=s("label",{for:"email"},"Email Address",-1),G={class:"mb-4"},K={class:"p-float-label inline"},Q=s("label",{for:"password"},"Password",-1),X={__name:"SignupWithEmail",setup(M){const t=C(),o=y(""),n=y(""),c=y(""),a=y(""),l=async()=>{const{error:i}=await t.auth.signUp({email:o.value,password:n.value});i?(console.log(i),i.toString().includes("already registered")?c.value='Looks like you already have an account! If you do not remember your password, you can retrieve it by clicking the "Forgot Password" link below.':c.value=`Sorry, there was a problem creating this account. Please try signing up again! Error message: ${i.message}`):a.value="Success! Please check your email for a confirmation link. If you do not receive a confirmation link, you may already have an account. Please be sure to check your spam or junk folder as well."};return(i,r)=>{const m=_("Message"),f=_("InputText"),g=_("Password"),w=_("Button");return p(),x("div",null,[u(c)?(p(),V(m,{key:0,class:"mb-4",severity:"error"},{default:d(()=>[h(P(u(c)),1)]),_:1})):k("",!0),u(a)?(p(),V(m,{key:1,class:"mb-4",severity:"success"},{default:d(()=>[h(P(u(a)),1)]),_:1})):k("",!0),u(a)?k("",!0):(p(),x("form",{key:2,onSubmit:q(l,["prevent"]),class:"width400"},[s("div",O,[s("span",R,[e(f,{id:"email",modelValue:u(o),"onUpdate:modelValue":r[0]||(r[0]=b=>T(o)?o.value=b:null),class:"w-full",type:"email",placeholder:"Email Address",required:""},null,8,["modelValue"]),z])]),s("div",G,[s("span",K,[e(g,{id:"password",toggleMask:"",feedback:!1,modelValue:u(n),"onUpdate:modelValue":r[1]||(r[1]=b=>T(n)?n.value=b:null),class:"w-full mb-2",type:"password",placeholder:"Password",required:""},null,8,["modelValue"]),Q])]),e(w,{label:"sign up With Email & Password",class:"w-full",type:"submit"})],32))])}}},Y={class:"sign-up"},Z={class:"flex align-items-end justify-content-between"},ee={class:"small"},se=s("h1",{class:"mb-3"},"Welcome To Cuetip",-1),ae=s("h2",{class:"mb-2"},"Tech and data provider in the cannabis space",-1),te=s("p",null," Cuetip is a Tech and Data provider of premium technology and services to the entire supply chain in the cannabis space. cuetip provides exclusive insights into the rapidly evolving cannabis market and captures current data. ",-1),oe=s("h4",{class:"mb-4"},"Fill out the form below to register",-1),ne=s("p",{class:"mb-3"},"Or sign in with social:",-1),me={__name:"sign-up-saved",async setup(M){var i,r,m,f,g,w;let t,o;const n=L(),c=C(),a=([t,o]=$(()=>c.auth.getUser()),t=await t,o(),t),l=([t,o]=$(()=>c.auth.getSession()),t=await t,o(),t);return(i=a==null?void 0:a.data)!=null&&i.user?n.value=(r=a==null?void 0:a.data)==null?void 0:r.user:(f=(m=l==null?void 0:l.data)==null?void 0:m.session)!=null&&f.user&&(n.value=(w=(g=l==null?void 0:l.data)==null?void 0:g.session)==null?void 0:w.user),F(()=>{n.value&&(window.location.href="/dashboard")}),(b,le)=>{const U=j,B=D,E=N,H=_("cuetip-logo"),S=W,v=_("divider"),I=X,A=J;return p(),x("div",Y,[e(E,{lang:"en"},{default:d(()=>[e(B,null,{default:d(()=>[e(U,null,{default:d(()=>[h("Just Day Space | Sign Up")]),_:1})]),_:1})]),_:1}),s("header",Z,[e(S,{to:"/",class:"plain"},{default:d(()=>[e(H)]),_:1}),s("p",ee,[h(" Already have an account? "),e(S,{to:"/",class:"like-h6"},{default:d(()=>[h("Sign In")]),_:1})])]),e(v,{class:"mb-6"}),se,ae,te,e(v,{class:"my-6 w-2"}),oe,e(I),e(v,{class:"mt-5 mb-4 w-2"}),ne,e(A)])}}};export{me as default};
