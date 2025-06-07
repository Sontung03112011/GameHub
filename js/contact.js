// neu da dang nhap -> o name + email se duoc dien tu dong
if (localStorage.getItem("currentUser")) {
  const currentEmail = localStorage.getItem("currentUser");
  const user = JSON.parse(localStorage.getItem(currentEmail));
  if (user) {
    document.querySelector("#name").value = user.username || "";
    document.querySelector("#email").value = user.email || "";
  } else {
    console.error("User data not found for the current email.");
    // quay lai login neu khong co user
    window.location.href = "../pages/login.html";
  }
}

document
  .querySelector("#contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Lấy giá trị từ các trường input
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const subjectDOM = document.querySelector("#subject");
    const subject = subjectDOM.value;
    const messageDOM = document.querySelector("#message");
    const message = messageDOM.value;

    // Kiểm tra xem các trường có rỗng không
    if (!name || !email || !message || !message) {
      alert("Please fill in all fields.");
      return;
    }
    // Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    // Kiểm tra độ dài của message
    if (message.length < 10 || message.length > 1000) {
      alert("Message must be between 10 and 500 characters.");
      return;
    }

    // Tạo đối tượng dữ liệu để gửi
    const formData = {
      name: name,
      email: email,
      message: message,
      subject: subject,
    };

    // gui alert xac nhan email truoc khi gui
    const confirmEmail = confirm(
      `Are you sure you want to send this email?\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`
    );
    if (confirmEmail) {
      // todo (emailjs)....
      alert("Email sent successfully!");
      // Reset form fields
      subjectDOM.value = "";
      messageDOM.value = "";
    }
  });
