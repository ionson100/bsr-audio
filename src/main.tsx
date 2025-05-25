import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import BsrAudio from "./audio/indexCore.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BsrAudio
       autoPlay={true}
       controls={true}
       label={'sodios di sdisdioi '}
       url={"https://dl.dropboxusercontent.com/scl/fi/r8kxyy1yyz71wbhefao64/mikhail-krug-kolshhik.mp3?rlkey=tyy8vpof7der2bxgp3x3ylc7v&amp;st=otkmjber&amp;dl=0"}/>
  </StrictMode>,
)
