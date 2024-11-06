import * as React from 'react';
import AppContext from '../../../AppContext';
import { Provider } from 'react-redux';
import store from '../../../store';
import styles from './App.module.scss';
import './App.css';
import type { IGsitsProps } from './IGsitsProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { NavLink, HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Spinner } from '@fluentui/react';
import Requisition from './Requisition';
import RFQ from './RFQ';
import PageNotFound from './PageNotFound';
import UDUser from './UDUser';

export default class Gsits extends React.Component<IGsitsProps> {
  public render(): React.ReactElement<IGsitsProps> {
    const {
      hasTeamsContext,
      context
    } = this.props;

    return (
      <AppContext.Provider value={{ context }}>
        <Provider store={store}>
          <Router>
            <section className={`${styles.gsits} ${hasTeamsContext ? styles.teams : ''}`}>
              <nav>
                <ul>
                  <li><NavLink to="/requisition" className={({ isActive }) => isActive ? styles.active : ''}>Requisition</NavLink></li>
                  <li><NavLink to="/rfq" className={({ isActive }) => isActive ? styles.active : ''}>RFQ</NavLink></li>
                  <li><NavLink to="/quotation" className={({ isActive }) => isActive ? styles.active : ''}>Part Quotation</NavLink></li>
                  <li><NavLink to="/changeprice" className={({ isActive }) => isActive ? styles.active : ''}>Change Price</NavLink></li>
                  <li><NavLink to="/role" className={({ isActive }) => isActive ? styles.active : ''}>UD User</NavLink></li>
                </ul>
              </nav>
              <React.Suspense fallback={<Spinner label='Loading...' />} >
                <Routes>
                  <Route path='/requisition' element={<Requisition />} />
                  <Route path='/rfq' element={<RFQ />} />
                  <Route path='*' element={<PageNotFound />} />
                  <Route path='/' element={<Navigate to="/requisition" />} />
                  <Route path='/role' element={<UDUser />} />
                </Routes>
              </React.Suspense>
            </section>
          </Router>
        </Provider>
      </AppContext.Provider>
    );
  }
}
