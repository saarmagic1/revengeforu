// Function to handle revenge form submission
document.getElementById("revenge-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the page from refreshing on form submit

  const name = document.getElementById("person-name").value;
  const plan = document.getElementById("revenge-plan").value;
  const reason = document.getElementById("revenge-reason").value;

  // Check if both name and revenge plan are entered
  if (!name || !plan) {
    alert("Please enter a name and a revenge plan!");
    return;
  }

  // Create a new revenge item and display it
  const revengeList = document.getElementById("revenge-folders");
  const newRevenge = document.createElement("div");
  newRevenge.classList.add("revenge-item");
  newRevenge.innerHTML = `
    <strong>${name}</strong>: ${plan}
    ${reason ? `<p>Reason: ${reason}</p>` : ""}
  `;

  // Append the new revenge item to the list
  revengeList.appendChild(newRevenge);

  // Clear the form inputs after submission
  document.getElementById("person-name").value = "";
  document.getElementById("revenge-plan").value = "";
  document.getElementById("revenge-reason").value = "";
});

// Function to refresh and style the revenge ideas section
function refreshRevengeIdeas() {
  const ideas = [
    "Send them an anonymous package of confetti.",
    "Change their phone language to something confusing.",
    "Unplug their computer every time they leave it.",
    "Leave a funny note on their desk every morning.",
    "Swap their favorite snacks with something gross.",
    "Fill their shoes with cotton balls.",
    "Replace their sugar with salt.",
    "Schedule a meeting on their behalf at 7 AM.",
    "Cover their chair in plastic wrap.",
    "Hide their phone charger every day."
  ];

  const listElement = document.getElementById('revenge-ideas-list');
  const sectionElement = document.getElementById('revenge-ideas-section'); // Wrapper div

  listElement.innerHTML = ''; // Clear the current list

  // Pick 5 random ideas
  const shuffledIdeas = ideas.sort(() => 0.5 - Math.random()).slice(0, 5);
  shuffledIdeas.forEach(idea => {
    const listItem = document.createElement('li');
    listItem.textContent = idea;

    // Style each list item for separation
    listItem.style.padding = "12px";
    listItem.style.margin = "8px 0"; // Adds spacing between items
    listItem.style.borderRadius = "8px";
    listItem.style.backgroundColor = "#FFF5D1"; // Lighter yellow for contrast
    listItem.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

    listElement.appendChild(listItem);
  });

  // Style the whole section
  sectionElement.style.padding = "20px";
  sectionElement.style.margin = "15px 0";
  sectionElement.style.borderRadius = "10px";
  sectionElement.style.backgroundColor = "#FFFA90"; // Faded bright yellow
  sectionElement.style.fontWeight = "bold";
  sectionElement.style.boxShadow = "3px 3px 15px rgba(0, 0, 0, 0.2)";
  sectionElement.style.textAlign = "center";
}
