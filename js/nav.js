document.getElementById("right-nav-btn").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("nav-active");
});

// bat su kien cho cac link nav
document.addEventListener("DOMContentLoaded", function () {
  //  quy dinh link goc
  const pagesURL =
    window.location.pathname.split("/").length === 2 ? "./pages/" : "./";
  const homeURL =
    window.location.pathname.split("/").length === 3
      ? "../index.html"
      : "./index.html";
  const login_btn_data = localStorage.getItem("currentUser")
    ? {
        href: pagesURL + "login.html",
        text: "Logout",
      }
    : { href: pagesURL + "login.html", text: "Login" };
  // tao obj giu link con
  const urls = {
    "logo-gamehub": homeURL,
    "home-link": homeURL,
    "about-link": pagesURL + "about.html",
    "comments-link": pagesURL + "comments.html",
    "history-link": pagesURL + "history.html",
    "contact-link": pagesURL + "contact.html",
  };

  for (const key in urls) {
    // kiem tra chi goi key khi object co ton tai thuoc tinh nay
    if (Object.prototype.hasOwnProperty.call(urls, key)) {
      document.querySelector(`#${key}`).href = urls[key];
    }
  }

  //   bat su kien rieng cho button chuyen huong login
  const login_btn = document.getElementById("login-btn");
  login_btn.innerText = login_btn_data.text;
  login_btn.addEventListener("click", function () {
    // xu ly xoa du lieu (neu co)
    localStorage.removeItem("currentUser");
    // chuyen huong
    window.location.href = login_btn_data.href;
  });
});
