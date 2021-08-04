import './Form.css';
import React,  {useState} from 'react';

function Form() {
  const[playerList, setPlayerList] = useState(null);
  let year = null;
 

  // create a function to grab players id
  async function getPlayersId(e){
    e.preventDefault();
    let inputs = document.getElementsByTagName('input');
    let playerName = inputs[0].value // hardcoded look for better way
    year = inputs[1].value;
    let players = [];

    const playerInfo = await fetch(`https://www.balldontlie.io/api/v1/players?search=${playerName}&per_page=100`)
                     .then(response => response.json())
                     .catch((error) => {
                      console.error('Error:', error);
                    });
    let results = playerInfo.data
    if(results.length === 0) {return alert("No results found");}
    
    for(let i = 0; results.length > i; i++){
      let player = { info : null, stats : null };
      player.info = results[i];
      player.stats = await getPlayerStats(results[i].id, year);
      players.push(player);
      console.log(`counter = " ${i + 1}`);
    }
    setPlayerList(players);
  }

  // this function gets players stats
    async function getPlayerStats(id, year){
      let url = `https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${id}`;
      const seasonAverage = await fetch(url)
                          .then(response => response.json())
                          .catch((error) => {
                            console.error('Error:', error);
                          });
      //console.log(seasonAverage);
      return seasonAverage.data[0];
    }
 
    return (
      <div className="form">
       <form className="current-form" onSubmit={(e) => getPlayersId(e)}> {/*onSubmit={(e) => getPlayerStats(e)} */}
         <input name="player" className="player" type="text" placeholder="Enter NBA Player"/>
         <input name="year" className="year" type="number" maxLength="4" minLength="4" placeholder="year" />
         <button type="submit" id="submit">Search</button>
       </form>
       <ul className="player-list">
          {
            playerList !== null ?
            playerList.map((player, i) =>{
              return <li key={i}>
                <div>
                  <ul>
                    <li>{player.info.first_name} {player.info.last_name}</li>
                    <li>{player.info.height_feet || "" }' {player.info.height_inches}"</li>
                    <li>{player.info.weight_pounds || ""}</li>
                    <li>{player.info.id || ""}</li>
                    <li>{player.info.position || ""}</li>
                    <li>
                      <ul>
                        <li>{player.info.team.id || ""}</li>
                        <li>{player.info.team.abbreviation || ""}</li>
                        <li>{player.info.team.city || ""}</li>
                        <li>{player.info.team.conference || ""}</li>
                        <li>{player.info.team.division || ""}</li>
                        <li>{player.info.team.full_name || ""}</li>
                        <li>{player.info.team.name || ""}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>{(player.stats.ast === undefined || player.stats.ast === null ) ? "" : player.stats.ast}</li>
                    <li>{player.stats.blk || ""}</li>
                    <li>{player.stats.dreb || ""}</li>
                    <li>{player.stats.fg3_pct || ""}</li>
                    <li>{player.stats.fg3a || ""}</li>
                    <li>{player.stats.fg3m || ""}</li>
                    <li>{player.stats.fg_pct || ""}</li>
                    <li>{player.stats.fga || ""}</li>
                    <li>{player.stats.fgm || ""}</li>
                    <li>{player.stats.ft_pct || ""}</li>
                    <li>{player.stats.fta || ""}</li>
                    <li>{player.stats.ftm || ""}</li>
                    <li>{player.stats.games_played || ""}</li>
                    <li>{player.stats.min || ""}</li>
                    <li>{player.stats.oreb || ""}</li>
                    <li>{player.stats.pf || ""}</li>
                    <li>{player.stats.player_id || ""}</li>
                    <li>{player.stats.pts || ""}</li>
                    <li>{player.stats.reb || ""}</li>
                    <li>{player.stats.season || ""}</li>
                    <li>{player.stats.stl || ""}</li>
                    <li>{player.stats.turnover || ""}</li>                                                                                                                                                                                                        
                  </ul>
                </div>
              </li>
            })
            :
            ""
          }
       </ul>
      </div>
    );
  }
  export default Form;

