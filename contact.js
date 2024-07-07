// Lazım olan DOM elementlərini seçirik
 const addBtn =document.querySelector('#add-btn');
 const ul =document.querySelector('.list-group');
 const searchInput =document.querySelector('#search');


 // Əlavə etmək üçün düyməyə klik etdikdə form.html səhifəsinə keçid edirik
 addBtn.addEventListener("click", () => {
  location.href = "form.html";
});

// Lokal storage-dan məlumatları oxuyuruq və ya boş bir array yaradırıq
//Array=JSON.parse ile yaradiriq
let data = JSON.parse(localStorage.getItem("data"))|| [];

// Məlumatları ekranda göstərən funksiyanı yaradıq.
const renderData=(filteredData=data)=>{
  let innerHTML= "";
  filteredData.forEach((item)=>{
    innerHTML+=`<li class="list-group-item d-flex align-items-center justify-content-between">
                      <div class="d-flex flex-column">
                        <span class="fw-bold">${item.name} ${item.surname}</span>
                        <span>${item.phone}</span>
                      </div>
                      <div class="d-flex gap-1">
                        <button class="btn btn-danger" onclick="deleteContact(${item.id})">Delete</button>
                        <button class="btn btn-success" onclick="editContact(${item.id})">Edit</button>
                      </div>
                    </li>`
  });
  ul.innerHTML=innerHTML;
};

// Kontaktı silən funksiyanı yaradıq
const deleteContact = (id) => {
  data = data.filter((item) => item.id !== id);
  localStorage.setItem("data", JSON.stringify(data));
  renderData();
};

// Kontaktı redaktə etmək üçün funksiyanı yaradıq
const editContact = (id) => {
  const contact = data.find((item) => item.id === id);
  if (contact) {
    location.href = `form.html?id=${contact.id}&name=${contact.name}&surname=${contact.surname}&phone=${contact.phone}`;
  }
};





// Axtarış inputuna dinamik olaraq məlumatları filtrələmək üçün dinləyici əlavə edirik
searchInput.addEventListener("input",(e)=>{
  const searchTerm=e.target.value.toLowerCase();
  const filteredData=data.filter((item)=> item.name.toLowerCase().includes(searchTerm) || item.surname.toLowerCase().includes(searchTerm)|| item.phone.includes(searchTerm));
  renderData(filteredData);
});
// Səhifə yüklənərkən məlumatları göstəririk
renderData();



// Səhifə yüklənərkən URL-dən parametr olaraq məlumatları alırıq və kontakta əlavə edirik
document.addEventListener('DOMContentLoaded',()=>{
  const params = new URLSearchParams(location.search);
  const name= params.get("name");
  const surname =params.get("surname");
  const phone =params.get("phone");
  const id = params.get("id");

  if(name&&surname&&phone){
    if(id){
       // Mövcud kontaktı redaktə edirik
       const contactIndex = data.findIndex((item)=>item.id===parseInt(id));
       data[contactIndex]={id:parseInt(id),name ,surname,phone};

    }else{
       // Yeni kontakt əlavə edirik
       data.push({
        id:(data[data.length-1]?.id || 0)+1,
         name,
         surname,
         phone,
       });
    }
       // URL-dən parametrləri təmizləyirik
       window.history.pushState({}, document.title, window.location.pathname);
       
    // Lokal storage-a məlumatları saxlayırıq
    localStorage.setItem("data",JSON.stringify(data));
          // Məlumatları yenidən göstəririk
          renderData()
  }
})





















































































