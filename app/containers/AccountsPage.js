import React from 'react';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import present from '../presenters/accountsPagePresenter'

const AccountsPage = props => (
  <Card>
    <CardHeader title='Accounts'/>
    <CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell tooltip="Name">Name</TableCell>
            <TableCell numeric>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.accounts.map((account, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{account.name}</TableCell>
              <TableCell numeric>{account.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
    <CardActions>
      <Button variant="contained" color="primary" onClick={props.goToAddAccount}>Add</Button>
    </CardActions>
  </Card>
)

export default present(AccountsPage)
