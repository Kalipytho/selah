import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Hero from './sections/Hero'
import Story from './sections/Story'
import Menu from './sections/Menu'
import Gallery from './sections/Gallery'
import Experience from './sections/Experience'
import Contact from './sections/Contact'

import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminGallery from './admin/pages/AdminGallery'
import AdminMenu from './admin/pages/AdminMenu'
import AdminMessages from './admin/pages/AdminMessages'
import AdminSettings from './admin/pages/AdminSettings'

function PublicWebsite() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="relative z-0">
        <Hero />
        <Story />
        <Menu />
        <Gallery />
        <Experience />
        <Contact />
      </main>

      <footer className="relative z-0 bg-[#2c211b] px-5 py-10 text-[#f5efe6]">
        <div className="container-selah flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-2xl">
              Selah<span className="text-[#a65d3b]">.</span>
            </p>

            <p className="mt-1 text-xs text-white/35">
              Coffee, connection & slow moments.
            </p>
          </div>

          <p className="text-xs text-white/30">
            © 2026 Selah Coffee House. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ADMIN */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/gallery"
          element={<AdminGallery />}
        />

        <Route
          path="/admin/menu"
          element={<AdminMenu />}
        />

        <Route
          path="/admin/messages"
          element={<AdminMessages />}
        />

        <Route
          path="/admin/settings"
          element={<AdminSettings />}
        />

        {/* PUBLIC WEBSITE */}
        <Route
          path="*"
          element={<PublicWebsite />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App