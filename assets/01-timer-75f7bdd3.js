import{f as y,i as p}from"./vendor-77e16229.js";const s=document.querySelector("button"),b=document.querySelector("span[data-days]"),T=document.querySelector("span[data-hours]"),g=document.querySelector("span[data-minutes]"),S=document.querySelector("span[data-seconds]");let r=0;const v={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t[0].getTime()<Date.now()?(s.setAttribute("disabled",""),p.error({title:"Error",message:"Please choose a date in the future",position:"topRight"})):t[0].getTime()>Date.now()&&(s.removeAttribute("disabled"),r=t[0].getTime())}};y("#datetime-picker",v);let a=0;const i=(t,o)=>{const e=Date.now();return a=t-e,o(a)},u=t=>{const l=Math.floor(t/864e5),m=Math.floor(t%864e5/36e5),h=Math.floor(t%864e5%36e5/6e4),f=Math.floor(t%864e5%36e5%6e4/1e3);return{days:l,hours:m,minutes:h,seconds:f}},C=t=>Object.values(t).map(e=>e.toString().padStart(2,"0")),d=({days:t,hours:o,minutes:e,seconds:c})=>{const n=C({days:t,hours:o,minutes:e,seconds:c});b.textContent=`${n[0]}`,T.textContent=`${n[1]}`,g.textContent=`${n[2]}`,S.textContent=`${n[3]}`},E=t=>{clearInterval(t),s.setAttribute("disabled","")},q=()=>{d(i(r,u));const t=setInterval(()=>{r--,d(i(r,u)),a<1e3&&E(t)},1e3)};s.addEventListener("click",q);
//# sourceMappingURL=01-timer-75f7bdd3.js.map
