import{_ as r,o as n,c as a,a as d,x as i,w as p,b as s,n as u,s as m,v as f,d as T,t as h,B as b,y as x,R as $}from"./D4crdWAI.js";import{_ as g}from"./l4T6qnyd.js";const w=""+new URL("BlackLogo.CCSfRLfy.jpg",import.meta.url).href,y={},k={class:"w-full px-auto"},v=d("img",{class:"w-20 h-20 rounded-full mx-auto",src:w},null,-1),N=[v];function B(o,t){return n(),a("div",k,N)}const I=r(y,[["render",B]]),C={},L={class:"font-extrabold text-center"};function H(o,t){return n(),a("div",L," Flux Dev ")}const V=r(C,[["render",H]]),R={};function S(o,t){const c=I,_=V,e=g;return n(),i(e,{to:"/",class:"cursor-pointer"},{default:p(()=>[s(c),s(_)]),_:1})}const D=r(R,[["render",S]]),j=u({__name:"Title",props:{tabIdx:{},context:{},isToggled:{type:Boolean}},setup(o){const t=o,c=()=>t.isToggled?"text-black":"text-white cursor-pointer";return m(async()=>{await f()}),(_,e)=>{const l=g;return n(),i(l,{to:`/showcase?tab=${t.tabIdx}`,class:b(["w-full text-center rounded-t-md mx-[1px] mt-[1px] px-auto bg-slate-400",c()])},{default:p(()=>[T(h(t.context),1)]),_:1},8,["to","class"])}}}),z={class:"flex flex-row"},E=u({__name:"index",props:{idx:{}},setup(o){const t=o;return m(async()=>{await f()}),(c,_)=>{const e=j;return n(),a("div",z,[s(e,{tabIdx:0,context:"website",isToggled:t.idx===0},null,8,["isToggled"]),s(e,{tabIdx:1,context:"web game",isToggled:t.idx===1},null,8,["isToggled"]),s(e,{tabIdx:2,context:"playable ad",isToggled:t.idx===2},null,8,["isToggled"]),s(e,{tabIdx:3,context:"etc",isToggled:t.idx===3},null,8,["isToggled"])])}}}),F={class:"w-full h-full"},M={key:0,class:"mt-1"},U=d("div",{class:"my-4"},null,-1),q={class:"w-full h-full bg-slate-400 rounded-b-md"},J=u({__name:"tabcontent",props:{tabIdx:{},isNoTop:{type:Boolean}},setup(o){const t=o;return(c,_)=>{const e=D,l=E;return n(),a("div",F,[t.isNoTop?x("",!0):(n(),a("div",M)),t.isNoTop?x("",!0):(n(),i(e,{key:1})),U,s(l,{idx:t.tabIdx},null,8,["idx"]),d("div",q,[$(c.$slots,"default")])])}}});export{J as default};