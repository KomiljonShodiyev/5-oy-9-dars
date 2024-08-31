document.addEventListener('DOMContentLoaded', function() {
    const usersList = document.getElementById('users-list');
    const postsList = document.getElementById('posts-list');
    const commentsList = document.getElementById('comments-list');

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const userItem = document.createElement('div');
                userItem.classList.add('bg-gray-50', 'p-4', 'rounded-lg', 'mb-4', 'shadow-sm');
                userItem.innerHTML = `
                    <p><strong>ID:</strong> ${user.id}</p>
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p class="flex items-center"><i class="fas fa-user mr-2 text-blue-500"></i><strong>Username:</strong> ${user.username}</p>
                    <p class="flex items-center"><i class="fas fa-envelope mr-2 text-red-500"></i><strong>Email:</strong> ${user.email}</p>
                    <p class="flex items-center"><i class="fas fa-phone mr-2 text-green-500"></i><strong>Phone Number:</strong> ${user.phone}</p>
                    <button onclick="fetchPosts(${user.id})" class="bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-600 transition">Show Posts</button>
                `;
                usersList.querySelector('.phone-inner').appendChild(userItem);
            });
        });

    window.fetchPosts = function(userId) {
        postsList.querySelector('.phone-inner').innerHTML = '<h2 class="text-center text-lg font-bold text-gray-800 mb-4">Posts List</h2>';  
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const postItem = document.createElement('div');
                    postItem.classList.add('bg-gray-50', 'p-4', 'rounded-lg', 'mb-4', 'shadow-sm');
                    postItem.innerHTML = `
                        <p><strong>ID:</strong> ${post.id}</p>
                        <p><strong>User ID:</strong> ${post.userId}</p>
                        <p><strong>Title:</strong> ${post.title}</p>
                        <p><strong>Body:</strong> ${post.body}</p>
                        <button onclick="fetchComments(${post.id})" class="bg-green-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-green-600 transition">Show Comments</button>
                    `;
                    postsList.querySelector('.phone-inner').appendChild(postItem);
                });
                usersList.classList.remove('hidden');
                postsList.classList.remove('hidden');
                commentsList.classList.add('hidden');
            });
    }

    window.fetchComments = function(postId) {
        commentsList.querySelector('.phone-inner').innerHTML = '<h2 class="text-center text-lg font-bold text-gray-800 mb-4">Comments List</h2>'; 
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(comments => {
                comments.forEach(comment => {
                    const commentItem = document.createElement('div');
                    commentItem.classList.add('bg-gray-50', 'p-4', 'rounded-lg', 'mb-4', 'shadow-sm');
                    commentItem.innerHTML = `
                        <p><strong>ID:</strong> ${comment.id}</p>
                        <p><strong>Name:</strong> ${comment.name}</p>
                        <p class="flex items-center"><i class="fas fa-envelope mr-2 text-red-500"></i><strong>Email:</strong> ${comment.email}</p>
                        <p><strong>Body:</strong> ${comment.body}</p>
                    `;
                    commentsList.querySelector('.phone-inner').appendChild(commentItem);
                });
                postsList.classList.remove('hidden');
                commentsList.classList.remove('hidden');
            });
    }
});
