let signupForm = document.getElementById("signup-form");
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");

let blogDatabase = JSON.parse(localStorage.getItem("blogDatabase")) || [
{ users: [], blogs: [] },
];



signupForm.addEventListener("submit", function (e) {
e.preventDefault();

let userBlogDatabase = blogDatabase[0]["users"];
let isExisting = userBlogDatabase.some((user) => user.email === email.value);

if (isExisting) {
    alert("Email already exists!!!");
} else {
    if (password.value === confirmPassword.value) {
    userBlogDatabase.push({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
    });
    localStorage.setItem("blogDatabase", JSON.stringify(blogDatabase));
    alert("Sign Up Successfully!!!");
    } else {
    alert("Password Not Matched!!!");
    }
}
});
