// Function to refresh the revenge ideas section with better styling
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
    listItem.style.padding = "10px";
    listItem.style.margin = "5px 0";
    listItem.style.borderRadius = "8px";
    listItem.style.backgroundColor = "#ffcccc";
    listItem.style.fontWeight = "bold";
    listItem.style.listStyle = "none";
    listItem.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.2)";
    listElement.appendChild(listItem);
  });
}
