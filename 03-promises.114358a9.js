function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r);var l=r("7Y9D8");const u={delay:document.querySelector('[name="delay"]'),step:document.querySelector('[name="step"]'),amount:document.querySelector('[name="amount"]'),form:document.querySelector(".form")};let i=1,a=null;function d(){if(i===Number(u.amount.value)+1)return clearInterval(a),i=1,u.amount.value="",u.delay.value="",void(u.step.value="");var t,o;t=i,o=u.delay.value,new Promise(((n,r)=>{{const n=Math.random()>.3;setTimeout((()=>{n?e(l).Notify.success(`✅ Fulfilled promise ${t} in ${o}ms`,{timeout:1e4,width:"280px",opacity:1,cssAnimationStyle:"from-top"}):e(l).Notify.failure(`❌ Rejected promise ${t} in ${o}ms`,{timeout:1e4,width:"280px",opacity:1,cssAnimationStyle:"from-top"})}),o)}})),i+=1}u.form.addEventListener("submit",(function(e){e.preventDefault(),a=setInterval(d,u.step.value)}));
//# sourceMappingURL=03-promises.114358a9.js.map
