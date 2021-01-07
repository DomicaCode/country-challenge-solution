export default class LanguageService {

    constructor() {
        this.apiKey = "https://restcountries.eu/rest/v2";
    }

    getAllLanguages() {

        let languageData = null;

        fetch(`${this.apiKey}/all`)
            .then(r => r.json())
            .then(data => {
                languageData = data;
            });

        return languageData;
    }

}