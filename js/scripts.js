'use strict'; 
window.addEventListener('DOMContentLoaded', ()=>{

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item=>{
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent (i=0){
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show','fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    
    hideTabContent();
    showTabContent();
    tabsParent.addEventListener('click',(event)=>{
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item,i) =>{
                if(item==target){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer
    const customeTimer = {
        // определяем, сколько времени осталось открутить таймеру
        getTimeRemain: function (endtime){
            const total = new Date (endtime) - new Date(),
                    days = Math.floor(total / (1000 * 60 * 60 * 24)),
                    hours = Math.floor(total / (1000*60*60)%24),
                    minutes = Math.floor(total / (1000*60)%60),
                    seconds = Math.floor((total / 1000)%60);
            return {total,days,hours,minutes,seconds};
        },
        // делаем числа двухзначными    
        twoDigits: function (num){
            if(typeof(num)=='number' && num < 10){
                return '0'+num;
            }
            else {return num;}
        },
        make: function (selector, endTime){
            const data = customeTimer.getTimeRemain(endTime),
                  box = document.querySelector(selector),
                  days = box.querySelector('#days'),
                  hours = box.querySelector('#hours'),
                  minutes = box.querySelector('#minutes'),
                  seconds = box.querySelector('#seconds');
            if (data.total && data.total > 0){
                days.innerHTML=customeTimer.twoDigits(data.days);
                hours.innerHTML=customeTimer.twoDigits(data.hours);
                minutes.innerHTML=customeTimer.twoDigits(data.minutes);
                seconds.innerHTML=customeTimer.twoDigits(data.seconds);
                
                setTimeout(customeTimer.make,1000,selector,endTime);
            }
            else{
                days.innerHTML=customeTimer.twoDigits(0);
                hours.innerHTML=customeTimer.twoDigits(0);
                minutes.innerHTML=customeTimer.twoDigits(0);
                seconds.innerHTML=customeTimer.twoDigits(0);
            }
        }
    };
    customeTimer.make('.promotion__timer', '2022-03-16');


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
    function showModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow='hidden';
        clearTimeout(modalTimerId);
    }
    function showModalByScroll(){
        if(document.documentElement.offsetHeight - (document.documentElement.scrollTop + document.documentElement.clientHeight + 1)<0){
            document.removeEventListener('scroll', showModalByScroll);
            showModal();
            
        }
    }
    function closeModal(){
        clearForm();
        clearTimeout(timerForCloseModalForm);
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow='';
    }

    const modalTimerId = setTimeout(showModal,5000);
    document.addEventListener('scroll', showModalByScroll);
    
// Menu using class
class Menu {
    constructor (title, descr, src, alt, price, parentSelector, ...classes){
        this.title = title;
        this.descr = descr;
        this.src = src;
        this.alt = alt;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
    }

    render(){
        const el = document.createElement('div');
        if (this.classes.length){
            this.classes.forEach(item => {el.classList.add(item);});
        }
        else {
            el.classList.add('menu__item');
        }
        
        el.innerHTML=`
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
        `;
        this.parent.append(el);
    }

}
 
new Menu (
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '"img/tabs/vegy.jpg"',
        '"vegy"',
        229,
        '.menu .container'
        ).render();
new Menu (
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    "img/tabs/elite.jpg",
    '"elite"',
    550,
    '.menu .container',
    'menu__item'
    ).render();
new Menu (
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    '"img/tabs/post.jpg"',
    '"post"',
    430,
    '.menu .container',
    'menu__item'
    ).render();

    
// Post forms
const forms = document.querySelectorAll('form');
const formSubmitMessages = {
    loading: '<img src="img/form/spinner.svg" style="display:block; margin:0 auto;"/>',
    success: 'Спасибо за отправку! В ближайшее время мы с вами свяжемся',
    failure: 'Не удалось отправить форму. Попробуйте позднее'
}; 
let timerForCloseModalForm;
forms.forEach(form =>{
    form.addEventListener('submit', function(event){
        event.preventDefault();
        postForm(event.target);
    });
});


function postForm(form){
    const formData = new FormData(form);
    // const request = new XMLHttpRequest();
    // const data = {};
    // formData.forEach(function(v,k){
    //     data[k]=v;
    // });
    // console.log(data);
    fetch('modules/server.php', {
        method: 'POST',
        // headers: {
        //     'Content-type':'application/json;charset=utf-8'
        // },
        body: formData
    }).then(data=>{return data.text();})
    .then((data)=>{
        console.log(data);
        showModalMessage(formSubmitMessages.success, 3000);
    }).catch(()=>{
        showModalMessage(formSubmitMessages.failure, 3000);
    }).finally(()=>{form.reset();});
    
    /*request.open('POST', 'modules/server.php');
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify(data));
    showModalMessage(formSubmitMessages.loading);
    request.addEventListener('load', function(){
        
        if (request.status==200){
            showModalMessage(formSubmitMessages.success, 3000);
        }
        else{
            showModalMessage(formSubmitMessages.failure, 3000);
        }
    });
    */
}

function clearForm(){
    clearPrevModalMessage();
    const oldContent = document.querySelector('.modal .modal__content');
    oldContent.classList.add('show');
    oldContent.classList.remove('hide');
}

function showModalMessage(message, timeout=0){
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

function clearPrevModalMessage(){
    const prevModalMessage = document.querySelector('.modal__message');
    if (prevModalMessage) prevModalMessage.remove();
}
function hideModalFormContent(){
    const oldContent = document.querySelector('.modal .modal__content');
    oldContent.classList.add('hide');
    oldContent.classList.remove('show');

}


fetch('db.json')
    .then(data=>data.json())
    .then(data=>console.log(data));
});

