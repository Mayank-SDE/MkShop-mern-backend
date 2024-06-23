import{u as q,r as a,a0 as D,j as e,L as R,_ as r}from"./index-BGOoP327.js";import{c as I}from"./index-CVhGOhid.js";import"./iconBase-DY2o13lj.js";const M=()=>{const g=q(),[i,h]=a.useState(""),[n,f]=a.useState(""),[x,j]=a.useState(0),[o,N]=a.useState(0),[m,b]=a.useState(0),[d,v]=a.useState(0),[p,y]=a.useState(""),[u,k]=a.useState(""),[c,P]=a.useState([]),[S,w]=a.useState([]),[E]=D(),C=t=>{if(t.target.files){const s=Array.from(t.target.files);console.log(c),P(s),w(s.map(l=>URL.createObjectURL(l)))}},F=async t=>{if(t.preventDefault(),!i||!n||!x||!o||!m||!d||d<=0||!p||!u||!c){r.error("Enter all the fileds correctly");return}if(c.length!==4){r.error("Enter exactly 4 images.");return}const s=new FormData;s.append("title",i),s.append("description",n),s.append("price",x.toString()),s.append("rating",o.toString()),s.append("discountPercentage",m.toString()),s.append("stock",d.toString()),s.append("brand",p),s.append("category",u),c.forEach(l=>{s.append("images",l)});try{const l=await E({formData:s}).unwrap();l.success?(r.success(l.message),g("/admin/products")):r.error(l.message)}catch(l){console.error(l),r.error("Registration failed. Please try again.")}};return e.jsxs("div",{className:" w-fit relative border-2 border-slate-500 rounded-xl mx-auto  p-4  my-6",children:[e.jsxs(R,{className:"bg-slate-900 dark:bg-slate-100 px-3 py-1 absolute top-2 right-2 text-slate-100 dark:text-slate-900 flex items-center justify-center gap-1 rounded-full",to:"/admin/products",children:[e.jsx("div",{className:"text-sm",children:e.jsx(I,{})}),e.jsx("div",{className:"text-xs ",children:" Products"})]}),e.jsx("div",{className:"text-center text-lg font-bold",children:"New Product"}),e.jsxs("form",{onSubmit:F,className:"flex flex-col justify-center items-center gap-6",children:[e.jsxs("div",{className:"flex flex-wrap justify-around mt-4 gap-3 ",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex flex-col text-sm  gap-2",children:[e.jsxs("div",{className:"flex gap-[2px]",children:[e.jsx("div",{className:"text-red-500",children:"*"}),e.jsx("label",{className:"text-slate-700 dark:text-slate-300 font-semibold",htmlFor:"title",children:"Title"})]}),e.jsx("input",{className:"text-xs  rounded-lg py-1 px-2 bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900",type:"text",id:"title",value:i,onChange:t=>h(t.target.value),placeholder:"Enter product title",required:!0})]}),e.jsxs("div",{className:"flex flex-col text-sm  gap-2",children:[e.jsxs("div",{className:"flex gap-[2px]",children:[e.jsx("div",{className:"text-red-500",children:"*"}),e.jsx("label",{className:"text-slate-700 dark:text-slate-300 font-semibold",htmlFor:"price",children:"Price"})]}),e.jsx("input",{className:"text-xs  rounded-lg py-1 px-2 bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900",type:"number",id:"price",min:1,max:1e5,value:x,onChange:t=>j(Number(t.target.value)),placeholder:"Enter product price",required:!0})]}),e.jsxs("div",{className:"flex flex-col text-sm  gap-2",children:[e.jsxs("div",{className:"flex gap-[2px]",children:[e.jsx("div",{className:"text-red-500",children:"*"}),e.jsx("label",{className:"text-slate-700 dark:text-slate-300 font-semibold",htmlFor:"rating",children:"Rating"})]}),e.jsx("input",{className:"text-xs  rounded-lg py-1 px-2 bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900",type:"number",id:"rating",value:o,onChange:t=>N(Number(t.target.value)),placeholder:"Enter product rating",required:!0,max:5,min:1})]}),e.jsxs("div",{className:"flex flex-col text-sm  gap-2",children:[e.jsxs("div",{className:"flex gap-[2px]",children:[e.jsx("div",{className:"text-red-500",children:"*"}),e.jsx("label",{className:"text-slate-700 dark:text-slate-300 font-semibold",htmlFor:"discountPercentage",children:"Discount Percentage"})]}),e.jsx("input",{className:" text-xs rounded-lg py-1 px-2 bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900",type:"number",id:"discountPercentage",value:m,onChange:t=>b(Number(t.target.value)),placeholder:"Enter discount percentage",required:!0,max:100,min:0})]}),e.jsxs("div",{className:"flex flex-col text-sm  gap-2",children:[e.jsxs("div",{className:"flex gap-[2px]",children:[e.jsx("div",{className:"text-red-500",children:"*"}),e.jsx("label",{className:"text-slate-700 dark:text-slate-300 font-semibold",htmlFor:"stock",children:"Stock"})]}),e.jsx("input",{className:"text-xs  rounded-lg py-1 px-2 bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900",type:"number",id:"stock",value:d,onChange:t=>v(Number(t.target.value)),placeholder:"Enter product stock",required:!0,min:0})]}),e.jsxs("div",{className:"flex flex-col text-sm  gap-2",children:[e.jsxs("div",{className:"flex gap-[2px]",children:[e.jsx("div",{className:"text-red-500",children:"*"}),e.jsx("label",{className:"text-slate-700 dark:text-slate-300 font-semibold",htmlFor:"brand",children:"Brand"})]}),e.jsx("input",{className:"text-xs  rounded-lg py-1 px-2 bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900",type:"text",id:"brand",value:p,onChange:t=>y(t.target.value),placeholder:"Enter product brand",required:!0})]})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex flex-col text-sm  gap-2",children:[e.jsxs("div",{className:"flex gap-[2px]",children:[e.jsx("div",{className:"text-red-500",children:"*"}),e.jsx("label",{className:"text-slate-700 dark:text-slate-300 font-semibold",htmlFor:"category",children:"Category"})]}),e.jsx("input",{className:"text-xs  rounded-lg py-1 px-2 bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900",type:"text",id:"category",value:u,onChange:t=>k(t.target.value),placeholder:"Enter product category",required:!0})]}),e.jsxs("div",{className:"flex flex-col  text-sm  gap-2",children:[e.jsxs("div",{className:"flex gap-[2px]",children:[e.jsx("div",{className:"text-red-500",children:"*"}),e.jsx("label",{className:"text-slate-700 dark:text-slate-300 font-semibold",htmlFor:"description",children:"Description"})]}),e.jsx("textarea",{className:"text-xs  h-[90px] rounded-lg py-1 px-2 bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900",id:"description",value:n,onChange:t=>f(t.target.value),placeholder:"Enter product description",required:!0})]}),e.jsxs("div",{className:"flex flex-col text-sm justify-center cursor-pointer items-center mt-5 gap-2",children:[e.jsxs("div",{className:"flex gap-[2px]",children:[e.jsx("div",{className:"text-red-500",children:"*"}),e.jsx("label",{className:"text-slate-700 dark:text-slate-300 font-semibold",htmlFor:"images",children:"Images"})]}),e.jsx("div",{className:"text-xs font-thin",children:"* Please choose exactly 4 images simontaniously."}),e.jsx("input",{className:"text-xs",type:"file",id:"images",multiple:!0,accept:"image/*",onChange:C,required:!0}),e.jsx("div",{className:"flex flex-wrap text-sm font-semibold gap-2",children:S.map((t,s)=>e.jsx("img",{className:"w-[60px] rounded-3xl",src:t,alt:`Product Image ${s+1}`},s))})]})]})]}),e.jsx("button",{type:"submit",className:"bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900  px-3 text-[15px]  hover:scale-115 mt-4 w-fit  py-1 h-fit  font-semibold cursor-pointer rounded-full",children:"Done"})]})]})};export{M as default};
