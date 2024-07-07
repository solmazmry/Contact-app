// Lazım olan DOM elementlərini seçirik
const name=document.querySelector('#name');
const surname=document.querySelector('#surname');
const phone=document.querySelector('#phone');
const form =document.querySelector('form');
const submitButton=document.querySelector("button[type='submit']");

// Səhifə yüklənərkən URL parametrlərini yoxlayırıq
document.addEventListener("DOMContentLoaded",()=>{
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const nameParam = params.get("name");
  const surnameParam = params.get("surname");
  const phoneParam = params.get("phone");
  

  // Əgər URL parametrlərində id varsa, input sahələrinə mövcud məlumatları doldururuq və düymənin mətnini "Create" edirik
if(id && nameParam && surnameParam && phoneParam){
    name.value = nameParam;
    surname.value = surnameParam;
    phone.value = phoneParam;
    submitButton.textContent="Create"
}else{
      // Əks halda düymənin mətnini "Submit" edirik
      submitButton.textContent = "Submit";  
}
})

// Formu göndərdikdə məlumatları URL-ə əlavə edirik və contact.html səhifəsinə yönləndiririk
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const params =new URLSearchParams(location.search);
    const id=params.get("id");
      // Əgər id varsa, redaktə edilmiş məlumatları URL-ə əlavə edirik
      if (id) {
        location.href = `contact.html?id=${id}&name=${name.value}&surname=${surname.value}&phone=${phone.value}`;
      } else {
        // Əks halda yeni məlumatları URL-ə əlavə edirik
        location.href = `contact.html?name=${name.value}&surname=${surname.value}&phone=${phone.value}`;
      }
    });



















































