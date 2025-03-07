var showBlogs = document.getElementById('showBlogs');
        let blogDatabase = JSON.parse(localStorage.getItem("blogDatabase"));
        var blogs = blogDatabase[0]["blogs"];

        function displayBlog() {
            showBlogs.innerHTML = "";
            for (let i = 0; i < blogs.length; i++) {
                let blogInfo = blogs[i];
                if (blogInfo["status"] === 'consideration') {
                let div = document.createElement("div");
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

                let buttonEdit = document.createElement("button");
                buttonEdit.classList.add("buttonEdit");
                buttonEdit.textContent = "Approved";
                buttonEdit.addEventListener("click", () => editblog(i));
                div.appendChild(buttonEdit);

                let buttonDelete = document.createElement("button");
                buttonDelete.classList.add("buttonDelete");
                buttonDelete.textContent = "Deny";
                buttonDelete.addEventListener("click", () => deleteblog(i));
                div.appendChild(buttonDelete);

                showBlogs.appendChild(div);
                }
            }
        }

        displayBlog();

        function editblog(index) {
            let blog = blogs[index];
            blog['status'] = 'approved';
            // blogs.splice(index, 1);
            localStorage.setItem("blogDatabase", JSON.stringify(blogDatabase));
            displayBlog();
            }

            function deleteblog(index) {
            let blog = blogs[index];
            blog["status"] = 'deny';
            // blogs.splice(index, 1);
            localStorage.setItem("blogDatabase", JSON.stringify(blogDatabase));
            displayBlog();
        }

        let btnAM = document.getElementById("btnAM");
        btnAM.onclick = function(){ 
            window.location.href="appoint_admin.html";
        }
        /////////////////////////////

// var showStudents = document.getElementById('showBlogs');
// let students = JSON.parse(localStorage.getItem("students"));


// function displayBlog() {
//     showStudents.innerHTML = "";
//     for (let i = 0; i < students.length; i++) {
//         let studentInfo = students[i];
//         if (studentInfo["isDelete"] === false) {
//         let div = document.createElement("div");
//         div.classList.add("student1");
//         div.innerHTML = `
//         <h1>${studentInfo["name"]}</h1>
//         <h1>${studentInfo["email"]}</h1>
//         <h1>${studentInfo["number"]}</h1>
//         <h1>${studentInfo["birth"]}</h1>
//         <h1>${studentInfo["place"]}</h1>
//         <h1>${studentInfo["doctor"]}</h1>
//         <img class='img' src=${studentInfo["image"]} />
//         `;

//         let buttonEdit = document.createElement("button");
//         buttonEdit.classList.add("buttonEdit");
//         buttonEdit.textContent = "Edit";
//         buttonEdit.addEventListener("click", () => editblog(i));
//         div.appendChild(buttonEdit);

//         let buttonDelete = document.createElement("button");
//         buttonDelete.classList.add("buttonDelete");
//         buttonDelete.textContent = "Deny";
//         buttonDelete.addEventListener("click", () => deleteblog(i));
//         div.appendChild(buttonDelete);

//         showStudents.appendChild(div);
//         }
//     }
// }

// displayBlog();

// function editblog(index) {
//     let student = students[index];
//     let newName = prompt("Enter new name: ", student["name"]);
//     let newImage = prompt("Enter new image: ", student["image"]);
    
//     // blogs.splice(index, 1);
//     if (newName && newImage) {
//         student["name"] = newName;
//         student["image"] = newImage;
//     localStorage.setItem("students", JSON.stringify(students));
//     displayBlog();
//     }
// }

//     function deleteblog(index) {
//     let student = students[index];
//     student["isDelete"] = true;
//     // blogs.splice(index, 1);
//     localStorage.setItem("students", JSON.stringify(students));
//     displayBlog();
// }