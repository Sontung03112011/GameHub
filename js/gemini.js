const apiKey = "AIzaSyATfCFV-NcfZpV_xL2s5kBJh6TubyxzRkI"; // Replace with your actual API key
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

// lay duoc tu khoa search tu input
// tra ve JSON: cu phap nhat dinh
function getSearchObject(searchQuery) {
  return {
    contents: [
      {
        parts: [
          {
            text: ` Search for: ${searchQuery} (if it other language (not Eng), please translate to that language of search). 
            Return the results in JSON format, please only return the JSON object without any additional text or explanation.
            Object definition: { "game-title": string, 
            "game-description": string,
             "game-link": string, 
             "game-functions": [{"icon (font-awesome)": string, "text": string}], 
             "game-platforms": [{"icon (font-awesome)": string, "text": string}], 
             "game-genres": [string] }`,
          },
        ],
      },
    ],
  };
}

// ----------------------------------------------------
// bat su kien khi enter sau khi nhap vao input
if (!window.location.href.includes("/pages/")) {
  document
    .getElementById("search-input")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Ngăn chặn hành động mặc định của phím Enter
        const searchQuery = this.value.trim(); // Lấy giá trị từ input
        if (!searchQuery) {
          alert("Please enter a search query.");
          return; // Dừng nếu không có giá trị
        }
        // Nếu có giá trị, cập nhật requestData
        const requestData = getSearchObject(searchQuery);

        // Gọi hàm để gửi yêu cầu
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.json())
          .then((data) => {
            // luu du lieu vao localStorage
            const results = data.candidates[0].content.parts[0].text; // json string
            // cat phan thua dau va cuoi
            const newResults = results
              .replace("```json", "")
              .replace("```", "");
            localStorage.setItem("searchResults", newResults);
            // chuyen trang
            window.location.href = "../pages/game.html";
          })
          .catch((error) => console.error("Error:", error));
      }
    });
}

//---------------------------------------------------
function renderSearchResults(results) {
  // goi lai cac phan tu trong results
  renderTitle(results["game-title"]);
  renderDescription(results["game-description"]);
  renderLink(results["game-link"]);
  renderFunctions(results["game-functions"]);
  renderPlatforms(results["game-platforms"]);
  renderGenres(results["game-genres"]);
}

// tach tung phan con de generate ra HTML
function renderTitle(title) {
  document.getElementById("game-title").innerText = title;
}
function renderDescription(description) {
  document.getElementById("game-description").innerText = description;
}
function renderLink(link) {
  document.getElementById("game-link").href = link || "#"; // Neu khong co link, gan la #
}
function renderFunctions(functions) {
  document.getElementById("game-functions").innerHTML = functions
    .map(
      (func) => `
         <div class="function-item">
              <i class="fa-solid ${func["icon (font-awesome)"]}"></i>
              <span class="function-span">${func.text}</span>
        </div>
    `
    )
    .join("");
}
function renderPlatforms(platforms) {
  document.getElementById("game-requirements").innerHTML = platforms
    .map(
      (platform) => `
         <div class="function-item">
              <i class="fa-solid ${platform["icon (font-awesome)"]}"></i>
              <span class="function-span">${platform.text}</span>
        </div>
    `
    )
    .join("");
}
function renderGenres(genres) {
  document.getElementById("game-genres").innerHTML = genres
    .map((genre) => `<button>${genre}</button>`)
    .join(" ");
}

// ---------------------------------------------------
if (window.location.pathname === "/pages/game.html") {
  // lay du lieu tu localStorage
  const results = localStorage.getItem("searchResults");
  if (results) {
    try {
      const parsedResults = JSON.parse(results); // json -> object
      console.log(parsedResults);
      // generate HTML for game
      renderSearchResults(parsedResults[0]);
      // luu vao localStorage (lich su tim kiem)
      addSearchHistory(parsedResults[0]);
    } catch (error) {
      console.error("Error parsing search results:", error);
      alert("Error parsing search results. Please try again.");
      window.location.href = "../index.html"; // Redirect to home page if no results
    }
  } else {
    alert("No search results found. Please perform a search first.");
    window.location.href = "../index.html"; // Redirect to home page if no results
  }
}

// ---------------------------------------------------
// ham them history cho object user trong localStorage
function addSearchHistory(historyItemData) {
  const currentEmail = localStorage.getItem("currentUser");
  if (!currentEmail) {
    console.error(
      "No user is currently logged in, so we don't save your data."
    );
    return;
  }

  const user = JSON.parse(localStorage.getItem(currentEmail));
  if (!user) {
    Alert("Have a server error, please try again.");
    // quay lai trong login
    window.location.href = "../pages/login.html";
    return;
  }

  // Initialize searchHistory if it doesn't exist
  user.searchHistory = user.searchHistory || [];

  // Add new history item
  user.searchHistory.push(historyItemData);

  // Save updated user data back to localStorage
  localStorage.setItem(currentEmail, JSON.stringify(user));
}
