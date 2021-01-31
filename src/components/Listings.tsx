import React from "react";
import styled from "styled-components";
import { FormProps, GenericObject, ListItem } from "../utils/interface.d";

const Listings = ({ listData }: GenericObject) => {
  const listItems = Object.keys(listData).map((key) => {
    let items: ListItem[] = listData[key];

    return (
      <>
        <ItemDesc>{key}</ItemDesc>
        {items.map((item) => {
          return (
            <StyledListItem key={item.text + item.key}>
              <Link href={item.link}>{item.text}</Link>
            </StyledListItem>
          );
        })}
      </>
    );
  });

  return <StlyedList>{listItems}</StlyedList>;
};

const Link = styled.a`
  font-size: 18px;
  color: white;
  text-decoration: none;
`;

const StlyedList = styled.ul`
  list-style: none;
  text-align: left;
`;

const StyledListItem = styled.li``;

const ItemDesc = styled.h3``;

export default Listings;
