// Sample Movie Database
const moviesDB = {
    'ponman': {
        id: 'ponman',
        title: 'Ponman',
        year: 2024,
        rating: 8.7,
        duration: '2h 28m',
        genre: 'Drama, Family, Comedy',
        description: 'A heartwarming family drama that follows the journey of a middle-class man who discovers the true meaning of happiness and success through unexpected life events. With brilliant performances and emotional storytelling, Ponman explores themes of family bonds, personal growth, and finding joy in simple moments.',
        poster: 'ponman.png',
        trailer: 'https://www.youtube.com/embed/sample-ponman-trailer',
        videoUrl: 'https://drive.google.com/file/d/1E2fbuDdNZ_rzklZyimcgbCT8nq7Zgrr5/preview',
        category: 'drama',
        cast: 'Rajkummar Rao, Kriti Sanon, Pankaj Tripathi',
        director: 'Aanand L. Rai',
        music: 'A.R. Rahman',
        budget: '₹45 crore',
        boxOffice: '₹150 crore',
        language: 'Hindi'
    },
    'andhra-king': {
        id: 'andhra-king',
        title: 'Andhra King',
        year: 2024,
        rating: 8.5,
        duration: '2h 45m',
        genre: 'Action, Drama, Thriller',
        description: 'A powerful political drama set in Andhra Pradesh, following the rise of a charismatic leader who fights against corruption and injustice. With intense action sequences and compelling storytelling, Andhra King showcases the struggle for power and the price of leadership in modern India.',
        poster: 'andhra.png',
        trailer: 'https://www.youtube.com/embed/sample-andhra-king-trailer',
        videoUrl: 'https://drive.google.com/file/d/1hbf99NP2_gTBG-DTX_Acg1bq17AvAZLy/preview',
        category: 'action',
        cast: 'Mahesh Babu, Samantha Ruth Prabhu, Jagapathi Babu',
        director: 'Trivikram Srinivas',
        music: 'Thaman S',
        budget: '₹120 crore',
        boxOffice: '₹300 crore',
        language: 'Telugu'
    },
    'dark-knight': {
        id: 'dark-knight',
        title: 'The Dark Knight',
        year: 2008,
        rating: 9.0,
        duration: '2h 32m',
        genre: 'Action, Crime, Drama',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
        poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400',
        trailer: 'https://www.youtube.com/embed/EXeTwQWrcwY',
        videoUrl: 'sample-video-url',
        category: 'action'
    },
    'dude-2025': {
        id: 'dude-2025',
        title: 'Dude',
        year: 2025,
        rating: 8.2,
        duration: '2h 19m',
        genre: 'Romance, Drama',
        description: 'Childhood friends Agan and Kural run an event-planning business and share a warm, close bond. When Kural falls in love with someone else, things get complicated — especially because Kural\'s father, a powerful minister, has deep issues of caste and honour. A heartfelt Tamil romance exploring friendship, love, and social dynamics.',
        poster: 'https://tse2.mm.bing.net/th?id=OIP.XHkKs4_xJL3VBA4SclHo6AHaJP&pid=Api',
        trailer: 'https://www.youtube.com/embed/BBEr-Yh5CxQ',
        videoUrl: 'https://drive.google.com/file/d/1EBrTD5nxzkDLjaO-3vuK0VBTdbHfYhe7/preview',
        category: 'drama',
        cast: 'Pradeep Ranganathan, Mamitha Baiju, R. Sarathkumar',
        director: 'Keerthiswaran',
        music: 'Sai Abhyankkar',
        budget: '₹35 crore',
        boxOffice: '₹100 crore',
        language: 'Tamil'
    },
    'housemates': {
        id: 'housemates',
        title: 'HouseMates',
        year: 2024,
        rating: 8.3,
        duration: '2h 15m',
        genre: 'Sci-Fi, Drama',
        description: 'A thought-provoking sci-fi drama that explores the complexities of human relationships when strangers are forced to live together in an experimental housing project. As they navigate their differences and discover hidden connections, they uncover secrets that challenge their understanding of reality and human nature.',
        poster: 'HouseMates.png',
        trailer: 'https://www.youtube.com/embed/sample-housemates-trailer',
        videoUrl: 'https://drive.google.com/file/d/1E7zbTy5itDxQHlRdba0CnxwMrBBoZYD_/preview',
        category: 'scifi',
        cast: 'Emma Stone, Ryan Gosling, Oscar Isaac',
        director: 'Denis Villeneuve',
        music: 'Hans Zimmer',
        budget: '₹80 crore',
        boxOffice: '₹200 crore',
        language: 'English'
    }
};

// Local Storage Functions
function getWatchHistory() {
    return JSON.parse(localStorage.getItem('watchHistory') || '[]');
}

function addToWatchHistory(movieId, progress = 0) {
    let history = getWatchHistory();
    const existing = history.findIndex(item => item.id === movieId);
    
    if (existing !== -1) {
        history[existing].progress = progress;
        history[existing].lastWatched = new Date().toISOString();
    } else {
        history.unshift({
            id: movieId,
            progress: progress,
            lastWatched: new Date().toISOString()
        });
    }
    
    localStorage.setItem('watchHistory', JSON.stringify(history));
}

function getMyList() {
    return JSON.parse(localStorage.getItem('myList') || '[]');
}

function addToMyList(movieId) {
    let myList = getMyList();
    if (!myList.includes(movieId)) {
        myList.push(movieId);
        localStorage.setItem('myList', JSON.stringify(myList));
        alert('Added to My List!');
    }
}

// Render Movie Cards
function renderMovieCard(movie, showProgress = false) {
    const history = getWatchHistory();
    const watchData = history.find(item => item.id === movie.id);
    const progress = watchData ? watchData.progress : 0;
    
    return `
        <div class="movie-card" onclick="showMovieModal('${movie.id}')">
            <img src="${movie.poster}" alt="${movie.title}">
            ${showProgress && progress > 0 ? `<div class="continue-progress" style="width: ${progress}%"></div>` : ''}
            <div class="movie-card-overlay">
                <div class="movie-card-title">${movie.title}</div>
                <div class="movie-card-meta">
                    <span>⭐ ${movie.rating}</span>
                    <span>${movie.year}</span>
                    <span>${movie.duration}</span>
                </div>
                <div class="movie-card-actions">
                    <button class="material-button material-button-filled card-btn card-btn-play" onclick="event.stopPropagation(); playMovie('${movie.id}')">▶ Play</button>
                    <button class="material-button material-button-outlined card-btn card-btn-info" onclick="event.stopPropagation(); showMovieModal('${movie.id}')">ℹ Info</button>
                </div>
            </div>
        </div>
    `;
}

// Load Movies by Category
function loadMoviesByCategory(category, containerId) {
    console.log(`🎬 Loading category: ${category} into ${containerId}`);
    const container = document.getElementById(containerId);
    if (!container) {
        console.log(`❌ Container ${containerId} not found`);
        return;
    }
    
    // Get movies from moviesDB
    let content = Object.values(moviesDB).filter(m => m.category === category);
    console.log(`  Movies found: ${content.length}`);
    
    // Add series from seriesDB if available
    if (typeof window.seriesDB !== 'undefined' && typeof window.renderSeriesCard !== 'undefined') {
        const series = Object.values(window.seriesDB).filter(s => s.category === category);
        console.log(`  Series found: ${series.length}`, series.map(s => s.title));
        content = [...content, ...series];
    }
    
    console.log(`  Total content: ${content.length}`);
    
    // Render content
    if (content.length === 0) {
        container.innerHTML = '<p style="color: #666; padding: 20px;">No content available</p>';
        return;
    }
    
    container.innerHTML = content.map(item => {
        if (item.type === 'series' && typeof window.renderSeriesCard !== 'undefined') {
            return window.renderSeriesCard(item);
        } else {
            return renderMovieCard(item);
        }
    }).join('');
    console.log(`✅ Category ${category} loaded`);
}

// Load Continue Watching
function loadContinueWatching() {
    const container = document.getElementById('continueWatching');
    if (!container) return;
    
    const history = getWatchHistory();
    if (history.length === 0) {
        container.innerHTML = '<p style="color: #666; padding: 20px;">No movies in progress</p>';
        return;
    }
    
    const movies = history
        .filter(item => item.progress > 0 && item.progress < 95)
        .map(item => moviesDB[item.id])
        .filter(m => m);
    
    container.innerHTML = movies.map(m => renderMovieCard(m, true)).join('');
}

// Load Trending
function loadTrending() {
    const container = document.getElementById('trendingMovies');
    if (!container) return;
    
    // Combine movies and series
    let allContent = Object.values(moviesDB);
    
    // Add series if available
    if (typeof window.seriesDB !== 'undefined' && typeof window.renderSeriesCard !== 'undefined') {
        allContent = [...allContent, ...Object.values(window.seriesDB)];
    }
    
    // Sort by rating and get top 6
    const trending = allContent
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
    
    container.innerHTML = trending.map(item => {
        if (item.type === 'series' && typeof window.renderSeriesCard !== 'undefined') {
            return window.renderSeriesCard(item);
        } else {
            return renderMovieCard(item);
        }
    }).join('');
}

// Show Movie Modal
function showMovieModal(movieId) {
    const movie = moviesDB[movieId];
    if (!movie) return;
    
    const modal = document.getElementById('movieModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <img src="${movie.poster}" style="width: 100%; border-radius: 20px; margin-bottom: 20px;">
        <h2 style="font-size: 36px; margin-bottom: 15px;">${movie.title}</h2>
        <div style="display: flex; gap: 15px; margin-bottom: 20px; color: #aaa;">
            <span style="color: #ffd700;">⭐ ${movie.rating}</span>
            <span>${movie.year}</span>
            <span>${movie.duration}</span>
        </div>
        <div style="margin-bottom: 20px;">
            <span class="material-chip">${movie.genre}</span>
        </div>
        <p style="font-size: 18px; line-height: 1.8; margin-bottom: 30px; color: #ddd;">${movie.description}</p>
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <button class="material-button material-button-filled" onclick="playMovie('${movie.id}')">▶ Play Now</button>
            <button class="material-button material-button-outlined" onclick="playTrailer('${movie.id}')">🎬 Trailer</button>
            <button class="material-button material-button-text" onclick="addToMyList('${movie.id}')">+ My List</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('movieModal').classList.remove('active');
}

// Play Movie
function playMovie(movieId) {
    addToWatchHistory(movieId, 0);
    window.location.href = `watch.html?id=${movieId}`;
}

// Play Trailer
function playTrailer(id) {
    let content = moviesDB[id];
    
    // Check if it's a series
    if (!content && typeof window.seriesDB !== 'undefined') {
        content = window.seriesDB[id];
    }
    
    if (!content) return;
    
    const modal = document.getElementById('trailerModal');
    const container = document.getElementById('trailerContainer');
    
    container.innerHTML = `<iframe src="${content.trailer}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    modal.classList.add('active');
}

function closeTrailerModal() {
    const modal = document.getElementById('trailerModal');
    const container = document.getElementById('trailerContainer');
    container.innerHTML = '';
    modal.classList.remove('active');
}

// Quick Search with Secret Admin Code
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('quickSearch');
    const adminBtn = document.getElementById('adminBtn');
    
    if (searchInput) {
        // Use keypress event for Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                
                // Secret code to unlock admin panel
                if (query === '0202') {
                    if (adminBtn) {
                        adminBtn.style.display = 'block';
                        sessionStorage.setItem('adminUnlocked', 'true');
                    }
                    searchInput.value = '';
                    alert('🔓 Admin Panel Unlocked!');
                    return;
                }
                
                // Normal search
                if (query.length > 0) {
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    }
    
    // Check if admin was previously unlocked (session only)
    if (adminBtn && sessionStorage.getItem('adminUnlocked') === 'true') {
        adminBtn.style.display = 'block';
    }
    
    // Load content - wait for series.js to load
    function loadAllContent() {
        console.log('🎬 Loading all content...');
        console.log('seriesDB available:', typeof window.seriesDB !== 'undefined');
        console.log('renderSeriesCard available:', typeof window.renderSeriesCard !== 'undefined');
        
        loadContinueWatching();
        loadSeriesContent();
        loadTrending();
        loadMoviesByCategory('action', 'actionMovies');
        loadMoviesByCategory('drama', 'dramaMovies');
        loadMoviesByCategory('scifi', 'scifiMovies');
        loadMoviesByCategory('comedy', 'comedyMovies');
        loadMoviesByCategory('horror', 'horrorMovies');
        
        console.log('✅ All content loaded!');
    }
    
    // Check if seriesDB is loaded, if not wait a bit
    if (typeof window.seriesDB !== 'undefined') {
        console.log('✅ seriesDB found immediately, loading content...');
        loadAllContent();
    } else {
        console.log('⏳ Waiting for seriesDB to load...');
        setTimeout(() => {
            console.log('⏰ Timeout complete, loading content...');
            loadAllContent();
        }, 100);
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Load series content function
function loadSeriesContent() {
    console.log('📺 loadSeriesContent called');
    const container = document.getElementById('seriesContent');
    if (!container) {
        console.log('❌ seriesContent container not found');
        return;
    }
    
    // Check if seriesDB is available
    if (typeof window.seriesDB === 'undefined' || typeof window.renderSeriesCard === 'undefined') {
        console.log('⚠️ seriesDB or renderSeriesCard not available yet');
        return;
    }
    
    const series = Object.values(window.seriesDB);
    console.log(`📊 Found ${series.length} series:`, series.map(s => s.title));
    
    if (series.length === 0) {
        container.innerHTML = '<p style="color: #666; padding: 20px;">No series available</p>';
        return;
    }
    
    container.innerHTML = series.map(s => window.renderSeriesCard(s)).join('');
    console.log('✅ Series content loaded successfully');
}

// Export for other pages
if (typeof window !== 'undefined') {
    window.moviesDB = moviesDB;
    window.getWatchHistory = getWatchHistory;
    window.addToWatchHistory = addToWatchHistory;
    window.getMyList = getMyList;
    window.addToMyList = addToMyList;
    window.loadSeriesContent = loadSeriesContent;
}
