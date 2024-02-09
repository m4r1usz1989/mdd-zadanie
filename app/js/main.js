import '../scss/style.scss';
const postsList = fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());
const commentsList = fetch('https://jsonplaceholder.typicode.com/comments').then(response => response.json());

Promise.all([postsList, commentsList])
    .then(([posts, comments]) => {
        const postComments = {};
        comments.forEach(comment => {
            if (!postComments[comment.postId]) {
                postComments[comment.postId] = [];
            }
            postComments[comment.postId].push(comment);
        });

        const postsSection = document.getElementById('post-section');
    
        posts.forEach(post => {
            const postItem = document.createElement('article');
            postItem.insertAdjacentHTML('beforeend', `
                <h1 class="post-section__title">${post.title}</h1>
                <p class="post-section__description">${post.body}</p>
                <ul class="post-section__list">
                    ${postComments[post.id] ? postComments[post.id].map(
                        comment => `<li class="post-section__item">
                            <span class="post-section__name"><strong>Name:</strong> ${comment.name}</span> 
                            <span class="post-section__email"><strong>Email:</strong> ${comment.email}</span> 
                            <span class="post-section__body"><strong>Description:</strong> ${comment.body}</span></li>`
                    ).join("") : ""}
                </ul>
            `);

            postsSection.appendChild(postItem);
            });
        })

        .catch(error => {
            console.error("Błąd", error);
        });