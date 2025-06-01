// EmpowerU Events Page Script

// Sample events data with reliable placeholder images
const EVENTS = [
    {
        id: 1,
        type: 'hackathon',
        title: 'Web Dev Hackathon',
        date: '2025-06-20T09:00',
        location: 'Buea, Cameroon',
        description: '48 hours of coding, learning, and networking. Prizes up to 500,000 FCFA!',
        price: 1500,
        attendees: 80,
        image: 'https://picsum.photos/80/80?random=1'
    },
    {
        id: 2,
        type: 'workshop',
        title: 'React Native Workshop',
        date: '2025-07-05T14:00',
        location: 'Douala, Cameroon',
        description: 'Hands-on workshop on building mobile apps with React Native.',
        price: 1000,
        attendees: 40,
        image: 'https://picsum.photos/80/80?random=2'
    },
    {
        id: 3,
        type: 'conference',
        title: 'Tech Leaders Conference',
        date: '2025-08-12T10:00',
        location: 'Yaounde, Cameroon',
        description: 'Meet and learn from top tech leaders in Africa.',
        price: 2500,
        attendees: 200,
        image: 'https://picsum.photos/80/80?random=3'
    },
    {
        id: 4,
        type: 'mentorship',
        title: 'Mentorship Session: Product Management',
        date: '2025-06-28T16:00',
        location: 'Online',
        description: 'Mentorship session with a senior product manager.',
        price: 0,
        attendees: 30,
        image: 'https://picsum.photos/80/80?random=4'
    },
    {
        id: 5,
        type: 'internship',
        title: 'Summer Internship Program',
        date: '2025-07-15T08:00',
        location: 'Bamenda, Cameroon',
        description: 'Join our summer internship and gain real-world experience.',
        price: 0,
        attendees: 25,
        image: 'https://picsum.photos/80/80?random=5'
    },
    {
        id: 6,
        type: 'hackathon',
        title: 'AI Innovation Challenge',
        date: '2025-09-10T10:00',
        location: 'Limbe, Cameroon',
        description: 'Build AI solutions for local challenges in 72 hours.',
        price: 2000,
        attendees: 120,
        image: 'https://picsum.photos/80/80?random=6'
    },
    {
        id: 7,
        type: 'workshop',
        title: 'Python for Data Science',
        date: '2025-07-22T13:00',
        location: 'Buea, Cameroon',
        description: 'Learn data analysis and visualization with Python.',
        price: 1200,
        attendees: 35,
        image: 'https://picsum.photos/80/80?random=7'
    },
    {
        id: 8,
        type: 'conference',
        title: 'Startup Ecosystem Summit',
        date: '2025-08-05T09:00',
        location: 'Douala, Cameroon',
        description: 'Connecting entrepreneurs, investors, and innovators.',
        price: 3000,
        attendees: 180,
        image: 'https://picsum.photos/80/80?random=8'
    }
];

// Utility: Format date/time
function formatEventDate(dt) {
    const date = new Date(dt);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function formatEventTime(dt) {
    const date = new Date(dt);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Render events to the grid
function renderEvents(filter = 'all', search = '') {
    const grid = document.getElementById('eventsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    let filtered = EVENTS.filter(ev =>
        (filter === 'all' || ev.type === filter) &&
        (search === '' || ev.title.toLowerCase().includes(search.toLowerCase()))
    );

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="no-events">No events found.</div>`;
        return;
    }

    filtered.forEach(ev => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card compact-card';
        
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${ev.image}" 
                     alt="${ev.title}" 
                     onerror="this.src='https://via.placeholder.com/80x80/4f46e5/ffffff?text=${encodeURIComponent(ev.type.charAt(0).toUpperCase())}'">
            </div>
            
            <div class="event-content">
                <div class="event-header">
                    <div class="event-type-badge ${ev.type}">
                        ${capitalize(ev.type)}
                    </div>
                    <div class="event-status">
                        <i class="fas fa-globe"></i>
                        <span>Public</span>
                    </div>
                </div>
                
                <div class="event-date-time">
                    <span class="event-date">${formatEventDate(ev.date)}, ${formatEventTime(ev.date)}</span>
                </div>
                
                <h3 class="event-title">${ev.title}</h3>
                
                <div class="event-attendees">
                    <div class="attendee-avatars">
                        <div class="avatar" style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4);"></div>
                        <div class="avatar" style="background: linear-gradient(45deg, #45b7d1, #96ceb4);"></div>
                        <div class="avatar" style="background: linear-gradient(45deg, #feca57, #ff9ff3);"></div>
                        <div class="avatar" style="background: linear-gradient(45deg, #54a0ff, #5f27cd);"></div>
                    </div>
                    <span class="attendee-count">${ev.attendees}+ people registered</span>
                </div>
            </div>
        `;
        
        grid.appendChild(eventCard);
    });
}

function getBadgeIcon(type) {
    const icons = {
        hackathon: 'code-box-line',
        workshop: 'tools-line',
        conference: 'presentation-line',
        mentorship: 'user-star-line',
        internship: 'graduation-cap-line'
    };
    return icons[type] || 'calendar-event-line';
}

// Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Tab filter logic
function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.dataset.filter;
            renderEvents(filter, document.getElementById('searchInput').value);
        });
    });
}

// Search/filter logic
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeTab = document.querySelector('.tab-btn.active');
            const filter = activeTab ? activeTab.dataset.filter : 'all';
            renderEvents(filter, searchInput.value);
        });
    }
    
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            searchInput.focus();
        });
    }
}

// Create event form logic
function setupCreateEventForm() {
    const form = document.getElementById('createEventForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('eventName').value.trim();
        const type = document.getElementById('eventType').value;
        const date = document.getElementById('eventDate').value;
        const location = document.getElementById('eventLocation').value.trim();
        const description = document.getElementById('eventDescription').value.trim();
        const price = parseInt(document.getElementById('eventPrice').value, 10) || 0;
        const attendees = parseInt(document.getElementById('maxAttendees').value, 10) || 0;

        if (!title || !type || !date || !location || !description) {
            alert('Please fill in all required fields.');
            return;
        }

        const newEvent = {
            id: EVENTS.length + 1,
            type,
            title,
            date,
            location,
            description,
            price,
            attendees,
            image: `https://picsum.photos/80/80?random=${EVENTS.length + 1}`
        };

        EVENTS.unshift(newEvent);
        renderEvents('all', '');
        form.reset();
        alert('Event created successfully!');
    });
}

// Initial setup
document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    setupSearch();
    setupCreateEventForm();
    renderEvents('all', '');
});