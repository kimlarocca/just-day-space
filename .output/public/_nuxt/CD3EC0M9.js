import{H as I,T as L,a as P}from"./CobuwM1x.js";import{_ as T}from"./Soh8fuTW.js";import{g as r,c as N,b as e,w as a,a as t,d as o,y as B,u as c,i as p,z as C,r as s,A as M,o as R}from"./8BKww6Vf.js";import"./_mjepWPq.js";const U={class:"styleguide container p-4"},E=t("h1",null,"Styleguide",-1),Y=C('<h1 class="mb-4">H1 Lorem Ipsum Dolor Sit Amet</h1><h2 class="mb-4">H2 Lorem Ipsum Dolor Sit Amet</h2><h3 class="mb-4">H3 Lorem Ipsum Dolor Sit Amet</h3><h4 class="mb-4">H4 Lorem Ipsum Dolor Sit Amet</h4><h5 class="mb-4">H5 Lorem Ipsum Dolor Sit Amet</h5><h6 class="mb-4">H6 Lorem Ipsum Dolor Sit Amet</h6><p class="mb-2"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, esse eum ex explicabo facere maiores minus mollitia nulla qui saepe tempora veritatis. Dolore ducimus fuga provident sed temporibus. Ab, perspiciatis. </p>',7),q={class:"mb-2"},z={class:"mb-2"},J={class:"pi pi-info-circle cursor-pointer"},j=t("p",{class:"mb-2"},[o(" Here is some "),t("strong",null,"bold text"),o(" and some "),t("em",null,"italic text"),o(". ")],-1),F=t("p",{class:"mb-4 small"},"Here is a paragraph with small text.",-1),G=t("div",{class:"tag mb-4"},"this is a tag",-1),K={class:"mb-3"},O={class:"p-inputgroup flex-1 mb-6"},Q={class:"width400"},oe={__name:"styleguide",setup(W){const u=r(!0),g=r([{name:"New York",code:"NY"},{name:"Rome",code:"RM"},{name:"London",code:"LDN"},{name:"Istanbul",code:"IST"},{name:"Paris",code:"PRS"}]),_=r(),n=r("sample text"),f=r([{title:"Step 1",description:"Description of step 1",completed:!0},{title:"Step 2",completed:!0},{title:"Step 3",completed:!1},{title:"Step 4",description:"Description of step 3",completed:!1}]);return(X,l)=>{const v=L,S=P,y=I,b=s("divider"),D=T,h=s("InputText"),k=s("Password"),w=s("Dropdown"),x=s("InputSwitch"),m=s("Button"),V=s("ProgressSpinner"),H=s("v-timeline"),d=s("Message"),A=M("tooltip");return R(),N("div",U,[e(y,{lang:"en"},{default:a(()=>[e(S,null,{default:a(()=>[e(v,null,{default:a(()=>[o("Just Day Space | Styleguide")]),_:1})]),_:1})]),_:1}),E,e(b,{class:"my-7"}),Y,t("p",q,[e(D,{to:"/"},{default:a(()=>[o("this is an inline link")]),_:1})]),t("p",z,[o(" Text with a tooltip! "),B(t("i",J,null,512),[[A,"Here is the tooltip!",void 0,{right:!0}]])]),j,F,G,e(b,{class:"my-7"}),e(h,{placeholder:"Email Address",modelValue:c(n),"onUpdate:modelValue":l[0]||(l[0]=i=>p(n)?n.value=i:null),class:"block mb-3"},null,8,["modelValue"]),t("div",K,[e(k,{toggleMask:"",placeholder:"Password",modelValue:c(n),"onUpdate:modelValue":l[1]||(l[1]=i=>p(n)?n.value=i:null)},null,8,["modelValue"])]),e(h,{disabled:"",placeholder:"Disabled",class:"block mb-3"}),e(w,{modelValue:c(_),"onUpdate:modelValue":l[2]||(l[2]=i=>p(_)?_.value=i:null),options:c(g),optionLabel:"name",placeholder:"Select a City",class:"mb-3"},null,8,["modelValue","options"]),e(x,{modelValue:c(u),"onUpdate:modelValue":l[3]||(l[3]=i=>p(u)?u.value=i:null),class:"block mb-3"},null,8,["modelValue"]),t("div",O,[e(h,{placeholder:"Search"}),e(m,{icon:"pi pi-search"})]),e(b,{class:"my-7"}),e(m,{label:"example button",class:"block mb-3"}),e(m,{label:"outlined button",class:"block mb-3 p-button-outlined"}),e(m,{label:"Disabled",disabled:"",class:"block mb-3"}),e(m,{label:"Loading State",icon:"pi pi-check",loading:!0,class:"block mb-6"}),e(V,{class:"mb-6"}),t("div",Q,[e(H,{"timeline-items":c(f),class:"mb-6"},null,8,["timeline-items"])]),e(d,{severity:"info"},{default:a(()=>[o("An informative message goes here.")]),_:1}),e(d,{severity:"warn"},{default:a(()=>[o("A warning message goes here.")]),_:1}),e(d,{severity:"error"},{default:a(()=>[o(" Sorry, there was a problem logging in to your account. ")]),_:1}),e(d,{class:"mb-4",severity:"success"},{default:a(()=>[o(" Success! Please check your email for the magic link. ")]),_:1})])}}};export{oe as default};
