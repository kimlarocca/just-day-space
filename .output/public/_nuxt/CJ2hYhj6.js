import{u as g}from"./CpgKnvAJ.js";import{h as p,r as t,o as a,c as m,f as n,k as h,w as b,d,t as f,g as _,b as y,m as w}from"./BgijtkFZ.js";const C={__name:"LoginWithGoogle",props:{label:{type:String,default:"Sign In With Google"}},setup(s){const r=g(),l=w(),o=p(""),c=async()=>{const e=await r.auth.signInWithOAuth({provider:"google"},{redirectTo:l.supabaseAuthSignInRedirectTo});e.value&&(console.log(e),o.value=`Sorry, there was a problem creating this account. Please try again! Error message: ${e}`)};return(e,S)=>{const i=t("Message"),u=t("Button");return a(),m("div",null,[n(o)?(a(),h(i,{key:0,class:"mb-4",severity:"error"},{default:b(()=>[d(" Sorry, there was a problem logging in to your account: "+f(n(o)),1)]),_:1})):_("",!0),y(u,{label:s.label,icon:"pi pi-google",class:"p-button-outlined width400 w-full mb-2",onClick:c},null,8,["label"])])}}};export{C as _};