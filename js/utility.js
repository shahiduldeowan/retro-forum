const getDataFromApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error occurred: ", error);
  }
};

const addInnerHtmlByElement = (element, classList, innerHTMLText) => {
  const div = document.createElement("div");
  div.classList = `${classList}`;
  div.innerHTML = innerHTMLText;
  element.appendChild(div);
};

const toggleLoadingByElement = (element, isLoading) => {
  if (element !== null) {
    if (isLoading) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  } else {
    console.log(`Element with id ${id} not found`);
  }
};
