import {clearPrevModalMessage, showModalMessage, formSubmitMessages} from './modal';

export function clearForm(){
    clearPrevModalMessage();
    const oldContent = document.querySelector('.modal .modal__content');
    oldContent.classList.add('show');
    oldContent.classList.remove('hide');
}

export function postForm(form){
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
export const postData = async (url, data)=>{
    const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type':'application/json;charset=utf-8'
            },
            body: data
        });
    return await res.json();
};

