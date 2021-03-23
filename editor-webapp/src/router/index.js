import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Index from '../views/index';
import Login from '../views/login';
import Workspace from '../views/workpace';

export default function MyRouter() {

    return (
        <Router>
            <table>
                <thead>
                    <tr>
                        <th>
                            <Link to="/">Home</Link>
                        </th>
                        <th>
                            <Link to="/login">Login</Link>
                        </th>
                    </tr>
                </thead>
            </table>
            <Switch>
                <Route exact path='/' component={Index}>
                </Route>
                <Route path='/login' component={Login}>
                </Route>
                <Route path='/workplace' component={Workspace}>
                </Route>
            </Switch>
        </Router>
    )
}