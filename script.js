function displayRevengeFolders() {
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

function addAnotherRevenge(personName) {
  document.getElementById('person-name').value = personName;
  document.getElementById('revenge-plan').focus();
}
