import{c as x,o as b,i as h,e as j,_ as t,r as l,j as a,s as C,l as H}from"./index-BGOoP327.js";import{T as w,a as v}from"./TableSkeleton-DgHVCAiu.js";import"./index-DUXrVzM3.js";import"./iconBase-DY2o13lj.js";const y=[{Header:"Avatar",accessor:"avatar"},{Header:"Name",accessor:"name"},{Header:"Gender",accessor:"gender"},{Header:"Email",accessor:"email"},{Header:"Role",accessor:"role"},{Header:"Action",accessor:"action"}],A=()=>{const{user:r}=x(e=>e.userReducer),{data:o,isError:n,error:i,isLoading:d}=b(),[u]=h(),m=j();if(n){const e=i;t.error(e.data.message)}const[c,p]=l.useState([]);l.useEffect(()=>{o&&o.users&&p(o.users.map(e=>{const s=e.image;return{avatar:a.jsx("img",{className:"w-24 h-24 object-contain rounded-full",src:s.startsWith("a")?`${C}/${s}`:s,alt:e.username}),name:`${e.username.toUpperCase()} ${e._id===(r==null?void 0:r._id)?"(You)":""}`,gender:e.gender.toUpperCase(),email:e.email.toUpperCase(),role:e.role.toUpperCase(),action:a.jsx("button",{onClick:()=>g(e._id),className:"bg-blue-500 px-3 py-1 hover:bg-blue-600 rounded-full font-semibold cursor-pointer text-slate-100",children:"Delete"})}}))},[o]);const g=async e=>{try{if(e===(r==null?void 0:r._id))return t.success("Go to profile section to delete yourself.");const s=await u(e).unwrap();s.success?(t.success(s.message),m(H())):t.error(s.message)}catch(s){console.error(s),t.error("Registration failed. Please try again.")}},f=w(y,c,"bg-slate-100  text-slate-900 dark:bg-slate-900 dark:text-slate-100 w-full overflow-x-auto  h-[500px]  mt-4","Customers",c.length>6);return a.jsx(a.Fragment,{children:d?a.jsx(v,{}):a.jsx(f,{})})};export{A as default};
