export type GenericObject = { [key: string]: any };

export type FormProps = {
  formState: FetchForm;
  setFormState: (obj: FetchForm) => void;
  listData: ListItem[][];
  setListData: (list: ListItem[][]) => void;
};

interface ListItem {
  date: string;
  key: number;
  link: string;
  text: string;
  title: string;
}

interface FetchForm {
  limit: number;
  nyc: boolean;
  bos: boolean;
  writing: boolean;
  computer: boolean;
}

export type ListingsProps = {
  listData: ListItem[][];
  setListData: (list: ListItem[][]) => void;
};

export type ListingProps = { rowIdx: number } & ListingsProp;
