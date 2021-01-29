import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import CraigsListForm  from './components/CraigsListForm';
import Listings from './components/Listings';

const App: React.FC = () => {
//   useEffect(() => {
//     fetch('https://newyork.craigslist.org/d/computer-gigs/search/cpg')
//       .then(response => {
//         return response.text();
//       }).then(data => {
//         console.log(data);
//       });
//   });

	const [formState, setFormState] = useState({});

  return (
    <AppContainer>
			<CraigsListForm formState={formState} setFormState={setFormState} />
      <Listings formState={formState} />
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
