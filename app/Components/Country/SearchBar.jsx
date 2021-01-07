import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

export default class SearchBar extends React.Component {

    constructor() {
        super();

        this.classes = this.useStyles();

        this.state = {
            searchInput: '',
            searchType: 'name',
            region: 'empty',
            popFrom: '',
            popTo: '',
        }
    }

    // --- HANDLERS ---
    searchInputChangeHandler(event) {
        this.setState({ searchInput: event.target.value });
    }

    checkboxChangeHandler(event) {
        this.setState({ searchType: event.target.value });
    }

    regionChangeHandler(event) {
        this.setState({ region: event.target.value });
    }

    populationFromChangeHandler(event) {
        this.setState({ popFrom: event.target.value })
    }

    populationToChangeHandler(event) {
        this.setState({ popTo: event.target.value })
    }


    // --- FORM ACTIONS ---
    onSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.state);
    }

    onClear() {
        this.setState({
            searchInput: '',
            searchType: 'name',
            region: 'empty',
            popFrom: '',
            popTo: '',
        })

        this.props.onClear();
    }

    useStyles() {
        return makeStyles((theme) => ({
            root: {
                '& > *': {
                    margin: theme.spacing(1),
                    width: '25ch',
                },
            },
        }))
    }

    render() {
        return (
            <form className={this.classes.root} autoComplete="off" noValidate onSubmit={event => this.onSubmit(event)}>
                <div style={{ display: "flex" }}>

                    <div style={{ flex: "1" }}>
                        <TextField style={{marginRight:"10%", marginTop:"5%"}} label="Search" value={this.state.searchInput} onChange={event => this.searchInputChangeHandler(event)} />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Search type</FormLabel>
                            <RadioGroup aria-label="searchType" name="searchType1" value={this.state.searchType} onChange={event => this.checkboxChangeHandler(event)}>
                                <FormControlLabel value="name" control={<Radio />} label="Name" />
                                <FormControlLabel value="capital" control={<Radio />} label="Capital" />
                                <FormControlLabel value="languages" control={<Radio />} label="Languages" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div style={{ flex: "2" }}>
                        {this.props.regions && <React.Fragment>
                            <InputLabel id="demo-simple-select-label">Region</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.region}
                                onChange={event => this.regionChangeHandler(event)}
                            >
                                <MenuItem value="empty">All</MenuItem>
                                {this.props.regions.map((region) => {
                                    return (
                                        <MenuItem key={region} value={region}>{region}</MenuItem>
                                    )
                                })}

                            </Select>
                        </React.Fragment>}
                        <div>
                            <div>
                                <TextField type="number" label="Population from" value={this.state.popFrom} onChange={event => this.populationFromChangeHandler(event)} />
                            </div>
                            <div>
                                <TextField type="number" label="Population to" value={this.state.popTo} onChange={event => this.populationToChangeHandler(event)} />
                            </div>
                        </div>
                    </div>

                    <div style={{marginTop:"5%"}}>
                        <Button variant="contained" type="submit" >Submit</Button>
                        <Button variant="contained" type="button" onClick={() => this.onClear()} >Clear</Button>
                    </div>
                </div>
            </form>
        )
    }
}