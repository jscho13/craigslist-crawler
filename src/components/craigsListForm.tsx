import React from 'react';
import styled from 'styled-components'

type GenericObject = { [key: string]: any };

type FormProps = {
  formState: GenericObject;
  setFormState: (obj: GenericObject) => void;
}

const Form = ({ ...props }: FormProps) => {
  const {
    formState,
    setFormState
  } = props;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    const newState = {
      ...formState,
      [name]: value
    }
    setFormState(newState);
  }

  // use hook way https://dev.to/damcosset/refactor-a-form-with-react-hooks-and-usestate-1lfa
  return (
    <StyledForm>
      <Input>
        <label htmlFor="seconds">Seconds</label>
        <input id="seconds" type="number" name="seconds" onChange={handleOnChange} value={formState.number}/>
      </Input>
    </StyledForm>
  )
}

const StyledForm = styled.form``

const Input = styled.div`
  display: flex;
  flex-flow: column;
  text-align: left;
`

export default Form;
