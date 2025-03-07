let form = document.getElementById("formLocal");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Lấy dữ liệu mới nhất từ localStorage
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let number = document.getElementById('number').value;
    let birth = document.getElementById('birth').value;
    let place = document.getElementById('place').value;
    let doctor = document.getElementById('doctor').value;
    let image = document.getElementById('image').value;

    appointments.push({
        name: name,
        email: email,
        number: number,
        birth: birth,
        place: place,
        doctor: doctor,
        image: image,
        isDelete: false, // Luôn gắn trạng thái mặc định
    });

    // Lưu lại dữ liệu vào localStorage
    localStorage.setItem("appointments", JSON.stringify(appointments));
    alert("Add appointment successfully!!");
});








