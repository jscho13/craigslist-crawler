import React from "react";
import Listing from "./Listing";
import { GenericObject } from "../utils/interface.d";
import styled from "styled-components";

export type ListingsProps = {
  listData: GenericObject;
  setListData: (value: GenericObject) => void;
};

const Listings = ({ listData, setListData }: ListingsProps) => {
  const listItems = Object.keys(listData).map((key) => {
    return (
      <Listing
        key={key}
        title={key}
        setListData={setListData}
        listData={listData}
      />
    );
  });

  return <StyledList>{listItems}</StyledList>;
};

const StyledList = styled.ul`
  list-style: none;
  text-align: left;
`;

export default Listings;
