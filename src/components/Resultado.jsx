import styled from "@emotion/styled";
const Resultado = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE, IMAGEURL } =
    resultado;

  const Contenedor = styled.div`
    color: #fff;
    display: flex;
    align-items: center;
    gap: 20px;
  `;

  const Imagen = styled.img`
    display: block;

    width: 120px;
  `;
  const Texto = styled.p`
    font-size: 18px;
    span {
      font-weight: 700;
    }
  `;

  const Precio = styled.p`
    font-size: 24px;
    span {
      font-weight: 700;
    }
  `;
  return (
    <Contenedor>
      <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="" />
      <div>
        <Precio>
          El Precio es de: <span>{PRICE}</span>
        </Precio>
        <Texto>
          El Precio más Alto del Día: <span>{HIGHDAY}</span>
        </Texto>
        <Texto>
          El Precio más Bajo del Día: <span>{LOWDAY}</span>
        </Texto>
        <Texto>
          Variación Últimas 24 Horas: <span>{CHANGEPCT24HOUR}</span>
        </Texto>
        <Texto>
          Última actualización: <span>{LASTUPDATE}</span>
        </Texto>
      </div>
    </Contenedor>
  );
};

export default Resultado;
