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

  // Manually clear the form after adding the revenge
  document.getElementById('revenge-form').reset();

  // Ensure that the form is completely cleared
  document.getElementById('person-name').value = '';
  document.getElementById('revenge-plan').value = '';
  document.getElementById('revenge-reason').value = '';
});

// Function to save only revenge data to localStorage
function saveRevengeData() {
  const revengeFolders = document.querySelectorAll('.revenge-folder');
  const revengeData = {};

  revengeFolders.forEach(folder => {
    const personName = folder.id;
    const revengeItems = folder.querySelectorAll('.revenge-item');

    if (revengeItems.length === 0) return; // Don't save empty folders

    revengeData[personName] = [];
    revengeItems.forEach(item => {
      const revengePlan = item.querySelector('p:nth-child(1)').textContent.replace('Revenge Plan: ', '');
      const revengeReason = item.querySelector('p:nth-child(2)').textContent.replace('Reason: ', '');
      revengeData[personName].push({ revengePlan, revengeReason });
    });
  });

  localStorage.setItem('revengeData', JSON.stringify(revengeData));
}

// Function to load only revenge data from localStorage
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

// Initialize the revenge ideas when the page loads
refreshRevengeIdeas();
