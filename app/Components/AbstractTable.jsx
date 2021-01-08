import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export default class AbstractTable extends React.Component {
  constructor (props) {
    super(props)

    this.classes = this.useStyles()
    this.state = {
      isLoading: true
    }
  }

  componentDidUpdate () {
    if (this.props.data &&
      this.props.data.length !== 0 &&
      this.state.isLoading) {
      this.setState({ isLoading: false })
    }
  }

  useStyles () {
    return makeStyles({
      table: {
        minWidth: 650
      }
    })
  };

  renderBody () {
    if (!this.state.isLoading) {
      return (
        <TableContainer component={Paper}>
          <Table className={this.classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                {this.props.cells.map((cell, idx) => {
                  return (
                    <TableCell key={idx}>{cell.key}</TableCell>
                  )
                })}

              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.data.map((item, idx) => {
                return (
                  <TableRow key={idx}>
                    {this.props.cells.map((cell, idx) => {
                      return (
                        <TableCell key={idx}>{item[cell.value]}</TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )
    } else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  }

  render () {
    return (
      this.renderBody()
    )
  }
}
