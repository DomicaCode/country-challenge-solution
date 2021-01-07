import React from 'react'
import LanguageTable from './LanguageTable.jsx'
import LanguageService from '../Services/LanguageService.js'

class Languages extends React.Component {

    constructor() {
        super();
        this.apiKey = "https://restcountries.eu/rest/v2";

        this.state = {
            data : []
        };
    }

    getAllLanguages() {

        fetch(`${this.apiKey}/all`)
            .then(r => r.json())
            .then(languageData => {
                this.setState({data: languageData})
            });
    }

    componentDidMount(){
        this.getAllLanguages();
    }

    render() {
        return (
            <LanguageTable data={this.state.data} />
        )
    }
}

export default Languages;