import{r as h,V as f,e as b,j as e,L as c,k as d,_ as r,s as o}from"./index-BGOoP327.js";import{i as w}from"./index-DUXrVzM3.js";import{G as j}from"./iconBase-DY2o13lj.js";function y(n){return j({tag:"svg",attr:{version:"1.1",x:"0px",y:"0px",viewBox:"0 0 48 48",enableBackground:"new 0 0 48 48"},child:[{tag:"path",attr:{fill:"#FFC107",d:`M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12\r
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24\r
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z`},child:[]},{tag:"path",attr:{fill:"#FF3D00",d:`M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657\r
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z`},child:[]},{tag:"path",attr:{fill:"#4CAF50",d:`M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36\r
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z`},child:[]},{tag:"path",attr:{fill:"#1976D2",d:`M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571\r
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z`},child:[]}]})(n)}const L=()=>{const[n,x]=h.useState({username:"",password:""}),[m]=f(),l=b(),i=t=>{x(s=>({...s,[t.target.name]:t.target.value}))},g=async t=>{t.preventDefault();try{const s=await m(n).unwrap();s.success?(l(d(s.user)),r.success(s.message)):r.error("Not able to login. Please try again after some time.")}catch(s){r.error(s.data.message)}},a=t=>{t.origin===o&&(t.data.success?(l(d(t.data.user)),r.success(t.data.message)):r.error("Sign in failed. Try again later."))},u=()=>{try{window.open(`${o}/auth/google`,"_blank"),window.removeEventListener("message",a),window.addEventListener("message",a)}catch{r.error("Sign in failed with Google. Try again later.")}},p=()=>{try{window.open(`${o}/auth/github`,"_blank"),window.removeEventListener("message",a),window.addEventListener("message",a)}catch{r.error("Sign in failed with GitHub. Try again later.")}};return e.jsx("div",{className:"container h-fit",children:e.jsxs("div",{className:"flex flex-col mx-auto text-xs bg-slate-900 dark:bg-slate-100 mt-[10px] sm:mt-[20px] text-slate-100 dark:text-slate-900 w-[300px] lg:w-[400px] rounded-xl",children:[e.jsx("div",{className:"font-bold mx-auto font-serif mt-6 text-xl underline",children:e.jsx("p",{children:"Login"})}),e.jsxs("div",{className:"mx-4",children:[e.jsxs("form",{className:"mt-6 flex flex-col gap-4",onSubmit:g,children:[e.jsx("div",{className:"flex flex-col gap-2",children:e.jsx("input",{name:"username",required:!0,onChange:i,type:"text",placeholder:"Enter your username.",className:"border-gray-400 border-2 py-2 px-1 text-slate-900 rounded-md"})}),e.jsx("div",{className:"flex flex-col gap-2",children:e.jsx("input",{name:"password",required:!0,onChange:i,type:"password",placeholder:"Enter your password.",className:"border-gray-400 border-2 text-slate-900 py-2 px-1 rounded-md"})}),e.jsx(c,{to:"/forgot-password",className:"text-blue-500 text-center",children:"Forgot password?"}),e.jsx("button",{className:"bg-blue-500 text-slate-100 font-semibold py-3 w-[90%] mx-auto rounded-xl",type:"submit",children:"Login"}),e.jsxs(c,{to:"/register",className:"font-thin mx-auto",children:["Don't have an account? ",e.jsx("span",{className:"text-blue-500 font-serif",children:"Register"})]})]}),e.jsxs("div",{className:"flex mt-8 justify-around items-center",children:[e.jsx("p",{className:"border-b border-gray-400 w-[33%]"}),e.jsx("p",{className:"font-thin",children:"OR"}),e.jsx("p",{className:"border-b border-gray-400 w-[33%]"})]}),e.jsxs("div",{className:"flex flex-col justify-center items-center",children:[e.jsxs("button",{className:"bg-slate-100 text-gray border border-gray-400 mt-4 w-[90%] py-3 rounded-xl gap-2 font-semibold flex text-slate-900 dark:text-slate-900 justify-center items-center",onClick:p,children:[e.jsx(w,{}),e.jsx("p",{children:"Login with Github"})]}),e.jsxs("button",{className:"bg-slate-100 text-gray border border-gray-400 mt-4 w-[90%] py-3 rounded-xl gap-2 font-semibold flex text-slate-900 dark:text-slate-900 justify-center items-center mb-6",onClick:u,children:[e.jsx(y,{}),e.jsx("p",{children:"Login with Google"})]})]})]})]})})};export{L as default};
