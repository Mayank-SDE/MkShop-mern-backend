import{j as e,q as f,N as m}from"./index-BGOoP327.js";import{P as i,D as l}from"./Charts-DcQYOEtG.js";const s=()=>e.jsxs("div",{className:"animate-pulse flex flex-col justify-center items-center w-[300px] h-[300px]  gap-4 bg-slate-900 dark:bg-slate-100  rounded-full p-6",children:[e.jsx("div",{className:"bg-slate-700 dark:bg-slate-400 animate-pulse rounded-full h-32 w-32 mb-4"}),e.jsx("div",{className:"bg-slate-700 dark:bg-slate-400 animate-pulse h-6 w-3/4 rounded"})]}),x=()=>e.jsxs("div",{className:"flex  flex-col w-full justify-center items-center m-6 gap-4 sm:gap-20",children:[e.jsx(s,{}),e.jsx(s,{}),e.jsx(s,{}),e.jsx(s,{}),e.jsx(s,{}),e.jsx(s,{})]}),g=["#007BFF","#FFA500","#6F42C1","#28A745","#20C997","#FF0000","#FFD700","#800080","#00FF00","#0000FF","#FFFF00","#00FFFF","#FF00FF","#C0C0C0","#808080","#FF4500","#800000","#2E8B57","#4B0082","#8A2BE2","#4682B4"],j=()=>{const{data:o,isLoading:n,isError:a}=f(),t=o==null?void 0:o.pieCharts;if(a)return e.jsx(m,{to:"/admin/dashboard"});if(n)return e.jsx(x,{});const d=[t.orderFullfillmentRatio.placed,t.orderFullfillmentRatio.picked,t.orderFullfillmentRatio.packed,t.orderFullfillmentRatio.shipped,t.orderFullfillmentRatio.delivered],c=[t.revenueDistribution.marketingCost,t.revenueDistribution.discount,t.revenueDistribution.burnt,t.revenueDistribution.productionCost,t.revenueDistribution.netMargin],u=[t.usersAgeGroup.teen,t.usersAgeGroup.adult,t.usersAgeGroup.old];return e.jsxs("div",{className:"flex flex-col w-full justify-center items-center  mt-6 gap-4 sm:gap-20",children:[e.jsxs("div",{className:"flex flex-col justify-center items-center w-full h-[400px] gap-4",children:[e.jsx(i,{labels:["Placed","Picked","Packed","Shipped","Delivered"],data:d,backgroundColor:["#007BFF","#FFA500","#6F42C1","#28A745","#20C997"],offset:[0,50]}),e.jsx("div",{className:"font-bold text-lg underline font-mono",children:"Order Fullfillment ratio"})]}),e.jsxs("div",{className:"flex flex-col justify-center items-center w-full h-[400px] mt-14 gap-4",children:[e.jsx(l,{labels:t.productCategories.map(r=>Object.keys(r)[0]),data:t.productCategories.map(r=>Object.values(r)[0]),legends:!1,backgroundColor:g,offset:[0,50]}),e.jsx("div",{className:"font-bold text-lg underline font-mono",children:"Products-Categories ratio"})]}),e.jsxs("div",{className:"flex flex-col justify-center items-center w-full h-[400px] mt-8 gap-4",children:[e.jsx(l,{labels:["In Stock","Out of Stock"],data:[t.stockAvailability.inStock,t.stockAvailability.outOfStock],legends:!1,backgroundColor:["green","blue"],offset:[0,50],cutout:"70%"}),e.jsx("div",{className:"font-bold text-lg underline font-mono",children:"Stock Availability"})]}),e.jsxs("div",{className:"flex flex-col justify-center items-center w-full h-[400px] mt-8 gap-4",children:[e.jsx(l,{labels:["Marketing Cost","Discount","Burnt","Production Cost","Net Margin"],data:c,legends:!1,backgroundColor:["#FFA500","#6F42C1","#28A745","#20C997"],offset:[20,30,20,30,80]}),e.jsx("div",{className:"font-bold text-lg underline font-mono",children:"Revenue Distribution"})]}),e.jsxs("div",{className:"flex flex-col justify-center items-center w-full h-[400px] gap-4",children:[e.jsx(i,{labels:["Teenage (Below 20)","Adults (20 - 40)","Older (Above 40)"],data:u,backgroundColor:["#007BFF","#FFA500","#6F42C1"],offset:[0,0,50]}),e.jsx("div",{className:"font-bold text-lg underline font-mono",children:"User Age Group"})]}),e.jsxs("div",{className:"flex flex-col justify-center items-center w-full h-[400px] mt-14 gap-4",children:[e.jsx(l,{labels:["Admin","Customers"],data:[t.adminCustomer.admin,t.adminCustomer.customer],legends:!1,backgroundColor:["#FFA500","#6F42C1"],offset:[0,50]}),e.jsx("div",{className:"font-bold text-lg underline font-mono",children:"User-Admin ratio"})]})]})};export{j as default};
