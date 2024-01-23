import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from '../../assets/logo.jpg'
const styles = StyleSheet.create({
  doc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
  },
  textBlock: {
    marginLeft: 10,
    fontSize: 11,
  },
  onHead:{
    textAlign: 'center',
    fontSize: 12
  },
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
    fontSize: 11,
    overflow:'hidden'
  },
  doseCell: {
    margin: "auto",
    fontSize: 11,
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
  let i = 1;
  return (
    <Document>
      <Page size="A5" style={styles.body}>
        <View style={styles.onHead}>
          <Text>CENTRE MEDICAL</Text>
          <Text>AKANY RASALAMA</Text>
          <Text>Consultation-Accouchement/CPN-Ophtalmologie-Echographie</Text>
          <Text>Lot V W 54 Ambohipotsy</Text>
          <Text>Tel: 0343231787</Text>
          <Text>Email: akanyrasalama.com@gmail.com</Text>
        </View>
        <View style={styles.doc}>
          <Image src={Logo} style={styles.image} />
          <View style={styles.textBlock}>
            <Text>Dr Christian RAKOTOBE</Text>
            <Text>Médecin Diplômé d'État</Text>
            <Text>ONM: 04.11.21.31.410.02638</Text>
          </View>
        </View>
        <View style={styles.onHead}>
          <Text>{props.date}</Text>
        </View>
        <View style={{marginLeft:'60px', fontSize:'11'}}>
          <Text>
            Nom et prénoms: {props.patient.namePtn}
          </Text>
          <Text>
            Age: {props.patient.agePtn}
          </Text>
          <Text>
            Sexe: {props.patient.sexePtn}
          </Text>
          <Text>
            Maladie: {props.patient.maladie}
          </Text>
          <Text>
            TA: {props.patient.tension}           Température: {props.patient.temperature}<View style={{width:'30px'}} />          Poids: {props.patient.poids}<View style={{width:'30px'}} />          Oxygène: {props.patient.temperature}
          </Text>
        </View>
        <View style={{marginTop:'15px', marginBottom:'15px', fontSize:'12px', textAlign:'center'}}>
          <Text>ORDONNANCE MÉDICALE</Text>
        </View>
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
            props.medicament.map((value) => {
              return (
                <View key={value.idMed} style={styles.tableRow}>
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
              )
            })
          }
          
        </View>
        <View style={{marginLeft:'60px', marginTop:'15px',fontSize:'11'}}>
            <Text>
              Consultation: {props.consultation} Ar
            </Text>
            <Text>
              Prix total: {props.prixTotal} Ar
            </Text>
          </View>
      </Page>
    </Document>
  )
}

export default CreatePdf;

