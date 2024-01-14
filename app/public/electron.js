const electron = require("electron");
const path = require("path");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { ipcMain } = require('electron');
const Database = require('better-sqlite3');


let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  // and load the index.html of the app.
  console.log(__dirname);
  mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  try {
    let db = new Database('./mylocaldb.db', { verbose: console.log });
    const createPatientsTable = db.prepare(`CREATE TABLE IF NOT EXISTS Patients (
      idPtn INTEGER PRIMARY KEY AUTOINCREMENT,
      namePtn TEXT NOT NULL,
      agePtn INTEGER NOT NULL,
      sexePtn TEXT NOT NULL
    )`);
    createPatientsTable.run();

    const createBilanTable = db.prepare(`CREATE TABLE IF NOT EXISTS BilanPatients(
      idBln INTEGER PRIMARY KEY AUTOINCREMENT,
      maladie TEXT NOT NULL,
      temperature NUMBER NOT NULL,
      poids NUMBER NOT NULL,
      tension TEXT NOT NULL,
      oxygene TEXT NOT NULL,
      idPtn INTEGER NOT NULL,
      idOrd INTEGER NOT NULL,
      FOREIGN KEY (idOrd) REFERENCES Ordonnances (idOrd) ON DELETE SET NULL ON UPDATE CASCADE,
      FOREIGN KEY (idPtn) REFERENCES Patients (idPtn) ON DELETE SET NULL ON UPDATE CASCADE 
    )`);

    createBilanTable.run();

    const createMedicTable = db.prepare(`CREATE TABLE IF NOT EXISTS Medicaments(
      idMed INTEGER PRIMARY KEY AUTOINCREMENT,
      nomMed TEXT NOT NULL,
      qtMed INTEGER NOT NULL,
      prixMed REAL NOT NULL
    )`);
    createMedicTable.run();

    const createOrdTable = db.prepare(`CREATE TABLE IF NOT EXISTS Ordonnances(
      idOrd INTEGER PRIMARY KEY AUTOINCREMENT,
      prix INTEGER,
      date DATE,
      idPtn INTEGER NOT NULL,
      FOREIGN KEY (idPtn) REFERENCES Patients(idPtn) ON DELETE SET NULL ON UPDATE CASCADE 
    )`)
    createOrdTable.run();

    //Table of medicament in the Ordonnance
    const createArtiTable = db.prepare(`CREATE TABLE IF NOT EXISTS Articles(
  idArt INTEGER PRIMARY KEY AUTOINCREMENT,
  idOrd INTEGER NOT NULL,
  idMed INTEGER NOT NULL,
  qtMed INTEGER NOT NULL,
  FOREIGN KEY (idOrd) REFERENCES Ordonnances(idOrd) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (idMed) REFERENCES Medicaments(idMed) ON DELETE SET NULL ON UPDATE CASCADE 
)`);
    createArtiTable.run();

    ipcMain.on('insert-patient', async (event, data) => {
      const insertPat = db.prepare(`INSERT INTO Patients (namePtn, agePtn, sexePtn) VALUES (?, ?, ?)`);
      insertPat.run(data.value1, data.value2, data.value3);
    });

    ipcMain.on('modif-patient', async (event, data) => {
      const modifPat = db.prepare(`UPDATE Patients SET namePtn = ?, agePtn = ?, sexePtn = ? WHERE idPtn = ?`);
      modifPat.run(data.value1, data.value2, data.value3, data.value4);
    });

    ipcMain.on('delete-patient', async (event, data) => {
      const delPat = db.prepare(`DELETE FROM Patients WHERE idPtn = ?`);
      delPat.run(data.value1);
    });

    ipcMain.on('delete-medicament', async (event, data) => {
      const delPat = db.prepare(`DELETE FROM Medicaments WHERE idMed = ?`);
      delPat.run(data.value1);
    });

    ipcMain.on('insert-medicament', async (event, data) => {
      const insertMed = db.prepare(`INSERT INTO Medicaments (nomMed, qtMed, prixMed) VALUES (?, ?, ?)`);
      insertMed.run(data.value1, data.value2, data.value3);
    });

    ipcMain.on('select-data', (event, query, params) => {
      try {
          const select = db.prepare(query);
          let rows;
          console.log(params);
          if(params){
            rows = select.all(params);
          }else{
            rows = select.all();
          }
           // Utilisez les paramètres ici
          event.reply('select-data-reply', rows);
      } catch (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          event.reply('select-data-reply', { error: error.message });
      }
  });
  

    function searchData(table, data) {
      // Construct the base query
      let query = `SELECT * FROM ${table}`;
      const conditions = [];

      // Append conditions based on function arguments
      data.forEach(value => {
        if (typeof value.value === "number") {
          conditions.push(`${value.column} = ${value.value}`);
        } else if (typeof value.value === "string") {
          conditions.push(`LOWER(${value.column}) LIKE '%${value.value.toLowerCase()}%'`);
        } else {
          conditions.push(`${value.column} = ${value.value}`);
        }
      });

      // Add WHERE clause if there are conditions
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' OR ');
      }

      // Execute the query
      const stmt = db.prepare(query);
      return stmt.all();
    }


    ipcMain.on('searchData', async (event, table, data) => {
      try {
        const results = searchData(table, data);
        event.reply('searchDataResponse', results);
        console.log(results);
      } catch (error) {
        console.error('Error in searchData:', error);
        event.reply('searchDataResponse', []);
      }
    });

    app.on('will-quit', () => {
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Closed the database connection.');
      });
    });
  } catch (err) {
    console.log(err);
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);