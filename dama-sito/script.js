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

document.querySelectorAll('.contact-form').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault();
  const message=form.querySelector('.form-message');
  if(message)message.textContent='Grazie! La richiesta è stata registrata in questa demo. Per ricevere i messaggi collega il sito a un servizio di invio.';
  form.reset();
}));
