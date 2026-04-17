document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initRiskChecker();
  initChecklist();
  initCountryNotes();
});

function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav a[data-page]');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      navigateTo(pageId);
      navMenu.classList.remove('active');
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  window.addEventListener('popstate', function() {
    const pageId = getPageFromHash();
    if (pageId) {
      navigateTo(pageId);
      updateNavActive(pageId);
    }
  });
  
  const initialPage = getPageFromHash() || 'home';
  navigateTo(initialPage);
  updateNavActive(initialPage);
}

function getPageFromHash() {
  const hash = window.location.hash.slice(1);
  const validPages = ['home', 'risk-checker', 'checklist', 'country-notes', 'about', 'privacy-policy', 'terms', 'affiliate-disclosure'];
  return validPages.includes(hash) ? hash : null;
}

function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    window.scrollTo(0, 0);
  }
  
  if (window.location.hash.slice(1) !== pageId) {
    history.pushState({ page: pageId }, '', `#${pageId}`);
  }
  
  const titles = {
    'home': 'Travel Privacy Toolkit - Home',
    'risk-checker': 'Risk Checker - Travel Privacy Toolkit',
    'checklist': 'Privacy Checklist - Travel Privacy Toolkit',
    'country-notes': 'Country Notes - Travel Privacy Toolkit',
    'about': 'About Us - Travel Privacy Toolkit',
    'privacy-policy': 'Privacy Policy - Travel Privacy Toolkit',
    'terms': 'Terms of Service - Travel Privacy Toolkit',
    'affiliate-disclosure': 'Affiliate Disclosure - Travel Privacy Toolkit'
  };
  
  document.title = titles[pageId] || 'Travel Privacy Toolkit';
}

function updateNavActive(pageId) {
  document.querySelectorAll('nav a[data-page]').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });
}

function initRiskChecker() {
  const riskForm = document.getElementById('risk-form');
  if (!riskForm) return;
  
  riskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const destination = document.getElementById('destination').value;
    const purpose = document.getElementById('purpose').value;
    const devices = document.querySelectorAll('input[name="devices"]:checked').length;
    const sensitiveData = document.getElementById('sensitive-data').value;
    
    let riskScore = 0;
    const riskFactors = [];
    
    const highRiskCountries = ['china', 'russia', 'iran', 'north-korea', 'uae', 'saudi-arabia', 'egypt', 'turkey', 'vietnam', 'thailand'];
    const mediumRiskCountries = ['india', 'indonesia', 'malaysia', 'brazil', 'mexico', 'south-africa', 'morocco', 'argentina'];
    
    if (highRiskCountries.includes(destination)) {
      riskScore += 40;
      riskFactors.push('High surveillance country');
    } else if (mediumRiskCountries.includes(destination)) {
      riskScore += 20;
      riskFactors.push('Moderate surveillance country');
    }
    
    if (purpose === 'journalism' || purpose === 'activism') {
      riskScore += 30;
      riskFactors.push('High-risk travel purpose');
    } else if (purpose === 'business') {
      riskScore += 15;
      riskFactors.push('Business data at risk');
    }
    
    if (devices >= 3) {
      riskScore += 20;
      riskFactors.push('Multiple devices increase attack surface');
    } else if (devices >= 2) {
      riskScore += 10;
    }
    
    if (sensitiveData === 'yes') {
      riskScore += 25;
      riskFactors.push('Sensitive data increases target value');
    }
    
    let riskLevel, riskClass;
    if (riskScore >= 60) {
      riskLevel = 'HIGH';
      riskClass = 'risk-high';
    } else if (riskScore >= 30) {
      riskLevel = 'MEDIUM';
      riskClass = 'risk-medium';
    } else {
      riskLevel = 'LOW';
      riskClass = 'risk-low';
    }
    
    displayRiskResults(riskLevel, riskClass, riskScore, riskFactors, destination);
  });
}

function displayRiskResults(riskLevel, riskClass, riskScore, riskFactors, destination) {
  const resultsDiv = document.getElementById('risk-results');
  if (!resultsDiv) return;
  
  const recommendations = getRecommendations(riskLevel, destination);
  
  let factorsHTML = '';
  if (riskFactors.length > 0) {
    factorsHTML = '<div class="mt-md"><strong>Risk Factors:</strong><ul style="padding-left: 1.5rem; margin-top: 0.5rem;">';
    riskFactors.forEach(factor => {
      factorsHTML += `<li>${factor}</li>`;
    });
    factorsHTML += '</ul></div>';
  }
  
  let recommendationsHTML = '<div class="mt-md"><strong>Recommended Actions:</strong><ul style="padding-left: 1.5rem; margin-top: 0.5rem;">';
  recommendations.forEach(rec => {
    recommendationsHTML += `<li>${rec}</li>`;
  });
  recommendationsHTML += '</ul></div>';
  
  if (riskLevel === 'HIGH' || riskLevel === 'MEDIUM') {
    recommendationsHTML += `
      <div class="card mt-md" style="background: #e7f3ff; border-left: 4px solid #0066cc;">
        <h4 style="color: #0066cc; margin-bottom: 0.5rem;">🔒 Recommended: Use a VPN</h4>
        <p style="margin-bottom: 1rem;">For your safety, we recommend using a trusted VPN service like NordVPN to encrypt your connection and protect your privacy while traveling.</p>
        <a href="https://go.nordvpn.net/SHAzv" target="_blank" rel="noopener noreferrer sponsored" class="btn btn-primary">Get NordVPN Now</a>
        <p style="font-size: 0.75rem; color: #666; margin-top: 0.5rem;">* This is an affiliate link. We may earn a commission at no extra cost to you.</p>
      </div>
    `;
  }
  
  resultsDiv.innerHTML = `
    <div class="card">
      <h3>Your Risk Assessment</h3>
      <div class="text-center mt-md">
        <span class="risk-level ${riskClass}" style="font-size: 1.25rem; padding: 0.75rem 1.5rem;">${riskLevel} RISK</span>
        <p style="margin-top: 1rem; color: #666;">Risk Score: ${riskScore}/100</p>
      </div>
      ${factorsHTML}
      ${recommendationsHTML}
    </div>
  `;
  
  resultsDiv.classList.remove('hidden');
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getRecommendations(riskLevel, destination) {
  const baseRecommendations = [
    'Enable two-factor authentication on all accounts',
    'Use strong, unique passwords for each service',
    'Keep all software and apps updated',
    'Backup important data before traveling',
    'Be cautious on public Wi-Fi networks'
  ];
  
  const highRiskRecommendations = [
    'Use a reputable VPN service at all times',
    'Consider using a travel-only device',
    'Avoid accessing sensitive accounts',
    'Be aware of local surveillance laws',
    'Consider using encrypted messaging apps',
    'Disable unnecessary services and apps'
  ];
  
  const mediumRiskRecommendations = [
    'Use a VPN on public networks',
    'Be selective about which accounts you access',
    'Monitor your accounts for suspicious activity',
    'Research local digital rights situation'
  ];
  
  if (riskLevel === 'HIGH') {
    return [...baseRecommendations, ...highRiskRecommendations];
  } else if (riskLevel === 'MEDIUM') {
    return [...baseRecommendations, ...mediumRiskRecommendations];
  }
  
  return baseRecommendations;
}

function initChecklist() {
  const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  
  if (checklistItems.length === 0) return;
  
  loadChecklistState();
  
  checklistItems.forEach(item => {
    item.addEventListener('change', function() {
      const listItem = this.closest('.checklist-item');
      if (this.checked) {
        listItem.classList.add('checked');
      } else {
        listItem.classList.remove('checked');
      }
      
      updateProgress();
      saveChecklistState();
    });
  });
  
  updateProgress();
  
  const resetBtn = document.getElementById('reset-checklist');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to reset your checklist?')) {
        checklistItems.forEach(item => {
          item.checked = false;
          item.closest('.checklist-item').classList.remove('checked');
        });
        updateProgress();
        saveChecklistState();
      }
    });
  }
}

function updateProgress() {
  const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  const checkedItems = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked');
  
  if (checklistItems.length === 0) return;
  
  const percentage = Math.round((checkedItems.length / checklistItems.length) * 100);
  
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage}% Complete`;
  }
}

function saveChecklistState() {
  const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  const state = {};
  
  checklistItems.forEach(item => {
    state[item.id] = item.checked;
  });
  
  localStorage.setItem('travelPrivacyChecklist', JSON.stringify(state));
}

function loadChecklistState() {
  const savedState = localStorage.getItem('travelPrivacyChecklist');
  if (!savedState) return;
  
  try {
    const state = JSON.parse(savedState);
    Object.keys(state).forEach(id => {
      const item = document.getElementById(id);
      if (item) {
        item.checked = state[id];
        if (state[id]) {
          item.closest('.checklist-item').classList.add('checked');
        }
      }
    });
  } catch (e) {
    console.error('Error loading checklist state:', e);
  }
}

function initCountryNotes() {
  const searchInput = document.getElementById('country-search');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const countryCards = document.querySelectorAll('.country-card');
    
    countryCards.forEach(card => {
      const countryName = card.getAttribute('data-country').toLowerCase();
      const region = card.getAttribute('data-region').toLowerCase();
      
      if (countryName.includes(searchTerm) || region.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

window.TravelPrivacyToolkit = {
  navigateTo,
  updateProgress,
  resetChecklist: function() {
    localStorage.removeItem('travelPrivacyChecklist');
    location.reload();
  }
};
