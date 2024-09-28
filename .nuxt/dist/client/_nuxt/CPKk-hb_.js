import{u as k}from"./CpgKnvAJ.js";import{h as w,r as d,o as f,c as x,f as h,k as E,w as V,d as $,t as I,g as M,a as s,b as n,i as v,l as U,n as A,m as N,j as y}from"./BgijtkFZ.js";import{_ as D}from"./3NSENS5s.js";import{_ as R}from"./CJ2hYhj6.js";import{_ as W}from"./OWLdLMdJ.js";import{a as q}from"./BtaJPrrX.js";const O={class:"mb-3"},j={class:"p-float-label inline"},F=s("label",{for:"email"},"Email Address",-1),L={class:"mb-2"},z={class:"p-float-label inline"},G=s("label",{for:"password"},"Password",-1),H={__name:"LoginWithEmail",setup(C){const o=k(),_=N(),i=w(""),r=w(""),e=w(""),l=async()=>{var a,c;const t=await o.auth.signInWithPassword({email:i.value,password:r.value},{redirectTo:_.supabaseAuthSignInRedirectTo});t.error?(console.log(t),(c=(a=t==null?void 0:t.error)==null?void 0:a.message)!=null&&c.includes("Invalid login credentials")?e.value="The email and password combination you entered is incorrect. Please try again!":e.value=t):A("/dashboard")};return(t,a)=>{const c=d("Message"),m=d("InputText"),u=d("Password"),p=d("Button");return f(),x("div",null,[h(e)?(f(),E(c,{key:0,class:"mb-4",severity:"error"},{default:V(()=>[$(" Sorry, there was a problem logging in to your account: "+I(h(e)),1)]),_:1})):M("",!0),s("form",{onSubmit:U(l,["prevent"]),class:"width400"},[s("div",O,[s("span",j,[n(m,{id:"email",modelValue:h(i),"onUpdate:modelValue":a[0]||(a[0]=g=>v(i)?i.value=g:null),class:"w-full",type:"email",placeholder:"Email Address",required:""},null,8,["modelValue"]),F])]),s("div",L,[s("span",z,[n(u,{id:"password",toggleMask:"",feedback:!1,modelValue:h(r),"onUpdate:modelValue":a[1]||(a[1]=g=>v(r)?r.value=g:null),class:"w-full mb-2",type:"password",placeholder:"Password",required:""},null,8,["modelValue"]),G])]),n(p,{label:"Sign In With Email & Password",class:"w-full",type:"submit"})],32)])}}},J={class:"sign-in"},K=s("h1",{class:"mb-3 flex align-items-center"}," Connecting empty spaces with people who need them. ",-1),Q=s("p",{class:"mb-4 lg:mb-6"},"Enter your credentials to access your account.",-1),X={class:"like-h6"},Y=s("p",{class:"mb-3"},"Or sign in with social:",-1),Z=s("p",{class:"mb-3"},"Or sign in with a magic link:",-1),is={__name:"login",async setup(C){var t,a,c,m,u,p;let o,_;const i=q(),r=k(),e=([o,_]=y(()=>r.auth.getUser()),o=await o,_(),o),l=([o,_]=y(()=>r.auth.getSession()),o=await o,_(),o);return(t=e==null?void 0:e.data)!=null&&t.user?i.value=(a=e==null?void 0:e.data)==null?void 0:a.user:(m=(c=l==null?void 0:l.data)==null?void 0:c.session)!=null&&m.user&&(i.value=(p=(u=l==null?void 0:l.data)==null?void 0:u.session)==null?void 0:p.user),(g,ss)=>{const P=H,S=D,b=d("Divider"),T=R,B=W;return f(),x("div",J,[K,Q,n(P,{class:"mb-4"}),s("p",X,[n(S,{to:"/forgot-password"},{default:V(()=>[$("Forgot Password?")]),_:1})]),n(b,{class:"mb-2 pt-6 w-4 lg:w-2"}),Y,n(T),n(b,{class:"mb-4 pt-6 w-4 lg:w-2"}),Z,n(B)])}}};export{is as default};