import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import NavigationBar from './NavigationBar'
import ViewPoll from './ViewPoll'
import ViewPollResults from './ViewPollResults'
import Leaderboard from './Leaderboard'
import PrivateRoute from './PrivateRoute'
import Handle404 from './Handle404'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AddQuestion from './AddQuestion'

class App extends React.Component {
    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }
    render() {
      return (
      <Router>
        <div className="container">
        <Fragment>
            <NavigationBar />
            <Switch>
            <Route path='/login' component={Login} />
            <PrivateRoute path='/' exact component={Home} />
            <PrivateRoute path='/add' exact component={AddQuestion} />
            <PrivateRoute path='/logout' exact component={Logout} />
            <PrivateRoute path='/poll/:id' exact component={ViewPoll} />
            <PrivateRoute path='/poll/results/:id' exact component={ViewPollResults} />
            <PrivateRoute path='/leaderboard' exact component={Leaderboard} />
            <PrivateRoute component={Handle404} />
            </Switch>
          </Fragment>
        </div>

      </Router>

      )
    }
  }

  function mapStateToProps({authedUser}) {
    return {
      authedUser
    }
  }

  export default connect(mapStateToProps)(App)