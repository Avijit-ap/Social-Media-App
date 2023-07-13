let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");
  formvalidation();
});

let formvalidation =
  ("input",
  () => {
    if (input.value === "") {
      msg.innerHTML = "Post cannont be blank!";
      console.log("BLANK FORM!");
    } else {
      console.log("Form validate sucess");
      msg.innerHTML = "";
      acceptData();
    }
  });

let data = {};
let acceptData = () => {
  data["text"] = input.value;
  console.log("Data pushed!");
  console.log(data);
  createpost();
};

let createpost = () => {
  posts.innerHTML += `
    <div>
    <p>${data.text}</p>
    <span class="options">
        <i onClick="editPost(this)" class="fas fa-edit"></i>
        <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
    </span>
    </div>
    `;
  input.value = "";
};
let deletePost=(e)=>{
    e.parentElement.parentElement.remove();

};

let editPost=(e)=>{
  input.value=e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove();

}


