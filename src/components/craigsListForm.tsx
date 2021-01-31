import React from "react";
import styled from "styled-components";
import $ from "jquery";

import { FormProps, GenericObject } from "../utils/interface.d";
import { CITIES, GIGS, ALIAS } from "../utils/constants";

// create urls
const generateUrls = (formState: GenericObject) => {
  let urls: GenericObject = {};

  if (formState.nyc) {
    if (formState.computer) {
      let key = `${ALIAS.nyc} ${ALIAS.computer}`;
      let url = `${CITIES.nyc}${GIGS.computer}`;
      urls[key] = url;
    }

    if (formState.writing) {
      let key = `${ALIAS.nyc} ${ALIAS.writing}`;
      let url = `${CITIES.nyc}${GIGS.writing}`;
      urls[key] = url;
    }
  }

  if (formState.bos) {
    if (formState.computer) {
      let key = `${ALIAS.bos} ${ALIAS.computer}`;
      let url = `${CITIES.bos}${GIGS.computer}`;
      urls[key] = url;
    }

    if (formState.writing) {
      let key = `${ALIAS.bos} ${ALIAS.writing}`;
      let url = `${CITIES.bos}${GIGS.writing}`;
      urls[key] = url;
    }
  }

  return urls;
};

const Form = ({ ...props }: FormProps) => {
  const { formState, setFormState, listData, setListData } = props;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setListData({});

    try {
      // loop through urls and make request
      // experiment here with object.keys or promise.all
      // it looks like you can't set state multiple times in a loop it gets weirded out
      const urls = generateUrls(formState);
      let newData: GenericObject = {};

      for (let title in urls) {
        let url = urls[title];
        const response = await fetch(url);
        const data = await response.text();
        const html = new DOMParser().parseFromString(data, "text/html");
        const searchId = title.includes("Writing")
          ? "sortable-results"
          : "search-results";
        const searchList = $(html).find(`#${searchId} .result-title`);

        let list = [];
        for (let i = 0; i < formState.limit; i++) {
          const text = searchList[i].innerHTML;
          const link = searchList[i].toString();
          const key = i;
          list[i] = { link, text, key };
        }

        newData[title] = list;
      }

      setListData(newData);
    } catch (e) {
      console.log(`error there was a problem fetching craigslist: ${e}`);
    }
  };

  // use hook way https://dev.to/damcosset/refactor-a-form-with-react-hooks-and-usestate-1lfa
  return (
    // onSubmit also covers input by "enter" which is better
    // onClick on button only covers "clicking"
    <StyledForm onSubmit={handleSubmit}>
      <Input>
        <label htmlFor="nyc">New York</label>
        <input
          id="nyc"
          name="nyc"
          type="checkbox"
          checked={formState.nyc}
          onChange={handleOnChange}
        />
      </Input>
      <Input>
        <label htmlFor="bos">Boston</label>
        <input
          id="bos"
          name="bos"
          type="checkbox"
          checked={formState.bos}
          onChange={handleOnChange}
        />
      </Input>
      <Input>
        <label htmlFor="writing">Writing</label>
        <input
          id="writing"
          name="writing"
          type="checkbox"
          checked={formState.writing}
          onChange={handleOnChange}
        />
      </Input>
      <Input>
        <label htmlFor="computer">Computer</label>
        <input
          id="computer"
          name="computer"
          type="checkbox"
          checked={formState.computer}
          onChange={handleOnChange}
        />
      </Input>
      <Input>
        <label htmlFor="limit">Limit</label>
        <input
          id="limit"
          name="limit"
          type="number"
          onChange={handleOnChange}
          value={formState.limit}
        />
      </Input>
      <SubmitButton type="submit">Fetch</SubmitButton>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  padding: 50px;
`;

const Input = styled.div`
  display: flex;
  flex-flow: column;
  text-align: left;
`;

const SubmitButton = styled.button``;

export default Form;
