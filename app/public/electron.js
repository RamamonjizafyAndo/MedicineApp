const electron = require("electron");
const path = require("path");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3').verbose();


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
  let db = new sqlite3.Database('./mylocaldb.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });

  db.serialize(() => {
    db.exec('PRAGMA foreign_keys = ON;');
    db.run(`CREATE TABLE IF NOT EXISTS Patients (
      idPtn INTEGER PRIMARY KEY AUTOINCREMENT,
      namePtn TEXT NOT NULL,
      agePtn INTEGER NOT NULL,
      sexePtn TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS BilanPatients(
      idBln INTEGER PRIMARY KEY AUTOINCREMENT,
      maladie TEXT NOT NULL,
      idPtn INTEGER NOT NULL,
      FOREIGN KEY (idPtn) REFERENCES Patients (idPtn) ON DELETE SET NULL ON UPDATE CASCADE 
    )`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS Medicaments(
      idMed INTEGER PRIMARY KEY AUTOINCREMENT,
      nomMed TEXT NOT NULL,
      qtMed INTEGER NOT NULL,
      prixMed REAL NOT NULL
    )`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS Ordonnances(
      idOrd INTEGER PRIMARY KEY AUTOINCREMENT,
      prix INTEGER,
      idPtn INTEGER NOT NULL,
      FOREIGN KEY (idPtn) REFERENCES Patients(idPtn) ON DELETE SET NULL ON UPDATE CASCADE 
    )`, (err) => {
      if (err) {
        console.log(err);
      }
    });
//Table of medicament in the Ordonnance
    db.run(`CREATE TABLE IF NOT EXISTS Articles(
      idArt INTEGER PRIMARY KEY AUTOINCREMENT,
      idOrd INTEGER NOT NULL,
      idMed INTEGER NOT NULL,
      FOREIGN KEY (idOrd) REFERENCES Ordonnances(idOrd) ON DELETE SET NULL ON UPDATE CASCADE,
      FOREIGN KEY (idMed) REFERENCES Medicaments(idMed) ON DELETE SET NULL ON UPDATE CASCADE 
    )`, (err) => {
      if (err) {
        console.log(err);
      }
    })
  });

  ipcMain.on('insert-data', async (event, data) => {
    await db.run(`INSERT INTO Patients (namePtn, agePtn, sexePtn) VALUES (?, ?, ?)`, [data.value1, data.value2, data.value3], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      
    });
  });

  ipcMain.on('select-data', async (event, query) => {
    await db.all(query, [], (err, rows) => {
      if (err) {
        throw err;
      }
      event.reply('select-data-reply', rows);
      console.log(rows);
    });
  });

  app.on('will-quit', () => {
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);