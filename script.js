const carData = {
  "Terra X": {type:"SUV · 5 seater",price:"₹18.5 Lakh*",power:"190 PS",efficiency:"16.2 km/l*",seats:"5",fuel:"Petrol / Diesel*",features:"Panoramic roof, connected display, rear camera, drive modes",summary:"A versatile SUV concept with a confident stance, flexible cabin and everyday comfort."},
  "Linea S": {type:"Sedan · 5 seater",price:"₹14.2 Lakh*",power:"150 PS",efficiency:"18.4 km/l*",seats:"5",fuel:"Petrol*",features:"Digital cockpit, wireless connectivity, cruise control, LED lighting",summary:"A refined sedan concept that balances a composed ride with a sporty design."},
  "Volt E": {type:"Electric · 5 seater",price:"₹22.9 Lakh*",power:"210 PS",efficiency:"450 km range*",seats:"5",fuel:"Electric",features:"Regenerative braking, connected navigation, fast-charge support, drive modes",summary:"An electric vehicle concept designed around quiet travel and modern technology."},
  "Summit 7": {type:"SUV · 7 seater",price:"₹26.8 Lakh*",power:"205 PS",efficiency:"14.8 km/l*",seats:"7",fuel:"Diesel*",features:"Three-row seating, rear AC, terrain modes, 360° camera",summary:"A spacious family SUV concept with room for passengers, luggage and plans."},
  "Racer GT": {type:"Sport · 2+2 seater",price:"₹34.5 Lakh*",power:"280 PS",efficiency:"5.8 sec 0–100*",seats:"4",fuel:"Petrol*",features:"Sport suspension, paddle shifters, performance display, premium audio",summary:"A sporty coupe concept with expressive styling and an engaging driving character."},
  "Regal LX": {type:"Sedan · 5 seater",price:"₹29.7 Lakh*",power:"220 PS",efficiency:"15.5 km/l*",seats:"5",fuel:"Petrol / Hybrid*",features:"Ventilated seats, premium sound, driver assistance, ambient lighting",summary:"An executive sedan concept focused on comfort, quietness and connected features."}
};
const selected = [];
const toast = document.getElementById("toast");
let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2300);}

document.getElementById("filters").addEventListener("click",e=>{
  const btn=e.target.closest(".filter"); if(!btn)return;
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
  document.querySelectorAll(".car-card").forEach(card=>card.hidden=btn.dataset.filter!=="All"&&card.dataset.type!==btn.dataset.filter);
});

function showDetails(name){
  const car=carData[name];if(!car)return;
  document.getElementById("modalContent").innerHTML=`
    <div class="eyebrow dark"><span></span> APEX MODEL DETAILS</div>
    <h3>${name}</h3><p>${car.summary}</p>
    <div class="modal-specs"><div><b>${car.power}</b><span>Power (sample)</span></div><div><b>${car.efficiency}</b><span>Performance (sample)</span></div><div><b>${car.seats}</b><span>Seats</span></div></div>
    <p><strong>Category:</strong> ${car.type}<br><strong>Fuel type:</strong> ${car.fuel}<br><strong>Indicative price:</strong> ${car.price}</p>
    <p><strong>Highlighted features</strong><br>${car.features}</p>
    <a class="modal-link" href="#test-drive" id="modalBook">Request a test drive ↗</a>
    <p class="disclaimer">Illustrative sample specifications and pricing only. Confirm actual details with an authorised dealer.</p>`;
  const modal=document.getElementById("detailsModal");modal.classList.add("open");modal.setAttribute("aria-hidden","false");
  document.getElementById("modalBook").addEventListener("click",()=>{document.getElementById("modelSelect").value=name;closeModal();});
}
function closeModal(){const modal=document.getElementById("detailsModal");modal.classList.remove("open");modal.setAttribute("aria-hidden","true");}
document.getElementById("carGrid").addEventListener("click",e=>{
  const details=e.target.closest(".details-btn"), compare=e.target.closest(".compare-add");
  if(details)showDetails(details.dataset.car);
  if(compare)toggleCompare(compare.dataset.compare);
});
document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});

function toggleCompare(name){
  const index=selected.indexOf(name);
  if(index>=0)selected.splice(index,1);
  else if(selected.length>=3){notify("You can compare up to 3 models at a time");return;}
  else selected.push(name);
  renderCompare();
}
function renderCompare(){
  document.querySelectorAll(".compare-add").forEach(btn=>{
    const active=selected.includes(btn.dataset.compare);btn.classList.toggle("selected",active);btn.textContent=active?"✓ Added":" + Compare";
  });
  document.getElementById("compareCount").textContent=`${selected.length} of 3 models selected`;
  const body=document.getElementById("compareTable");
  if(!selected.length){body.innerHTML='<tr><td colspan="4" class="empty-compare">Choose “+ Compare” on any car card to start comparing.</td></tr>';return;}
  const rows=[["Model","name"],["Category","type"],["Indicative price","price"],["Power","power"],["Mileage / range / acceleration","efficiency"],["Seating","seats"],["Fuel type","fuel"],["Key features","features"]];
  body.innerHTML=rows.map(([label,key])=>`<tr><td>${label}</td>${selected.map(name=>`<td>${key==="name"?name:carData[name][key]}</td>`).join("")}${Array.from({length:3-selected.length},()=>"<td>—</td>").join("")}</tr>`).join("");
}
document.getElementById("clearCompare").addEventListener("click",()=>{selected.splice(0);renderCompare();});

const dateInput=document.getElementById("driveDate");
const today=new Date();const localDate=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().split("T")[0];dateInput.min=localDate;
document.getElementById("testDriveForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(!e.currentTarget.reportValidity())return;
  document.getElementById("formSuccess").hidden=false;
  e.currentTarget.reset();notify("Demo test-drive request completed");
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
