import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class CountryTable extends React.Component {

    constructor(props) {
        super(props);

        this.classes = this.useStyles();
        this.state = {
            isLoading: true
        };
    }

    componentDidUpdate() {
        if (this.props.data && this.props.data.length !== 0 && this.state.isLoading) {
            this.setState({ isLoading: false })
        }
    }


    useStyles() {
        return makeStyles({
            table: {
                minWidth: 650,
            },
        })
    };

    render() {
        return (
            <React.Fragment>
                {!this.state.isLoading ? <TableContainer component={Paper} >
                    <Table className={this.classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Capital</TableCell>
                                <TableCell align="right">Region</TableCell>
                                <TableCell align="right">Population</TableCell>
                                <TableCell align="right">Languages</TableCell>
                                <TableCell align="right">Timezones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.data.map((country) => {
                                const languages = country.languages.map((language) => language.name);
                                const languagesRow = languages.join();

                                const timezonesRow = country.timezones.join();

                                return (
                                    <TableRow key={country.name}>
                                        <TableCell component="th" scope="row">{country.name}</TableCell>
                                        <TableCell align="right">{country.capital}</TableCell>
                                        <TableCell align="right">{country.region}</TableCell>
                                        <TableCell align="right">{country.population}</TableCell>
                                        <TableCell align="right">{languagesRow}</TableCell>
                                        <TableCell align="right">{timezonesRow}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer> :
                    <div>
                        Loading...
                    </div>
                }
            </React.Fragment>
        );
    }
}
