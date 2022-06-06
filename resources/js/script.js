//For Sports App
const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const searchButton = document.querySelector(".search-button");
let serchRequest = document.querySelector(".input-player input");
const playerContainer = document.querySelector(".sports-player-container");

searchButton.addEventListener("click", function () {
  const player = getJSON(
    `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${serchRequest.value}`
  );

  player.then((data) => {
    const renderHtml = function (data) {
      console.log(data);
      let getPlayerPic = function () {
        return data.strThumb;
      };
      let playerName = data.strPlayer;
      let dateBorn = data.dateBorn;
      let nation = data.strNationality;
      let gender = data.strGender;
      let height = data.strHeight;
      let weight = data.strWeight;
      let sport = data.strSport;
      let playerBio =
        data.strDescriptionEN &&
        data.strDescriptionEN.replaceAll("\\r\\n\\r\\n", " ");
      let wage = data.strWage;

      const html = `
  <dir class="player-card fade-in">
    <div class="card-img">
      <figure>
        <img
          src=${getPlayerPic()}
          alt=""
        />
      </figure>
    </div>

    <div class="player-stats">
      <h1>${playerName}</h1>
      <h3>Born: ${dateBorn}
      <h3>Sport: ${sport}</h3>
      <h3>Nationality: ${nation}</h3>
      <h3>Gender: ${gender}</h3>
      <h3>Weight: ${weight}</h3>
      <h3>Height: ${height}</h3>
      <h3>Wage: ${wage}</h3>
    </div>
    <div class="player-bio">
      <h1>BIO</h1>
      <p>
      ${playerBio}
      </p>
    </div>
  </dir>`;

      playerContainer.insertAdjacentHTML("afterbegin", html);
      playerContainer.style.opacity = 1;
    };
    console.log(data);
    data.player.map((item) => {
      renderHtml(item);
    });
  });
});
