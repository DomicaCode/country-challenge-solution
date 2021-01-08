import React from 'react'
import AbstractTable from '../AbstractTable.jsx'
import SearchBar from './SearchBar.jsx'

class Countries extends React.Component {
  constructor () {
    super()
    this.apiKey = 'https://restcountries.eu/rest/v2'

    this.state = {
      data: [],
      regions: []
    }

    this.cells = [
      { key: 'Name', value: 'name' },
      { key: 'Capital', value: 'capital' },
      { key: 'Region', value: 'region' },
      { key: 'Population', value: 'population' },
      { key: 'Languages', value: 'displayLanguages' },
      { key: 'Timezones', value: 'displayTimezones' }
    ]

    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnClear = this.handleOnClear.bind(this)
  }

  onInitialize () {
    window.fetch(`${this.apiKey}/all`)
      .then(r => r.json())
      .then(languageData => {
        this.initialData = languageData.map((data) => {
          data.displayLanguages = data.languages.map((language) => language.name).join()
          data.displayTimezones = data.timezones.join()

          return data
        })
        this.setState(
          {
            regions: [...new Set(languageData.map(c => c.region))]
              .filter(r => r !== null && r !== '')
          })

        this.setState({ data: languageData })
      })
      .catch((err) => {
        // I added this as it states that errors should be logged,
        // normally I use a custom logger with multiple states,
        // that is configured based on the environment
        // as to what needs to be logged where
        console.error(err)
      })
  }

  handleOnSubmit (formData) {
    let result = this.initialData

    const searchInput = formData.searchInput.toLowerCase()

    // -- Filter region --
    // This is first to reduce further load (if selected)
    if (formData.region !== null && formData.region !== 'empty') {
      result = result.filter(x => x.region === formData.region)
    }

    if (formData.popFrom && formData.popFrom !== '' &&
      formData.popTo && formData.popTo !== '') {
      result = result.filter(x => x.population >= formData.popFrom &&
        x.population <= formData.popTo)
    }

    // -- Filter by name, capital, languages --
    if (formData.searchType === 'name') {
      result = result.filter(x => x.name.toLowerCase().includes(searchInput))
    } else if (formData.searchType === 'capital') {
      result = result.filter(x => x.capital.toLowerCase().includes(searchInput))
    } else if (formData.searchType === 'languages') {
      // Could have done better, written quickly
      const languageResult = []

      result.forEach(country => {
        country.languages.forEach(language => {
          if (language.name.toLowerCase().includes(searchInput) &&
           !languageResult.includes(c => c.name === country.name)) {
            languageResult.push(country)
          }
        })
      })

      this.setState({ data: languageResult })

      return
    }

    this.setState({ data: result })
  }

  handleOnClear () {
    this.setState({ data: this.initialData })
  }

  componentDidMount () {
    this.onInitialize()
  }

  render () {
    return (
      <>
        <SearchBar
          onSubmit={this.handleOnSubmit}
          onClear={this.handleOnClear}
          regions={this.state.regions}
        />
        <AbstractTable data={this.state.data} cells={this.cells} />
      </>
    )
  }
}

export default Countries
