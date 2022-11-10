import React from "react";
import AziendeElements from "./AziendeElements";

export const TitleComponent = ({
  aziende,
  joinedAzienda,
  deleteElementHandler,
  visibility,
}) => {
  return (
    <div className="titleContainer">
      {joinedAzienda
        ? Object.keys(joinedAzienda).map((key, index) => (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
              key={index}
            >
              <div
                style={{
                  backgroundColor: aziende[index].colore,
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {aziende[index].nomeAzienda}
              </div>
              <div key={index}>
                {joinedAzienda[key]
                  ? joinedAzienda[key]
                      .filter((data) => {
                        if (visibility) {
                          return data;
                        } else {
                          if (!data.privato) return data;
                        }
                      })
                      .filter((data) => data)
                      .map((data, index) => (
                        <AziendeElements
                          key={index}
                          index={index}
                          data={data}
                          deleteElementHandler={deleteElementHandler}
                        />
                      ))
                  : null}
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
