import React from "react";

import { utils } from "../../helpers/utils";

const SearchResult = props => {
  const unknownPopulation = props.results.filter(
    elm => elm.population === "unknown"
  );
  const knownPopulation = props.results.filter(
    elm => elm.population !== "unknown"
  );
  const sortedPopulation = utils.sort("population", knownPopulation);
  const sortResult = [...sortedPopulation, ...unknownPopulation];
  const finalResult = utils.populationWithFontSize(sortResult);

  const options = finalResult.map(result => (
    <div className="card text-white bg-dark mb-3" key={result.created}>
      <div className="card-header">
        <h5 className="card-title" style={{ fontSize: `${result.fontSize}px` }}>
          {result.name}
        </h5>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="font-weight-bold">Population:</span>{" "}
            {result.population}
          </li>
          <li className="list-group-item">
            <span className="font-weight-bold">Rotation period:</span>{" "}
            {result.rotation_period}
          </li>
          <li className="list-group-item">
            <span className="font-weight-bold">Surface water:</span>{" "}
            {result.surface_water}
          </li>
          <li className="list-group-item">
            <span className="font-weight-bold">Terrain:</span> {result.terrain}
          </li>
        </ul>
      </div>
    </div>
  ));
  return <div className="search-result">{options}</div>;
};

export default SearchResult;
