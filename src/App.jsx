import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import GijoLab from './labs/GijoLab';
import GijoSecurity from './labs/GijoSecurity';
import GijoLocalLLM from './labs/GijoLocalLLM';
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
    console.log("GIJO-TOUR-DEBUG: Current Path is", location.pathname);
    window.scrollTo(0, 0);
    // 메뉴 닫기 및 드롭다운 초기화 유도
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

      <main style={{ paddingTop: (!isLabView && location.pathname !== '/gijotour' && location.pathname !== '/gijotour/') ? '80px' : '0' }}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<GijoLab />} />
          <Route path="/security" element={<GijoSecurity />} />
          <Route path="/llm" element={<GijoLocalLLM />} />

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
