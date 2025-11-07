/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogTitle,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  TableContainer,
  Paper
} from "@mui/material";
import SmallButton from "../Elements/SmallButton";
import System from "../../Helpers/System";
import TecladoPrecio from "../Teclados/TecladoPrecio";
import TecladoAlfaNumerico from "../Teclados/TecladoAlfaNumerico";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ProveedorDocumento from "../../Models/ProveedorDocumento";
import TiposDocumentoProveedor from "../../definitions/TiposDocumentoProveedor";
import SmallDangerButton from "../Elements/SmallDangerButton";
import { SelectedOptionsContext } from "../Context/SelectedOptionsProvider";


const SeleccionaBorradorDocProv = ({
  openDialog,
  setOpenDialog,
  onSelect
}) => {


  const {
    showMessage,
    showLoading,
    hideLoading,
    showConfirm
  } = useContext(SelectedOptionsContext);


  const [borradores, setBorradores] = useState([])

  const eliminar = (borrador) => {
    showConfirm("Eliminar " + borrador.nroFolio + "?", () => {
      console.log("eliminando", borrador)
      ProveedorDocumento.eliminarBorrador(borrador.nroFolio)
      setBorradores(ProveedorDocumento.getBorradores())
    })
  }

  const prods = (borrador) => {
    var txt = "";
    borrador.productos.forEach((prod) => {
      if (txt != "") txt += ", "
      txt += prod.nombre
    })

    return txt
  }

  useEffect(() => {
    if (openDialog) {
      // System.intentarFoco(textInfoRef)
      setBorradores(ProveedorDocumento.getBorradores())
    }
  }, [openDialog])

  return (
    <Dialog open={openDialog} onClose={() => {
      setOpenDialog(false)
    }} maxWidth="lg" fullWidth>
      <DialogTitle>
        Seleccionar documento borrador
      </DialogTitle>
      <DialogContent>

        <Grid container item xs={12} md={12} lg={12}>
          <Grid item xs={12} sm={12} md={12} lg={12}>


            <TableContainer
              component={Paper}
              style={{ overflowX: "auto", marginBottom: 10 }}
            >
              <Table>
                <TableHead sx={{
                  backgroundColor: "#a1a1a1ff",
                }}>
                  <TableCell sx={{ width: "33%" }}>
                    Tipo documento
                  </TableCell>
                  <TableCell sx={{ width: "33%" }}>
                    Folio
                  </TableCell>
                  <TableCell sx={{ width: "33%" }}>
                    Proveedor
                  </TableCell>
                  <TableCell sx={{ width: "33%" }}>
                    Fecha
                  </TableCell>
                  <TableCell sx={{ width: "33%" }}>
                    Productos
                  </TableCell>
                  <TableCell sx={{ width: "33%" }}>
                    &nbsp;
                  </TableCell>
                </TableHead>
                <TableBody>
                  {borradores.map((borrador, ix) => (
                    <TableRow key={ix} sx={{
                      backgroundColor: ((ix + 1) % 2 == 0 ? "#f2f2f2ff" : "#ffffffff")
                    }}>
                      <TableCell sx={{ width: "33%" }}>
                        {TiposDocumentoProveedor[borrador.tipoDoc]}
                      </TableCell>
                      <TableCell sx={{ width: "33%" }}>
                        {borrador.nroFolio}
                      </TableCell>
                      <TableCell sx={{ width: "33%" }}>
                        {`${borrador.proveedor.razonSocial} ${borrador.proveedor.rut}`}
                      </TableCell>
                      <TableCell sx={{ width: "33%" }}>
                        {System.formatDateServer(borrador.fechaIngreso, false)}
                      </TableCell>
                      <TableCell sx={{ width: "33%" }}>
                        {prods(borrador)}
                      </TableCell>
                      <TableCell sx={{ width: "33%" }}>
                        <SmallButton actionButton={() => {
                          onSelect(borrador)
                          setOpenDialog(false)
                        }} textButton={"Seleccionar"} />
                        <SmallDangerButton actionButton={() => {
                          eliminar(borrador)
                        }} textButton={"Eliminar"} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          setOpenDialog(false)
        }}>Volver</Button>
      </DialogActions>
    </Dialog >
  );
};

export default SeleccionaBorradorDocProv;
