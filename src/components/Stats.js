import React from 'preact/compat';
import { connectStats } from 'react-instantsearch-dom';

export const Stats = connectStats(function Stats(props) {
  return (
    <div className="ais-Stats">
      <p className="ais-Stats-mainText">
        {props.nbHits.toLocaleString()} proizvoda
      </p>
    </div>
  );
});
