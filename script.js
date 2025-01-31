// Load stored revenges when the page loads
document.addEventListener('DOMContentLoaded', function () {
  loadRevengeData();
});

// Function to handle form submission and adding new revenge
document.getElementById('revenge-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission that would reload the page

  // Get values from the form
  const personName = document.getElementById('person-name').value.trim();
  const revengePlan = document.getElementById('revenge-plan').value.trim();
  const revengeReason = document.getElementById('revenge-reason').value.trim();

  // Ensure person name and revenge plan are not empty
  if (!personName || !revengePlan) return;

  // Check if there is already a folder for this person
  let revengeFolder = document.getElementById(personName);
  if (!revengeFolder) {
    revengeFolder = createRevengeFolder(personName);
  }

  // Create a new revenge item
  const revengeItem = document.createElement('div');
  revengeItem.classList.add('revenge-item');
  revengeItem.innerHTML = `
    <p><strong>Revenge Plan:</strong> ${revengePlan}</p>
    <p><strong>Reason:</strong> ${revengeReason || 'No reason provided'}</p>
    <button onclick="markRevengeCompleted(this, '${personName}')">Mark as Completed</button>
  `;

  // Append the new revenge item to the folder
  revengeFolder.querySelector('.folder-content').appendChild(revengeItem);

  // Save to local storage
  saveRevengeData();

  // Reset the form
  document.getElementById('revenge-form').reset();
});

// Function to create a revenge folder for a person
function createRevengeFolder(personName) {
  const folder = document.createElement('div');
  folder.classList.add('revenge-folder');
  folder.id = personName;

  // Add folder header with person's name
  const folderHeader = document.createElement('div');
  folderHeader.classList.add('folder-header');
  folderHeader.innerText = personName;

  // Create the folder content area to hold the revenge items
  const folderContent = document.createElement('div');
  folderContent.classList.add('folder-content');

  folder.appendChild(folderHeader);
  folder.appendChild(folderContent);

  document.getElementById('revenge-folders').appendChild(folder);

  // Toggle folder visibility
  folderHeader.addEventListener('click', function () {
    folderContent.style.display = folderContent.style.display === 'none' ? 'block' : 'none';
  });

  return folder;
}

// Function to mark a revenge as completed
function markRevengeCompleted(button, personName) {
  const revengeItem = button.closest('.revenge-item');
  revengeItem.remove();

  const folder = document.getElementById(personName);
  if (folder && folder.querySelectorAll('.revenge-item').length === 0) {
    folder.remove(); // Remove the folder if empty
  }

  // Update local storage
  saveRevengeData();
}

// Function to save revenge data to localStorage
function saveRevengeData() {
  const revengeFolders = document.querySelectorAll('.revenge-folder');
  const revengeData = {};

  revengeFolders.forEach(folder => {
    const personName = folder.id;
    const revengeItems = folder.querySelectorAll('.revenge-item');

    if (revengeItems.length === 0) {
      return; // Don't save empty folders
    }

    revengeData[personName] = [];
    revengeItems.forEach(item => {
      const revengePlan = item.querySelector('p:nth-child(1)').textContent.replace('Revenge Plan: ', '');
      const revengeReason = item.querySelector('p:nth-child(2)').textContent.replace('Reason: ', '');
      revengeData[personName].push({ revengePlan, revengeReason });
    });
  });

  localStorage.setItem('revengeData', JSON.stringify(revengeData));
}

// Function to load revenge data from localStorage
function loadRevengeData() {
  const savedData = localStorage.getItem('revengeData');
  if (!savedData) return;

  const revengeData = JSON.parse(savedData);

  Object.keys(revengeData).forEach(personName => {
    let revengeFolder = document.getElementById(personName);
    if (!revengeFolder) {
      revengeFolder = createRevengeFolder(personName);
    }

    revengeData[personName].forEach(({ revengePlan, revengeReason }) => {
      const revengeItem = document.createElement('div');
      revengeItem.classList.add('revenge-item');
      revengeItem.innerHTML = `
        <p><strong>Revenge Plan:</strong> ${revengePlan}</p>
        <p><strong>Reason:</strong> ${revengeReason || 'No reason provided'}</p>
        <button onclick="markRevengeCompleted(this, '${personName}')">Mark as Completed</button>
      `;

      revengeFolder.querySelector('.folder-content').appendChild(revengeItem);
    });
  });
}

// Function to refresh revenge ideas
function refreshRevengeIdeas() {
  const ideas = [
    'Send a fake invitation to a party that they won’t be able to attend.',
    'Create a fake social media account and follow them with ridiculous comments.',
    'Leave annoying but subtle notes around their office or home.',
    'Organize an embarrassing surprise for them.',
    'Challenge them to a game and then purposely lose.',
  ];

  const randomIdeas = [];
  while (randomIdeas.length < 5) {
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    if (!randomIdeas.includes(randomIdea)) {
      randomIdeas.push(randomIdea);
    }
  }

  const ideasList = document.getElementById('revenge-ideas-list');
  ideasList.innerHTML = '';
  randomIdeas.forEach(function (idea) {
    const listItem = document.createElement('li');
    listItem.textContent = idea;
    ideasList.appendChild(listItem);
  });
}

// Initialize the revenge ideas when the page loads
refreshRevengeIdeas();
