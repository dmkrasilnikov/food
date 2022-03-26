function calc(){
 // Calculating

    (function(){
        let sex='female', height, weight, age, ratio=1.375;
        
        const ansContainer = document.querySelector('.calculating__result span'),
              btns = document.querySelectorAll('div.calculating__choose-item'),
              inputs = document.querySelectorAll('input.calculating__choose-item');
        height = +document.querySelector('.container #height');
        weight = +document.querySelector('.container #weight');
        age = +document.querySelector('.container #age');
        
        (function calcInit(){
            if(localStorage.getItem('sex')) sex = localStorage.getItem('sex');
            if(localStorage.getItem('height')) {
                height = localStorage.getItem('height');
                document.querySelector('.calculating #height').value=height;
            }
            if(localStorage.getItem('weight')) {
                weight = localStorage.getItem('weight');
                document.querySelector('.calculating #weight').value=weight;
            }
            if(localStorage.getItem('age')){ 
                age = localStorage.getItem('age');
                document.querySelector('.calculating #age').value=age;
            }
            if(localStorage.getItem('ratio')) ratio = localStorage.getItem('ratio');
            
            btns.forEach(btn => {
                if(btn.getAttribute('data-calc-sex') == sex || btn.getAttribute('data-calc-rate')==ratio){
                    btn.classList.add('calculating__choose-item_active');
                }
                else{btn.classList.remove('calculating__choose-item_active');}
            });
            calc();
        }());

        function calc(){
            // console.log(sex, height, weight, age, ratio)
            let res='____';
            if (sex && height && weight && age && ratio){
                if (sex=='male'){
                    res=Math.round((66.5+13.75*weight+5.003*height-6.775*age)*ratio);
                    // console.log(res);
                }
                else if(sex=='female'){
                    res=Math.round((655.1+9.563*weight+1.85*height-4.676*age)*ratio);
                    // console.log(res);
                }
            }
            ansContainer.innerHTML=res;
        }

        btns.forEach(btn => {
            btn.addEventListener('click', function(e){
                if(e.target.getAttribute('data-calc-sex')){
                    sex = e.target.getAttribute('data-calc-sex');
                    localStorage.setItem('sex',sex);

                }
                if(e.target.getAttribute('data-calc-rate')){
                    ratio = +e.target.getAttribute('data-calc-rate');
                    localStorage.setItem('ratio',ratio);  
                }
                e.target.parentElement.querySelectorAll('.calculating__choose-item').forEach((item)=>{item.classList.remove('calculating__choose-item_active');});
                e.target.classList.add('calculating__choose-item_active');
                calc();
            });
        });

        inputs.forEach(input=>{
            input.addEventListener('input', function(e){
                const val = e.target.value;
                const id = e.target.getAttribute('id');
                
                    e.target.style.border='none';
                    switch (id){
                        case 'height':
                            if(!val.match(/\D/g)){
                                height=+val;
                                localStorage.setItem('height',height);
                            }
                            else {
                                height=0;
                                e.target.style.border='1px solid red';
                            }
                            break;
                        case 'weight':
                            if(!val.match(/\D/g)){
                                weight=+val;
                                localStorage.setItem('weight',weight);
                            }
                            else {
                                weight=0;
                                e.target.style.border='1px solid red';
                            }
                            break;
                        case 'age':
                            if(!val.match(/\D/g)){
                                age=+val;
                                localStorage.setItem('age',age);
                            }
                            else {
                                age=0;
                                e.target.style.border='1px solid red';
                            }
                            break;
                    }
                    calc();
                
            });
        });
    }());
}
export default calc;