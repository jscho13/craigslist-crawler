import React, { useReducer } from "react";
import { ListItem, ListingProps } from "../utils/interface.d";
import styled from "styled-components";

type ReducerAction = { type: string; value: string };

const initialState = { text: "", link: "", sort: "Asc" };
const reducer = (state: typeof initialState, action: ReducerAction) => {
  switch (action.type) {
    case "text":
      return { ...state, text: action.value };
    case "link":
      return { ...state, link: action.value };
    case "sort":
      return { ...state, sort: action.value };
    default:
      throw new Error();
  }
};

const Listing = ({ rowIdx, listData, setListData }: ListingProps) => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const dir = formState.sort;
  const items = listData[rowIdx];

  const handleOnChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = {
      link: formState.link,
      text: formState.text,
    };

    const newListData = listData;
    listData[rowIdx].push(item);
    setListData([...newListData]);
  };

  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const len = listData[rowIdx].length;
    const rand = Math.floor(Math.random() * len);
    listData[rowIdx].splice(rand, 1);
    setListData([...listData]);
  };

  const handleDispatch = (type: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: type, value: e.target.value });
  };

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isAsc = dir === "Asc";
    const value = isAsc ? "Desc" : "Asc";
    dispatch({ type: "sort", value });

    listData[rowIdx].sort((a: ListItem, b: ListItem) => {
      return isAsc ? (b.date < a.date ? 1 : -1) : a.date < b.date ? 1 : -1;
    });
    setListData([...listData]);
  };

  return (
    <div>
      <InputRow>
        <input
          name="linkTitle"
          placeholder="Link Title"
          onChange={handleDispatch("text")}
        />
        <input
          name="linkHref"
          placeholder="Link Href"
          onChange={handleDispatch("link")}
        />
        <AddItem onClick={handleOnChange}>Add Item</AddItem>
        <DeleteItem onClick={handleOnDelete}>Delete Item</DeleteItem>
        <SortItem onClick={handleSort}>Sort Item {dir}</SortItem>
      </InputRow>
      <hr />
      <LinkContainer>
        {items.map((item: ListItem, idx: number) => {
          return (
            <StyledListItem key={item.text + idx}>
              <Desc>{item.date}</Desc>
              <Desc>{item.title}</Desc>
              <Link href={item.link}>{item.text}</Link>
            </StyledListItem>
          );
        })}
      </LinkContainer>
    </div>
  );
};

const InputRow = styled.div`
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

const StyledListItem = styled.div`
  display: flex;
`;

const Link = styled.a`
  margin: 5px;
  margin-left: 0px;
  color: white;
  font-size: 18px;
  text-decoration: none;
`;

const Desc = styled.div`
  margin: 5px;
  margin-left: 0px;
  pointer: cursor;
  font-size: 18px;
`;

const LinkContainer = styled.div`
  margin-bottom: 30px;
`;

export default Listing;
