'use strike'

let urlPosts = 'https://jsonplaceholder.typicode.com/posts';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';
let urlComments = 'https://jsonplaceholder.typicode.com/comments';

function urlFetch (url) {
  return fetch(url)
  .then(response => response.json());
}

async function createListPost () {
  const posts = await urlFetch(urlPosts);
  const users = await urlFetch(urlUsers);
  const comments = await urlFetch(urlComments);
  const ul = document.querySelector('.ul');

  posts.forEach(post => {
    const user = users.find( user => user.id === post.userId);
    const li = document.createElement('li');
    const relevantComments = comments.filter(comment => comment.postId === post.id);

    li.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
    <p>${user.name}</p>
    <ul class='ulComments'><ul>`;

    ul.append(li);
    const ulComments = document.querySelector('.ulComments');

    relevantComments.forEach(comment => {
        const liComments = document.createElement('li');
        liComments.innerHTML = `
          <h2>${comment.name}</h2>
          <p>${comment.body}</p>`;
        ulComments.append(liComments);
    })
    ulComments.className = '';
  });
}

createListPost();