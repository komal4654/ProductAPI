import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'
import ProductApp from './products/Products';
import ProductCategory from './productCategory/ProductCategory';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/productCategory/ProductCategory' component={ProductCategory} />
            <Route path='/products/Products' component={ProductApp} />
      </Layout>
    );
  }
}
