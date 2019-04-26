const sql = require('mssql')
var webconfig = {
    user: 'adisko88',
    password: 'kavitr.12',
    server: 'MEDIPOL.mssql.somee.com',
    database: 'MEDIPOL'
};


module.exports.userLogin = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select distinct s.Id,s.SanatciAdi,s.SanatciDogumTarihi,m.MuzikTur,a.AlbumAdi,a.CikisTarihi,s.EklenmeTarihi,(case SanatciYasiyormu when 1 then 'Evet' when 0 then 'Hayır' end) as yasiyormu from Sanatci s,Album a,MuzikTur m where s.Id = a.SanatciId and m.MuzikTurId = a.MuzikTurId", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            res.render('home', { veri: verisonucu.recordset });
        });
        request1.query("insert into MuzikTur VALUES('Pop')", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
        });
    });
}
module.exports.insert = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into Sanatci(SanatciAdi,SanatciYasiyormu,SanatciDogumTarihi,EklenmeTarihi)VALUES('" + req.body.ad + "'," + req.body.hayattami + "," + req.body.dogumtarihi + ",GETDATE())", function (err, recordset) {
            if (err) {
                console.log(err);
            }
        });
        request1.query("select * from MuzikTur where MuzikTurId = " + req.body.muzikTur + "", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('album', { veri: verisonucu.recordset });
        });
    });
}
module.exports.insertAlbum = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into Album(AlbumAdi,CikisTarihi,SanatciId,MuzikTurId)VALUES('" + req.body.ad + "','" + req.body.cikistarihi + "',(select top(1)Id from Sanatci order by Id desc),(select MuzikTurId from MuzikTur where MuzikTur = '" + req.body.turAdi + "'))", function (err, recordset) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('onay');
        });
    });
}
module.exports.kayit = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from MuzikTur", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('kayit', { veri: verisonucu.recordset });
        });
    });
}
module.exports.turEkle = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from MuzikTur", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('turEkle', { veri: verisonucu.recordset });
        });
    });
}
module.exports.turGuncelle = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from MuzikTur", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('turGuncelle', { veri: verisonucu.recordset });
        });
    });
}
module.exports.turEklePost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into MuzikTur VALUES('" + req.body.turAdi + "')", function (err, tur) {
            if (err) {
                console.log(err);
            }
            request1.query("select * from MuzikTur", function (err, verisonucu) {
                if (err) {
                    console.log(err);
                }
                sql.close();
                res.render('turEkle', { veri: verisonucu.recordset });
            });
        });
    });
}
module.exports.turGuncellePost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into MuzikTur VALUES('" + req.body.turAdi + "')", function (err, tur) {
            if (err) {
                console.log(err);
            }
            request1.query("select * from MuzikTur", function (err, verisonucu) {
                if (err) {
                    console.log(err);
                }
                sql.close();
                res.render('turGuncelle', { veri: verisonucu.recordset });
            });
        });
    });
}
module.exports.sil = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete Album where SanatciId = " + req.params.id + "", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
        });
        request1.query("delete Sanatci where Id = " + req.params.id + "", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('onay');
        });
    });
}
module.exports.guncelle = function (req, res, next) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from MuzikTur", function (err, verisonucu) {
            if (err) {
                console.log(err);
                return req.next(err);
            }//req.params.id burda 

            request1.query("select distinct * from Sanatci s,Album a,MuzikTur m where s.Id = a.SanatciId and m.MuzikTurId = a.MuzikTurId and s.Id = " + req.params.id + "and AlbumId in (select top(1)AlbumId from Album a where a.SanatciId = " + req.params.id + " order by AlbumId desc)", function (err, yaz) {
                if (err) {
                    console.log(err);
                }
                sql.close();
                const id = req.params.id;
                res.render('guncelle', { tur: verisonucu.recordset, id: id, yaz: yaz.recordset });
            });

        });
    });
}
module.exports.guncellePost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("update Sanatci set SanatciAdi = '" + req.body.ad + "',SanatciDogumTarihi = " + req.body.dogumtarihi + ",SanatciYasiyormu = " + req.body.hayattami + " where Id = " + req.body.id + "", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            request1.query("update Album set AlbumAdi = '" + req.body.albumAdi + "',CikisTarihi = '" + req.body.cikisTarihi + "',MuzikTurId = " + req.body.muzikTur + " where SanatciId = " + req.body.id + "", function (err, verisonucu) {
                if (err) {
                    console.log(err);
                }
                sql.close();
                debugger
                res.render('onay');
            });
        });

    });
}


