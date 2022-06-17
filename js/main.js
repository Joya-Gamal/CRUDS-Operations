var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var booksContainer ;
var tableBody= document.getElementById("tableBody");
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");

if(localStorage.getItem("books" ) != null){
    booksContainer = JSON.parse( localStorage.getItem("books"));
    display(booksContainer);
}
else{
    booksContainer=[];
}

function add(){
    var books = {
        bookMark : siteName.value ,
        bookURL : siteURL.value ,
    }
    booksContainer.push(books);

    localStorage.setItem("books" , JSON.stringify(booksContainer));
    display(booksContainer);
    clearForm();
}
function clearForm(){
    siteName.value="";
    siteURL.value ="";
}

function display(list){
    var cartona =``
    for(var i=0 ; i<list.length ; i++ ){
        cartona+= `
        <tr>
        <td>${list[i].bookMark}</td>
        <td>${list[i].bookURL}</td>
        <td>
            <button onclick="setFormForUpdate(${i})" class="btn btn-warning">update</button>
        </td>

        <td>
            <button onclick="deleteBook(${i})" class="btn btn-danger">delete</button>
        </td>

        <td>
            <button class="btn btn-info">
            <a href="${list[i].bookURL}" class="text-dark text-decoration-none " target="_blank" >visit</a>
            </button>
            
        </td>
    </tr>`

    }
    tableBody.innerHTML=cartona;
}


function deleteBook(deletedElement){
    booksContainer.splice( deletedElement , 1);
    localStorage.setItem("books" , JSON.stringify(booksContainer));
    display(booksContainer);
}

function searchBook(searchTerm){
    var searchResult = [];
    for(var i=0 ; i<booksContainer.length ; i++){
        if(booksContainer[i].bookMark.includes(searchTerm)){
            searchResult.push(booksContainer[i]);
        }
    }
    display(searchResult);
}

var element;
function setFormForUpdate(updatedItem){
    siteName.value =booksContainer[updatedItem].bookMark;
    siteURL.value = booksContainer[updatedItem].bookURL;


    updateBtn.classList.replace('d-none' ,'d-inlin-block')
    addBtn.classList.add('d-none')
    element=updatedItem;
}

function updateResult(){
    booksContainer[element].bookMark= siteName.value;
    booksContainer[element].bookURL=siteURL.value;

    localStorage.setItem("books" , JSON.stringify(booksContainer));
    display(booksContainer);
    updateBtn.classList.replace('d-inlin-block' , 'd-none');
    addBtn.classList.remove('d-none');
    clearForm();
}
