export type GenericObject = { [key: string]: any };

export type FormProps = {
  formState: GenericObject;
  setFormState: (obj: GenericObject) => void;
}

