import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import 'bootstrap-icons/font/bootstrap-icons.css';



//Import statement for './index.scss
import './index.scss';

// Main component 
const MyFlixApplication = () => {
    return <MainView />;
  };
  
  // Finds the root of app
  const container = document.querySelector('#root');
  const root = createRoot(container);
  
  // Tells React to render app in the root DOM element
  root.render( <MyFlixApplication/> );