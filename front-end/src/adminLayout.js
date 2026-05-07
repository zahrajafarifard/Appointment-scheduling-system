import React from 'react'
import { Routes, Route } from 'react-router'

import ConfigDaysOfYear from './queue/admin/components/configDaysOFYear'
import AdvancedConfigDaysOfYear from './queue/admin/components/advancedConfigDaysOfYear'
import MainAdmin from './queue/admin'
import LoginAdmin from './queue/admin/loginAdmin'
import QueueList from './queue/admin/queueList'

function AdminLayout () {
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={<MainAdmin render={props => ({ ...props })} />}
        />
        <Route
          path="/login"
          element={<LoginAdmin render={props => ({ ...props })} />}
        />
        <Route
          path="/queue-list"
          element={<QueueList render={props => ({ ...props })} />}
        />
        <Route
          path="/config-days-Of-year"
          element={<ConfigDaysOfYear render={props => ({ ...props })} />}
        />
        <Route
          path="/advanced-config-days-Of-year"
          element={
            <AdvancedConfigDaysOfYear render={props => ({ ...props })} />
          }
        />
      </Routes>
    </div>
  )
}

export default AdminLayout
