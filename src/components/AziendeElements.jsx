import React, { useEffect } from "react";
import { Check, Delete } from "@material-ui/icons";

const AziendeElements = ({ index, data, deleteElementHandler }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <div>
          {index + 1} - {data.descrizione}
        </div>
        <Check className="checkClass" />
        <Delete
          className="deleteClass"
          onClick={() => deleteElementHandler(data.idElemento)}
        />
      </div>
    </div>
  );
};

export default AziendeElements;
