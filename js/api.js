const base_url = "https://api.football-data.org/v2/";
const API = 'd6085574a4c94a25999c6dcb02db1661';
const id_liga = 2003;
const match = `${base_url}competitions/${id_liga}/matches`;
const teams = `${base_url}competitions/${id_liga}/teams`;
const teamd = `${base_url}teams/`;

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}


function getMatches() {
    if ("caches" in window) {
        caches.match(match).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    var matchDetail = '';
                    data.matches.forEach(function(mtch) {
                        matchDetail += `
                <style>
                h6{
                    padding-left: .2rem;
                    padding-top: .8rem;
                    padding-right: .8rem;
                    padding-bottom: .8rem;
                }
                div.list{
                    margin-top: 2.2rem;
                }
                div b{
                    font-size: 1.15rem;
                }
                
    </style>
        <div class="col s12 m12">
          <div class="card">
            <div class="card-content">
              
              <h6 class="red darken-1"><b class="white-text">Matchday ${mtch.matchday} of 38</b></h6>
              

              <div class = "row list">
              <div class= "col s4 left-align grey-text text-darken-2"><b>${mtch.homeTeam.name} <span class="red-text darken-1">vs</span> ${mtch.awayTeam.name}</b></div>
              <div class= "col s4 center-align green-text darken-3 scor"><b>${mtch.score.fullTime.homeTeam} - ${mtch.score.fullTime.awayTeam}</b></div>
              <div class= "col s4 right-align grey-text text-darken-2"><b>${dmy(new Date(mtch.utcDate))}</b></div>
              </div>

            </div>
          </div>
        </div>
        `;
                    });
                    matchHTML = `
        <div class="row">
                ` + matchDetail + `
        </div>
      `;
                    document.getElementById("body-content").innerHTML = matchHTML;
                })
            }
        })
    }
    fetch(match, {
            headers: {
                'X-Auth-Token': API
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            console.log(data);
            var matchDetail = '';
            data.matches.forEach(function(mtch) {
                matchDetail += `
                <style>
                h6{
                    padding-left: .2rem;
                    padding-top: .8rem;
                    padding-right: .8rem;
                    padding-bottom: .8rem;
                }
                div.list{
                    margin-top: 2.2rem;
                }
                div b{
                    font-size: 1.15rem;
                }
                
    </style>
        <div class="col s12 m12">
          <div class="card">
            <div class="card-content">
              
              <h6 class="red darken-1"><b class="white-text">Matchday ${mtch.matchday} of 38</b></h6>
              

              <div class = "row list">
              <div class= "col s4 left-align grey-text text-darken-2"><b>${mtch.homeTeam.name} <span class="red-text darken-1">vs</span> ${mtch.awayTeam.name}</b></div>
              <div class= "col s4 center-align green-text darken-3 scor"><b>${mtch.score.fullTime.homeTeam} - ${mtch.score.fullTime.awayTeam}</b></div>
              <div class= "col s4 right-align grey-text text-darken-2"><b>${dmy(new Date(mtch.utcDate))}</b></div>
              </div>

            </div>
          </div>
        </div>
        `;
            });
            matchHTML = `
        <div class="row">
                ` + matchDetail + `
        </div>
      `;
            document.getElementById("body-content").innerHTML = matchHTML;
        })
        .catch(error);
}

function dmy(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}


function getTeams() {

    if ("caches" in window) {
        caches.match(teams).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    var teamsDetail = '';
                    data.teams.forEach(function(team) {
                        teamsDetail += `
                        <li class="collection-item avatar center center-align">
                        <a href="./teamdetails.html?id=${team.id}">
                        <img src="${team.crestUrl !== null 
                          ? team.crestUrl.replace(/^http:\/\//i, "https://")
                          :"image/no-image.png"
                          }"
                        class="teamimg responsive-img" onerror="this.onerror=null; this.src='image/no-image.png'" alt="Logo-Teams">
                        <span class="title"><h4><b>${team.name}</b></h4></span>
                        <p>${team.venue}</p>
                        </a>
                      </li>
                      `;
                    });
                    teamsHTML = `
                      <ul class="collection">
                              ` + teamsDetail + `
                      </ul>
                    `;
                    document.getElementById("body-content").innerHTML = teamsHTML;
                })
            }
        })
    }
    fetch(teams, {
            headers: {
                'X-Auth-Token': API
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            console.log(data);

            var teamsDetail = '';
            data.teams.forEach(function(team) {
                teamsDetail += `
                <li class="collection-item avatar center center-align">
                  <a href="./teamdetails.html?id=${team.id}">
                  <img src="${team.crestUrl !== null 
                    ? team.crestUrl.replace(/^http:\/\//i, "https://")
                    :"image/no-image.png"
                    }"
                  class="teamimg responsive-img" onerror="this.onerror=null; this.src='image/no-image.png'" alt="Logo-Teams">
                  <span class="title"><h4><b>${team.name}</b></h4></span>
                  <p>${team.venue}</p>
                  </a>
                </li>
                `;
            });
            teamsHTML = `
                <ul class="collection">
                        ` + teamsDetail + `
                </ul>
              `;
            document.getElementById("body-content").innerHTML = teamsHTML;
        })
        .catch(error);
}

function getteamById() {
    return new Promise(function(resolve, reject) {
        // Ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(teamd + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        var teamDetails = `
            <h3>${data.name} Details</h3>
            <br>
            <img src="${data.crestUrl}" class="responsive-img" onerror="this.onerror=null; this.src='image/no-image.png'">
            <ul class="collection">
                <li class="collection-item">
                    <span class="title"><h5><b>Team Name:</b></h5></span>
                    <h6>${data.name}</h6>
                </li>
                <li class="collection-item">
                    <span class="title"><h5><b>Team Short Name:</b></h5></span>
                    <h6>${data.shortName}</h6>
                </li>
                <li class="collection-item">
                    <span class="title"><h5><b>Team Venue:</b></h5></span>
                    <h6>${data.venue}</h6>
                </li>
                <li class="collection-item">
                    <span class="title"><h5><b>Founded:</b></h5></span>
                    <h6>${data.founded}</h6>
                </li>
                <li class="collection-item">
                    <span class="title"><h5><b>Founded:</b></h5></span>
                    <h6>${data.founded}</h6>
                </li>
                <li class="collection-item">
                    <span class="title"><h5><b>Phone:</b></h5></span>
                    <h6>${data.phone}</h6>
                </li>
                <li class="collection-item">
                    <span class="title"><h5><b>website:</b></h5></span>
                    <h6><a href="${data.website}">${data.website}</a></h6>
                </li>
            </ul>
            `;
                        document.getElementById("content").innerHTML = teamDetails;
                        resolve(data);
                    });
                }
            });
        }

        fetch(teamd + idParam, {
                headers: {
                    'X-Auth-Token': API
                }
            })
            .then(status)
            .then(json)
            .then(function(data) {
                // Objek JavaScript dari response.json() masuk lewat variabel data.
                console.log(data);
                // Menyusun komponen card artikel secara dinamis

                var teamDetails = `
        <h3>${data.name} Details</h3>
        <br>
        <img src="${data.crestUrl}" class="responsive-img" onerror="this.onerror=null; this.src='image/no-image.png'">
        <ul class="collection">
            <li class="collection-item">
                <span class="title"><h5><b>Team Name:</b></h5></span>
                <h6>${data.name}</h6>
            </li>
            <li class="collection-item">
                <span class="title"><h5><b>Team Short Name:</b></h5></span>
                <h6>${data.shortName}</h6>
            </li>
            <li class="collection-item">
                <span class="title"><h5><b>Team Venue:</b></h5></span>
                <h6>${data.venue}</h6>
            </li>
            <li class="collection-item">
                <span class="title"><h5><b>Founded:</b></h5></span>
                <h6>${data.founded}</h6>
            </li>
            <li class="collection-item">
                <span class="title"><h5><b>Founded:</b></h5></span>
                <h6>${data.founded}</h6>
            </li>
            <li class="collection-item">
                <span class="title"><h5><b>Phone:</b></h5></span>
                <h6>${data.phone}</h6>
            </li>
            <li class="collection-item">
                <span class="title"><h5><b>website:</b></h5></span>
                <h6><a href="${data.website}">${data.website}</a></h6>
            </li>
        </ul>
        `;

                document.getElementById("content").innerHTML = teamDetails;

                resolve(data);
            });
    });
}

function getSavedTeams() {
    getAll().then(function(data) {
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var teamsDetail = '';
        data.forEach(function(team) {
            teamsDetail += `
        <li class="collection-item avatar center">
          <a href="./teamdetails.html?id=${team.id}&saved=true">
          <img src="${team.crestUrl}" class="responsive-img" alt="Universe" onerror="this.onerror=null; this.src='image/no-image.png'">
          <span class="title"><h4><b>${team.name}</b></h4></span>
          <p>${team.venue}</p>
          </a>
        </li>
        `;
        });
        teamsHTML = `
        <ul class="collection">
                ` + teamsDetail + `
        </ul>
      `;
        document.getElementById("body-content").innerHTML = teamsHTML;
    });
}

function getSavedTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    getSavedById(idParam).then(function(datat) {
        console.log(datat);
        var teamSavedDetails = `
    <h3>${datat.name} Details</h3>
    <br>
    <img src="${datat.crestUrl}" class="responsive-img" alt="${datat.crestUrl} logo" onerror="this.onerror=null; this.src='image/no-image.png'">
    <ul class="collection">
        <li class="collection-item">
            <span class="title"><h5><b>Team Name:</b></h5></span>
            <h6>${datat.name}</h6>
        </li>
        <li class="collection-item">
            <span class="title"><h5><b>Team Short Name:</b></h5></span>
            <h6>${datat.shortName}</h6>
        </li>
        <li class="collection-item">
            <span class="title"><h5><b>Team Venue:</b></h5></span>
            <h6>${datat.venue}</h6>
        </li>
        <li class="collection-item">
            <span class="title"><h5><b>Founded:</b></h5></span>
            <h6>${datat.founded}</h6>
        </li>
        <li class="collection-item">
            <span class="title"><h5><b>Phone:</b></h5></span>
            <h6>${datat.phone}</h6>
        </li>
        <li class="collection-item">
            <span class="title"><h6><b>website:</b></h6></span>
            <h6><a href="${datat.website}">${datat.website}</a></h6>
        </li>
    </ul>
    `;
        document.getElementById("content").innerHTML = teamSavedDetails;
    });
}