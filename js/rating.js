document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".stars i");
  const messageTextArea = document.getElementById("message");
  const submitButton = document.getElementById("submitRating");
  const thankYouMessage = document.getElementById("thankYouMessage");

  let selectedRating = 0; // To store the user's selected rating

  // Add event listeners to each star
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.rating); // Get the rating from data-rating attribute

      // Remove 'selected' class from all stars
      stars.forEach((s) => s.classList.remove("selected"));

      // Add 'selected' class to the clicked star and all stars before it
      for (let i = 0; i < selectedRating; i++) {
        stars[i].classList.add("selected");
      }
    });

    // Optional: Add hover effect (fills stars on hover)
    star.addEventListener("mouseover", () => {
      for (let i = 0; i < parseInt(star.dataset.rating); i++) {
        stars[i].classList.add("selected");
      }
    });

    star.addEventListener("mouseout", () => {
      // Only clear hover effect if a rating hasn't been selected yet
      if (selectedRating === 0) {
        stars.forEach((s) => s.classList.remove("selected"));
      } else {
        // If a rating is selected, re-apply the selected class up to the selected rating
        for (let i = 0; i < selectedRating; i++) {
          stars[i].classList.add("selected");
        }
      }
    });
  });

  // Handle submit button click
  submitButton.addEventListener("click", () => {
      if (localStorage.getItem("currentUser") === null) {
        alert("You must be logged in to rate!");
        return;
      }
    const message = messageTextArea.value.trim();

    if (selectedRating === 0) {
      alert("Please select a star rating!");
      return;
    }

    // In a real application, you would send this data to a server
    // For demonstration, we'll just log it and show a thank you message
    console.log("User Rating:", selectedRating);
    console.log("User Message:", message);

    // Reset the form
    selectedRating = 0;
    stars.forEach((s) => s.classList.remove("selected"));
    messageTextArea.value = "";

    // Show thank you message
    thankYouMessage.style.display = "block";
    setTimeout(() => {
      thankYouMessage.style.display = "none";
    }, 3000); // Hide after 3 seconds
  });
});
