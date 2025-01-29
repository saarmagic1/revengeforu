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
    // If no folder exists for this person, create one
    revengeFolder = createRevengeFolder(personName);
  }

  // Create a new revenge item
  const revengeItem = document.createElement('div');
  revengeItem.classList.add('revenge-item');
  revengeItem.innerHTML = `
    <p><strong>Revenge Plan:</strong> ${revengePlan}</p>
    <p><strong>Reason:</strong> ${revengeReason || 'No reason provided'}</p>
    <button onclick="markRevengeCompleted(this)">Mark as Completed</button>
  `;

  // Append the new revenge item to the folder
  revengeFolder.querySelector('.folder-content').appendChild(revengeItem);

  // Reset the form to allow adding new revenge plans
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

  // Append the header and content to the folder
  folder.appendChild(folderHeader);
  folder.appendChild(folderContent);

  // Append the new folder to the all revenges section
  document.getElementById('revenge-folders').appendChild(folder);

  // Toggle folder visibility when the header is clicked
  folderHeader.addEventListener('click', function () {
    folderContent.style.display = folderContent.style.display === 'none' ? 'block' : 'none';
  });

  return folder;
}

// Function to mark a revenge as completed (remove it from the list)
function markRevengeCompleted(button) {
  const revengeItem = button.closest('.revenge-item');
  revengeItem.remove(); // Remove the revenge item

  // If no revenge items remain for this person, remove the folder
  const folder = revengeItem.closest('.revenge-folder');
  if (folder.querySelectorAll('.revenge-item').length === 0) {
    folder.remove();
  }
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

  // Update the list with new random ideas
  const ideasList = document.getElementById('revenge-ideas-list');
  ideasList.innerHTML = ''; // Clear current list
  randomIdeas.forEach(function (idea) {
    const listItem = document.createElement('li');
    listItem.textContent = idea;
    ideasList.appendChild(listItem);
  });
}

// Initialize the revenge ideas when the page loads
refreshRevengeIdeas();
