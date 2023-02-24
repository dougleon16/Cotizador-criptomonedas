import styled from "@emotion/styled";
const Texto = styled.div`
  background-color: #ff001e22;
  color: #fff;
  padding: 15px;
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 700;
  font-family: "Lato", sans-serif;
  border-left: 5px solid #b7322c;
  text-align: center;
`;
const Mensaje = ({ children }) => {
  return <Texto className="error">{children}</Texto>;
};

export default Mensaje;
