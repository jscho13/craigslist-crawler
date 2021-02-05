import React, { useReducer } from "react";
import styled from "styled-components";
import { GenericObject, ListItem } from "../utils/interface.d";

type REDUCERACTION =
  | { type: "title"; value: string }
  | { type: "href"; value: string };

const initialState = { title: "", href: "" };
const reducer = (state: typeof initialState, action: REDUCERACTION) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.value };
    case "href":
      return { ...state, href: action.value };
    default:
      throw new Error();
  }
};

const Listings = ({ listData, setListData }: GenericObject) => {
  const [formState, dispatch] = useReducer(reducer, initialState);

  const handleOnChange = (key: string) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const item = {
      link: formState.href,
      text: formState.title,
    };

    setListData({ ...listData, [key]: [...listData[key], item] });
  };

  const handleOnDelete = (key: string) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const len = listData[key].length;
    const rand = Math.floor(Math.random() * len);
    listData[key].splice(rand, 1);
    setListData({ ...listData });
  };

  const listItems = Object.keys(listData).map((key) => {
    let items: ListItem[] = listData[key];

    return (
      <div key={key}>
        <ItemDesc>{key}</ItemDesc>
        <AddItemRow>
          <AddItemInputs>
            <input
              name="linkTitle"
              placeholder="Link Title"
              onChange={(e) =>
                dispatch({ type: "title", value: e.target.value })
              }
            />
            <input
              name="linkHref"
              placeholder="Link Href"
              onChange={(e) =>
                dispatch({ type: "href", value: e.target.value })
              }
            />
            <AddItem onClick={handleOnChange(key)}>Add Item</AddItem>
          </AddItemInputs>
          <DeleteItem onClick={handleOnDelete(key)}>Delete Item</DeleteItem>
        </AddItemRow>
        {items.map((item, idx) => {
          return (
            <StyledListItem key={item.text + idx}>
              <Link href={item.link}>{item.text}</Link>
            </StyledListItem>
          );
        })}
      </div>
    );
  });

  return <StyledList>{listItems}</StyledList>;
};

const Link = styled.a`
  font-size: 18px;
  color: white;
  text-decoration: none;
`;

const StyledList = styled.ul`
  list-style: none;
  text-align: left;
`;

const StyledListItem = styled.li``;

const ItemDesc = styled.h3``;

const AddItem = styled.button`
  cursor: pointer;
`;

const DeleteItem = styled.button`
  cursor: pointer;
`;

const AddItemRow = styled.div``;
const AddItemInputs = styled.div`
  display: flex;
`;

export default Listings;
