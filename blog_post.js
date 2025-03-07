
var userState = document.getElementById("user-state");
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

function logout() {
localStorage.removeItem("currentUser");
alert("Logout Successfully!");
window.location.href="http://127.0.0.1:5500/blog_main.html";
}

if (currentUser) {
    userState.innerHTML = `
    <div class=" container-fluid nav-bar d-flex flex-row-reverse pt-3">
        <h3 class="mx-3  px-4 text-bg-danger rounded-3 align-content-center"><b>${currentUser.firstName}</b> <i class="fa-solid fa-user-injured fs-2 ms-2"></i></h3>
        <button class="btn2" id="logout-btn"><b>Logout</b></button>
    </div>
    <h1 class="text-center title_name pt-5"><b>Patient Feedbacks</b></h1>
    <form id="formLocal" class="mx-auto mt-5 post">
        <h3 class="text-center mb-3 text-white"><b>Give your feedback</b></h3>
        <input type="text" id="name" placeholder="Enter your name" />
        <input type="text" id="rate" placeholder="Rate" />
        <input type="text" id="feedback" placeholder="Give feedback" />
        <button type="submit" id="submit-btn" class="btn"><b>SUBMIT</b></button>
    </form>
`;

var logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", logout);

} else {
    window.location.href="http://127.0.0.1:5500/signin.html";
}

var form = document.getElementById("formLocal");
var blogDatabase = JSON.parse(localStorage.getItem("blogDatabase"));
var blogs = blogDatabase[0]["blogs"];
var showBlogs = document.getElementById('showBlogs');


form.addEventListener("submit", function (event) {
event.preventDefault();
var name = document.getElementById("name").value;
var rate = document.getElementById("rate").value;
var feedback = document.getElementById("feedback").value;

blogs.push({
name: name,
rate: rate,
feedback: feedback,
isDevare: false,
status: 'consideration',
}); // array
var stringblogs = JSON.stringify(blogDatabase); // convert array to string
localStorage.setItem("blogDatabase", stringblogs); // save to localStorage
alert("Add blog successfully!!");
window.location.href='http://127.0.0.1:5500/blog_main.html';
});