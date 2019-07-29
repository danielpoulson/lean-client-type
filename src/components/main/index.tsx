import React, { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";
import MainList from "./main-list";
import NavBar from "../../layout/navbar";
import { getOEEData } from "../../api/oee.api";

function Mattec() {
  const [oeeData, getOEE] = useState([]);

  useEffect(() => {
    onLoadData();
  }, []);

  const onLoadData = () => {
    getOEEData().then((oee: any) => {
      getOEE(oee.data);
    });
    const endpoint = "http://localhost:3060/graphql";
    const graphQLClient = new GraphQLClient(endpoint, { headers: {} });

    const query = `
      {
        getCells {
          machno
          downtime
          idle
          runtime
          units
      }
    }
    `;
    graphQLClient.request(query).then(data => console.log(data));
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
