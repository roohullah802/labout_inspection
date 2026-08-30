import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './auth/Sign-in'
import NotFound from './pages/notFound/NotFound'
import DashboardLayout from './layout/DashboardLayout'
import LabourDashboard from './pages/dashboard/Dashboard'
import Challan from './pages/challans/challan'
import CreateChallan from './pages/challans/CreateChallan'
import Task from './pages/newTask/Task'
import CaseDetail from './pages/caseDetail/CaseDetail'
import Companies from './pages/companies/Companies'
import CompanyDetail from './pages/companies/CompanyDetail'
import Administration from './pages/administration/Administration'
import Report from './pages/report/Report'
import Settings from './pages/settings/Settings'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to={"/admin"} />} />
        <Route path='/admin' element={<DashboardLayout />}>
          <Route index element={<LabourDashboard />} />
          <Route path='challans' element={<Challan />} />
          <Route path='challans/create' element={<CreateChallan />} />
          <Route path='new-task' element={<Task />} />
          <Route path='companies' element={<Companies />} />
          <Route path='companies/:companyId' element={<CompanyDetail />} />
          <Route path='report' element={<Report />} />
          <Route path='administration' element={<Administration />} />
          <Route path='case/:caseId' element={<CaseDetail />} />
          <Route path='settings' element={<Settings />} />
        </Route>

        <Route path='/sign-in' element={<SignIn />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
