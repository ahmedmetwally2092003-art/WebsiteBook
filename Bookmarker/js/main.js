var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("bookmarkURL");


var allSites=[]
if( localStorage.getItem('sitesContainer')!=null){
    allSites=JSON.parse(localStorage.getItem('sitesContainer'))
    displaySite()
}

function addSite(){

    if(validateAllInputs(siteNameInput)==true &&
        validateAllInputs(siteUrlInput)==true){
        var site={
        name:siteNameInput.value,
        siteUrl: siteUrlInput.value
        };
           allSites.push(site);
        localStorage.setItem('sitesContainer' ,JSON.stringify(allSites));
        console.log(allSites);
        clearInputs();
        displaySite();
    }
}

function clearInputs(){
    siteNameInput.value = null;
    siteUrlInput.value = null;
}

function displaySite(){
var cartona=''
for(var i=0;i<allSites.length;i++){
    cartona+=`
    <tr class='text-center'>
    <td>${i}</td>
    <td>${allSites[i].name}</td>
    <td> <button type="button" class="btn btn-success"><a class="text-decoration-none text-light" target="_blank" href="${allSites[i].siteUrl}"><i class="fa-solid fa-eye px-1" style="color: #e8edf2;"></i>Visit</a></button>  </td>
    <td><button type="button" onclick='deleteSite(${i})' class="btn btn-danger"> <i class="fa-solid fa-trash px-1"></i>Delete</button></td>
    </tr>
  `
}
document.getElementById('tablebody').innerHTML=cartona
}

function deleteSite(index){
    allSites.splice(index, 1)
    localStorage.setItem('sitesContainer' ,JSON.stringify(allSites))
    displaySite()
}

function validateAllInputs(element){
    var val=element.value
    var id=element.id
    
    var regex={
        siteName:/^[A-Z][a-z]{3,5}$/,
        bookmarkURL:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    }
    if(regex[id].test(val)==true){
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.nextElementSibling.classList.replace('d-block','d-none')
         return true

    }else{
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.nextElementSibling.classList.replace('d-none','d-block')
        return false
    }
}