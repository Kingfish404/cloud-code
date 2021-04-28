import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import Intro from '../views/intro'
import Index from '../views/index';
import Login from '../views/login';
import Workspace from '../views/workpace';

export default function MyRouter() {

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Intro}>
                </Route>
                <Route exact path='/index' component={Index}>
                </Route>
                <Route path='/login' component={Login}>
                </Route>
                <Route path='/workplace' component={Workspace}>
                </Route>
                <Route>
                    <Redirect to="/"></Redirect>
                </Route>
            </Switch>
        </Router>
    )
}