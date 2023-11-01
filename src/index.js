import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';

// style + assets
import 'alertifyjs/build/css/alertify.css';
import 'assets/scss/style.scss';
import config from './config';
import * as alertify from 'alertifyjs';
import moment from 'moment/moment';

// ==============================|| REACT DOM RENDER  ||============================== //

window.moment = moment;
const container = document.getElementById('root');
alertify.set('notifier', 'position', 'bottom-left');

const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
      <Provider store={store}>
        <BrowserRouter basename={config.basename}>
          <App />
        </BrowserRouter>
      </Provider>);

// if (isAdmin)
//   root.render(
//     <Provider store={store}>
//       <BrowserRouter basename={config.basename}>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   );
// else
//   root.render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           {routes.map((item, index) => item.children.map((itm, indx) => <Route key={index+indx} path={itm.path} element={itm.element} />))}
//           <Route path="*" element={<ErrorBoundary />} />
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
