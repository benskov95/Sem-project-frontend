import styled from 'styled-components';

const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 80px;
  margin-left: 6em;
  margin-right: 6em;
`; 

export default function NoMatch() {
    return (
      <GridWrapper>
        <h2>Unknown route. Please try again.</h2>
      </GridWrapper>
    );
  }