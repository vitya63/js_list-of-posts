'use strict'

const list = document.querySelector('#list');

async function loadData(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

async function createList() {
  const posts = await loadData('https://jsonplaceholder.typicode.com/posts');
  const users = await loadData('https://jsonplaceholder.typicode.com/users');
  const comments = await loadData('https://jsonplaceholder.typicode.com/comments');
  for (let i = 0; i < posts.length; i++) {
    const li = document.createElement('LI');
    const currentUser = users.find(user => user.id == posts[i].userId);
    const relevantComments = comments.filter(comment => comment.postId == posts[i].id);
    li.innerHTML = `
      <hr>
      <h1>${posts[i].title}</h1>
      <p>${posts[i].body}</p>
      <div><i>${currentUser.name}</i></div>
      <button style="margin-top: 10px" class="button">Show comments</button>
      <ul id="nestedUl" class="nestedUl" hidden></ul>
      <hr>
    `;
    list.append(li);
    let currentPost = document.querySelector('#nestedUl');
    for (const comment of relevantComments) {
      const li = document.createElement('LI');
      li.innerHTML = `
        <div><b>${comment.name}</b></div>
        <p>${comment.body}</p>
      `;
      currentPost.append(li);
    }
    currentPost.id = '';
  }
}

createList()
  .then(() => {
    const buttons = document.querySelectorAll('.button');
    const nestedLists = document.querySelectorAll('.nestedUl');
    for (const button of buttons) {
      button.addEventListener('click', (event) => {
        if (event.target.textContent == 'Show comments') {
          console.log('show');
          event.target.textContent = 'Hide comments';
          event.target.nextElementSibling.hidden = false;
          return;
        } else if (event.target.textContent == 'Hide comments') {
          console.log('hide');
          event.target.textContent = 'Show comments';
          event.target.nextElementSibling.hidden = true;
        }
      });
    }
  });
