!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),a=null;t.addEventListener("click",(function(){t.disabled=!0,n.disabled=!1,a=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));e.style.background=t}),1e3)})),n.addEventListener("click",(function(){n.disabled=!0,t.disabled=!1,clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.3504d72f.js.map