import Desktop from './components/Desktop'
import MenuBar from './components/MenuBar'
import { WindowManagerProvider } from './context/WindowManager'

export default function App() {
  return (
    <WindowManagerProvider>
      <MenuBar />
      <Desktop />
    </WindowManagerProvider>
  )
}
