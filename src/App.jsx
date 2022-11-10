import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import InputComponent from "./components/InputComponent";
import host from "./utils/host";
import { TitleComponent } from "./components/TitleComponent";
import { ToastContainer, toast } from "react-toastify";
import AziendeElements from "./components/AziendeElements";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const insertedNotify = () => toast("Inserito correttamente!");
  const deleteNotify = () => toast("Eliminato correttamente!");

  const [aziende, setAziende] = useState([]);
  const [selectedAzienda, setSelectedAzienda] = useState();
  const [coloreAzienda, setColoreAzienda] = useState();
  const [testoInserito, setTestoInserito] = useState("");
  const [elementoPrivato, setElementoPrivato] = useState(0);
  const [joinedAzienda, setJoinedAzienda] = useState({});
  const [visibility, setVisibility] = useState(0);

  const updateElementsHandler = () => {
    axios.get(`${host}/elementi`).then((res) => {
      console.log(`Fetch elementi in corso`);
      res.data.forEach((data) => {
        setJoinedAzienda((oldValue) => {
          let newValue = { ...oldValue };
          newValue[data.nomeAzienda].push({
            descrizione: data.descrizioneElemento,
            idElemento: data.idElemento,
            privato: data.privato,
          });
          return newValue;
        });
      });
    });
    setJoinedAzienda((oldData) => {
      let newData = { ...oldData };
      Object.keys(oldData).forEach((key) => {
        newData[key] = new Set(oldData[key]);
      });
      return newData;
    });
  };

  useEffect(() => {
    axios.get(`${host}/aziende`).then((res) => {
      setAziende(res.data);
      setSelectedAzienda(res.data[0].nomeAzienda);
      setColoreAzienda(res.data[0].colore);
      res.data.forEach((data) => {
        setJoinedAzienda((oldValue) => {
          let newValue = { ...oldValue };
          newValue[data.nomeAzienda] = [];
          return newValue;
        });
      });
    });

    updateElementsHandler();
  }, []);

  useEffect(() => console.log(joinedAzienda), [joinedAzienda]);

  const inputTextHandler = (e) => setTestoInserito(e.target.value);

  const elementAddHandler = () => {
    const postBody = {
      completato: 0,
      privato: elementoPrivato ? 1 : 0,
      idJoinAzienda: aziende.filter(
        (data) => data.nomeAzienda === selectedAzienda
      )[0].idAzienda,
      descrizioneElemento: testoInserito,
    };
    axios.post(`${host}/inserisciElemento`, postBody).then((res) => {
      if (res.status < 300 && res.status >= 200) {
        setJoinedAzienda((oldData) => {
          const newData = { ...oldData };
          newData[selectedAzienda] = [
            ...newData[selectedAzienda],
            {
              idElemento: res.data.newId,
              descrizione: testoInserito,
              privato: elementoPrivato,
            },
          ];
          return newData;
        });
        insertedNotify();
      }
    });
  };

  const deleteElementHandler = (idElemento) => {
    axios
      .post(`${host}/eliminaElemento/${idElemento}`)
      .then((res) => {
        if (res.status < 300 && res.status >= 200) {
          let newJoinedAzienda = { ...joinedAzienda };
          newJoinedAzienda[selectedAzienda] = newJoinedAzienda[
            selectedAzienda
          ].filter((data) => data.idElemento !== idElemento);
          setJoinedAzienda(newJoinedAzienda);
          deleteNotify();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(`Elemento privato: ${elementoPrivato}`);
  }, [elementoPrivato]);

  return (
    <div className="App">
      <div
        style={{
          textAlign: "right",
          cursor: "pointer",
        }}
      >
        {visibility ? (
          <Visibility onClick={() => setVisibility(0)} />
        ) : (
          <VisibilityOff onClick={() => setVisibility(1)} />
        )}
      </div>
      <InputComponent
        aziende={aziende}
        selectedAzienda={selectedAzienda}
        setSelectedAzienda={setSelectedAzienda}
        testoInserito={testoInserito}
        inputTextHandler={inputTextHandler}
        coloreAzienda={coloreAzienda}
        setColoreAzienda={setColoreAzienda}
        elementAddHandler={elementAddHandler}
        setElementoPrivato={setElementoPrivato}
        elementoPrivato={elementoPrivato}
      />
      <TitleComponent
        aziende={aziende}
        deleteElementHandler={deleteElementHandler}
        joinedAzienda={joinedAzienda}
        visibility={visibility}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
