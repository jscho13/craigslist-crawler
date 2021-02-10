import React from "react";
import Listing from "./Listing";
import { ListingsProps, ListItem } from "../utils/interface.d";
import styled from "styled-components";

const Listings = ({ listData, setListData }: ListingsProps) => {
  const listItems = listData.map((row: ListItem[], idx: number) => {
    return (
      <Listing
        key={idx}
        rowIdx={idx}
        listData={listData}
        setListData={setListData}
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
