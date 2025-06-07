// -----------------------------------
// kiem tra neu co dang nhap moi duoc su dung tinh nang nay
if (!localStorage.getItem("currentUser")) {
  alert("You need to log in to add search history.");
} else {
  document.addEventListener("DOMContentLoaded", function () {
    const currentEmail = localStorage.getItem("currentUser");
    const user = JSON.parse(localStorage.getItem(currentEmail));
    if (user) {
      // Neu user ton tai, kiem tra lich su tim kiem
      if (!user.searchHistory) {
        user.searchHistory = []; // Khoi tao neu chua co
      }
      // Lay du lieu tu localStorage hien thi len giao dien
      showSearchHistory(user.searchHistory);
    } else {
      console.error("User data not found for the current email.");
    }
  });
}

// ham hien thi lich su tim kiem
function showSearchHistory(historyList) {
  const historyListElement = document.getElementById("history-list");
  if (!historyList.length) {
    historyListElement.innerHTML = "<p>No search history found.</p>";
    return;
  } else {
    // tu chinh lai HTML
    historyList.forEach((element) => {
      historyListElement.innerHTML += `
            <li>${element["game-title"]}</li>`;
    });
  }
}
