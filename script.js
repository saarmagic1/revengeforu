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

  // Show the congratulations message
  const congratulationsMessage = document.getElementById('congratulations-message');
  congratulationsMessage.style.display = 'block';
  setTimeout(() => {
    congratulationsMessage.style.display = 'none';
  }, 2000);
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
        <button onclick="addAnotherRevenge('${personName}')">Add Another Revenge</button>
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
          <button onclick="addAnotherRevenge('${personName}')">Add Another Revenge</button>
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
  }
}

// Add another revenge to the same person
function addAnotherRevenge(personName) {
  document.getElementById('person-name').value = personName;
  document.getElementById('revenge-plan').focus();
}

// Function to refresh revenge ideas
function refreshRevengeIdeas() {
  const revengeIdeas = [
    "Superglue their keyboard keys",
    "Replace their shampoo with hair dye",
    "Hide their phone and pretend it's lost",
    "Send them fake love letters from a made-up admirer",
    "Put a piece of tape over their computer mouse sensor",
    "Change their alarm to go off every hour",
    "Send them a package with a 'wrong address' note",
    "Fill their shoes with small pebbles",
    "Leave random sticky notes around their house with confusing messages",
    "Swap their regular pen with a disappearing ink pen"
  ];

  // Randomly shuffle the revenge ideas array
  const shuffledIdeas = revengeIdeas.sort(() => 0.5 - Math.random());

  // Select only the first 5 ideas from the shuffled list
  const fiveIdeas = shuffledIdeas.slice(0, 5);

  // Get the UL element and clear the current list
  const revengeIdeasList = document.getElementById('revenge-ideas-list');
  revengeIdeasList.innerHTML = '';

  // Append the 5 randomly selected revenge ideas to the list
  fiveIdeas.forEach(idea => {
    const listItem = document.createElement('li');
    listItem.textContent = idea;
    revengeIdeasList.appendChild(listItem);
  });
}
