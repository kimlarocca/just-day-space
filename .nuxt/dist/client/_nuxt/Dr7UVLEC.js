import{C as v,h as U,D as p,n as w}from"./8BKww6Vf.js";import{u as y}from"./CuZozit4.js";import{u as C}from"./BrLtfxac.js";const P=v(async()=>{var i,n,l,c,f,d;let e,r;const u=U(),o=C(),s=y();let a=([e,r]=p(()=>s.auth.getUser()),e=await e,r(),e);const t=([e,r]=p(()=>s.auth.getSession()),e=await e,r(),e);s.auth.onAuthStateChange(async()=>{a=await s.auth.getUser()});const g=async()=>{const{data:h,error:m}=await s.from("profiles").select("*").eq("id",u.value.id).single();m?console.error(m):h&&(o.value=h)};if((i=a==null?void 0:a.data)!=null&&i.user?u.value=(n=a==null?void 0:a.data)==null?void 0:n.user:(c=(l=t==null?void 0:t.data)==null?void 0:l.session)!=null&&c.user&&(u.value=(d=(f=t==null?void 0:t.data)==null?void 0:f.session)==null?void 0:d.user),u.value)o.value||g();else return w("/")});export{P as default};