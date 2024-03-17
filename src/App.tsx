import * as React from 'react'
import { AppRoot, SplitLayout, PanelHeader, usePlatform } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import CatFact from './shared/components/CatFact'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import GetAge from './shared/components/GetAge'
import HomePage from './shared/components/HomePage'

const App = () => {
  const platform = usePlatform()

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}
      >
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cat-fact" element={<CatFact />} />
            <Route path="/get-age" element={<GetAge />} />
          </Routes>
        </Router>
      </SplitLayout>
    </AppRoot>
  )
}

export default App
