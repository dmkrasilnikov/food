function slider({sliderSelector, slideSelector}){
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

    const mySlider2 = function ({sliderSelector, slideSelector}){ 
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
        // const slideWidth = +window.getComputedStyle(sliderWrapper).width.slice(0,window.getComputedStyle(sliderWrapper).width.length-2);
        const slideWidth = +window.getComputedStyle(sliderWrapper).width.replace(/\D/g,'');
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
    mySlider2({sliderSelector, slideSelector});
}
export default slider;