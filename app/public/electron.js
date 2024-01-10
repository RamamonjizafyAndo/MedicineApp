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
    width: 800,
    height: 600,
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
      idPtn INTEGER NOT NULL,
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
      idPtn INTEGER NOT NULL,
      FOREIGN KEY (idPtn) REFERENCES Patients(idPtn) ON DELETE SET NULL ON UPDATE CASCADE 
    )`)
    createOrdTable.run();

    //Table of medicament in the Ordonnance
    const createArtiTable = db.prepare(`CREATE TABLE IF NOT EXISTS Articles(
  idArt INTEGER PRIMARY KEY AUTOINCREMENT,
  idOrd INTEGER NOT NULL,
  idMed INTEGER NOT NULL,
  FOREIGN KEY (idOrd) REFERENCES Ordonnances(idOrd) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (idMed) REFERENCES Medicaments(idMed) ON DELETE SET NULL ON UPDATE CASCADE 
)`);
    createArtiTable.run();
    ipcMain.on('insert-patient', async (event, data) => {
      const insert = db.prepare(`INSERT INTO Patients (namePtn, agePtn, sexePtn) VALUES (?, ?, ?)`);
      insert.run(data.value1, data.value2, data.value3);
    });
  
    ipcMain.on('select-data', (event, query) => {
      const select = db.prepare(query);
      const rows = select.all();
      event.reply('select-data-reply', rows);
      console.log(rows);
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