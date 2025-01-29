// Initialize the revenges object
let revenges = {};

// Adding event listener to prevent form submission and handle it using JavaScript
document.getElementById('revenge-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the page from reloading on form submission

  // Get the form data
  const personName = document.getElementById('person-name').value;
  const revengePlan = document.getElementById('revenge-plan').value;
  const revengeReason = document.getElementById('revenge-reason').value;

  // Add revenge to the revenges object
  if (!revenges[personName]) {
    revenges[personName] = [];
  }

  revenges[personName].push({ revengePlan, revengeReason });

  // Clear the form fields
  document.getElementById('person-name').value = '';
  document.getElementById('revenge-plan').value = '';
  document.getElementById('revenge-reason').value = '';

  // Update the display
  displayRevengeFolders();
});

// Display revenges function
function displayRevengeFolders() {
  const revengeFolders = document.getElementById('revenge-folders');
  revengeFolders.innerHTML = ''; // Clear the folders before displaying

  // Loop through the revenges object and display each person's list or folder
  for (const personName in revenges) {
    const personRevengeList = revenges[personName];

    // If the person has only one revenge, display the revenge directly
    if (personRevengeList.length === 1) {
      const revengeItem = document.createElement('div');
      revengeItem.classList.add('revenge-item');
      revengeItem.innerHTML = `
        <h3>${personName}</h3>
        <span>${personRevengeList[0].revengePlan}</span>
        <p>Reason: ${personRevengeList[0].revengeReason}</p>
        <button onclick="closeRevenge('${personName}', 0)">Close Revenge</button>
      `;
      revengeFolders.appendChild(revengeItem);
    } else if (personRevengeList.length > 1) {
      // If more than one revenge, create a folder
      const folder = document.createElement('div');
      folder.classList.add('revenge-folder');

      const folderHeader = document.createElement('div');
      folderHeader.classList.add('folder-header');
      folderHeader.textContent = `${personName} - (${personRevengeList.length}) Revenges`;
      folderHeader.onclick = function () {
        folderContent.style.display = folderContent.style.display === 'none' ? 'block' : 'none';
      };

      const folderContent = document.createElement('div');
      folderContent.classList.add('folder-content');
      folderContent.style.display = 'block'; // Default to visible

      personRevengeList.forEach((revenge, index) => {
        const revengeItem = document.createElement('div');
        revengeItem.classList.add('revenge-item');
        revengeItem.innerHTML = `
          <span>${revenge.revengePlan}</span>
          <p>Reason: ${revenge.revengeReason}</p>
          <button onclick="closeRevenge('${personName}', ${index})">Close Revenge</button>
        `;
        folderContent.appendChild(revengeItem);
      });

      folder.appendChild(folderHeader);
      folder.appendChild(folderContent);
      revengeFolders.appendChild(folder);
    }
  }
}

// Close revenge function
function closeRevenge(personName, index) {
  if (revenges[personName]) {
    revenges[personName].splice(index, 1); // Remove the revenge at the given index

    // If no more revenges left for the person, delete their entry
    if (revenges[personName].length === 0) {
      delete revenges[personName];
    }

    displayRevengeFolders(); // Refresh the list

    // Show the congratulations message
    showCongratulatoryMessage();
  }
}

// Show the congratulatory message with the number of remaining revenges
function showCongratulatoryMessage() {
  const remainingRevenges = Object.values(revenges).reduce((acc, revengesList) => acc + revengesList.length, 0);
  const message = `Congratulations on completing the revenge! 🎉 You have ${remainingRevenges} revenge(s) left.`;
  const messageElement = document.getElementById('congratulations-message');
  messageElement.textContent = message;
  messageElement.style.display = 'block';

  // Hide the message after 5 seconds
  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 5000);
}

// Function to refresh the revenge ideas section (for the sake of the example, it refreshes randomly)
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
  listElement.innerHTML = ''; // Clear the current list

  // Pick 5 random ideas and display them
  const shuffledIdeas = ideas.sort(() => 0.5 - Math.random()).slice(0, 5);
  shuffledIdeas.forEach(idea => {
    const listItem = document.createElement('li');
    listItem.textContent = idea;
    listElement.appendChild(listItem);
  });
}

// Event listener for the refresh button
document.getElementById('refresh-revenges-button').addEventListener('click', function() {
  refreshRevengeIdeas();
});
