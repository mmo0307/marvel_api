import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {MainPage, ComicsPage, Page404 } from '../pages';
import SingleComicPage from '../pages/SingleComicPage/SingleComicPage'
import SingleCharPage from '../pages/SingleCharPage/SingleCharPage'
import AppHeader from "../appHeader/AppHeader";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage />} />
                        <Route path="/characters/:charId" element={<SingleCharPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
} 

export default App;