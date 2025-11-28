const body = document.body;
const modeBtn = document.querySelector(".mode-btn");
const icon = document.querySelector(".icon");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const loading = document.querySelector(".loading");
const profile = document.querySelector("#profile");

//theme
modeBtn.addEventListener("click", () => {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    localStorage.setItem("mode", "light");
  } else if (!body.classList.contains("light")) {
    localStorage.setItem("mode", "dark");
  }
});
//window-loading
window.addEventListener("load", () => {
  const savedMode = localStorage.getItem("mode");
  if (savedMode === "light") {
    body.classList.add("light");
  } else if (savedMode === "dark") {
    body.classList.remove("light");
  }
});

//fetching user
async function getUser(userName) {
  try {
    profile.innerHTML = "";
    loading.classList.remove("hidden");
    profile.classList.remove("padding");
    const response = await fetch(`https://api.github.com/users/${userName}`);

    if (!response.ok) {
      throw new Error("No user Found!");
    }

    const data = await response.json();

    const userIntro = document.createElement("div");
    userIntro.classList.add("user-intro");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("img");

    const image = document.createElement("img");
    image.src = data.avatar_url;

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const h2 = document.createElement("h2");
    h2.textContent = data.name;
    const h3 = document.createElement("h3");
    h3.textContent = data.login;

    const joinedDate = document.createElement("p");
    joinedDate.classList.add("joined-date");
    const date = new Date(data.created_at);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    joinedDate.textContent = `Joined Date: ${formattedDate}`;

    imgDiv.append(image);
    infoDiv.append(h2, h3, joinedDate);

    userIntro.append(imgDiv, infoDiv);

    const bioDiv = document.createElement("div");
    bioDiv.classList.add("bio");

    const bioPara = document.createElement("p");
    bioPara.textContent = data.bio;
    if (!data.bio) {
      bioPara.textContent = "This profile has no bio.";
    }

    bioDiv.append(bioPara);

    const githubInfo = document.createElement("div");
    githubInfo.classList.add("github-info");

    const repoSpan = document.createElement("span");
    repoSpan.textContent = `Repos: `;
    const repoCount = document.createElement("strong");
    repoCount.id = "repoCount";
    repoCount.textContent = data.public_repos;
    repoSpan.appendChild(repoCount);

    const followersSpan = document.createElement("span");
    followersSpan.textContent = `Followers: `;
    const followersCount = document.createElement("strong");
    followersCount.id = "followersCount";
    followersCount.textContent = data.followers;
    followersSpan.appendChild(followersCount);

    const followingSpan = document.createElement("span");
    followingSpan.textContent = `Following: `;
    const followingCount = document.createElement("strong");
    followingCount.id = "followingCount";
    followingCount.textContent = data.following;
    followingSpan.appendChild(followingCount);

    const divider1 = document.createElement("span");
    divider1.textContent = "|";
    divider1.classList.add("divider");

    const divider2 = document.createElement("span");
    divider2.textContent = "|";
    divider2.classList.add("divider");

    githubInfo.append(
      repoSpan,
      divider1,
      followersSpan,
      divider2,
      followingSpan
    );

    const visitLink = document.createElement("a");
    visitLink.href = data.html_url;
    visitLink.target = "_blank";
    visitLink.textContent = "Visit Github";
    visitLink.classList.add("visitGithub");

    profile.append(userIntro, bioDiv, githubInfo, visitLink);
    profile.classList.add("padding");
    loading.classList.add("hidden");
  } catch (err) {
    profile.textContent = err.message;
    profile.classList.add("padding");

    profile.style.color = "orange";

    loading.classList.add("hidden");
  }
}

//searching
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = searchInput.value;
  getUser(username);
});
