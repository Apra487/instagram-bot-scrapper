const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
    constructor() {
        this.doc = new GoogleSpreadsheet('<Goggle sheet ID>'); // ! Plase provide google sheet id

    }
    async load() {
        // * load directly from json file if not in secure environment
        await this.doc.useServiceAccountAuth(require('./credentials.json'));
        await this.doc.loadInfo(); // * loads document properties and worksheets
    }
    async addRows(rows,option, i) {
        const sheet = this.doc.sheetsByIndex[i];
        await sheet.addRows(rows,option);
    }

    async getRows(i) {
        const sheet = this.doc.sheetsByIndex[i];
        const rows =await sheet.getRows();
        return rows;
    }
    async setHeaderRow(headerValues, i){
        const sheet = this.doc.sheetsByIndex[i];
        await sheet.setHeaderRow(headerValues);
    }


}

