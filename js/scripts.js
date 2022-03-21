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

    // const modalTimerId = setTimeout(showModal,5000);
    document.addEventListener('scroll', showModalByScroll);
    
// Menu using class
    class Menu {
        constructor (title, descr, src, alt, price, parentSelector, ...classes){
            this.title = title;
            this.descr = descr;
            this.src = src;
            this.alt = alt;
            this.transfer = 27;
            this.price = this.transfer * price;
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


    const getResource = async (url)=>{
        const res = await fetch(url, {
                method: 'GET'
            });
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    // .then(data=>{
    //     console.log(data);
    //     data.forEach(({title, descr, img, altimg, price})=>{
    //         new Menu (title, descr, img, altimg, price, '.menu .container').render();
    //     });
    // });

    axios.get('http://localhost:3000/menu')
    .then(data=>{
        data.data.forEach(({title, descr, img, altimg, price})=>{
            new Menu (title, descr, img, altimg, price, '.menu .container').render();
        });
    });

    // new Menu (  
    //         'Меню "Фитнес"',
    //         'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //         '"img/tabs/vegy.jpg"',
    //         '"vegy"',
    //         229,
    //         '.menu .container'
    //         ).render();
    // new Menu (
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     "img/tabs/elite.jpg",
    //     '"elite"',
    //     550,
    //     '.menu .container',
    //     'menu__item'
    //     ).render();
    // new Menu (
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     '"img/tabs/post.jpg"',
    //     '"post"',
    //     430,
    //     '.menu .container',
    //     'menu__item'
    //     ).render();

        
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

    const postData = async (url, data)=>{
        const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type':'application/json;charset=utf-8'
                },
                body: data
            });
        return await res.json();
    };

    function postForm(form){
        const formData = new FormData(form);
        const data = {};
        formData.forEach(function(v,k){
            data[k]=v;
        });
        postData('http://localhost:3000/requests', JSON.stringify(data))
        .then((data)=>{
            console.log(data);
            showModalMessage(formSubmitMessages.success, 3000);
        }).catch(()=>{
            showModalMessage(formSubmitMessages.failure, 3000);
        }).finally(()=>{form.reset();});
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

    // Slider
    const twoDigits = function (num){
        if(typeof(num)=='number' && num < 10){
            return '0'+num;
        }
        else {return num;}
    }

    const mySlider = function (sliderSelector, slideSelector){
        const slider = document.querySelector(sliderSelector),
            slideList = slider.querySelectorAll(slideSelector),
            total = slideList.length,
            currentContainer=slider.querySelector('#current'),
            totalContainer=slider.querySelector('#total'),
            nextSlideBtn = slider.querySelector('.offer__slider-next'),
            prevSlideBtn = slider.querySelector('.offer__slider-prev');
        let current = 0;
        
        totalContainer.innerHTML=twoDigits(total);
        showSlide(current);
        
        
        function hideSlide(slide){
            slide.classList.remove('show');
            slide.classList.remove('fade');
            slide.classList.add('hide');
        }
        function showSlide(index){
            current = index;
            if (total && current>=total) {current %= total;}
            if (current<0) {current = total-1;}
            
            slideList.forEach(slide=>{
                hideSlide(slide);
            });

            slideList[current].classList.remove('hide');
            slideList[current].classList.add('show');
            slideList[current].classList.add('fade');
            currentContainer.innerHTML=twoDigits(current+1);
        }

        nextSlideBtn.addEventListener('click', ()=> {showSlide(current+1)});
        prevSlideBtn.addEventListener('click', ()=> {showSlide(current-1)});

    }
    //mySlider('.offer__slider', '.offer__slide');

    const mySlider2 = function (sliderSelector, slideSelector){
        const slider = document.querySelector(sliderSelector),
            slideList = slider.querySelectorAll(slideSelector),
            total = slideList.length,
            currentContainer=slider.querySelector('#current'),
            totalContainer=slider.querySelector('#total'),
            nextSlideBtn = slider.querySelector('.offer__slider-next'),
            prevSlideBtn = slider.querySelector('.offer__slider-prev'),
            sliderWrapper = slider.querySelector('.offer__slider-wrapper'),
            sliderInner = slider.querySelector('.offer__slider-inner');
        let current = 0;
        let offset = 0;
        const slideWidth = +window.getComputedStyle(sliderWrapper).width.slice(0,window.getComputedStyle(sliderWrapper).width.length-2);
        slideList.forEach(slide => {slide.style.width = slideWidth+'px';})
        sliderInner.style.width = 100*total+'%';
        
        slider.style.position='relative';
        const dots = document.createElement('ol');
        const dotsArr = [];
        dots.classList.add('carousel-dots');
        dots.style.cssText=`
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;
        slider.append(dots);

        for (let i = 0; i<total; i++){
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i);
            dot.style.cssText=`
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `;
            if(i==current){dot.style.opacity=1;}
            dots.append(dot);
            dotsArr.push(dot);
        }

        totalContainer.innerHTML=twoDigits(total);
        currentContainer.innerHTML=twoDigits(current+1);

        nextSlideBtn.addEventListener('click', ()=> {
            if(offset>=slideWidth*(total-1)){
                offset = 0;
            }
            else {
                offset+=slideWidth;
            }
            changeCurrent(current+1);
            sliderInner.style.transform = `translateX(-${offset}px)`;
        });
        prevSlideBtn.addEventListener('click', ()=> {
            if(offset <= 0){
                offset=slideWidth*(total-1);
            }
            else {
                offset-=slideWidth;
            }
            changeCurrent(current-1);
            sliderInner.style.transform = `translateX(-${offset}px)`;
        });

        function changeCurrent(i){
            current = i;
            if (total && current>=total) {current %= total;} 
            if (current<0) {current = total-1;}
            currentContainer.innerHTML=twoDigits(current+1);
            dotsArr.forEach(dot=>{dot.style.opacity='.5';});
            dotsArr[current].style.opacity=1;

        }

        dotsArr.forEach(dot => {
            dot.addEventListener('click', (e)=>{
                const index = +e.target.getAttribute('data-slide-to');
                offset = slideWidth*index;
                sliderInner.style.transform = `translateX(-${offset}px)`;
                changeCurrent(index);
            });
        });

    }
    mySlider2('.offer__slider', '.offer__slide');
});

