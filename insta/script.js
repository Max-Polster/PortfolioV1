let posts = [
  {
    authorImg: "./assets/img/profilpic/partymif.jpeg",
    author: "PartyMif",
    postImg: "./assets/img/posts/einkehrschwung.webp",
    isLiked: false,
    likes: 9,
    description: "SchwingSchwung Party im Einkehrschwung",
    comments: ["<b>Tinaf: </b>Legendäre Eröffnungparty am Kreischberg"],
  },
  {
    authorImg: "./assets/img/profilpic/sa-pol.jpg",
    author: "Sa-Pol",
    postImg: "./assets/img/posts/huette.webp",
    isLiked: false,
    likes: 13,
    description: "Perfekter Tag um ein wenig Snowboard zu Fahren",
    comments: ["<b>Bernd: </b>Viel Spaß und passe auf dich auf"],
  },
  {
    authorImg: "./assets/img/profilpic/powdergod.jpg",
    author: "Powdergod",
    postImg: "./assets/img/posts/skifahrer.jpg",
    isLiked: false,
    likes: 17,
    description: "More Powder Baby",
    comments: ["<b>Peter: </b>*_* Mega, bin neidisch"],
  },
];

let storys = [
  {
    storyImg: "./assets/img/story/1.jpg",
    author: "Jack_Power",
  },
  {
    storyImg: "./assets/img/story/2.jpg",
    author: "FantasieQueen",
  },
  {
    storyImg: "./assets/img/story/3.jpg",
    author: "NaturePhotography",
  },
  {
    storyImg: "./assets/img/story/4.jpg",
    author: "Bella_Dog",
  },
  {
    storyImg: "./assets/img/story/5.jpg",
    author: "MissOrange",
  },
  {
    storyImg: "./assets/img/story/6.jpg",
    author: "PhilLaureen",
  },
];
load();

function render() {
  let post = document.getElementById("post-content");
  post.innerHTML = "";

  for (let i = 0; i < posts.length; i++) {
    const newPost = posts[i];
    post.innerHTML += returnHtmlPost(newPost, i);
  }
}

function returnHtmlPost(newPost, i) {
  return `
        <div class="post">
                <div class="profile-post">
                    <img class="img-round-small" src="${posts[i].authorImg}">
                    <div class="name-friends"> ${posts[i].author}</div>
                </div>
                <div class="post-img">
                    <img class="img-post" src="${posts[i].postImg}">
                </div>
                <div class="icon-buttons">
                    <div>
                        <img onclick="addLikes(${i})" class="icons" src="${changeLikeIcon(
    i
  )}">
                        <img class="icons" src="./assets/img/icon/chat.png">
                        <img class="icons" src="./assets/img/icon/send.png">
                    </div>
                    <div>
                        <img class="icons" src="./assets/img/icon/notice.png">
                    </div>
                </div>
                <div class="padding">
                    <div id="likes"><b>Gefällt ${
                      posts[i].likes
                    } Profilen</b><br></div>
                    ${posts[i].description}<br>
                    ${posts[i].comments}
                </div>
                <form class="comment padding" onsubmit="addComment(${i}); return false;">

                    <label>
                        <input id="inputComment${i}" type="text" placeholder="Kommentieren..." required>
                    </label>
                    <button>Posten</button>
                </form>
        </div>
    `;
}

function renderStory() {
  let forYou = document.getElementById("story-box");
  forYou.innerHTML = "";

  for (let s = 0; s < storys.length; s++) {
    const newStory = storys[s];
    forYou.innerHTML += returnHtmlStory(newStory, s);
  }
}

function returnHtmlStory(newStory, s) {
  return `
        <div class="story-block">
          <img class="img-round" src="${newStory.storyImg}">
          <div class="nickname">${newStory.author}</div>
        </div>
    `;
}

function addComment(i) {
  let input = document.getElementById(`inputComment${i}`);
  let newComment = input.value;
  posts[i]["comments"].push(`<br> <b> Max:</b> ${newComment}`);

  render();
  save();
}

function addLikes(i) {
  if (posts[i]["isLiked"]) {
    posts[i]["likes"]--;
  } else {
    posts[i]["likes"]++;
    document.getElementById(
      "likes"
    ).innerHTML = `<b>Gefällt ${posts[i]["likes"]} Profilen</b>`;
  }
  posts[i]["isLiked"] = !posts[i]["isLiked"];
  render();
  save();
}

function changeLikeIcon(i) {
  if (posts[i]["isLiked"]) {
    return "./assets/img/icon/heart-red.png";
  } else {
    return "./assets/img/icon/heart.png";
  }
}

function save() {
  let commentAsText = JSON.stringify(posts);
  localStorage.setItem("posts", commentAsText);
}

function load() {
  let commentAsTest = localStorage.getItem("posts");
  if (commentAsTest) {
    posts = JSON.parse(commentAsTest);
  }
}
