function menu(){
    
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

    axios.get('http://localhost:3000/menu')
    .then(data=>{
        data.data.forEach(({title, descr, img, altimg, price})=>{
            new Menu (title, descr, img, altimg, price, '.menu .container').render();
        });
    });
}

export default menu;