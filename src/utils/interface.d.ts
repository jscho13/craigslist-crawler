export type GenericObject = { [key: string]: any };

export type FormProps = {
  formState: GenericObject;
  setFormState: (obj: GenericObject) => void;
  listData: GenericObject;
  setListData: (list: GenericObject) => void;
};

interface ListItem {
  key: number;
  link: string;
  text: string;
}
