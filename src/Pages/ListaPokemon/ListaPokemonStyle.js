import styled from "styled-components";
export const Container = styled.div`
  height: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 10px;
  justify-content: center;
  justify-items: center;
`;
export const Btitulo = styled.div`
  width: 100%;
  padding: 15px;
  margin-top: 1%;
  margin-bottom: 2%;
  grid-row: 1;
  grid-column: 1/4;
`;
export const Titulo = styled.h2`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 72px;
  color: #ffffff;
`;
