function validateFormSignin(email, password) {
  // kiem tra khong trong cac truong nhap
  if (!email || !password) {
    alert("Vui long nhap day du cac truong theo yeu cau!");
    return false;
  }
  return true;
}

function validateFormSignup(username, email, password) {
  // kiem tra khong rong cac truong nhap
  if (!username || !email || !password) {
    alert("Vui long nhap day du cac truong theo yeu cau!");
    return false;
  }

  // kiem tra cu phap username
  if (username.length < 6) {
    alert("Username phai co it nhat 6 ki tu!");
    return false;
  }
  const hasLetter = /[a-zA-Z]/.test(username);
  const hasNumber = /\d/.test(username);
  if (!hasLetter || !hasNumber) {
    alert("Username phai co ca chu lan so");
    return false;
  }

  // kiem tra cu phap email
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    alert("Email chua dung cu phap!");
    return false;
  }

  // password > 6 chu so
  if (password.length < 6) {
    alert("Password phai co it nhat 6 ki tu!");
    return false;
  }
  return true;
}

function signin() {
  // lay du lieu tu form HTML
  const email = document.querySelector("#login-email").value.trim();
  const password = document.querySelector("#login-password").value.trim();

  // kiem tra du lieu (format)
  if (validateFormSignin(email, password)) {
    // tim kiem du lieu phu hop => chuyen trang home
    const userInfoJSON = localStorage.getItem(email); // lay du lieu user thong qua email
    const userInfo = JSON.parse(userInfoJSON); // chuyen du lieu tu kieu JSON => javascript
    // khong co du lieu trong database
    if (!userInfo) {
      alert(
        "Thong tin dang nhap khong ton tai trong he thong, vui long kiem tra lai hoac chuyen den trang dang ki"
      );
      return;
    }
    // co du lieu trung khop => kiem tra password
    if (userInfo.password != password) {
      alert("Mat khau khong chinh xac!");
      return; // neu sai du lieu => khong lam gi them
    }
    // chuyen trang
    alert("Đăng nhập thành công!");
    // lưu người đăng nhập hiện tại
    localStorage.setItem("currentUser", email);
    location.href = "../index.html";
    return; // ket thuc ham
  } else {
    alert(
      "Email da duoc su dung, vui long nhap email khac hoac chuyen sang trang dang nhap!"
    );
    return;
  }
}

// bat su kien cho button log in

document.getElementById("login-btn")?.addEventListener("click", function (e) {
  e.preventDefault();
  signin();
});

function register() {
  // lay du lieu
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  // kiem tra du lieu dung format
  if (validateFormSignup(username, email, password)) {
    // dung dinh dang => kiem tra trung lap
    const duplicateEmail = localStorage.getItem(email);
    if (duplicateEmail) {
      alert("Email đã được sử dụng!");
      return;
    }
    const newUser = {
      username: username,
      password: password
    }
    // stringify: chuyen kieu object thanh JSON (string) de luu vao database
    localStorage.setItem(email, JSON.stringify(newUser));
    alert("Đăng Kí Thành Công, vui lòng đăng nhập");
    location.href = "login.html";
    return;
  }
}

// bat su kien cho button dang ki

document.getElementById("register-btn")?.addEventListener("click", function(e){
  e.preventDefault();
  register();
})