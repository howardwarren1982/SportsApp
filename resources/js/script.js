//Nav bar function
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}

//cursor fade out
// const cursor = document.querySelector('.blinking-cursor')
// window.onscroll = function(){fadeCursor()}
//
// function fadeCursor() {
//   if(document.body.scrollTop > 499 || document.documentElement.scrollTop > 499){
//     cursor.style.display = 'none';
//   }else{
//     cursor.style.display = 'block';
//   }
// }

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
        return data.player[0].strThumb;
      };
      let playerName = data.player[0].strPlayer;
      let dateBorn = data.player[0].dateBorn;
      let nation = data.player[0].strNationality;
      let gender = data.player[0].strGender;
      let height = data.player[0].strHeight;
      let weight = data.player[0].strWeight;
      let sport = data.player[0].strSport;
      let playerBio =
        data.player[0].strDescriptionEN &&
        data.player[0].strDescriptionEN.replaceAll("\\r\\n\\r\\n", " ");
      let wage = data.player[0].strWage;

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
    renderHtml(data);
  });
});
