let signinForm = document.getElementById("signin-form");
let email = document.getElementById("email");
let password = document.getElementById("password");

let blogDatabase = JSON.parse(localStorage.getItem("blogDatabase")) || [
{ users: [], blogs: [] },
];

signinForm.addEventListener("submit", function (e) {
e.preventDefault();

let userBlogDatabase = blogDatabase[0]["users"];
console.log("🚀 ~ userBlogDatabase:", userBlogDatabase);

let user = userBlogDatabase.filter(
    (user) => user.email === email.value && user.password === password.value
);

if (user.length === 1) {
    alert("Sign in successfully");

    localStorage.setItem("currentUser", JSON.stringify(user[0]));

    if(user[0]['email'] === '123@gmail.com'){
    window.location.href = "http://127.0.0.1:5500/blog_main_admin.html";
    }
    else{
    window.location.href = "http://127.0.0.1:5500/blog_post.html";
    }

} else {
    alert("Sign in failed");
}
});
