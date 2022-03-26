'use strict'; 
import calc from './modules/calc';
import $ from 'jquery';
import menu from './modules/menu';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', ()=>{
      calc();
      menu();
      modal();
      slider({
        slideSelector:'.offer__slide',
        sliderSelector: '.offer__slider' 
    });
      tabs();
      timer();
}); 
