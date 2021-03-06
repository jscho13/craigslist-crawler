import React, { useState } from "react";
import styled from "styled-components";

import CraigsListForm from "./components/CraigsListForm";
import Listings from "./components/Listings";

import { FetchForm, ListItem } from "./utils/interface.d";

const App: React.FC = () => {
  const formStateDefault = {
    limit: 10,
    nyc: true,
    bos: true,
    writing: true,
    computer: true,
  };

  const [formState, setFormState] = useState<FetchForm>(formStateDefault);
  const [listData, setListData] = useState<ListItem[][]>([[]]);

  return (
    <AppContainer>
      <CraigsListForm
        formState={formState}
        setFormState={setFormState}
        listData={listData}
        setListData={setListData}
      />
      <ListingsContainer>
        <Listings listData={listData} setListData={setListData} />
      </ListingsContainer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: row;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
  background-color: #282c34;
`;

const ListingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
