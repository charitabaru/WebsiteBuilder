import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BuilderProvider } from './contexts/BuilderContext.tsx';

createRoot(document.getElementById("root")!).render(
<BuilderProvider>
  <App />
</BuilderProvider>
);
