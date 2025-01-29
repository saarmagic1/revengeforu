// Object to store all revenges by name
let revengeListByName = {};

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

  // Create new revenge item
  const newRevenge = { plan, reason };

  // Add the revenge to the revenge list of the person (grouping by name)
  if (!revengeListByName[name]) {
    revengeListByName[name] = [];
  }
  revengeListByName[name].push(newRevenge);

  // Clear the form inputs after submission
  document.getElementById("person-name").value = "";
  document.getElementById("revenge-plan").value = "";
  document.getElementById("revenge-reason").value = "";

  // Update the revenge folder view
  displayRevengeFolders();
});

// Function to display the revenge folders
function displayRevengeFolders() {
  const revengeFolders = document.getElementById("revenge-folders");
  revengeFolders.innerHTML = ""; // Clear the folder view

  // Loop through the revengeListByName object and display each name as a folder
  for (const name in revengeListByName) {
    const folderHeader = document.createElement("div");
    folderHeader.classList.add("folder-header");
    folderHeader.textContent = `${name} (${revengeListByName[name].length} revenge(s))`;
    folderHeader.onclick = () => toggleFolder(name);

    const folderContent = document.createElement("div");
    folderContent.classList.add("folder-content");

    revengeListByName[name].forEach((revenge, index) => {
      const revengeItem = document.createElement("div");
      revengeItem.classList.add("revenge-item");
      revengeItem.innerHTML = `
        <p><strong>Revenge Plan:</strong> ${revenge.plan}</p>
        ${revenge.reason ? `<p><strong>Reason:</strong> ${revenge.reason}</p>` : ""}
        <button onclick="completeRevenge('${name}', ${index})">Complete Revenge</button>
        <button onclick="addAnotherRevenge('${name}')">Add Another Revenge</button>
      `;

      folderContent.appendChild(revengeItem);
    });

    revengeFolders.appendChild(folderHeader);
    revengeFolders.appendChild(folderContent);
  }
}

// Function to toggle the visibility of a folder
function toggleFolder(name) {
  const folderContent = document.querySelectorAll(`#revenge-folders div.folder-content`); 
  folderContent.forEach(content => {
    if (content.previousElementSibling.textContent.startsWith(name)) {
      content.style.display = content.style.display === "none" ? "block" : "none";
    }
  });
}

// Function to complete revenge (remove from the list)
function completeRevenge(name, index) {
  revengeListByName[name].splice(index, 1);
  displayRevengeFolders(); // Update the view after completing revenge
  document.getElementById("congratulations-message").style.display = "block";
  setTimeout(() => {
    document.getElementById("congratulations-message").style.display = "none";
  }, 3000); // Hide the message after 3 seconds
}

// Function to add another revenge for the same name
function addAnotherRevenge(name) {
  const revengePlan = prompt("Enter the new revenge plan for " + name);
  if (revengePlan) {
    revengeListByName[name].push({ plan: revengePlan, reason: "" });
    displayRevengeFolders(); // Update the view
  }
}

// Initial function to populate revenge ideas
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

