const express = require('express');
//const ejs = require('ejs');
const bp = require('body-parser');

const app = express()
const port = 3000
const login = require("./loginOps")

app.set('view engine', 'ejs')
app.use(bp.urlencoded({ extended: true }));

app.get('/', login.userLogin);

app.get('/sil/:id', login.sil);
app.post('/guncelle', login.guncellePost);
app.get('/guncelle/:id', login.guncelle);

app.get('/kayit', login.kayit);
app.get('/turEkle', login.turEkle);
app.get('/turGuncelle', login.turGuncelle);
app.post('/turGuncelle', login.turGuncellePost);


app.post('/turEkle', login.turEklePost);


app.post('/kayit', login.insert);

app.post('/album', login.insertAlbum);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))