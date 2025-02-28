let pokemonRepository=function(){let e=[];function t(){return e}function o(t){e.push(t)}function n(e){let t=e.detailsUrl;return fetch(t).then(e=>e.json()).then(t=>{e.imageUrl=t.sprites.front_default,e.height=t.height,console.log("Details loaded for:",e.name)}).catch(e=>{console.error(e)})}function a(e){console.log("showModal called for:",e.name),$("#pokemonModalLabel").text(`#${e.name}`),$("#pokemonModalImage").attr("src",e.imageUrl),$("#pokemonModalHeight").text(`Height: ${e.height}`),$("#pokemonModal").modal("show")}return{getAll:t,add:o,addListItem:function e(t){let o=document.querySelector(".pokemon-list"),l=document.createElement("li");l.classList.add("list-group-item");let r=document.createElement("button");r.innerText=t.name,r.classList.add("pokemon-button","btn","btn-primary"),r.setAttribute("data-toggle","modal"),r.setAttribute("data-target","#pokemonModal"),r.addEventListener("click",()=>{var e;console.log("Button clicked for:",t.name),e=t,console.log("showDetails called for:",e.name),n(e).then(()=>{a(e)})}),l.appendChild(r),o.appendChild(l)},loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151").then(e=>e.json()).then(e=>{e.results.forEach(e=>{o({name:e.name,detailsUrl:e.url})})}).catch(e=>{console.error(e)})},loadDetails:n,showModal:a}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});const searchInput=document.getElementById("search-input"),pokemonItems=document.querySelectorAll(".pokemon-item");searchInput.addEventListener("input",()=>{let e=searchInput.value.toLowerCase();pokemonItems.forEach(t=>{let o=t.textContent.toLowerCase();o.includes(e)?t.style.display="block":t.style.display="none"})});