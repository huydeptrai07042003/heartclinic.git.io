var btnLogIn = document.getElementById('btnLogIn');
var btnPost = document.getElementById('btnPost');
btnLogIn.onclick = function(){
    window.location.href = "http://127.0.0.1:5500/signin.html";
};



btnPost.onclick = function(){
    alert('You need to log in first!!!')
};

///////////////////////
var blogDatabase = JSON.parse(localStorage.getItem("blogDatabase"));
var blogs = blogDatabase[0]["blogs"];
var showBlogs = document.getElementById('showBlogs');

function displayBlog() {
showBlogs.innerHTML = "";
for (var i = 0; i < blogs.length; i++) {
var blogInfo = blogs[i];
if (blogInfo["status"] === 'approved') {
    var div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
        <h3><b>Name:</b> <span>${blogInfo["name"]}</span></h3>
                    <h6 class="mt-3 mb-2"><b>Rate:</b> 
                    <span>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </span>
                    </h6>
                    <p><b>Reviews:</b> <span>${blogInfo["feedback"]}</span></p>
                    <div class="post-dropdown"></div>
    `;
showBlogs.appendChild(div);
}
}
}
displayBlog();

