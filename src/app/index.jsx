import React, { useState } from "react";

import DataTable from "./datatable";
import json from "../data/data.json";

function pageData({ data, per = 11, page = 1 }) {
  return data.slice(per * (page - 1), per * page);
}

export default function App ({}) {

  // const getPlayersHeroes = (playersList) => playersList.forEach(player => player.hero.name);
  const winDecision = (winNumber) => winNumber === 1 ? 'won' : 'lost'

  const [state, setState] = useState({
    rows: pageData({data: json.data}),
    loading: false,
    page: 1
  })
 
  function loadMoreItems() {
    if (state.loading) return;
  
    setState((prev) => ({
      ...prev,
      loading: true
    }))

    setState((prev) => ({
      rows: [
        ...prev.rows,
        ...pageData({data: json.data, page: prev.page + 1})
      ],
      loading: false,
      page: prev.page + 1
    }));
  }

  return (
    <div>
      <DataTable
        loadMoreItems={loadMoreItems}
        items={state.rows}
        renderHead={() => (
          <>
          <th>Players</th>
          <th>MMR</th>
          <th>ProsNumber</th>
          <th>Time</th>
          <th>Copy ID</th>
          <th>Match</th>
          </>
        )}

        renderRow={(row) => (
          <tr>
            {console.log(row)}
            <td className="pros" >
              <div className="match-result" style={{ backgroundColor: row.radiant_win ? '#2ACD50' : '#EA0420' }}></div>
              <div className="pros-stats">
                {/* TODO: Add function for this */}
                <div className="team-radiant">
                  {
                    row.radiant.map((player) => 
                      <div className="player" key={player.player.name}>
                        <div className="hero_whole">
                          <img alt="" src={`/assets/hero_img_minimap/${player.hero.name}_minimap_icon.png`}></img>
                          <span>{player.player.name}</span>
                        </div>
                      </div>
                    )
                  }
                </div>
                <span>{winDecision(row.radiant_win)}</span> <span>vs</span>
                <div className="team-dire">
                  {
                    row.dire.map((player) => 
                      <div className="player" key={player.player.name}>
                        <div className="hero_whole">
                          <img alt="" src={`/assets/hero_img_minimap/${player.hero.name}_minimap_icon.png`}></img>
                          <span>{player.player.name}</span>
                        </div>
                      </div>
                    )
                  }
                </div>
                <span>{row.end_fuzzy}</span>
              </div>
            </td>
            <td>{row.mmr}</td>
            <td>{row.players.length}</td>
            <td>{row.duration_fuzzy}</td>
            <td>-</td>
            <td>-</td>
          </tr>
        )}
      />
    </div>
  );
}