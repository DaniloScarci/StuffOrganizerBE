import React from "react";

const InputComponent = ({
  aziende,
  selectedAzienda,
  setSelectedAzienda,
  testoInserito,
  inputTextHandler,
  coloreAzienda,
  setColoreAzienda,
  elementAddHandler,
  setElementoPrivato,
  elementoPrivato
}) => {
  return aziende ? (
    <div className="tablesContainer">
      <div>
        <input
          onChange={(e) => inputTextHandler(e)}
          value={testoInserito}
          type="text"
        />
        {aziende ? (
          <select
            value={selectedAzienda ?? aziende[0]}
            style={{
              backgroundColor: coloreAzienda,
            }}
            onChange={(e) => {
              setSelectedAzienda(e.target.value);
              setColoreAzienda(
                aziende.filter((data) => data.nomeAzienda === e.target.value)[0]
                  .colore
              );
            }}
          >
            {aziende.map((data, index) => (
              <option
                key={index}
                style={{
                  backgroundColor: data.colore,
                }}
              >
                {data.nomeAzienda}
              </option>
            ))}
          </select>
        ) : null}
        {testoInserito ? (
          <div className="addContainer">
            <div>
              <button
                style={{
                  backgroundColor: coloreAzienda,
                }}
                onClick={(e) => elementAddHandler(e)}
                type="submit"
              >
                Inserisci
              </button>
            </div>
            <div>
              <input
                onChange={e => setElementoPrivato(!elementoPrivato)}
                value={!!elementoPrivato}
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default InputComponent;
