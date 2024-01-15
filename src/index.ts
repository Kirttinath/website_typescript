const getUsername = document.querySelector("#user") as HTMLInputElement;

const formSubmit = document.querySelector(".form") as HTMLFormElement;

const main_container = document.querySelector(".main_container") as HTMLElement;

//?Lets define contract of an object
interface UserData {
  id: number;
  login: string;
  avatar_url: string;
  location: string;
  url: string;
}

//* Reusable function
async function myCustomFetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `Network response was not  ok - status: ${response.status}`
    );
  }
  const data = await response.json();
  console.log(data);

  return data;
}
//?lets display the card ui
const showResultUI = (singleUser: UserData) => {
  const { avatar_url, login, url } = singleUser;
  main_container.insertAdjacentHTML(
    "beforeend",
    `
    <div class='card'>
    <img src=${avatar_url} alt=${login}/>
    <hr/>
    <div class="card-footer">
    <img src='${avatar_url}' alt="${login};
    <a href="${url}"> Github </a>
    
    </div>
    </div>
    `
  );
};

function fetchUserData(url: string) {
  myCustomFetcher<UserData[]>(url, {}).then((userInfo) => {
    for (const singleUser of userInfo) {
      showResultUI(singleUser);
    }
  });
}
//* Default Function call
fetchUserData("https://api.github.com/users");
