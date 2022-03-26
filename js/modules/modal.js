import * as data from './forms';

const modalTimerId = setTimeout(showModal,5000);
export const formSubmitMessages = {
    loading: '<img src="img/form/spinner.svg" style="display:block; margin:0 auto;"/>',
    success: 'Спасибо за отправку! В ближайшее время мы с вами свяжемся',
    failure: 'Не удалось отправить форму. Попробуйте позднее'
}; 
export function clearPrevModalMessage(){
    const prevModalMessage = document.querySelector('.modal__message');
    if (prevModalMessage) prevModalMessage.remove();
}


function hideModalFormContent(){
    const oldContent = document.querySelector('.modal .modal__content');
    oldContent.classList.add('hide');
    oldContent.classList.remove('show');

}

export function showModalMessage(message, timeout=0){
    showModal();
    clearPrevModalMessage();
    hideModalFormContent();
    const modal = document.querySelector('.modal .modal__dialog');
    const container = document.createElement('div');
    container.classList.add('modal__content');
    container.classList.add('modal__message');
    const newContent = `
        <div data-modal-close="" class="modal__close">×</div>
        <div class="modal__title">${message}</div>
    `;
    container.innerHTML=newContent;
    modal.append(container);
    if(timeout){
        timerForCloseModalForm =  setTimeout(function(){
            closeModal();
        },timeout);
    }
}

function showModal(){
    const modal = document.querySelector('.modal');
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow='hidden';
    clearTimeout(modalTimerId);
}
const forms = document.querySelectorAll('form');
let timerForCloseModalForm;
forms.forEach(form =>{
    form.addEventListener('submit', function(event){
        event.preventDefault();
        data.postForm(event.target);
    });
});
function modal(){
    
    
    //Modal
    const modalBtn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
    modalBtn.forEach(function (item){
        item.addEventListener('click', showModal);
    });
    
    
    modal.addEventListener('click', (e)=>{
       // console.log(e);
       if(e.target==modal || e.target.getAttribute('data-modal-close')=='') {
        closeModal();
       }

    });
    document.addEventListener('keydown', (e)=>{
        if (e.code=='Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });
   
    function showModalByScroll(){
        if(document.documentElement.offsetHeight - (document.documentElement.scrollTop + document.documentElement.clientHeight + 1)<0){
            document.removeEventListener('scroll', showModalByScroll);
            showModal();
            
        }
    }
    function closeModal(){
        data.clearForm();
        clearTimeout(timerForCloseModalForm);
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow='';
    }

  

 

    
    document.addEventListener('scroll', showModalByScroll);
}

export default modal;