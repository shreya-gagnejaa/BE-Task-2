// Function to toggle the theme between light and dark mode
function toggleTheme() {
    const body = document.body;
    const h1 = document.querySelector('h1');
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');
  
    // Toggle the 'dark-mode' class on the body and other elements
    body.classList.toggle('dark-mode');
    h1.classList.toggle('dark-mode');
    links.forEach(link => link.classList.toggle('dark-mode'));
    buttons.forEach(button => button.classList.toggle('dark-mode'));
  
    // Update the button text
    const button = document.getElementById('theme-toggle');
    if (body.classList.contains('dark-mode')) {
      button.textContent = 'Switch to Light Mode';
    } else {
      button.textContent = 'Switch to Dark Mode';
    }
  
    // Store the theme preference in localStorage
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }
  
  // Apply the saved theme from localStorage when the page loads
  window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      document.querySelector('h1').classList.add('dark-mode');
      document.querySelectorAll('a').forEach(link => link.classList.add('dark-mode'));
      document.querySelectorAll('button').forEach(button => button.classList.add('dark-mode'));
      document.getElementById('theme-toggle').textContent = 'Switch to Light Mode';
    }
  };
  