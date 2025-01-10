import Editor from './editor'
import Navbar from './navbar'
import Toolbar from './toolbar'


export default function Home() {
  return <div className="flex flex-col h-screen gap-4">
    <div className="sticky top-0 z-50 flex flex-col gap-4">
      <Navbar />
      <Toolbar />
    </div>
    <Editor />
  </div>
}

