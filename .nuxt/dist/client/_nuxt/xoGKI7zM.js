import{D as a,u as s}from"./BgijtkFZ.js";const d=r=>{const e=Object.create(null);for(const n in r){const t=r[n];t!==void 0&&(e[n]=t)}return e},l=(r,e)=>(n,t)=>(s(()=>r({...d(n),...t.attrs},t)),()=>{var i,o;return e?(o=(i=t.slots).default)==null?void 0:o.call(i):null}),g={accesskey:String,autocapitalize:String,autofocus:{type:Boolean,default:void 0},class:[String,Object,Array],contenteditable:{type:Boolean,default:void 0},contextmenu:String,dir:String,draggable:{type:Boolean,default:void 0},enterkeyhint:String,exportparts:String,hidden:{type:Boolean,default:void 0},id:String,inputmode:String,is:String,itemid:String,itemprop:String,itemref:String,itemscope:String,itemtype:String,lang:String,nonce:String,part:String,slot:String,spellcheck:{type:Boolean,default:void 0},style:String,tabindex:String,title:String,translate:String},p=a({name:"Title",inheritAttrs:!1,setup:l((r,{slots:e})=>{var n,t,i;return{title:((i=(t=(n=e.default)==null?void 0:n.call(e))==null?void 0:t[0])==null?void 0:i.children)||null}})}),S=a({name:"Head",inheritAttrs:!1,setup:(r,e)=>()=>{var n,t;return(t=(n=e.slots).default)==null?void 0:t.call(n)}}),c=a({name:"Html",inheritAttrs:!1,props:{...g,manifest:String,version:String,xmlns:String,renderPriority:[String,Number]},setup:l(r=>({htmlAttrs:r}),!0)});export{c as H,p as T,S as a};
