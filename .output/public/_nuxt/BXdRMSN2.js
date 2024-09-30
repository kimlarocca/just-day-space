import{_ as h,g as y,r as m,o as r,c as d,a as t,b as s,u as x,i as w,p as $,e as v,t as c,d as g,w as B,h as D,j as C}from"./8BKww6Vf.js";import{_ as H}from"./Soh8fuTW.js";import{u as S}from"./CuZozit4.js";import{u as A}from"./BrLtfxac.js";const f=e=>($("data-v-eea87cc8"),e=e(),v(),e),M={class:"hero p-4"},V=f(()=>t("h1",{class:"mb-2"},"Find Your Escape",-1)),P=f(()=>t("h2",{class:"mb-6"},"Connecting empty spaces with people who need them",-1)),G={class:"p-inputgroup w-fit"},I={class:"p-float-label inline"},W=f(()=>t("label",{for:"location"},"Set Your Location",-1)),Y={__name:"Hero",setup(e){const o=y("");return(i,a)=>{const l=m("InputText"),_=m("Button");return r(),d("div",M,[V,P,t("div",G,[t("span",I,[s(l,{id:"location",modelValue:x(o),"onUpdate:modelValue":a[0]||(a[0]=n=>w(o)?o.value=n:null),required:"",style:{width:"300px"}},null,8,["modelValue"]),W]),s(_,{icon:"pi pi-search",class:"px-4"})])])}}},q=h(Y,[["__scopeId","data-v-eea87cc8"]]),j=e=>{if(typeof e=="number")return e===0?"$0":e<0?(e=e*-1,"-$"+e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")):"$"+e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},T={class:"p-card"},U={class:"p-card-image mb-2"},k=["src"],N={class:"p-card-body"},O={class:"font-bold"},R={class:"text-base"},L={class:"text-base"},E={class:"green font-bold"},F={__name:"Card",props:{image:{type:String,default:!1},title:{type:String,default:!1},location:{type:String,default:!1},price:{type:Number,default:!1},hourly:{type:Boolean,default:!1},daily:{type:Boolean,default:!1}},setup(e){return(o,i)=>(r(),d("div",T,[t("div",U,[t("img",{src:e.image,alt:"card image"},null,8,k)]),t("div",N,[t("p",O,c(e.title),1),t("p",R,"Location: "+c(e.location),1),t("p",L,[t("span",E,c(("formatCurrency"in o?o.formatCurrency:x(j))(e.price)),1),g(" "+c(e.daily?"daily":"")+" "+c(e.hourly?"hourly":""),1)])])]))}},Q=h(F,[["__scopeId","data-v-fbe38e53"]]),z={class:"collection"},J={class:"mb-4"},K={class:"grid mb-3"},X={class:"col col-12 md:col-6 lg:col-3"},Z={class:"col col-12 md:col-6 lg:col-3"},tt={class:"col col-12 md:col-6 lg:col-3"},et={class:"col col-12 md:col-6 lg:col-3"},ot={class:"text-base"},st=t("i",{class:"pi pi-angle-right"},null,-1),at={__name:"Collection",props:{title:{type:String,default:!1}},setup(e){return(o,i)=>{const a=Q,l=H;return r(),d("div",z,[t("h2",J,c(e.title),1),t("div",K,[t("div",X,[s(a,{image:"https://plus.unsplash.com/premium_photo-1683133267429-7915ba56827a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",title:"Relaxing Yoga Studio",location:"Portland, OR",price:49,hourly:""})]),t("div",Z,[s(a,{image:"https://plus.unsplash.com/premium_photo-1675745329659-29044cb6adbb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",title:"Private Plunge Pool",location:"Los Angeles, CA",price:149,hourly:""})]),t("div",tt,[s(a,{image:"https://images.unsplash.com/photo-1692986134127-f906b1a02599?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",title:"Beach House with Pool",location:"Oregon Coast, OR",price:499,daily:""})]),t("div",et,[s(a,{image:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",title:"Modern Home Office With Views",location:"Seattle, WA",price:29,hourly:""})])]),t("p",ot,[s(l,{to:"/"},{default:B(()=>[g(" View more "+c(e.title)+" ",1),st]),_:1})])])}}},ct={class:"index"},it=t("div",{class:"container-gray"},[t("p",null,"filtering icons go here")],-1),lt={class:"p-4"},nt=t("div",{class:"container-gray"},[t("p",null,"CTA for hosting a space goes here")],-1),ut={__name:"index",async setup(e){let o,i;const a=D(),l=S(),_=A();if(a.value){const{data:n,error:p}=([o,i]=C(()=>l.from("profiles").select("*").eq("id",a.value.id).single()),o=await o,i(),o);p?console.error(p):n&&(_.value=n)}return(n,p)=>{const b=q,u=at;return r(),d("div",ct,[s(b,{class:"mb-6"}),it,t("div",lt,[s(u,{title:"Popular Places",class:"mb-6"}),s(u,{title:"Quiet Places",class:"mb-6"}),s(u,{title:"Places To Work",class:"mb-6"})]),nt])}}};export{ut as default};
