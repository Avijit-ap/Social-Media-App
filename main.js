let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

// Retrieve stored posts from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedPosts = JSON.parse(localStorage.getItem("posts"));
  if (storedPosts) {
    storedPosts.forEach((post) => {
      posts.innerHTML += `
        <div>
          <p>${post.text}</p>
          <span class="options">
            <i onClick="editPost(this)" class="fas fa-edit"></i>
            <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
          </span>
        </div>
      `;
    });
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");
  formValidation();
});

let formValidation = () => {
  if (input.value === "") {
    msg.innerHTML = "Post cannot be blank!";
    console.log("BLANK FORM!");
  } else {
    console.log("Form validation success");
    msg.innerHTML = "";
    acceptData();
  }
};

let acceptData = () => {
  const postData = {
    text: input.value,
  };

  // Get the stored posts from localStorage
  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  // Add the new post to the stored posts
  storedPosts.push(postData);

  // Save the updated posts to localStorage
  localStorage.setItem("posts", JSON.stringify(storedPosts));

  console.log("Data pushed!");
  console.log(postData);
  createPost(postData);
};

let createPost = (postData) => {
  posts.innerHTML += `
    <div>
      <p>${postData.text}</p>
      <span class="options">
        <i onClick="editPost(this)" class="fas fa-edit"></i>
        <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
      </span>
    </div>
  `;
  input.value = "";
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();

  // Get the stored posts from localStorage
  const storedPosts = JSON.parse(localStorage.getItem("posts"));

  // Update the stored posts by filtering out the deleted post
  const updatedPosts = storedPosts.filter(
    (post) => post.text !== e.parentElement.previousElementSibling.innerHTML
  );

  // Save the updated posts back to localStorage
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
};

let editPost = (e) => {
  input.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove();

  // Get the stored posts from localStorage
  const storedPosts = JSON.parse(localStorage.getItem("posts"));

  // Update the stored posts by finding the edited post and updating its text
  storedPosts.forEach((post) => {
    if (post.text === e.parentElement.previousElementSibling.innerHTML) {
      post.text = input.value;
    }
  });

  // Save the updated posts back to localStorage
  localStorage.setItem("posts", JSON.stringify(storedPosts));
};
