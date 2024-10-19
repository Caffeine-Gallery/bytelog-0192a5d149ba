import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts');

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        try {
            await backend.addPost(title, content);
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
            await loadPosts();
        } catch (error) {
            console.error('Error adding post:', error);
        }
    });

    async function loadPosts() {
        try {
            const posts = await backend.getPosts();
            postsContainer.innerHTML = posts.map(post => `
                <div class="post">
                    <h2>${escapeHtml(post.title)}</h2>
                    <p>${escapeHtml(post.content)}</p>
                    <small>Posted on: ${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</small>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    await loadPosts();
});
