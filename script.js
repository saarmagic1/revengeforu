function displayRevengeFolders() {
  revengeFolders.innerHTML = ''; // Clear the folders before displaying

  // Loop through the revenges object and display each person's list or folder
  for (const personName in revenges) {
    const personRevengeList = revenges[personName];
    
    // Create a folder if there are multiple revenge plans, else just show the revenge directly
    if (personRevengeList.length === 1) {
      const revengeItem = document.createElement('div');
      revengeItem.classList.add('revenge-item');
      revengeItem.dataset.personName = personName;  // Add a data attribute for easy targeting
      revengeItem.innerHTML = `
        <h3>${personName}</h3>
        <span>${personRevengeList[0].revengePlan}</span>
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

      const folderContent = document.createElement('div');
      folderContent.classList.add('folder-content');

      personRevengeList.forEach((revenge, index) => {
        const revengeItem = document.createElement('div');
        revengeItem.classList.add('revenge-item');
        revengeItem.dataset.personName = personName;  // Add a data attribute for easy targeting
        revengeItem.innerHTML = `
          <span>${revenge.revengePlan}</span>
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

function addAnotherRevenge(personName) {
  // Find the container for the person using the data attribute
  const personContainer = document.querySelector(`.revenge-item[data-person-name='${personName}']`);
  
  // Create a new input field directly in the UI for adding another revenge plan
  const newRevengeItem = document.createElement('div');
  newRevengeItem.classList.add('revenge-item');
  newRevengeItem.innerHTML = `
    <textarea placeholder="Describe your next revenge..." rows="4"></textarea>
    <button onclick="submitAnotherRevenge('${personName}', this)">Submit</button>
  `;
  personContainer.appendChild(newRevengeItem);
}

function submitAnotherRevenge(personName, button) {
  const revengePlan = button.previousElementSibling.value.trim();
  if (revengePlan) {
    revenges[personName].push({ revengePlan, isClosed: false });
    displayRevengeFolders();
  } else {
    alert('Please enter a revenge plan!');
  }
}
