import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import Mensaje from "./Mensaje";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  width: 100%;
  background-color: #9497ff;
  color: #fff;
  padding: 10px;

  font-weight: 700;
  border: none;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas }) => {
  const [mensaje, setMensaje] = useState("");
  const [criptos, setCriptos] = useState([]);
  //hook personalizado
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda:", monedas);
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    "Elige tu Criptomoneda:",
    criptos
  );

  //consultla API
  useEffect(() => {
    const consultarApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      // console.log(resultado.Data);
      //iteramos en la api y obtenemos los datos que necesitamos
      const arrayCriptos = resultado.Data.map((cripto) => {
        const { Name, FullName } = cripto.CoinInfo;
        const objeto = {
          id: Name,
          nombre: FullName,
        };
        return objeto;
      });
      setCriptos(arrayCriptos);
    };
    consultarApi();
  }, []);

  //Validacion deformulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([moneda, criptomoneda].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }
    setMensaje("");
    setMonedas({
      moneda,
      criptomoneda,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      {mensaje && <Mensaje>{mensaje}</Mensaje>}
      <SelectMonedas />
      <SelectCriptomoneda />

      <InputSubmit type="submit" value="cotizar" />
    </form>
  );
};

export default Formulario;
