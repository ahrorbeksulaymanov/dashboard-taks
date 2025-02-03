import Layout from './components/layout/Layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard';
import { SidebarProvider } from './components/layout/SidebarContext';

function App() {

  return (
    <Router>
      <SidebarProvider>
        <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />
            </Routes>
        </Layout>
      </SidebarProvider>
    </Router>
  )
}

export default App
