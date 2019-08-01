import React, { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";
import MainList from "./main-list";
import NavBar from "../../layout/navbar";
// import { getOEEData } from "../../api/oee.api";

const endpoint = "http://localhost:3060/graphql";
const query = `
{
  getCells {
    machno
    downtime
    runtime
    downpc
    units
    avail
    perf
    oee
    idle
    unitsmin
    downnone
    shiftseq
  }
}
`;

function Mattec() {
  const [oeeData, getOEE] = useState([]);

  useEffect(() => {
    onLoadData();
  }, []);

  const onLoadData = () => {
    const graphQLClient = new GraphQLClient(endpoint, { headers: {} });

    graphQLClient.request(query).then(data => getOEE(data.getCells));
  };

  return (
    <div>
      <header className="App-header">
        <div className="page-title">Mattec Data</div>
      </header>
      <NavBar />
      <div className="container">
        <MainList oeeData={oeeData} />
      </div>
    </div>
  );
}

export default Mattec;
