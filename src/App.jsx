import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
import ImagenCrypto from "./img/imagen-criptos.png";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;
const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #ffffff;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 50px;
  font-weight: 700;
  font-size: 32px;
  &::after {
    content: "";
    height: 6px;
    width: 100px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  //state para obtener las diferentes monedas que el usuario selecciono
  const [monedas, setMonedas] = useState({});
  //state para obtener el resultado de la criptomoneda
  const [resultado, setResultado] = useState({});
  //state para spinner
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCriptomoneda = async () => {
        setCargando(true);
        setResultado({});
        const { moneda, criptomoneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
      };
      cotizarCriptomoneda();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCrypto} alt="imagen-crypto" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} />
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  );
}

export default App;
