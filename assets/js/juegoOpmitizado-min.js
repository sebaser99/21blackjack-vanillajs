const a=(()=>{let d=[],e=["A","J","Q","K"],f=["C","D","H","S"],g=[],h=document.querySelectorAll(".cartas-contenedor");document.querySelector("#newGame");let a=document.querySelector("#askCard"),b=document.querySelector("#stopGame"),i=document.querySelectorAll("small"),c=(e=2)=>{j(!a.disabled,!b.disabled),d=[],d=k(),g=[];for(let c=0;c<e;c++)g.push(0);console.clear(),i.forEach(a=>a.innerText=0),h.forEach(a=>a.innerText="")},j=(c,d)=>{a.disabled=c,b.disabled=d},k=()=>{for(let a=2;a<10;a++)for(let b of f)d.push(a+b);for(let c of f)for(let g of e)d.push(g+c);return _.shuffle(d)},l=()=>{if(0===d.length)throw"No hay cartas en el deck";return d.shift()},m=b=>{let a=b.substring(0,b.length-1);return isNaN(a)?"A"===a?11:10:1*a},n=(b,c)=>{let a=document.createElement("img");a.src=`./assets/cartas/${b}.png`,a.classList.add("carta"),h[c].append(a)},o=(a,b)=>{setTimeout(()=>{a===b?alert("Empate, la m\xe1quinay tu hiceron los mismos puntos"):b>21?alert("PC Gana!!!, hiciste m\xe1s de 21 puntos"):a>21?alert("Ganaste, Pc hizo m\xe1s de 21 puntos"):alert(`PC Gana hizo ${a} y tu ${b} puntos`)},200)},p=(b,a)=>(g[a]=g[a]+m(b),i[a].innerText=g[a],g[a]),q=c=>{c>21?(console.warn("Lo siento, hiciste m\xe1s de 21 puntos"),j(!a.disabled,!b.disabled),r(c)):21===c&&(console.warn("Genial, hiciste 21 puntos"),j(!a.disabled,!b.disabled),r(c))},r=a=>{console.log(`Tu puntaje es de ${a} puntos `);let b=l();do p(b,g.length-1),n(b,g.length-1);while(g[g.length-1]<a&&a<=21)o(g[g.length-1],a)};return a.addEventListener("click",()=>{let a=l();p(a,0),n(a,0),q(g[0])}),b.addEventListener("click",()=>{j(!a.disabled,!b.disabled),r(g[0])}),{nuevoJuego:c}})()