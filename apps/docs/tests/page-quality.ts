import manifest from '../../../docs/page-audit/manifest.json';
// This fixture intentionally performs DOM interaction inside its own same-origin iframe.
const frame=document.querySelector<HTMLIFrameElement>('#page')!;
const output=document.querySelector<HTMLElement>('#results')!;
const run=document.querySelector<HTMLButtonElement>('#run')!;
const pause=(ms:number)=>new Promise(resolve=>setTimeout(resolve,ms));
const storageKey='virtari-page-quality-sweep';
const saved=JSON.parse(sessionStorage.getItem(storageKey)??'{"results":[],"running":false}');
output.textContent=JSON.stringify({completed:saved.results.length,total:manifest.length,results:saved.results},null,2);
run.onclick=async()=>{
  run.disabled=true;const results:unknown[]=saved.results.length<manifest.length?saved.results:[];
  sessionStorage.setItem(storageKey,JSON.stringify({results,running:true}));
  for(const [index,item] of manifest.entries()) {
    if(index<results.length) continue;
    frame.style.width='1100px';
    frame.src=`/?quality=${Date.now()}-${index}#/${item.id}`;
    let ready=false;
    for(let attempt=0;attempt<60;attempt++) {await pause(150);if(frame.contentWindow?.location.hash.split('/').at(-1)===item.id&&frame.contentDocument?.querySelector('h1')){ready=true;break;}}
    if(!ready){results.push({page:item.id,error:'No heading rendered within9seconds'});sessionStorage.setItem(storageKey,JSON.stringify({results,running:true}));output.textContent=JSON.stringify({completed:results.length,total:manifest.length,results},null,2);continue;}
    await pause(300);
    const doc=frame.contentDocument!;
    const desktop={width:doc.documentElement.clientWidth,scroll:doc.documentElement.scrollWidth};
    const rawPre=doc.querySelectorAll('pre:not(.vds-code-static)').length;
    const controls=doc.querySelectorAll('input,textarea,button,select').length;
    frame.style.width='390px';await pause(300);
    const mobile={width:doc.documentElement.clientWidth,scroll:doc.documentElement.scrollWidth};
    results.push({page:item.id,title:doc.querySelector('h1')?.textContent,desktopOverflow:desktop.scroll>desktop.width+1,mobileOverflow:mobile.scroll>mobile.width+1,rawPre,controls});
    sessionStorage.setItem(storageKey,JSON.stringify({results,running:true}));
    output.textContent=JSON.stringify({completed:results.length,total:manifest.length,results},null,2);
  }
  run.disabled=false;
  sessionStorage.setItem(storageKey,JSON.stringify({results,running:false}));
};
if(saved.running) run.click();
