import React from 'react';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import present from '../presenters/addAccountPagePresenter'

const AddAccountPage = props => (
  <Card>
    <CardHeader title='Add Account'/>
    <CardContent>
      <TextField fullWidth={true} id="name" label="Name" value={props.account.name} onChange={props.handleChange('name')} autoFocus />
      <TextField fullWidth={true} id="balance" label="Balance" value={props.account.balance} onChange={props.handleChange('balance')} />
    </CardContent>
    <CardActions>
      <Button variant="contained" color="primary" onClick={() => props.addAccount()}>Save</Button>
    </CardActions>
  </Card>
)

export default present(AddAccountPage)
