let posts = [];
let editingId = null;

const form = document.getElementById('blogForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const mainGrid = document.getElementById('mainGrid');
const postCount = document.getElementById('postCount');

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    
    if (!title || !content) return;

    if (editingId !== null) {
        updatePost(editingId, title, content);
        editingId = null;
    } else {
        createPost(title, content);
    }
    
    form.reset();
    renderPosts();
});

// Create a new post
function createPost(title, content) {
    const post = {
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        })
    };
    
    posts.unshift(post);
}

// Update an existing post
function updatePost(id, title, content) {
    const post = posts.find(p => p.id === id);
    if (post) {
        post.title = title;
        post.content = content;
        post.date = new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        }) + ' (edited)';
    }
}

// Delete a post
function deletePost(id) {
    if (confirm('Delete this post?')) {
        posts = posts.filter(p => p.id !== id);
        renderPosts();
    }
}

// Start editing a post
function startEdit(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        titleInput.value = post.title;
        contentInput.value = post.content;
        editingId = id;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        titleInput.focus();
    }
}

// Render all posts
function renderPosts() {
    postCount.textContent = posts.length;

    // Remove old post items
    const oldPosts = mainGrid.querySelectorAll('.blog-post-item, .empty-state');
    oldPosts.forEach(el => el.remove());

    if (posts.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'bento-item empty-state';
        emptyState.innerHTML = `
            <div class="empty-icon">📝</div>
            <h3>No posts yet</h3>
            <p>Create your first post to get started</p>
        `;
        mainGrid.appendChild(emptyState);
        return;
    }

    posts.forEach((post, index) => {
        const postItem = document.createElement('div');
        postItem.className = `bento-item blog-post-item ${index === 0 ? 'featured' : ''}`;
        postItem.innerHTML = `
            <div class="post-header">
                <div class="post-date">📅 ${escapeHtml(post.date)}</div>
                <h3 class="post-title">${escapeHtml(post.title)}</h3>
            </div>
            <div class="post-content">${escapeHtml(post.content)}</div>
            <div class="post-actions">
                <button class="btn btn-secondary" onclick="startEdit(${post.id})">✏️ Edit</button>
                <button class="btn btn-danger" onclick="deletePost(${post.id})">🗑️ Delete</button>
            </div>
        `;
        mainGrid.appendChild(postItem);
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize the page
renderPosts();