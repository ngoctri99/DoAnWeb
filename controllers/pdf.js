const pdf = require("pdf-creator-node");
const fs = require('fs');
const pdfModule = require('../models/pdf');

module.exports = {
    pdf: async function(req, res)
    {
        var html = fs.readFileSync('views/pdf.hbs', 'utf8');

        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
            },
            "footer": {
                "height": "28mm",
                "contents": {// Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                }
            }
        };

        const decs = await pdfModule.single();

        var document = {
            html: html,
            data: {
                users: decs
            },
            //path: "../../DoAnWeb V1/DoAnWeb-backend/public/pdf/output.pdf"
            path: "filePdf/1.pdf"
        }

        pdf.create(document, options)
            .then(res => {
            console.log(res);
            //re.redirect('');
        })
            .catch(error => {
            console.error(error);
        });

        res.redirect('index');
    },
    dowload: function(req, res){
        var file = 'C:/Users/Truong/Documents/GitHub/DoAnWeb/' + '/filepdf/1.pdf';
        res.download(file);
    }
}