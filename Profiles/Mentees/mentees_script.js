// EmpowerU Mentees Social Feed JavaScript

// Global variables
let currentUser = {
    id: 1,
    name: "You",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
};

let posts = [];
let isLoading = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadInitialPosts();
});

// Event Listeners
function initializeEventListeners() {
    // Post creation input click
    const postInput = document.querySelector('.post-input');
    if (postInput) {
        postInput.addEventListener('click', () => openPostModal('text'));
    }

    // Modal close events
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePostModal();
            }
        });
    }

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePostModal();
        }
    });

    // Post submission
    const submitBtn = document.querySelector('.post-submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitPost);
    }

    // Engagement buttons
    document.addEventListener('click', handleEngagementClick);
}

// Post Modal Functions
function openPostModal(type = 'text') {
    const modal = document.getElementById('postModal');
    const textarea = document.querySelector('.modal-textarea');
    
    if (modal && textarea) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        
        // Focus on textarea after animation
        setTimeout(() => {
            textarea.focus();
        }, 300);
        
        // Update placeholder based on type
        const placeholders = {
            text: "What's on your mind?",
            image: "Share a photo and tell us about it...",
            video: "Share a video and add your thoughts...",
            activity: "Share your progress or ask a question...",
            feelings: "How are you feeling today?"
        };
        
        textarea.placeholder = placeholders[type] || placeholders.text;
    }
}

function closePostModal() {
    const modal = document.getElementById('postModal');
    const textarea = document.querySelector('.modal-textarea');
    
    if (modal) {
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.style.display = 'none';
            if (textarea) {
                textarea.value = '';
            }
        }, 300);
    }
}

// Post Submission
function submitPost() {
    const textarea = document.querySelector('.modal-textarea');
    const submitBtn = document.querySelector('.post-submit-btn');
    
    if (!textarea || !textarea.value.trim()) {
        showNotification('Please write something to post!', 'warning');
        return;
    }
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner spinner"></i> Posting...';
    
    // Simulate API call
    setTimeout(() => {
        const newPost = createNewPost(textarea.value.trim());
        addPostToFeed(newPost);
        closePostModal();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Post';
        
        showNotification('Post shared successfully!', 'success');
    }, 1500);
}

function createNewPost(content) {
    return {
        id: Date.now(),
        author: {
            name: currentUser.name,
            avatar: currentUser.avatar
        },
        content: content,
        timestamp: 'Just now',
        reactions: {
            count: 0,
            types: []
        },
        comments: 0,
        type: 'text'
    };
}

function addPostToFeed(post) {
    const feed = document.querySelector('.feed');
    const postElement = createPostElement(post);
    
    if (feed && feed.firstChild) {
        feed.insertBefore(postElement, feed.firstChild);
        
        // Animate the new post
        postElement.style.opacity = '0';
        postElement.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            postElement.style.transition = 'all 0.3s ease';
            postElement.style.opacity = '1';
            postElement.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Post Creation
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    postDiv.innerHTML = `
        <div class="post-header">
            <img src="${post.author.avatar}" alt="${post.author.name}" class="post-avatar">
            <div class="post-info">
                <h3>${post.author.name}</h3>
                <div class="post-meta">
                    <span>${post.timestamp}</span>
                    <i class="fas fa-globe-americas"></i>
                </div>
            </div>
            <button class="post-menu-btn" onclick="showPostMenu(${post.id})">
                <i class="fas fa-ellipsis-h"></i>
            </button>
        </div>
        <div class="post-content">
            <p>${post.content}</p>
        </div>
        <div class="post-engagement">
            <div class="engagement-stats">
                <div class="reactions">
                    <span class="reaction-icons">${post.reactions.types.join('')}</span>
                    <span class="reaction-count">${post.reactions.count} reactions</span>
                </div>
                <span class="comments-count">${post.comments} comments</span>
            </div>
            <div class="engagement-actions">
                <button class="engage-btn" onclick="toggleLike(${post.id})">
                    <i class="fas fa-thumbs-up"></i>
                    Like
                </button>
                <button class="engage-btn" onclick="showComments(${post.id})">
                    <i class="fas fa-comment"></i>
                    Comment
                </button>
                <button class="engage-btn" onclick="sharePost(${post.id})">
                    <i class="fas fa-share"></i>
                    Share
                </button>
            </div>
        </div>
        <div class="comments-section" id="comments-${post.id}" style="display:none;">
            <div class="comments-list" id="commentsList-${post.id}">
                <!-- Comments will be dynamically inserted here -->
            </div>
            <form class="add-comment-form" onsubmit="return addComment(event, ${post.id})">
                <input type="text" class="add-comment-input" placeholder="Add a comment..." required>
                <button type="submit" class="add-comment-btn">Post</button>
            </form>
        </div>
    `;
    
    return postDiv;
}

// Engagement Functions
function handleEngagementClick(e) {
    const target = e.target.closest('.engage-btn');
    if (!target) return;
    
    const icon = target.querySelector('i');
    const text = target.textContent.trim();
    
    // Add click animation
    target.style.transform = 'scale(0.95)';
    setTimeout(() => {
        target.style.transform = 'scale(1)';
    }, 150);
    
    // Handle different engagement types
    if (text.includes('Like')) {
        toggleLikeAnimation(target);
    } else if (text.includes('Comment')) {
        toggleCommentsSection(target);
    } else if (text.includes('Share')) {
        // Share functionality would be implemented here
        showNotification('Share feature coming soon!', 'info');
    }
}

function toggleCommentsSection(button) {
    const postId = button.closest('.post-card').querySelector('.post-header h3').textContent;
    const commentsSection = document.getElementById(`comments-${postId}`);
    
    if (commentsSection) {
        const isVisible = commentsSection.style.display === 'block';
        commentsSection.style.display = isVisible ? 'none' : 'block';
        
        // Animate comments section
        if (!isVisible) {
            commentsSection.style.opacity = '0';
            commentsSection.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                commentsSection.style.transition = 'all 0.3s ease';
                commentsSection.style.opacity = '1';
                commentsSection.style.transform = 'translateY(0)';
            }, 100);
        }
    }
}

function toggleLikeAnimation(button) {
    const icon = button.querySelector('i');
    
    if (button.classList.contains('active')) {
        // Unlike
        button.classList.remove('active');
        icon.className = 'far fa-thumbs-up';
        button.style.color = '#65676b';
    } else {
        // Like
        button.classList.add('active');
        icon.className = 'fas fa-thumbs-up';
        button.style.color = '#1877f2';
        
        // Create like animation
        createLikeAnimation(button);
    }
}

function createLikeAnimation(element) {
    const heart = document.createElement('div');
    heart.innerHTML = '👍';
    heart.style.position = 'absolute';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + 'px';
    heart.style.top = rect.top + 'px';
    
    document.body.appendChild(heart);
    
    // Animate
    let opacity = 1;
    let y = 0;
    
    const animate = () => {
        y -= 2;
        opacity -= 0.02;
        
        heart.style.transform = `translateY(${y}px)`;
        heart.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            document.body.removeChild(heart);
        }
    };
    
    requestAnimationFrame(animate);
}

// Comment Submission
function addComment(e, postId) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('.add-comment-input');
    const commentText = input.value.trim();
    if (!commentText) return false;
    const commentList = document.getElementById(`comments-${postId}`);
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    commentItem.innerHTML = `
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=28&h=28&fit=crop&crop=face" class="comment-avatar" alt="User">
        <div>
            <div class="comment-content">${commentText}</div>
            <div class="comment-meta">You · now</div>
        </div>
    `;
    commentList.appendChild(commentItem);
    input.value = '';
    return false;
}

// Rating logic
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.rating-section').forEach(section => {
        const stars = section.querySelectorAll('.rating-star');
        const valueSpan = section.querySelector('.rating-value');
        let current = 0;
        stars.forEach(star => {
            star.addEventListener('mouseenter', function() {
                const val = parseInt(star.dataset.value);
                stars.forEach((s, i) => {
                    s.classList.toggle('selected', i < val);
                });
            });
            star.addEventListener('mouseleave', function() {
                stars.forEach((s, i) => {
                    s.classList.toggle('selected', i < current);
                });
            });
            star.addEventListener('click', function() {
                current = parseInt(star.dataset.value);
                valueSpan.textContent = current;
                stars.forEach((s, i) => {
                    s.classList.toggle('selected', i < current);
                });
            });
        });
    });
});

// Load More Posts
function loadMorePosts() {
    const loadBtn = document.querySelector('.load-more-btn');
    const spinner = loadBtn.querySelector('i');
    
    if (isLoading) return;
    
    isLoading = true;
    loadBtn.disabled = true;
    spinner.classList.add('spinner');
    loadBtn.innerHTML = '<i class="fas fa-spinner spinner"></i> Loading...';
    
    // Simulate API call
    setTimeout(() => {
        const newPosts = generateSamplePosts(3);
        appendPostsToFeed(newPosts);
        
        // Reset button
        isLoading = false;
        loadBtn.disabled = false;
        spinner.classList.remove('spinner');
        loadBtn.innerHTML = '<i class="fas fa-arrow-down"></i> Load More Posts';
    }, 2000);
}

function generateSamplePosts(count) {
    const samplePosts = [
        {
            id: Date.now() + 1,
            author: {
                name: "Alex Johnson",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
            },
            content: "Just finished my first coding interview! 💻 The technical questions were challenging but I felt prepared thanks to all the practice sessions with my mentor.",
            timestamp: "3 hours ago",
            reactions: { count: 5, types: ['👍', '💪'] },
            comments: 2,
            type: "achievement"
        },
        {
            id: Date.now() + 2,
            author: {
                name: "Maria Santos",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
            },
            content: "Looking for study partners for the upcoming Machine Learning course! Anyone interested in forming a study group? 📚",
            timestamp: "5 hours ago",
            reactions: { count: 8, types: ['👍', '🤝'] },
            comments: 4,
            type: "collaboration"
        },
        {
            id: Date.now() + 3,
            author: {
                name: "James Wilson",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
            },
            content: "Grateful for this amazing community! The networking opportunities and mentorship have been invaluable for my career growth. 🙏",
            timestamp: "1 day ago",
            reactions: { count: 12, types: ['❤️', '👍', '🙏'] },
            comments: 6,
            type: "gratitude"
        }
    ];
    
    return samplePosts.slice(0, count);
}

function appendPostsToFeed(posts) {
    const feed = document.querySelector('.feed');
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postElement.style.opacity = '0';
        postElement.style.transform = 'translateY(20px)';
        feed.appendChild(postElement);
        
        // Staggered animation
        setTimeout(() => {
            postElement.style.transition = 'all 0.4s ease';
            postElement.style.opacity = '1';
            postElement.style.transform = 'translateY(0)';
        }, posts.indexOf(post) * 200);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification.querySelector('.notification-close'));
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#42b883',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    return colors[type] || colors.info;
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Utility Functions
function loadInitialPosts() {
    // This would typically load posts from an API
    console.log('Initial posts loaded from existing HTML');
}

function showPostMenu(postId) {
    showNotification('Post menu feature coming soon!', 'info');
}

function toggleLike(postId) {
    // This would typically update the like status via API
    console.log('Like toggled for post:', postId);
}

function showComments(postId) {
    showNotification('Comments feature coming soon!', 'info');
}

function sharePost(postId) {
    if (navigator.share) {
        navigator.share({
            title: 'EmpowerU Post',
            text: 'Check out this post from EmpowerU community!',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Unable to share post', 'error');
        });
    }
}

// Add CSS animations dynamically
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(300px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(300px);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

document.head.appendChild(animationStyles);

// Minimal modal open/close and load more logic for the profile
function openPostModal() {
    document.getElementById('postModal').classList.add('show');
}
function closePostModal() {
    document.getElementById('postModal').classList.remove('show');
}
function loadMorePosts() {
    // Placeholder: You can implement AJAX or dynamic loading here
    alert('Load more posts feature coming soon!');
}

// Optional: Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePostModal();
});

// Optional: Close modal when clicking outside content
document.addEventListener('click', function(e) {
    const modal = document.getElementById('postModal');
    if (modal && modal.classList.contains('show') && e.target === modal) {
        closePostModal();
    }
});