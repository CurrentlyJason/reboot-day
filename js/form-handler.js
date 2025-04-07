// Form submission handler for Reboot Day waitlist
document.addEventListener('DOMContentLoaded', function() {
  const waitlistForm = document.getElementById('waitlist-form');
  const formSuccess = document.getElementById('form-success');
  
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      
      // Store data in localStorage for demonstration purposes
      const waitlistData = JSON.parse(localStorage.getItem('waitlistData') || '[]');
      waitlistData.push({
        name: name,
        email: email,
        date: new Date().toISOString()
      });
      localStorage.setItem('waitlistData', JSON.stringify(waitlistData));
      
      // Send email notification (this would require backend integration)
      // For now, we'll simulate this with a console log
      console.log(`New waitlist signup: ${name} (${email})`);
      
      // Show success message
      waitlistForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');
      
      // Export data to CSV (for admin access)
      const csvContent = waitlistData.map(entry => 
        `${entry.name},${entry.email},${entry.date}`
      ).join('\n');
      
      // Create a download link for the admin
      const adminLink = document.getElementById('admin-download');
      if (adminLink) {
        const blob = new Blob([`Name,Email,Date\n${csvContent}`], { type: 'text/csv' });
        adminLink.href = URL.createObjectURL(blob);
        adminLink.download = `reboot-day-waitlist-${new Date().toISOString().slice(0,10)}.csv`;
      }
    });
  }
  
  // Admin functionality (hidden by default)
  const adminSection = document.getElementById('admin-section');
  const adminToggle = document.getElementById('admin-toggle');
  
  if (adminToggle && adminSection) {
    adminToggle.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Simple "authentication" - in a real app, this would be much more secure
      const password = prompt('Enter admin password:');
      if (password === 'rebootadmin') {
        adminSection.classList.remove('hidden');
        
        // Display current waitlist entries
        const waitlistData = JSON.parse(localStorage.getItem('waitlistData') || '[]');
        const adminList = document.getElementById('admin-list');
        
        if (adminList && waitlistData.length > 0) {
          adminList.innerHTML = waitlistData.map(entry => 
            `<li>${entry.name} (${entry.email}) - ${new Date(entry.date).toLocaleString()}</li>`
          ).join('');
        } else if (adminList) {
          adminList.innerHTML = '<li>No waitlist entries yet.</li>';
        }
      } else {
        alert('Incorrect password');
      }
    });
  }
});
