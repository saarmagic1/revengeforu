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
    folderContent.style.display = "none"; // Initially hidden

    // Loop through all revenges for the person and add them to the folder content
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
