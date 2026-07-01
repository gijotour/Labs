import React, { useEffect, useMemo, useState } from 'react';
import { railwayApi, isRailwayApiEnabled } from '../services/railwayApi';

const emptyGuide = { name: '', region: '', role: '', phone: '', memo: '' };
const emptyUser = { name: '', type: 'Customer', contact: '', request: '' };

const statusCycle = ['Active', 'Pending', 'Suspended'];

const AdminGuideUserManager = () => {
  const [tab, setTab] = useState('guides');
  const [guides, setGuides] = useState([]);
  const [users, setUsers] = useState([]);
  const [guideForm, setGuideForm] = useState(emptyGuide);
  const [userForm, setUserForm] = useState(emptyUser);

  useEffect(() => {
    if (!isRailwayApiEnabled()) return;

    railwayApi.getGuides().then(setGuides);
    railwayApi.getUsers().then(setUsers);
  }, []);

  const addGuide = async (e) => {
    e.preventDefault();
    const saved = await railwayApi.createGuide(guideForm);
    setGuides(prev => [saved, ...prev]);
    setGuideForm(emptyGuide);
  };

  const addUser = async (e) => {
    e.preventDefault();
    const saved = await railwayApi.createUser(userForm);
    setUsers(prev => [saved, ...prev]);
    setUserForm(emptyUser);
  };

  const cycleGuideStatus = async (g) => {
    const nextStatus = statusCycle[(statusCycle.indexOf(g.status) + 1) % statusCycle.length];
    const updated = await railwayApi.updateGuide(g.id, { status: nextStatus });
    setGuides(prev => prev.map(x => x.id === g.id ? updated : x));
  };

  const cycleUserStatus = async (u) => {
    const flow = ['Lead', 'Consulting', 'Booked', 'Active', 'Suspended'];
    const next = flow[(flow.indexOf(u.status) + 1) % flow.length];
    const updated = await railwayApi.updateUser(u.id, { status: next });
    setUsers(prev => prev.map(x => x.id === u.id ? updated : x));
  };

  const deleteGuide = async (id) => {
    await railwayApi.deleteGuide(id);
    setGuides(prev => prev.filter(g => g.id !== id));
  };

  const deleteUser = async (id) => {
    await railwayApi.deleteUser(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <main style={{ padding: 40, color: 'white' }}>
      <h1>관리자 (DB 연결 완료)</h1>

      <h2>가이드</h2>
      <form onSubmit={addGuide}>
        <input placeholder="이름" value={guideForm.name} onChange={e=>setGuideForm({...guideForm,name:e.target.value})}/>
        <input placeholder="지역" value={guideForm.region} onChange={e=>setGuideForm({...guideForm,region:e.target.value})}/>
        <button>추가</button>
      </form>
      {guides.map(g=> (
        <div key={g.id}>
          {g.name} ({g.status})
          <button onClick={()=>cycleGuideStatus(g)}>상태</button>
          <button onClick={()=>deleteGuide(g.id)}>삭제</button>
        </div>
      ))}

      <h2>유저</h2>
      <form onSubmit={addUser}>
        <input placeholder="이름" value={userForm.name} onChange={e=>setUserForm({...userForm,name:e.target.value})}/>
        <input placeholder="연락처" value={userForm.contact} onChange={e=>setUserForm({...userForm,contact:e.target.value})}/>
        <button>추가</button>
      </form>
      {users.map(u=> (
        <div key={u.id}>
          {u.name} ({u.status})
          <button onClick={()=>cycleUserStatus(u)}>상태</button>
          <button onClick={()=>deleteUser(u.id)}>삭제</button>
        </div>
      ))}
    </main>
  );
};

export default AdminGuideUserManager;
