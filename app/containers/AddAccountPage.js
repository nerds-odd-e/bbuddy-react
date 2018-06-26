import React from 'react';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import present from '../presenters/addAccountPagePresenter'


@present
export default class AddAccountPage extends React.Component {
  state= {
    name: "",
    balance: 0
  }
  save(){
    this.props.addAccount(this.state)
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }
  render() {
    return (
      <Card>
        <CardHeader title='Add Account'/>
        <CardContent>
          <TextField fullWidth={true} id="name" label="Name" value={this.state.name} onChange={this.handleChange('name')} autoFocus />
          <TextField fullWidth={true} id="balance" label="Balance" value={this.state.balance} onChange={this.handleChange('balance')} />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={() => this.save()}>Save</Button>
        </CardActions>
      </Card>
    )
  }
}
