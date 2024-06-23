import{j as e,Q as N,u as w,Y as y,a3 as k,Z as $,N as O,L as C,_ as i}from"./index-BGOoP327.js";import{g as D}from"./style-CIDYvWTX.js";import{c as I}from"./index-CVhGOhid.js";import"./iconBase-DY2o13lj.js";const P=()=>e.jsxs("div",{className:"flex flex-wrap gap-4 justify-center mt-6",children:[e.jsxs("div",{className:"flex flex-col gap-2 p-4 border-2 border-slate-500 rounded-3xl items-center animate-pulse",children:[e.jsx("div",{className:"h-6 w-24 bg-slate-400 dark:bg-slate-700 animate-pulse rounded mt-2"}),e.jsx("div",{className:"flex flex-col gap-2 justify-start items-start w-full",children:Array(3).fill(0).map((d,a)=>e.jsxs("div",{className:"flex justify-center items-center gap-4 w-full p-2",children:[e.jsx("div",{className:"w-[50px] h-[50px] bg-slate-400 dark:bg-slate-700 animate-pulse rounded-lg"}),e.jsx("div",{className:"flex-1 h-4 bg-slate-400 dark:bg-slate-700 animate-pulse rounded"}),e.jsx("div",{className:"flex-1 h-4 bg-slate-400 dark:bg-slate-700 animate-pulse rounded"}),e.jsx("div",{className:"flex-1 h-4 bg-slate-400 dark:bg-slate-700 animate-pulse rounded"})]},a))})]}),e.jsxs("div",{className:"flex flex-col gap-2 p-4 border-2 border-slate-500 rounded-3xl items-center animate-pulse",children:[e.jsx("div",{className:"h-6 w-24 bg-slate-400 dark:bg-slate-700 animate-pulse rounded mt-2"}),e.jsxs("div",{className:"flex flex-col gap-2 justify-start items-start w-full",children:[e.jsxs("div",{className:"flex flex-col justify-center items-start gap-2 w-full",children:[e.jsx("div",{className:"h-4 w-16 bg-slate-400 dark:bg-slate-700 animate-pulse rounded"}),e.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[e.jsx("div",{className:"h-4 w-full bg-slate-400 dark:bg-slate-700 animate-pulse rounded"}),e.jsx("div",{className:"h-4 w-full bg-slate-400 dark:bg-slate-700 animate-pulse rounded"}),e.jsx("div",{className:"h-4 w-full bg-slate-400 dark:bg-slate-700 animate-pulse rounded"})]})]}),e.jsxs("div",{className:"flex flex-col justify-center items-start gap-2 w-full",children:[e.jsx("div",{className:"h-4 w-16 bg-slate-400 dark:bg-slate-700 animate-pulse rounded"}),e.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[e.jsx("div",{className:"h-4 w-full bg-slate-400 dark:bg-slate-700 animate-pulse rounded"}),e.jsx("div",{className:"h-4 w-full bg-slate-400 dark:bg-slate-700 animate-pulse rounded"}),e.jsx("div",{className:"h-4 w-full bg-slate-400 dark:bg-slate-700 animate-pulse rounded"}),e.jsx("div",{className:"h-4 w-full bg-slate-400 dark:bg-slate-700 animate-pulse rounded"}),e.jsx("div",{className:"h-4 w-full bg-slate-400 dark:bg-slate-700 animate-pulse rounded"})]})]}),e.jsxs("div",{className:"flex justify-center items-center gap-2 w-full mt-2",children:[e.jsx("div",{className:"h-4 w-12 bg-slate-400 dark:bg-slate-700 animate-pulse rounded"}),e.jsx("div",{className:"h-4 w-20 bg-slate-400 dark:bg-slate-700 animate-pulse rounded"})]})]}),e.jsxs("div",{className:"w-full flex sm:justify-between items-center justify-center flex-col sm:flex-row gap-4 mt-4",children:[e.jsx("div",{className:"h-8 w-32 bg-slate-400 dark:bg-slate-700 animate-pulse rounded-full"}),e.jsx("div",{className:"h-8 w-32 bg-slate-400 dark:bg-slate-700 animate-pulse rounded-full"})]})]})]}),L=()=>{const d=N(),a=w(),{isLoading:c,isError:n,data:l}=y(d.orderId),[x]=k(),[u]=$(),{shippingInfo:t,_id:o,discount:f,orderItems:g,shippingCharges:p,status:r,subTotal:m,tax:h,total:j}=(l==null?void 0:l.order)||{_id:"",shippingInfo:{address:"",city:"",country:"",state:"",billingName:"",phoneNumber:"",pinCode:"",email:""},user:{_id:"",name:""},status:"",tax:0,shippingCharges:0,subTotal:0,total:0,discount:0,orderItems:[{productId:"",thumbnail:"",title:"",price:0,quantity:0}]},b=async()=>{try{const s=await x(o).unwrap();if(s.success){i.success(s.message),a("/admin/transactions");return}else i.error(s.message)}catch(s){console.error(s),i.error("Processing order failed. Please try again.")}},v=async()=>{try{const s=await u(o).unwrap();if(s.success){i.success(s.message),a("/admin/transactions");return}else i.error(s.message)}catch(s){console.error(s),i.error("Deletion failed. Please try again.")}};return n?e.jsx(O,{to:"/404"}):c?e.jsx(P,{}):e.jsxs("div",{className:"grid  w-full max-h-screen p-8 gap-4 sm:grid-cols-3 grid-cols-1",children:[e.jsxs("div",{className:"flex sm:col-span-2 relative flex-col h-fit max-h-[800px] overflow-y-auto gap-2 p-4 border-2 border-slate-500  rounded-3xl items-center ",children:[e.jsxs(C,{to:"/admin/transactions",className:"flex justify-center  items-center px-3 py-1 bg-slate-900 dark:bg-slate-100 text-sm hover:bg-slate-700 dark:hover:bg-slate-300 dark:text-slate-900 text-slate-100 cursor-pointer absolute top-2 left-1 rounded-full",children:[e.jsx(I,{}),e.jsx("div",{children:"Transactions"})]}),e.jsx("div",{className:"text-lg mt-2 font-bold",children:"Order Items"}),e.jsxs("div",{className:"font-thin  text-xs font-mono text-slate-500",children:["Order id : ",o]}),e.jsx("div",{className:"flex flex-col justify-center items-center max-w-[90%]",children:g.map(s=>e.jsx(T,{productId:s.productId,thumbnail:s.thumbnail,title:s.title,price:s.price,quantity:s.quantity},s.productId))})]}),e.jsxs("div",{className:"flex sm:col-span-1 flex-col gap-2 p-4 border-2 border-slate-500 rounded-3xl items-center ",children:[e.jsx("div",{className:"text-lg mt-2 font-bold",children:"Order Info"}),e.jsxs("div",{className:"flex flex-col gap-2 justify-start items-start",children:[e.jsxs("div",{className:"flex flex-col justify-center items-start gap-2",children:[e.jsx("div",{className:"text-sm",children:"User Info :-"}),e.jsxs("div",{className:"text-sm font-thin",children:[e.jsxs("div",{children:["Billing Name: ",t.billingName]}),e.jsxs("div",{children:["Address: ",`${t.address}, ${t.city}, ${t.state}, ${t.country} ${t.pinCode}`]})]})]}),e.jsxs("div",{className:"flex flex-col justify-center items-start gap-2",children:[e.jsx("div",{className:"text-sm",children:"Amount Info :-"}),e.jsxs("div",{className:"text-sm flex flex-col gap-2 font-thin",children:[e.jsxs("div",{children:["Subtotal: $",m]}),e.jsxs("div",{children:["Discount: $",f]}),e.jsxs("div",{children:["Shipping Charges: $",p]}),e.jsxs("div",{children:["Subtotal: $",m]}),e.jsxs("div",{children:["Tax: $",h]}),e.jsxs("div",{className:"font-bold text-green-500",children:["Total: $",j]})]})]}),e.jsxs("div",{className:"flex  justify-center items-center gap-2",children:[e.jsx("div",{className:"text-sm",children:"Status :-"}),e.jsx("div",{className:`${D(r)} text-sm`,children:r})]})]}),e.jsxs("div",{className:"w-full flex  sm:justify-between items-center justify-center mt-4  flex-col  gap-4",children:[e.jsx("button",{className:`bg-green-500 rounded-full px-3 py-1 cursor-pointer w-fit font-semibold text-sm hover:bg-green-600 text-slate-100 ${r==="Delivered"&&"opacity-50 cursor-not-allowed"}`,onClick:b,disabled:r==="Delivered",children:r!=="Delivered"?"Process Order":"Completed"}),e.jsx("button",{className:"bg-red-500 rounded-full px-3 py-1 cursor-pointer w-fit font-semibold text-sm hover:bg-red-600 text-slate-100",onClick:v,disabled:r==="Delivered",children:"Delete"})]})]})]})},T=({productId:d,thumbnail:a,title:c,price:n,quantity:l})=>e.jsxs("div",{className:"flex sm:flex-row flex-col m-2 justify-center items-center gap-4",children:[e.jsx("img",{className:"w-[50px] h-[50px] object-cover rounded-lg",src:a,alt:"order-image"}),e.jsx("div",{className:"text-xs font-mono font-thin text-slate-500",children:d}),e.jsx("div",{className:"text-xs font-semibold",children:c}),e.jsxs("div",{className:"text-xs font-mono",children:["$",n," x ",l," = $",n*l,"/-"]})]});export{L as default};
