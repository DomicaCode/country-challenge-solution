import React from 'react'
import CountryTable from './CountryTable.jsx'
import SearchBar from './SearchBar.jsx'
import LanguageService from '../Services/LanguageService.js'

class Countries extends React.Component {

    constructor() {
        super();
        this.apiKey = "https://restcountries.eu/rest/v2";

        this.state = {
            data: [],
            regions: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this)
    }

    onInitialize() {
        fetch(`${this.apiKey}/all`)
            .then(r => r.json())
            .then(languageData => {
                this.initialData = languageData;
                this.setState({ regions: [...new Set(languageData.map(c => c.region))].filter(r => r !== null && r !== "") });

                this.setState({ data: languageData })
            });
    }


    onSubmit(formData) {
        let result = this.initialData;

        // -- Filter region --
        //This is first to reduce further load (if selected)
        if (formData.region !== null && formData.region !== 'empty') {
            result = result.filter(x => x.region === formData.region);
        }

        if (formData.popFrom && formData.popFrom !== '' && formData.popTo && formData.popTo !== '') {
            result = result.filter(x => x.population >= formData.popFrom && x.population <= formData.popTo);
        }


        // -- Filter by name, capital, languages --
        if (formData.searchType === 'name') {
            result = result.filter(x => x.name.includes(formData.searchInput))
        }
        else if (formData.searchType === 'capital') {
            result = result.filter(x => x.capital.includes(formData.searchInput))
        }
        else if (formData.searchType === 'languages') {

            //Could have done better, written quickly
            const languageResult = [];

            result.forEach(country => {
                country.languages.forEach(language => {
                    if (language.name.includes(formData.searchInput) && !languageResult.includes(c => c.name === country.name)) {
                        languageResult.push(country);
                    }
                })
            });

            this.setState({ data: languageResult });

            return;
        }

        this.setState({ data: result });

    }

    onClear() {
        this.setState({ data: this.initialData });
    }

    componentDidMount() {
        this.onInitialize();
    }

    render() {
        return (
            <React.Fragment>
                <SearchBar onSubmit={this.onSubmit} onClear={this.onClear} regions={this.state.regions} />
                <CountryTable data={this.state.data} />
            </React.Fragment>
        )
    }
}

export default Countries;