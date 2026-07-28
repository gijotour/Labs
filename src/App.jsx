import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import GijoLab from './labs/GijoLab';
import GijoResearch from './labs/GijoResearch';
import GijoTourApp from './tour-app/GijoTourApp';
import SizeControl from './shared/SizeControl';

function App() {
  const [uiScale, setUiScale] = useState(1.0);
  const location = useLocation();

  // Auth State with Persistence
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('gijo_auth') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('gijo_role') || 'designer';
  });
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('gijo_user_name') || '방문객';
  });
  const [forceBoardWrite, setForceBoardWrite] = useState(false);
  const [boardFilterAuthor, setBoardFilterAuthor] = useState(null);

  useEffect(() => {
    localStorage.setItem('gijo_auth', isLoggedIn);
    localStorage.setItem('gijo_role', userRole);
    localStorage.setItem('gijo_user_name', userName);
  }, [isLoggedIn, userRole, userName]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isLabView = location.pathname === '/' || location.pathname === '/security' || location.pathname === '/llm';
  
  return (
    <div 
      className="app-main"
      style={{ '--ui-scale': uiScale }}
    >
      {!isLabView && (
        <Navbar 
          isLoggedIn={isLoggedIn}
          userName={userName}
          userRole={userRole}
          onLogin={() => {}} 
          onLogout={() => { 
            setIsLoggedIn(false); 
            localStorage.removeItem('gijo_auth');
            localStorage.removeItem('gijo_user_name');
            setForceBoardWrite(false);
            setBoardFilterAuthor(null);
          }}
          setForceBoardWrite={setForceBoardWrite}
          setBoardFilterAuthor={setBoardFilterAuthor}
        />
      )}

      {/* 내비가 sticky라 본문에 상단 여백을 밀어줄 필요가 없다 */}
      <main>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<GijoLab />} />
          <Route path="/security" element={<GijoResearch />} />
          <Route path="/llm" element={<GijoResearch />} />

          <Route path="/gijotour/*" element={
            <GijoTourApp 
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userRole={userRole}
              setUserRole={setUserRole}
              userName={userName}
              setUserName={setUserName}
              forceBoardWrite={forceBoardWrite}
              setForceBoardWrite={setForceBoardWrite}
              boardFilterAuthor={boardFilterAuthor}
              setBoardFilterAuthor={setBoardFilterAuthor}
            />
          } />
        </Routes>
      </main>

      {!isLabView && !(location.pathname.includes('/admin') || location.pathname.includes('/designer')) && <Footer />}
      
    </div>
  );
}

export default App;
