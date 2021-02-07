import React, { useReducer } from "react";
import { ListItem } from "../utils/interface.d";
import { ListingsProps } from "./Listings";
import styled from "styled-components";

type ListingProps = { title: string } & ListingsProps;
type ReducerAction = { type: string; value: string };

const initialState = { title: "", href: "", sort: "Asc" };
const reducer = (state: typeof initialState, action: ReducerAction) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.value };
    case "href":
      return { ...state, href: action.value };
    case "sort":
      return { ...state, sort: action.value };
    default:
      throw new Error();
  }
};

const Listing = ({ title, listData, setListData }: ListingProps) => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const dir = formState.sort;
  const items = listData[title];

  const handleOnChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = {
      link: formState.href,
      text: formState.title,
    };

    setListData({ ...listData, [title]: [...listData[title], item] });
  };

  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const len = listData[title].length;
    const rand = Math.floor(Math.random() * len);
    listData[title].splice(rand, 1);
    setListData({ ...listData });
  };

  const handleDispatch = (type: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: type, value: e.target.value });
  };

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = dir === "Asc" ? "Desc" : "Asc";
    dispatch({ type: "sort", value });

    const sortDir = (a: ListItem, b: ListItem) =>
      dir === "Asc" ? b.text < a.text : a.text < b.text;
    listData[title].sort((a: ListItem, b: ListItem) => {
      return sortDir(a, b) ? 1 : -1;
    });
    setListData({ ...listData });
  };

  return (
    <div>
      <ItemDesc>{title}</ItemDesc>
      <InputRow>
        <AddItemInputs>
          <input
            name="linkTitle"
            placeholder="Link Title"
            onChange={handleDispatch("title")}
          />
          <input
            name="linkHref"
            placeholder="Link Href"
            onChange={handleDispatch("link")}
          />
          <AddItem onClick={handleOnChange}>Add Item</AddItem>
        </AddItemInputs>
        <DeleteItem onClick={handleOnDelete}>Delete Item</DeleteItem>
        <SortItem onClick={handleSort}>Sort Item {dir}</SortItem>
      </InputRow>
      {items.map((item: ListItem, idx: number) => {
        return (
          <StyledListItem key={item.text + idx}>
            <Link href={item.link}>{item.text}</Link>
          </StyledListItem>
        );
      })}
    </div>
  );
};

const ItemDesc = styled.h3``;
const InputRow = styled.div``;

const AddItemInputs = styled.div`
  display: flex;
`;
const AddItem = styled.button`
  cursor: pointer;
`;

const DeleteItem = styled.button`
  cursor: pointer;
`;
const SortItem = styled.button`
  cursor: pointer;
`;

const StyledListItem = styled.li``;
const Link = styled.a`
  font-size: 18px;
  color: white;
  text-decoration: none;
`;
export default Listing;
