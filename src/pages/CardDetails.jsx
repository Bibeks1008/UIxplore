import React from "react";
import { useParams } from "react-router-dom";

import Boxcontainer from "../components/Boxcontainer/Boxcontainer";

const CardDetails = () => {
  const { cardId } = useParams();
  return (
    <div>
      <Boxcontainer>
        <div style={{ color: "#ffff" }}>{`CardDetails: ${cardId}`}</div>
      </Boxcontainer>
    </div>
  );
};

export default CardDetails;
