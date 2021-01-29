import React, { useState } from 'react';
import styled from 'styled-components'
import CraigsListForm  from './components/craigsListForm';

const App: React.FC = () => {
	const [formState, setFormState] = useState({});

  return (
    <AppContainer>
			<CraigsListForm formState={formState} setFormState={setFormState} />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  background-color: #282c34;
`

export default App;
