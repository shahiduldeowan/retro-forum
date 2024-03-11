const allPostLoadingElement = document.getElementById("all-post-loading");
const latestPostLoadingElement = document.getElementById("latest-post-loading");
const readPostList = [];

const handleShowAllPost = async (url) => {
  toggleLoadingByElement(allPostLoadingElement, true);
  const result = await getDataFromApi(url);
  handleDisplayAllPosts(result.posts);
};

const handleDisplayAllPosts = (posts) => {
  const allPostContainer = document.getElementById("all-post-container-id");
  allPostContainer.textContent = "";
  const classList = `p-4 xl:p-10 flex gap-4 lg:gap-5 xl:gap-6 bg-[#F3F3F5] hover:bg-[#797DFC1A] border hover:border-primary-btn-color rounded-border-24`;
  posts.forEach((post) => {
    const innerHTML = `
    <div class="indicator">
      <span class="indicator-item badge badge-secondary ${
        post.isActive ? "bg-[#10B981]" : "bg-[#FF3434]"
      } border border-[#fff]"></span>
      <div
        class="grid w-12 lg:w-16 h-12 lg:h-16 bg-[#fff] place-items-center rounded-border-16 bg-no-repeat bg-center bg-cover"
        style="background-image: url('${post.image}')"
      ></div>
    </div>
    <div class="flex-auto flex flex-col">
      <div class="inter-font flex gap-2 lg:gap-3 xl:gap-5 text-[#12132DCC] font-medium mb-3">
        <span># ${post.category}</span>
        <span>Author : ${post.author.name}</span>
      </div>
      <h3 class="text-xl font-bold mb-4">${post.title}</h3>
      <p class="text-[#12132D99] leading-7 mb-5">${post.description}</p>
      <hr class="border-dashed border-black border-opacity-25 mb-6" />
      <div class=" flex justify-between">
        <div class="inter-font flex gap-4 lg:gap-7 items-center">
          <div class="flex gap-3 items-center">
            <img src="./images/icons/message.svg" alt="" srcset="" />
            <span class="text-[#12132D99]">${post["comment_count"]}</span>
          </div>
          <div class="flex gap-3 items-center">
            <img src="./images/icons/watch.svg" alt="" srcset="" />
            <span class="text-[#12132D99]">${post["view_count"]}</span>
          </div>
          <div class="hidden lg:flex gap-3 items-center">
            <img src="./images/icons/clock.svg" alt="" srcset="" />
            <span class="text-[#12132D99]">${post["posted_time"]} min</span>
          </div>
        </div>
        <div onclick="handleAddReadAsMark('${post.title}', '${post["view_count"]}')">
          <img src="./images/icons/circle-message.svg" alt="" srcset="" />
        </div>
      </div>
    </div>
  `;

    addInnerHtmlByElement(allPostContainer, classList, innerHTML);
  });
  toggleLoadingByElement(allPostLoadingElement, false);
};

const handleAddReadAsMark = (title, viewCount) => {
  readPostList.push(title);

  const markCount = document.getElementById("mark-count-id");
  markCount.innerText = `${readPostList.length}`;

  const markAsReadContainer = document.getElementById("mark-as-read-container-id");
  const classList = `flex gap-2 p-4 justify-center items-center bg-[#fff] rounded-border-16`;
  const innerHTML = `
    <h4 class="text-base font-semibold">${title}</h4>
    <div class="">
      <img class="w-full" src="./images/icons/watch.svg" alt="" srcset="" />
    </div>
    <div>
      <span class="inter-font text-black text-opacity-60">${viewCount}</span>
    </div>
  `;

  addInnerHtmlByElement(markAsReadContainer, classList, innerHTML);
};

const handleSearchButton = () => {
  toggleLoadingByElement(allPostLoadingElement, true);
  const inputText = document.getElementById("search-input-id");
  const queryText = inputText.value;
  const url = `${postUrl.postByQuery}=${queryText}`;
  handleShowAllPost(url);
};

const handleLatestPosts = async () => {
  toggleLoadingByElement(latestPostLoadingElement, true);
  const latestPosts = await getDataFromApi(postUrl.latestPost);
  handleLatestPostShow(latestPosts);
};

const handleLatestPostShow = (latestPosts) => {
  const latestPostElement = document.getElementById("latest-posts");
  latestPostElement.textContent = "";
  const classList = `border border-[#12132D26] rounded-border-24 p-6`;
  latestPosts.forEach((post) => {
    const innerHTML = `
    <div
      class="w-full h-48 bg-[#12132D0D] rounded-border-20 bg-center bg-cover bg-no-repeat mb-6"
      style="background-image: url('${post["cover_image"]}');">
    </div>
    <div class="flex gap-2 items-center mb-6">
      <img src="./images/icons/calender.svg" alt="" srcset="" />
      <span class="text-[#12132D99]">${post.author["posted_date"] || "No publish date"}</span>
    </div>
      <h4 class="text-lg font-extrabold leading-8 mb-3">${post.title}</h4>
      <p class="text-[#12132D99] mb-4">${post.description}</p>
      <div class="flex gap-4">
        <div
          class="h-11 w-11 rounded-border-full bg-[#12132D0D] bg-no-repeat bg-cover bg-center"
          style="background-image: url('${post["profile_image"]}')">
        </div>
        <div>
          <h4 class="font-bold">${post.author?.name || "N/A"}</h4>
          <h4 class="font-normal text-sm text-[#12132D99]">${post.author?.designation || "Unknown"}</h4>
        </div>
    </div>
    `;

    addInnerHtmlByElement(latestPostElement, classList, innerHTML);
  });

  toggleLoadingByElement(latestPostLoadingElement, false);
};

document.getElementById("search-button-id").addEventListener("click", handleSearchButton);

handleShowAllPost(postUrl.allPost);
handleLatestPosts();
