import styled from 'styled-components';

const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 80px;
  margin-left: 6em;
  margin-right: 6em;
`; 

export default function Cat() {
    return (
        <GridWrapper>
            <h1>This is cats</h1>
        </GridWrapper>
    );
}