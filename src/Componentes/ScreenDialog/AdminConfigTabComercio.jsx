/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  TextField
} from "@mui/material";

import ModelConfig from "../../Models/ModelConfig";
import TabPanel from "../Elements/TabPanel";
import { SelectedOptionsContext } from "../Context/SelectedOptionsProvider";
import SmallButton from "../Elements/SmallButton";


const AdminConfigTabComercio = ({
  tabNumber,
  setSomeChange
}) => {

  const {
    showMessage,
    showLoading,
    hideLoading
  } = useContext(SelectedOptionsContext);

  const GRUPO = "ImpresionTicket"
  const TAB_INDEX = 1


  var states = {
    Nom_RazonSocial: useState(""),
    Nro_Rut: useState(""),
    Nom_Direccion: useState(""),
    Nom_Giro: useState("")
  };

  const [props, setProps] = useState([]);

  const changeState = (name, value) => {
    setSomeChange(true)
    states[name][1](value)
  }

  const loadInitialValues = (info) => {
    info.configuracion.forEach((propConfig) => {
      if( states[propConfig.entrada] != undefined ){
        states[propConfig.entrada][1](propConfig.valor)
      }
    })
  }

  const loadInitial = () => {
    showLoading("Buscando la informacion")
    ModelConfig.getAllComercio((info) => {
      loadInitialValues(info)
      hideLoading()
    }, (err) => {
      showMessage(err)
      hideLoading()
    })
  }

  const confirmSave = () => {
    const data = [
    ]

    props.forEach((propName) => {
      const newItem = {}
      newItem.grupo = GRUPO
      newItem.entrada = propName
      newItem.valor = states[propName][0]
      data.push(newItem)
    })

    showLoading("actualizando datos del comercio")
    ModelConfig.updateComercio(data, (info) => {
      hideLoading()
      showMessage("Realizado correctamente")
      setSomeChange(false)
    }, (err) => {
      hideLoading()
      showMessage(err)
    })
  }


  // OBSERVERS

  useEffect(() => {
    if (tabNumber != TAB_INDEX) return
    loadInitial();

    setProps(Object.keys(states))

  }, [tabNumber]);


  return (
    <TabPanel value={tabNumber} index={TAB_INDEX}>

      <Grid item xs={12} lg={12}>
        <Grid container spacing={2}>


          {props.map((name, ix) => (
            <TextField
              key={ix}
              margin="normal"
              fullWidth
              label={name}
              type="text" // Cambia dinámicamente el tipo del campo de contraseña
              value={states[name][0]}
              onChange={(e) => changeState(name, e.target.value)}
            />
          ))}

          <SmallButton textButton="Guardar" actionButton={confirmSave} />
        </Grid>
      </Grid>

    </TabPanel>
  );
};

export default AdminConfigTabComercio;
