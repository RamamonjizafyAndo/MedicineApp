import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "90%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: "auto",
    fontSize: 10
  },
  doseCell: {
    margin: "auto",
    fontSize: 10,
    wordWrap: "break-word"
  },
  colDose: {
    width: "18%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  colPU: {
    width: "17%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  colPTotal: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  colQté: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  colNum: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  colMedicament: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
});

function CreatePdf(props) {
  const [medicament, setMedicament] = useState([]);
  const [patient, setPatient] = useState([]);
  let i = 1
  useEffect(()=>{
    setMedicament(props.medicament);
    setPatient(props.patient)
  },[])
  return (
    <Document>
      <Page size="A5" style={styles.body}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.colNum}>
              <Text style={styles.tableCell}>N°</Text>
            </View>
            <View style={styles.colMedicament}>
              <Text style={styles.tableCell}>Medicaments</Text>
            </View>
            <View style={styles.colDose}>
              <Text style={styles.tableCell}>Dose</Text>
            </View>
            <View style={styles.colPU}>
              <Text style={styles.tableCell}>P.U(Ar)</Text>
            </View>
            <View style={styles.colQté}>
              <Text style={styles.tableCell}>Qté</Text>
            </View>
            <View style={styles.colPTotal}>
              <Text style={styles.tableCell}>Total(Ar)</Text>
            </View>
          </View>
          {
            props.medicament.map((value)=>{
              <View style={styles.tableRow}>
            <View style={styles.colNum}>
              <Text style={styles.tableCell}>{i++}</Text>
            </View>
            <View style={styles.colMedicament}>
              <Text style={styles.tableCell}>{value.nomMed}</Text>
            </View>
            <View style={styles.colDose}>
              <Text style={styles.tableCell}>{value.mode}</Text>
            </View>
            <View style={styles.colPU}>
              <Text style={styles.tableCell}>{value.prixU}</Text>
            </View>
            <View style={styles.colQté}>
              <Text style={styles.tableCell}>{value.qtMed}</Text>
            </View>
            <View style={styles.colPTotal}>
              <Text style={styles.tableCell}>{value.prixMed}</Text>
            </View>
          </View>
            })
          }
          
        </View>
      </Page>
    </Document>
  )
}

export default CreatePdf;

