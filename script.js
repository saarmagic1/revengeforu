// Function to refresh and style the revenge ideas section
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
  const sectionElement = document.getElementById('revenge-ideas-section'); // Assuming you have a wrapper div

  listElement.innerHTML = ''; // Clear the current list

  // Pick 5 random ideas
  const shuffledIdeas = ideas.sort(() => 0.5 - Math.random()).slice(0, 5);
  shuffledIdeas.forEach(idea => {
    const listItem = document.createElement('li');
    listItem.textContent = idea;
    listItem.style.padding = "5px 0";
    listItem.style.listStyle = "none";
    listElement.appendChild(listItem);
  });

  // Style the whole section
  sectionElement.style.padding = "15px";
  sectionElement.style.margin = "10px 0";
  sectionElement.style.borderRadius = "10px";
  sectionElement.style.backgroundColor = "#ffeb3b"; // Bright yellow
  sectionElement.style.fontWeight = "bold";
  sectionElement.style.boxShadow = "3px 3px 15px rgba(0, 0, 0, 0.2)";
  sectionElement.style.textAlign = "center";
}
