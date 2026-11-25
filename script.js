const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.main-nav');
if(menuButton&&navigation){menuButton.addEventListener('click',()=>{const opened=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(opened));menuButton.textContent=opened?'×':'☰';});}

const listingForm=document.querySelector('#filters');
if(listingForm){
  const params=new URLSearchParams(window.location.search);
  for(const field of listingForm.elements){if(field.name&&params.has(field.name))field.value=params.get(field.name);}
  const applyFilters=(event)=>{
    event?.preventDefault();
    const place=listingForm.elements.luogo.value.trim().toLocaleLowerCase('it');
    const type=listingForm.elements.tipo.value;
    const ceiling=Number(listingForm.elements.prezzo.value||0);
    let visible=0;
    document.querySelectorAll('#listing-grid .property-card').forEach(card=>{
      const match=(!place||card.dataset.title.includes(place))&&(!type||card.dataset.type===type)&&(!ceiling||Number(card.dataset.price)<=ceiling);
      card.hidden=!match;if(match)visible++;
    });
    document.querySelector('#result-count').textContent=`${visible} ${visible===1?'immobile disponibile':'immobili disponibili'}`;
    document.querySelector('#empty-state').hidden=visible!==0;
  };
  listingForm.addEventListener('submit',applyFilters);
  if(params.size)applyFilters();
}

/*ARGUS-moduli*/
document.querySelectorAll('.contact-form').forEach(form=>form.addEventListener('submit',async event=>{
  event.preventDefault();
  const message=form.querySelector('.form-message');const button=form.querySelector('button[type=submit]');
  const data={azione:'modulo_dama',tipo:form.dataset.tipo||'contatto',pagina:location.pathname};for(const el of form.elements){if(el.name)data[el.name]=el.value;}
  if(button)button.disabled=true;if(message)message.textContent='Invio in corso…';
  try{const r=await fetch("https://script.google.com/macros/s/AKfycbyXirMx9wwWZL1hlGQ1-7yRYM8Fc_GwPYI4YGJduIiz0tsi4uZPB1I6LQCFK88UBb26DA/exec",{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)});const j=await r.json();
    if(!j.ok)throw new Error(j.errore||'errore');if(message)message.textContent='Grazie! Abbiamo ricevuto la richiesta: ti ricontattiamo al più presto.';form.reset();}
  catch(e){if(message)message.innerHTML='Non siamo riusciti a inviare il modulo. Scrivici su <a href="https://wa.me/393505827188">WhatsApp</a> o a <a href="mailto:info@immobiliaredama.eu">info@immobiliaredama.eu</a>.';}
  finally{if(button)button.disabled=false;}
}));
/*/ARGUS-moduli*/
