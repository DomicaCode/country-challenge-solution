import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default class SearchBar extends React.Component {

    constructor() {
        super();

        this.classes = this.useStyles();

        this.state = {
            searchInput: '',
            searchType: 'name',
        }
    }

    inputChangeHandler(event) {
        this.setState({ searchInput: event.target.value });
    }

    checkboxChangeHandler(event) {
        this.setState({ searchType: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.state);
    }

    onClear() {
        this.setState({
            searchInput: '',
            searchType: 'name',
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
                <TextField label="Search" value={this.state.searchInput} onChange={event => this.inputChangeHandler(event)} />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Search type</FormLabel>
                    <RadioGroup aria-label="searchType" name="searchType1" value={this.state.searchType} onChange={event => this.checkboxChangeHandler(event)}>
                        <FormControlLabel value="name" control={<Radio />} label="Name" />
                        <FormControlLabel value="capital" control={<Radio />} label="Capital" />
                        <FormControlLabel value="languages" control={<Radio />} label="Languages" />
                    </RadioGroup>
                </FormControl>
                <Button variant="contained" type="submit" >Submit</Button>
                <Button variant="contained" type="button" onClick={() => this.onClear()} >Clear</Button>
            </form>
        )
    }
}