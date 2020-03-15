import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SingIn/index';
import Delivery from '../pages/Delivery/index';
import Deliveryman from '../pages/Deliveryman/index';
import Problems from '../pages/Problems/index';
import Recipient from '../pages/Recipient/index';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" component={Delivery} isPrivate />
      <Route path="/deliverymen" component={Deliveryman} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
      <Route path="/recipient" component={Recipient} isPrivate />
    </Switch>
  );
}
