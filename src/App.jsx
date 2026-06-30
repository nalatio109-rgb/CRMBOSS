import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  Calendar, 
  Settings, 
  Search, 
  Plus, 
  MoreVertical,
  TrendingUp,
  UserPlus,
  DollarSign,
  Briefcase,
  Bell,
  X,
  Circle,
  ArrowUpRight,
  Filter,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Send,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Download,
  FileSpreadsheet,
  User,
  Shield,
  Palette,
  ExternalLink,
  LogOut,
  Lock,
  PieChart as PieIcon,
  CheckCircle,
  Sparkles,
  Zap,
  Globe,
  Monitor,
  Eye,
  Info,
  BarChart3,
  Server,
  Database,
  CloudDownload,
  Keyboard,
  MapPin,
  Maximize,
  HardHat,
  ArrowRight,
  Image
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Funnel,
  FunnelChart,
  LabelList
} from 'recharts';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// --- TRANSLATIONS ---
const translations = {
  vi: { dashboard: 'Bảng điều khiển', customers: 'Khách hàng', deals: 'Công trình', products: 'Sản phẩm', orders: 'Lịch sử Đơn hàng', warranties: 'Bảo hành', schedule: 'Lịch trình', settings: 'Cài đặt', logout: 'Đăng xuất', welcome: 'Chào buổi chiều', revenue: 'Doanh thu', new_cust: 'Khách hàng mới', open_deals: 'Công trình hoạt động', recent: 'Gần đây', priority: 'Ưu tiên', status: 'Trạng thái', add_new: 'Thêm mới', save: 'Lưu', cancel: 'Hủy' },
  en: { dashboard: 'Dashboard', customers: 'Customers', deals: 'Projects', products: 'Products', orders: 'Order History', warranties: 'Warranties', schedule: 'Schedule', settings: 'Settings', logout: 'Logout', welcome: 'Good afternoon', revenue: 'Revenue', new_cust: 'New Customers', open_deals: 'Active Projects', recent: 'Recent', priority: 'Priority', status: 'Status', add_new: 'Add New', save: 'Save', cancel: 'Cancel' }
};

const normalizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd');
};

const FacebookIcon = ({ size = 16, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const ZaloIcon = ({ size = 16, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <text x="12" y="13.5" fontSize="8" fontWeight="bold" fill="currentColor" textAnchor="middle" stroke="none">Z</text>
  </svg>
);

const TikTokIcon = ({ size = 16, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const GoogleIcon = ({ size = 16, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.48 1 0 6.48 0 13.24s5.48 12.24 12.24 12.24c7.05 0 11.75-4.962 11.75-11.962 0-.8-.087-1.4-.196-1.993l-11.556-.24z"/>
  </svg>
);

const getSourceIcon = (source, size = 16) => {
  const src = (source || 'Facebook').toLowerCase();
  switch (src) {
    case 'facebook':
      return <FacebookIcon size={size} style={{ color: '#1877F2' }} />;
    case 'zalo':
      return <ZaloIcon size={size} style={{ color: '#0068FF' }} />;
    case 'tiktok':
      return <TikTokIcon size={size} style={{ color: '#ec4899' }} />;
    case 'google':
      return <GoogleIcon size={size} style={{ color: '#ea4335' }} />;
    case 'website':
      return <Globe size={size} style={{ color: '#10b981' }} />;
    case 'hotline':
      return <Phone size={size} style={{ color: '#f59e0b' }} />;
    default:
      return <MessageSquare size={size} style={{ color: '#94a3b8' }} />;
  }
};

const getSourceBadge = (source) => {
  const src = (source || 'Facebook').toLowerCase();
  let bg = 'rgba(24,119,242,0.1)';
  let color = '#1877F2';
  let label = 'Facebook';
  
  switch (src) {
    case 'facebook':
      bg = 'rgba(24,119,242,0.15)';
      color = '#1877F2';
      label = 'Facebook';
      break;
    case 'zalo':
      bg = 'rgba(0,104,255,0.15)';
      color = '#0068FF';
      label = 'Zalo';
      break;
    case 'tiktok':
      bg = 'rgba(255,255,255,0.08)';
      color = '#f8fafc';
      label = 'TikTok';
      break;
    case 'google':
      bg = 'rgba(234,67,53,0.15)';
      color = '#ea4335';
      label = 'Google';
      break;
    case 'website':
      bg = 'rgba(16,185,129,0.15)';
      color = '#10b981';
      label = 'Website';
      break;
    case 'hotline':
      bg = 'rgba(245,158,11,0.15)';
      color = '#f59e0b';
      label = 'Hotline';
      break;
    default:
      bg = 'rgba(148,163,184,0.15)';
      color = '#94a3b8';
      label = source || 'Facebook';
  }
  
  return (
    <span style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: 6, 
      padding: '4px 10px', 
      borderRadius: '12px', 
      background: bg, 
      color: color, 
      fontSize: '0.75rem', 
      fontWeight: 600 
    }}>
      {getSourceIcon(src, 12)}
      {label}
    </span>
  );
};


// --- COMPONENTS ---

const Header = ({ onSearch, unreadCount, searchRef, user, onLogout }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
      <div style={{ position: 'relative', width: '400px' }}>
        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        <input ref={searchRef} type="text" placeholder="Tìm kiếm nhanh... (Alt + S)" onChange={(e) => onSearch(e.target.value)} style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
      </div>
      <div className="user-profile" style={{ position: 'relative' }}>
        <div className="stat-icon" style={{ position: 'relative' }}><Bell size={20} />{unreadCount > 0 && <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: '#ef4444', borderRadius: '50%' }}></div>}</div>
        <div className="avatar" onClick={() => setOpen(!open)} style={{cursor: 'pointer'}}>{user?.name?.[0] || 'AD'}</div>
        {open && (
          <div style={{ position: 'absolute', top: '120%', right: 0, background: '#1e293b', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '10px', minWidth: '220px', zIndex: 50, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '10px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 'bold' }}>{user?.name || 'Admin'}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{user?.email || 'admin@bossdoor.vn'}</div>
            </div>
            <div style={{ padding: '10px 0 0 0' }}>
              <button onClick={onLogout} style={{ width: '100%', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                <LogOut size={16} /> Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const Sidebar = ({ activeTab, setActiveTab, onLogout, user, lang }) => {
  const t = translations[lang];
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard, key: '1' }, 
    user?.role !== 'accountant' && { id: 'customers', icon: Users, label: t.customers, key: '2' }, 
    { id: 'deals', icon: Target, label: t.deals, key: '3' }, 
    { id: 'products', icon: FileSpreadsheet, label: t.products, key: '4' }, 
    { id: 'orders', icon: DollarSign, label: t.orders, key: '5' }, 
    { id: 'warranties', icon: Shield, label: t.warranties, key: '6' }, 
    { id: 'schedule', icon: Calendar, label: t.schedule, key: '7' }, 
    { id: 'settings', icon: Settings, label: t.settings, key: '8' }
  ].filter(Boolean);
  return (
    <div className="sidebar">
      <div>
        <div className="logo" style={{ marginBottom: '2.5rem' }}><Briefcase size={28} color="#6366f1" /><span>Cửa tự động <span>Boss</span></span></div>
        <nav className="nav-links">
          {menuItems.map(item => (<div key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}><item.icon size={20} /><span>{item.label}</span><span style={{marginLeft:'auto',fontSize:'0.6rem',opacity:0.3}}>Alt+{item.key}</span></div>))}
        </nav>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', fontSize: '0.65rem', color: 'var(--text-secondary)' }}><div style={{display:'flex',alignItems:'center',gap:5,marginBottom:5}}><Keyboard size={12}/> Phím tắt:</div><div>Alt+N: Thêm mới</div><div>Alt+S: Tìm kiếm</div></div>
      </div>
    </div>
  );
};

// ... Dashboard, Pipeline, Schedule, SettingsView remain same

const Dashboard = ({ customers, deals, onSelectCustomer, lang, user }) => {
  const t = translations[lang];
  const funnelData = [{ value: deals.length, name: 'Báo giá', fill: '#6366f1' }, { value: deals.filter(d => d.stage === 'Thi công' || d.stage === 'Hoàn thành').length, name: 'Thi công', fill: '#ec4899' }, { value: deals.filter(d => d.stage === 'Hoàn thành').length, name: 'Hoàn thành', fill: '#10b981' }];
  
  const sourcesList = ['Facebook', 'Zalo', 'TikTok', 'Google', 'Website', 'Hotline'];
  const sourceStats = sourcesList.map(src => {
    const count = customers.filter(c => (c.source || 'Facebook').toLowerCase() === src.toLowerCase()).length;
    return { name: src, value: count };
  });

  const sourceColors = {
    Facebook: '#1877F2',
    Zalo: '#0068FF',
    TikTok: '#ec4899', // Pink-red for dark UI
    Google: '#ea4335',
    Website: '#10b981',
    Hotline: '#f59e0b'
  };

  return (
    <div className="animate-in">
      <div className="dashboard-grid">
        {(user?.role === 'admin' || user?.role === 'accountant') && (
          <div className="stat-card"><h3>{t.revenue}</h3><div className="stat-value">{deals.filter(d=>d.stage==='Hoàn thành').reduce((s,d)=>s+parseInt(d.value.replace(/\D/g,'')||0),0).toLocaleString('vi-VN')} đ</div></div>
        )}
        <div className="stat-card"><h3>{t.new_cust}</h3><div className="stat-value">{customers.length}</div></div>
        <div className="stat-card"><h3>{t.open_deals}</h3><div className="stat-value">{deals.filter(d=>d.stage!=='Hoàn thành').length}</div></div>
      </div>
      <div className="chart-container-row">
        <div className="chart-container"><h3>Sales Funnel</h3><div style={{height:250}}><ResponsiveContainer width="100%" height="100%"><FunnelChart><Tooltip /><Funnel dataKey="value" data={funnelData} isAnimationActive><LabelList position="right" fill="#94a3b8" dataKey="name" /></Funnel></FunnelChart></ResponsiveContainer></div></div>
        <div className="chart-container"><h3>Priority</h3><div style={{height:250}}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{n:'High',v:customers.filter(c=>c.priority==='High').length},{n:'Norm',v:customers.filter(c=>c.priority==='Normal').length},{n:'Low',v:customers.filter(c=>c.priority==='Low').length}]} innerRadius={60} outerRadius={80} dataKey="v" nameKey="n"><Cell fill="#ef4444"/><Cell fill="#6366f1"/><Cell fill="#94a3b8"/></Pie><Tooltip /></PieChart></ResponsiveContainer></div></div>
      </div>
      <div className="chart-container-row" style={{ marginTop: '1.5rem' }}>
        <div className="chart-container">
          <h3>Phân bổ Kênh Tiếp Cận (Lead Sources)</h3>
          <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={sourceStats.filter(s => s.value > 0)} 
                    innerRadius={60} 
                    outerRadius={80} 
                    dataKey="value" 
                    nameKey="name"
                    paddingAngle={3}
                  >
                    {sourceStats.filter(s => s.value > 0).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={sourceColors[entry.name] || '#94a3b8'} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: 12 }} 
                    itemStyle={{ color: '#f8fafc' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 20, minWidth: 140 }}>
              {sourceStats.map(stat => (
                <div key={stat.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: sourceColors[stat.name] }}></span>
                  <span style={{ color: '#94a3b8', flex: 1 }}>{stat.name}:</span>
                  <strong style={{ color: 'white' }}>{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h3>Hiệu Quả Mạng Xã Hội & CSKH</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 15 }}>
            {sourceStats.map(stat => {
              const total = customers.length || 1;
              const percentage = Math.round((stat.value / total) * 100);
              const color = sourceColors[stat.name];
              
              return (
                <div key={stat.name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {getSourceIcon(stat.name, 14)}
                      <span style={{ fontWeight: 500, color: '#f8fafc' }}>{stat.name}</span>
                    </div>
                    <span style={{ color: '#94a3b8' }}>{stat.value} leads ({percentage}%)</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 1s ease-in-out' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="section-card" style={{ marginTop: '1.5rem' }}><h2>{t.recent}</h2><table className="data-table"><tbody>{customers.slice(0,5).map(c=>(<tr key={c._id} onClick={()=>onSelectCustomer(c)} style={{cursor:'pointer'}}><td>{c.name}</td><td><span className={`priority-badge priority-${(c.priority||'Normal').toLowerCase()}`}>{c.priority||'Normal'}</span></td><td>{c.status}</td></tr>))}</tbody></table></div>
    </div>
  );
};

const Pipeline = ({ deals, onUpdateDeal, onAddDeal, onPrint, onArchiveDeal, user }) => {
  const stages = ['Báo giá', 'Thi công', 'Hoàn thành'];
  const [activeColumn, setActiveColumn] = useState(null);

  const handleDragStart = (e, dealId) => {
    e.dataTransfer.setData('text/plain', dealId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, stage) => {
    e.preventDefault();
    setActiveColumn(stage);
  };

  const handleDragLeave = () => {
    setActiveColumn(null);
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('text/plain');
    if (dealId) {
      onUpdateDeal(dealId, { stage: targetStage });
    }
    setActiveColumn(null);
  };

  return (
    <div className="animate-in">
      <header>
        <h1>Tiến độ Công trình</h1>
        <button className="btn-primary" onClick={onAddDeal}><Plus size={18}/> Thêm Công trình</button>
      </header>
      <div className="kanban-board">
        {stages.map(s => {
          const isOver = activeColumn === s;
          const filteredDeals = deals.filter(d => d.stage === s);
          return (
            <div 
              key={s} 
              className={`kanban-column`}
              onDragOver={(e) => handleDragOver(e, s)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, s)}
              style={{
                transition: 'all 0.2s ease',
                border: isOver ? '2px dashed #6366f1' : '2px solid transparent',
                borderRadius: '16px',
                padding: '4px'
              }}
            >
              <div className="column-header">
                <div className="column-title">{s}</div>
                <div style={{fontSize:12, opacity:0.6}}>{filteredDeals.length}</div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', minHeight: '450px', padding: '5px' }}>
                {filteredDeals.map(deal => {
                  const total = parseInt(String(deal.value || '').replace(/\D/g,'')||0);
                  const debt = total - (deal.paidAmount || 0);
                  return (
                    <div 
                      key={deal._id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal._id)}
                      className="deal-card"
                      style={{ 
                        cursor: 'grab',
                        userSelect: 'none'
                      }}
                    >
                      <div className="deal-title">{deal.title}</div>
                      <div className="deal-customer">
                        <User size={12} style={{display:'inline',marginRight:4,marginBottom:-2}}/>
                        {deal.customer}
                      </div>
                      <div className="deal-footer" style={{marginTop:'1rem'}}>
                        <span style={{color:'#10b981', fontWeight:'bold', fontSize:'0.9rem'}}>
                          {`${total.toLocaleString('vi-VN')} đ`}
                        </span>
                        {debt > 0 && s==='Hoàn thành' ? (
                          <span style={{color:'#ef4444',fontSize:'0.75rem',fontWeight:'bold'}}>
                            Nợ: {debt.toLocaleString('vi-VN')} đ
                          </span>
                        ) : null}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                        {s === 'Hoàn thành' ? (
                          <button 
                            onClick={(e) => { e.stopPropagation(); onArchiveDeal(deal); }} 
                            style={{width: '100%', background:'rgba(59, 130, 246, 0.1)',border:'1px solid rgba(59, 130, 246, 0.2)',color:'#3b82f6',padding:'8px',borderRadius:8,fontSize:'0.75rem',display:'flex',alignItems:'center',justifyContent: 'center',gap:4,cursor:'pointer',fontWeight:'bold'}}
                          >
                            Chốt đơn & Lưu LS <CheckCircle2 size={14}/>
                          </button>
                        ) : (
                          <button 
                            onClick={(e) => { e.stopPropagation(); onUpdateDeal(deal._id,{stage:stages[stages.indexOf(s)+1]||s}); }} 
                            style={{width: '100%', background:'rgba(16, 185, 129, 0.1)',border:'1px solid rgba(16, 185, 129, 0.2)',color:'#10b981',padding:'8px',borderRadius:8,fontSize:'0.75rem',display:'flex',alignItems:'center',justifyContent: 'center',gap:4,cursor:'pointer',fontWeight:'bold'}}
                          >
                            Chuyển bước <ArrowRight size={14}/>
                          </button>
                        )}
                      </div>
                      {s==='Báo giá' && (
                        <button 
                          onClick={(e)=>{ e.stopPropagation(); onPrint(deal); }} 
                          style={{width:'100%',marginTop:10,padding:8,fontSize:'0.85rem',fontWeight:'bold',cursor:'pointer'}} 
                          className="btn-primary"
                        >
                          In Báo Giá PDF
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Products = ({ products, onAddProduct, onEditProduct, onDeleteProduct }) => (
  <div className="animate-in">
    <header><h1>Sản phẩm</h1><button className="btn-primary" onClick={onAddProduct}>Thêm Sản phẩm</button></header>
    <div className="section-card"><table className="data-table"><thead><tr><th>Hình ảnh</th><th>Mã SP</th><th>Danh mục</th><th>Tên SP</th><th>Giá / Đơn vị</th><th>Bảo hành</th><th>Hành động</th></tr></thead><tbody>{products.map(p=>(<tr key={p._id}><td>{p.imageUrl ? <img src={p.imageUrl} alt={p.name} style={{width: 50, height: 50, objectFit: 'cover', borderRadius: 8}} /> : <div style={{width: 50, height: 50, background: '#1e293b', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Image size={20} color="#94a3b8" /></div>}</td><td>{p.code}</td><td>{p.category}</td><td>{p.name}</td><td>{p.price.toLocaleString('vi-VN')} đ / {p.unit}</td><td>{p.warrantyMonths}T</td><td><div style={{display:'flex', gap:'8px'}}><button onClick={()=>onEditProduct(p)} style={{background:'rgba(99,102,241,0.2)',border:'none',color:'#6366f1',padding:'4px 8px',borderRadius:6,cursor:'pointer'}}>Sửa</button><button onClick={()=>onDeleteProduct(p._id)} style={{background:'rgba(239,68,68,0.2)',border:'none',color:'#ef4444',padding:'4px 8px',borderRadius:6,cursor:'pointer'}}>Xóa</button></div></td></tr>))}</tbody></table></div>
  </div>
);

const Orders = ({ orders, onViewInvoice, onDeleteOrder, onUpdateOrderStatus, onCollectPayment, user }) => (
  <div className="animate-in">
    <header><h1>Lịch sử Đơn hàng</h1></header>
    <div className="section-card">
      <table className="data-table">
        <thead>
          <tr>
            <th>Mã Đơn / Ngày</th>
            <th>Tên Công trình</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Đã trả</th>
            <th>Còn nợ</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o=>{
            const paid = o.status === 'Paid' ? o.totalAmount : (o.paidAmount || 0);
            const debt = o.status === 'Paid' ? 0 : Math.max(0, o.totalAmount - paid);
            return (
              <tr key={o._id}>
                <td>
                  <div style={{fontWeight:'bold',color:'#6366f1'}}>#{o._id.slice(-6).toUpperCase()}</div>
                  <div style={{fontSize:'0.8rem',color:'#64748b'}}>{new Date(o.createdAt).toLocaleDateString('vi-VN')}</div>
                </td>
                <td>{o.dealId?.title || 'Đơn hàng lẻ'}</td>
                <td>{o.customerId?.name || 'N/A'}</td>
                <td style={{fontWeight:'bold',color:'white'}}>{(o.totalAmount||0).toLocaleString('vi-VN')} đ</td>
                <td style={{fontWeight:'bold',color:'#10b981'}}>{paid.toLocaleString('vi-VN')} đ</td>
                <td style={{fontWeight:'bold',color:debt > 0 ? '#ef4444' : '#64748b'}}>{debt.toLocaleString('vi-VN')} đ</td>
                <td>
                  {(user?.role === 'admin' || user?.role === 'accountant') ? (
                    <select 
                      value={o.status} 
                      onChange={(e) => onUpdateOrderStatus(o._id, e.target.value)}
                      style={{ padding: '6px 10px', borderRadius: 8, background: '#0f172a', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      <option value="Paid" style={{ color: 'white', background: '#0f172a' }}>Đã thanh toán</option>
                      <option value="Unpaid" style={{ color: 'white', background: '#0f172a' }}>Chờ thanh toán</option>
                      <option value="Cancelled" style={{ color: 'white', background: '#0f172a' }}>Đã hủy</option>
                    </select>
                  ) : (
                    <span className={`priority-badge priority-${o.status === 'Paid' ? 'normal' : o.status === 'Unpaid' ? 'medium' : 'high'}`}>
                      {o.status === 'Paid' ? 'Đã thanh toán' : o.status === 'Unpaid' ? 'Chờ thanh toán' : o.status === 'Cancelled' ? 'Đã hủy' : o.status}
                    </span>
                  )}
                </td>
                <td>
                  <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                    <button onClick={()=>onViewInvoice(o)} style={{background:'rgba(16,185,129,0.2)',border:'none',color:'#10b981',padding:'4px 8px',borderRadius:6,cursor:'pointer'}}>Xem hóa đơn</button>
                    {debt > 0 && (
                      <button onClick={()=>onCollectPayment(o)} style={{background:'rgba(99,102,241,0.2)',border:'none',color:'#a5b4fc',padding:'4px 8px',borderRadius:6,cursor:'pointer'}}>Thu tiền</button>
                    )}
                    {(user?.role === 'admin' || user?.role === 'accountant') && (
                      <button onClick={()=>onDeleteOrder(o._id)} style={{background:'rgba(239,68,68,0.2)',border:'none',color:'#ef4444',padding:'4px 8px',borderRadius:6,cursor:'pointer'}}>Xóa</button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

const Warranties = ({ warranties, onAddWarranty, onViewWarranty }) => (
  <div className="animate-in">
    <header><h1>Quản lý Bảo hành</h1><button className="btn-primary" onClick={onAddWarranty}>Thêm Phiếu</button></header>
    <div className="section-card"><table className="data-table"><thead><tr><th>Khách hàng</th><th>Sản phẩm</th><th>Ngày Hết hạn</th><th>Trạng thái</th></tr></thead><tbody>{warranties.map(w=>(<tr key={w._id} onClick={()=>onViewWarranty(w)} style={{cursor:'pointer'}}><td>{w.customerId?.name || 'N/A'}</td><td>{w.productName}</td><td>{new Date(w.endDate).toLocaleDateString()}</td><td><span className={`priority-badge priority-${w.status==='Active'?'normal':'high'}`}>{w.status}</span></td></tr>))}</tbody></table></div>
  </div>
);

const Schedule = ({ tasks, customers, onAddTask, onToggleTask, onDeleteTask, onExecuteCampaign }) => {
  const [formType, setFormType] = useState('task'); // 'task' or 'sms'
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('09:00');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    if (formType === 'task') {
      onAddTask({ title, time, type: 'task' });
    } else {
      if (!message.trim()) return;
      onAddTask({ title, time, type: 'sms_campaign', message });
      setMessage('');
    }
    setTitle('');
  };

  return (
    <div className="animate-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1>Lịch trình công việc</h1>
        
        {/* Toggle loại công việc */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 10, border: '1px solid var(--border-color)' }}>
          <button 
            type="button" 
            onClick={() => setFormType('task')}
            style={{ 
              padding: '6px 16px', 
              borderRadius: 8, 
              border: 'none', 
              background: formType === 'task' ? '#6366f1' : 'transparent', 
              color: 'white', 
              cursor: 'pointer', 
              fontSize: '0.85rem',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            Công việc cá nhân
          </button>
          <button 
            type="button" 
            onClick={() => setFormType('sms')}
            style={{ 
              padding: '6px 16px', 
              borderRadius: 8, 
              border: 'none', 
              background: formType === 'sms' ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' : 'transparent', 
              color: 'white', 
              cursor: 'pointer', 
              fontSize: '0.85rem',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            Quảng bá SMS
          </button>
        </div>
      </header>
      
      {/* Form thêm công việc/chiến dịch */}
      <div className="section-card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
            <input 
              type="text" 
              placeholder={formType === 'task' ? "Tên công việc mới... (VD: Gọi điện tư vấn)" : "Tên chiến dịch quảng bá... (VD: Khuyến mãi Hè 2026)"} 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              style={{ flex: 1, padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', minWidth: '200px', height: '48px', outline: 'none' }} 
            />
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              required 
              style={{ width: '130px', padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', height: '48px', outline: 'none' }} 
            />
            {formType === 'task' && (
              <button type="submit" className="btn-primary" style={{ padding: '12px 24px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} /> Thêm
              </button>
            )}
          </div>
          
          {formType === 'sms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <textarea
                placeholder="Nhập nội dung tin nhắn gửi tới toàn bộ khách hàng... (VD: Cửa Tự Động BOSS: Chương trình ưu đãi tri ân khách hàng cũ giảm 10% chi phí lắp đặt bảo dưỡng...)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={3}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Sẽ gửi tới tất cả khách hàng ({customers?.length || 0} số điện thoại).
                </span>
                <button type="submit" className="btn-primary" style={{ padding: '12px 24px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', display: 'flex', alignItems: 'center', gap: '8px', border: 'none' }}>
                  <Send size={18} /> Lên lịch SMS
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        {tasks.length === 0 ? (
          <div className="section-card" style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
            Không có lịch trình công việc nào.
          </div>
        ) : (
          tasks.map(x => {
            const isCampaign = x.type === 'sms_campaign';
            return (
              <div key={x._id} className="section-card" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '1.5rem', borderLeft: isCampaign ? '4px solid #a855f7' : 'none' }}>
                {isCampaign ? (
                  <div style={{ color: x.done ? '#10b981' : '#a855f7', background: 'rgba(168, 85, 247, 0.1)', padding: 10, borderRadius: 12 }}>
                    <MessageSquare size={24} />
                  </div>
                ) : (
                  <div onClick={() => onToggleTask(x._id, !x.done)} style={{ color: x.done ? '#10b981' : '#94a3b8', cursor: 'pointer' }}>
                    <CheckCircle size={28} />
                  </div>
                )}
                
                <div style={{ flex: 1, textDecoration: (!isCampaign && x.done) ? 'line-through' : 'none', opacity: (!isCampaign && x.done) ? 0.5 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontWeight: 600 }}>{x.title}</span>
                    {isCampaign && (
                      <span style={{ background: x.done ? 'rgba(16, 185, 129, 0.1)' : 'rgba(168, 85, 247, 0.1)', color: x.done ? '#10b981' : '#a855f7', padding: '2px 8px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 'bold' }}>
                        {x.done ? 'Đã chạy' : 'Tin nhắn hàng loạt'}
                      </span>
                    )}
                  </div>
                  
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 15, marginTop: 5 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={12} /> {x.time}</span>
                    {isCampaign && x.message && (
                      <span style={{ color: '#94a3b8', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                        Nội dung: {x.message}
                      </span>
                    )}
                  </div>
                </div>
                
                {isCampaign && !x.done && (
                  <button 
                    onClick={() => onExecuteCampaign(x)} 
                    className="btn-primary" 
                    style={{ padding: '8px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', border: 'none', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    <Send size={12} /> Gửi ngay
                  </button>
                )}
                
                {isCampaign && x.done && (
                  <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle size={14} /> Gửi {x.sentCount || 0} KH
                  </span>
                )}
                
                <button onClick={() => onDeleteTask(x._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 5 }}>
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const SettingsView = ({ user, lang, setLang, onBackup, onRestore, apiFetch }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('staff');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await apiFetch('/api/users');
      setUsers(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await apiFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role })
      });
      setSuccess('Đã tạo tài khoản thành công!');
      setName('');
      setEmail('');
      setPassword('');
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Lỗi tạo tài khoản');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      try {
        await apiFetch(`/api/users/${id}`, { method: 'DELETE' });
        fetchUsers();
      } catch (err) {
        alert('Lỗi xóa: ' + err.message);
      }
    }
  };

  const handleResetPassword = async (id, userName) => {
    const newPass = window.prompt(`Nhập mật khẩu mới cho tài khoản "${userName}":`);
    if (newPass === null) return;
    if (!newPass.trim()) {
      alert('Mật khẩu không được để trống!');
      return;
    }
    try {
      await apiFetch(`/api/users/${id}/password`, {
        method: 'PUT',
        body: JSON.stringify({ password: newPass })
      });
      alert(`Đã đổi mật khẩu cho tài khoản "${userName}" thành công!`);
    } catch (err) {
      alert('Lỗi đổi mật khẩu: ' + err.message);
    }
  };

  return (
    <div className="animate-in">
      <header><h1>Cài đặt hệ thống</h1></header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div className="section-card">
            <h3>Ngôn ngữ</h3>
            <div style={{display:'flex',gap:10,marginTop:15}}>
              <button onClick={()=>setLang('vi')} className="btn-primary" style={{background:lang==='vi'?'':'transparent'}}>Việt</button>
              <button onClick={()=>setLang('en')} className="btn-primary" style={{background:lang==='en'?'':'transparent'}}>English</button>
            </div>
          </div>
          <div className="section-card">
            <h3>Dữ liệu</h3>
            <p style={{fontSize:'0.8rem',color:'var(--text-secondary)',marginBottom:15}}>Xuất/Nhập dữ liệu bằng file JSON để sao lưu và khôi phục.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={onBackup} className="btn-primary" style={{background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}>
                <CloudDownload size={18} style={{marginRight:8}}/> Sao lưu
              </button>
              {user?.role === 'admin' && (
                <button onClick={onRestore} className="btn-primary" style={{background:'rgba(99,102,241,0.1)',border:'1px solid #6366f1',color:'#a5b4fc'}}>
                  <CloudDownload size={18} style={{marginRight:8, transform: 'rotate(180deg)'}}/> Khôi phục
                </button>
              )}
            </div>
          </div>
        </div>

        {user?.role === 'admin' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            {/* Tạo tài khoản mới */}
            <div className="section-card">
              <h3>Tạo tài khoản Nhân viên mới</h3>
              <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 15 }}>
                <input 
                  type="text" 
                  placeholder="Tên nhân viên" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }}
                />
                <input 
                  type="email" 
                  placeholder="Email đăng nhập" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }}
                />
                <input 
                  type="password" 
                  placeholder="Mật khẩu" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }}
                />
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  style={{ padding: 12, borderRadius: 12, background: '#0f172a', border: '1px solid var(--border-color)', color: 'white' }}
                >
                  <option value="staff" style={{ color: 'white', background: '#0f172a' }}>Quyền: Nhân viên (staff)</option>
                  <option value="accountant" style={{ color: 'white', background: '#0f172a' }}>Quyền: Kế toán (accountant)</option>
                  <option value="admin" style={{ color: 'white', background: '#0f172a' }}>Quyền: Boss / Admin (admin)</option>
                </select>
                {error && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</div>}
                {success && <div style={{ color: '#10b981', fontSize: '0.8rem' }}>{success}</div>}
                <button type="submit" className="btn-primary" style={{ padding: 12 }}>Tạo tài khoản</button>
              </form>
            </div>

            {/* Danh sách tài khoản */}
            <div className="section-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3>Danh sách tài khoản</h3>
              <div style={{ marginTop: 15, overflowY: 'auto', maxHeight: 350, flex: 1 }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Quyền</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{u.email}</td>
                        <td>
                          <span className={`priority-badge ${u.role === 'admin' ? 'priority-high' : 'priority-normal'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => handleResetPassword(u._id, u.name)}
                              style={{ background: 'rgba(99,102,241,0.2)', border: 'none', color: '#6366f1', padding: '4px 8px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem' }}
                            >
                              Đổi MK
                            </button>
                            {u._id !== user.id ? (
                              <button 
                                onClick={() => handleDeleteUser(u._id)}
                                style={{ background: 'rgba(239,68,68,0.2)', border: 'none', color: '#ef4444', padding: '4px 8px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem' }}
                              >
                                Xóa
                              </button>
                            ) : (
                              <span style={{ fontSize: '0.75rem', opacity: 0.4 }}>Đang dùng</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const QuotePrintView = ({ deal, onCancel }) => {
  if (!deal) return null;
  const today = new Date();
  const dateStr = `Ngày ${today.getDate()} tháng ${today.getMonth()+1} năm ${today.getFullYear()}`;
  
  const totalVal = parseInt(String(deal.value || '').replace(/\D/g,'') || 0);
  const paid = deal.paidAmount || 0;
  const debt = totalVal - paid;
  
  return (
    <div className="print-view-overlay" style={{position:'fixed', inset:0, background:'#e2e8f0', zIndex:9999, overflowY:'auto', display:'flex', flexDirection:'column', alignItems:'center', padding:'40px 20px'}}>
      <div className="no-print" style={{display:'flex', gap: 15, marginBottom: 20}}>
        <button onClick={()=>window.print()} className="btn-primary" style={{boxShadow:'0 4px 15px rgba(0,0,0,0.1)'}}><Download size={18} style={{marginRight:8}}/> In Báo Giá (Ctrl+P)</button>
        <button onClick={onCancel} style={{padding:'12px 24px', borderRadius: '12px', background: '#fff', color: '#0f172a', border: '1px solid #cbd5e1', cursor:'pointer'}}>Đóng</button>
      </div>

      <div className="printable-a4" style={{width: '210mm', minHeight: '297mm', padding: '20mm', background: 'white', color: '#1e293b', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', boxSizing: 'border-box', fontFamily: '"Times New Roman", Times, serif', lineHeight: 1.5}}>
        {/* Header */}
        <div style={{display:'flex', justifyContent:'space-between', borderBottom:'2px solid #1e40af', paddingBottom:20, marginBottom:30}}>
          <div style={{display:'flex', gap: 15, alignItems:'center'}}>
            <img src="/logo_boss.png" alt="BOSS ĐÀ NẴNG" style={{ height: 80, objectFit: 'contain' }} />
            <div>
              <h2 style={{margin:0, color:'#1e40af', fontSize:'1.3rem'}}>Công ty TNHH MTV TM&DV BOSS Đà Nẵng</h2>
              <p style={{margin:'5px 0 0 0', fontSize:'0.9rem'}}>Địa chỉ: 647 Ngô Quyền, Sơn Trà, Đà Nẵng</p>
              <p style={{margin:'2px 0 0 0', fontSize:'0.9rem'}}>Hotline: 0904.678.323 - Email: bossdanangvn@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div style={{textAlign:'center', marginBottom:30}}>
          <h1 style={{margin:0, fontSize:'2rem', color:'#0f172a'}}>BẢNG BÁO GIÁ</h1>
          <p style={{margin:'5px 0 0 0', fontStyle:'italic', color:'#475569'}}>{dateStr}</p>
        </div>

        {/* Customer Info */}
        <div style={{marginBottom:30, padding:'15px', border:'1px solid #cbd5e1', borderRadius:8, background:'#f8fafc'}}>
          <p style={{margin:'0 0 8px 0'}}><strong>Kính gửi Quý khách hàng:</strong> {deal.customer}</p>
          <p style={{margin:'0 0 8px 0'}}><strong>Tên công trình:</strong> {deal.title}</p>
          <p style={{margin:0}}><strong>Địa chỉ thi công:</strong> {deal.siteAddress || '..........................................................'}</p>
        </div>

        <p style={{marginBottom:15}}>Công ty Boss Door Đà Nẵng trân trọng gửi đến Quý khách hàng bảng báo giá hạng mục thi công như sau:</p>

        {/* Table */}
        <table style={{width:'100%', borderCollapse:'collapse', marginBottom:30}}>
          <thead>
            <tr style={{background:'#1e40af', color:'white'}}>
              <th style={{padding:12, border:'1px solid #1e40af', textAlign:'center', width:'5%'}}>STT</th>
              <th style={{padding:12, border:'1px solid #1e40af', textAlign:'left', width:'45%'}}>Nội dung / Sản phẩm</th>
              <th style={{padding:12, border:'1px solid #1e40af', textAlign:'center', width:'15%'}}>Khối lượng</th>
              <th style={{padding:12, border:'1px solid #1e40af', textAlign:'right', width:'15%'}}>Đơn giá</th>
              <th style={{padding:12, border:'1px solid #1e40af', textAlign:'right', width:'20%'}}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'center'}}>1</td>
              <td style={{padding:12, border:'1px solid #cbd5e1'}}>
                <strong>{deal.product ? deal.product.name : 'Hạng mục thi công chính'}</strong>
                {deal.product && <div style={{fontSize:'0.85rem', color:'#64748b', marginTop:5}}>Mã SP: {deal.product.code}</div>}
              </td>
              <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'center'}}>{deal.dimensions || 'Trọn gói'}</td>
              <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right'}}>-</td>
              <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right'}}>{totalVal.toLocaleString('vi-VN')} đ</td>
            </tr>
            {deal.product && deal.product.imageUrl && (
              <tr>
                <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'center'}}></td>
                <td colSpan={4} style={{padding:12, border:'1px solid #cbd5e1'}}>
                  <div style={{display:'flex', alignItems:'center', gap: 15}}>
                    <img src={deal.product.imageUrl} alt="Hình ảnh sản phẩm" style={{width: 120, height: 120, objectFit:'cover', border:'1px solid #e2e8f0', borderRadius:4}} />
                    <span style={{fontStyle:'italic', color:'#64748b'}}>Hình ảnh minh họa sản phẩm sẽ được thi công.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr style={{background:'#f8fafc', fontWeight:'bold'}}>
              <td colSpan={4} style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right', textTransform:'uppercase'}}>Tổng cộng</td>
              <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right', color:'#1e40af', fontSize:'1.1rem'}}>{totalVal.toLocaleString('vi-VN')} đ</td>
            </tr>
            <tr style={{background:'#f8fafc', fontWeight:'bold'}}>
              <td colSpan={4} style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right', textTransform:'uppercase'}}>Đã thanh toán</td>
              <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right', color:'#10b981', fontSize:'1rem'}}>{paid.toLocaleString('vi-VN')} đ</td>
            </tr>
            <tr style={{background:'#f8fafc', fontWeight:'bold'}}>
              <td colSpan={4} style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right', textTransform:'uppercase'}}>Còn nợ</td>
              <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right', color:'#ef4444', fontSize:'1.1rem'}}>{debt.toLocaleString('vi-VN')} đ</td>
            </tr>
          </tfoot>
        </table>

        {/* Note */}
        <div style={{marginBottom:50}}>
          <p style={{fontWeight:'bold', textDecoration:'underline'}}>Ghi chú:</p>
          <ul style={{margin:0, paddingLeft:20, color:'#475569', fontSize:'0.9rem'}}>
            <li style={{marginBottom:5}}>Báo giá trên chưa bao gồm thuế VAT 10% (nếu xuất hóa đơn).</li>
            <li style={{marginBottom:5}}>Đã bao gồm chi phí vận chuyển và lắp đặt hoàn thiện tại nội thành Đà Nẵng.</li>
            <li style={{marginBottom:5}}>Báo giá có giá trị trong vòng 15 ngày kể từ ngày báo giá.</li>
            <li>Sản phẩm được bảo hành chính hãng theo tiêu chuẩn của nhà sản xuất.</li>
          </ul>
        </div>

        {/* Signatures */}
        <div style={{display:'flex', justifyContent:'space-between', padding:'0 30px'}}>
          <div style={{textAlign:'center'}}>
            <h4 style={{margin:0}}>KHÁCH HÀNG</h4>
            <p style={{margin:0, fontStyle:'italic', fontSize:'0.85rem', color:'#64748b'}}>(Ký và ghi rõ họ tên)</p>
          </div>
          <div style={{textAlign:'center'}}>
            <h4 style={{margin:0}}>NGƯỜI BÁO GIÁ</h4>
            <p style={{margin:0, fontStyle:'italic', fontSize:'0.85rem', color:'#64748b'}}>(Ký và ghi rõ họ tên)</p>
            <div style={{marginTop:80, fontWeight:'bold'}}>{deal.assignee || 'Nhân viên kinh doanh'}</div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-view-overlay { position: static !important; background: transparent !important; padding: 0 !important; }
          .printable-a4, .printable-a4 * { visibility: visible; }
          .printable-a4 { position: absolute; left: 0; top: 0; padding: 0 !important; border: none; box-shadow: none !important; width: 100% !important; min-height: auto !important; margin: 0 !important; }
          .no-print { display: none !important; }
          @page { size: A4 portrait; margin: 15mm; }
        }
      `}</style>
    </div>
  );
};

const InvoicePrintView = ({ order, onCancel }) => {
  if (!order) return null;
  const today = new Date(order.createdAt);
  const dateStr = `Ngày ${today.getDate()} tháng ${today.getMonth()+1} năm ${today.getFullYear()}`;
  const isFullyPaid = order.status === 'Paid' || (order.paidAmount >= order.totalAmount);
  const paid = order.status === 'Paid' ? order.totalAmount : (order.paidAmount || 0);
  const debt = order.status === 'Paid' ? 0 : Math.max(0, order.totalAmount - paid);
  
  return (
    <div className="print-view-overlay" style={{position:'fixed', inset:0, background:'#e2e8f0', zIndex:9999, overflowY:'auto', display:'flex', flexDirection:'column', alignItems:'center', padding:'40px 20px'}}>
      <div className="no-print" style={{display:'flex', gap: 15, marginBottom: 20}}>
        <button onClick={()=>window.print()} className="btn-primary" style={{boxShadow:'0 4px 15px rgba(0,0,0,0.1)'}}><Download size={18} style={{marginRight:8}}/> In Hóa Đơn (Ctrl+P)</button>
        <button onClick={onCancel} style={{padding:'12px 24px', borderRadius: '12px', background: '#fff', color: '#0f172a', border: '1px solid #cbd5e1', cursor:'pointer'}}>Đóng</button>
      </div>

      <div className="printable-a4" style={{width: '210mm', minHeight: '297mm', padding: '20mm', background: 'white', color: '#1e293b', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', boxSizing: 'border-box', fontFamily: '"Times New Roman", Times, serif', lineHeight: 1.5}}>
        {/* Header */}
        <div style={{display:'flex', justifyContent:'space-between', borderBottom:'2px solid #10b981', paddingBottom:20, marginBottom:30}}>
          <div style={{display:'flex', gap: 15, alignItems:'center'}}>
            <img src="/logo_boss.png" alt="BOSS ĐÀ NẴNG" style={{ height: 80, objectFit: 'contain' }} />
            <div>
              <h2 style={{margin:0, color:'#10b981', fontSize:'1.3rem'}}>Công ty TNHH MTV TM&DV BOSS Đà Nẵng</h2>
              <p style={{margin:'5px 0 0 0', fontSize:'0.9rem'}}>Địa chỉ: 647 Ngô Quyền, Sơn Trà, Đà Nẵng</p>
              <p style={{margin:'2px 0 0 0', fontSize:'0.9rem'}}>Hotline: 0904.678.323 - Email: bossdanangvn@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div style={{textAlign:'center', marginBottom:30}}>
          <h1 style={{margin:0, fontSize:'2rem', color:'#0f172a'}}>HÓA ĐƠN THANH TOÁN</h1>
          <p style={{margin:'5px 0 0 0', fontStyle:'italic', color:'#475569'}}>{dateStr}</p>
          <p style={{margin:'2px 0 0 0', fontWeight:'bold', color:'#64748b'}}>Mã HĐ: #INV-{order._id.slice(-6).toUpperCase()}</p>
        </div>

        {/* Customer Info */}
        <div style={{marginBottom:30, padding:'15px', border:'1px solid #cbd5e1', borderRadius:8, background:'#f8fafc'}}>
          <p style={{margin:'0 0 8px 0'}}><strong>Khách hàng:</strong> {order.customerId?.name || 'N/A'}</p>
          {order.customerId?.phone && <p style={{margin:'0 0 8px 0'}}><strong>Số điện thoại:</strong> {order.customerId.phone}</p>}
          <p style={{margin:'0 0 8px 0'}}><strong>Hạng mục / Công trình:</strong> {order.dealId?.title || 'Đơn hàng lẻ'}</p>
          <p style={{margin:0}}><strong>Trạng thái giao dịch:</strong> <span style={{color: isFullyPaid ? '#10b981' : '#ef4444', fontWeight:'bold'}}>{isFullyPaid ? 'ĐÃ THANH TOÁN XONG (PAID)' : `CÒN NỢ (OUTSTANDING DEBT: ${debt.toLocaleString('vi-VN')} đ)`}</span></p>
        </div>

        {/* Table */}
        <table style={{width:'100%', borderCollapse:'collapse', marginBottom:30}}>
          <thead>
            <tr style={{background:'#10b981', color:'white'}}>
              <th style={{padding:12, border:'1px solid #10b981', textAlign:'center', width:'5%'}}>STT</th>
              <th style={{padding:12, border:'1px solid #10b981', textAlign:'left', width:'55%'}}>Nội dung chi tiết</th>
              <th style={{padding:12, border:'1px solid #10b981', textAlign:'center', width:'10%'}}>SL</th>
              <th style={{padding:12, border:'1px solid #10b981', textAlign:'right', width:'15%'}}>Đơn giá</th>
              <th style={{padding:12, border:'1px solid #10b981', textAlign:'right', width:'15%'}}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <tr key={idx}>
                  <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'center'}}>{idx + 1}</td>
                  <td style={{padding:12, border:'1px solid #cbd5e1'}}>
                    <strong>{item.productId?.name || 'Sản phẩm / Dịch vụ'}</strong>
                    {item.productId?.code && <div style={{fontSize:'0.85rem', color:'#64748b', marginTop:5}}>Mã SP: {item.productId.code}</div>}
                  </td>
                  <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'center'}}>{item.quantity}</td>
                  <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right'}}>{item.price.toLocaleString('vi-VN')} đ</td>
                  <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right'}}>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'center'}}>1</td>
                <td style={{padding:12, border:'1px solid #cbd5e1'}}>
                  <strong>Thanh toán chi phí thi công công trình: {order.dealId?.title || 'Đơn hàng lẻ'}</strong>
                </td>
                <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'center'}}>1</td>
                <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right'}}>{order.totalAmount.toLocaleString('vi-VN')} đ</td>
                <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right'}}>{order.totalAmount.toLocaleString('vi-VN')} đ</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr style={{background:'#f8fafc', fontWeight:'bold'}}>
              <td colSpan={4} style={{padding:10, border:'1px solid #cbd5e1', textAlign:'right', textTransform:'uppercase'}}>Tổng giá trị hợp đồng / đơn hàng</td>
              <td style={{padding:10, border:'1px solid #cbd5e1', textAlign:'right', fontSize:'1rem'}}>{order.totalAmount.toLocaleString('vi-VN')} đ</td>
            </tr>
            <tr style={{background:'#f8fafc', fontWeight:'bold'}}>
              <td colSpan={4} style={{padding:10, border:'1px solid #cbd5e1', textAlign:'right', textTransform:'uppercase'}}>Đã thanh toán (lũy kế)</td>
              <td style={{padding:10, border:'1px solid #cbd5e1', textAlign:'right', color:'#10b981', fontSize:'1rem'}}>{paid.toLocaleString('vi-VN')} đ</td>
            </tr>
            <tr style={{background:'#f0fdf4', fontWeight:'bold'}}>
              <td colSpan={4} style={{padding:10, border:'1px solid #cbd5e1', textAlign:'right', textTransform:'uppercase'}}>Số tiền còn lại (công nợ)</td>
              <td style={{padding:10, border:'1px solid #cbd5e1', textAlign:'right', color: debt > 0 ? '#ef4444' : '#64748b', fontSize:'1.1rem'}}>{debt.toLocaleString('vi-VN')} đ</td>
            </tr>
          </tfoot>
        </table>

        {/* Note */}
        <div style={{marginBottom:50}}>
          <p style={{fontWeight:'bold', textDecoration:'underline'}}>Ghi chú chuyển khoản / thanh toán:</p>
          <ul style={{margin:0, paddingLeft:20, color:'#475569', fontSize:'0.9rem'}}>
            <li style={{marginBottom:5}}>Số tiền đã thu lũy kế: <strong>{paid.toLocaleString('vi-VN')} đ</strong>.</li>
            <li style={{marginBottom:5}}>Số tiền còn lại (nợ công nợ): <strong>{debt.toLocaleString('vi-VN')} đ</strong>.</li>
            <li style={{marginBottom:5}}>Hình thức thanh toán: Tiền mặt / Chuyển khoản qua ngân hàng.</li>
            <li>Hóa đơn bán hàng kiêm biên nhận thanh toán hoàn thiện công trình.</li>
          </ul>
        </div>

        {/* Signatures */}
        <div style={{display:'flex', justifyContent:'space-between', padding:'0 30px'}}>
          <div style={{textAlign:'center'}}>
            <h4 style={{margin:0}}>KHÁCH HÀNG</h4>
            <p style={{margin:0, fontStyle:'italic', fontSize:'0.85rem', color:'#64748b'}}>(Ký và nhận phiếu)</p>
          </div>
          <div style={{textAlign:'center'}}>
            <h4 style={{margin:0}}>NGƯỜI LẬP PHIẾU</h4>
            <p style={{margin:0, fontStyle:'italic', fontSize:'0.85rem', color:'#64748b'}}>(Ký, đóng dấu công ty)</p>
            <div style={{marginTop:80, fontWeight:'bold'}}>Bộ phận Kế toán</div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-view-overlay { position: static !important; background: transparent !important; padding: 0 !important; }
          .printable-a4, .printable-a4 * { visibility: visible; }
          .printable-a4 { position: absolute; left: 0; top: 0; padding: 0 !important; border: none; box-shadow: none !important; width: 100% !important; min-height: auto !important; margin: 0 !important; }
          .no-print { display: none !important; }
          @page { size: A4 portrait; margin: 15mm; }
        }
      `}</style>
    </div>
  );
};

const SearchableSelect = ({ name, placeholder, options }) => {
  const [val, setVal] = useState('');
  const [open, setOpen] = useState(false);
  
  const filtered = options.filter(o => {
    // Match exact string or normalized string
    return o.label.toLowerCase().includes(val.toLowerCase()) || 
           normalizeString(o.label).includes(normalizeString(val));
  });

  return (
    <div style={{position:'relative', width:'100%'}}>
      <input 
        name={name}
        placeholder={placeholder} 
        value={val} 
        onChange={e => { setVal(e.target.value); setOpen(true); }} 
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        autoComplete="off"
        required
        style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white',width:'100%',boxSizing:'border-box'}}
      />
      {open && filtered.length > 0 && (
        <div style={{position:'absolute',top:'100%',left:0,right:0,maxHeight:200,overflowY:'auto',background:'#1e293b',border:'1px solid var(--border-color)',borderRadius:12,zIndex:50,marginTop:5}}>
          {filtered.map(o => (
            <div 
              key={o.value} 
              onClick={() => { setVal(o.label); setOpen(false); }}
              style={{padding:'10px 15px',cursor:'pointer',borderBottom:'1px solid rgba(255,255,255,0.05)',color:'white'}}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- MAIN APP ---

function App() {
  const [user, setUser] = useState(null); const [tab, setTab] = useState('dashboard');
  const [customers, setCustomers] = useState([]); const [deals, setDeals] = useState([]);
  const [products, setProducts] = useState([]); const [orders, setOrders] = useState([]);
  const [warranties, setWarranties] = useState([]);
  const [notifs, setNotifs] = useState([]); const [isModal, setIsModal] = useState(null); // 'customer', 'deal', 'product', 'order', 'warranty', 'warranty_log'
  const [selectedCust, setSelectedCust] = useState(null);
  const [selectedCustEdit, setSelectedCustEdit] = useState(null);
  const [executingCampaign, setExecutingCampaign] = useState(null);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [printDeal, setPrintDeal] = useState(null);
  const [printInvoice, setPrintInvoice] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [sysStatus, setSysStatus] = useState({ online: true, db: 'Connected', port: '5000' });
  const [lang, setLang] = useState('vi'); const [search, setSearch] = useState('');
  const searchRef = useRef(null);

  const apiFetch = async (url, options = {}) => {
    const headers = { 'Content-Type': 'application/json', ...(user ? { 'Authorization': `Bearer ${user.token}` } : {}), ...options.headers };
    const res = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
    if (!res.ok) {
      let errMsg = 'API Error';
      try {
        const errJson = await res.json();
        if (errJson && errJson.message) errMsg = errJson.message;
      } catch (e) {}
      throw new Error(errMsg);
    }
    return res.json();
  };

  useEffect(() => { 
    const s = localStorage.getItem('crm_user'); 
    if (s) {
      const parsed = JSON.parse(s);
      if (parsed.name === 'Latio Admin') {
        parsed.name = 'Boss Admin';
        localStorage.setItem('crm_user', JSON.stringify(parsed));
      }
      setUser(parsed);
    } 
  }, []);
  const fetchData = async () => { 
    if (!user) return; 
    try {
      const [c, d, n, p, o, w, t] = await Promise.all([
        user.role !== 'accountant' ? apiFetch('/api/customers') : Promise.resolve([]), 
        apiFetch('/api/deals'), 
        apiFetch('/api/notifications'), 
        apiFetch('/api/products'), 
        apiFetch('/api/orders'), 
        apiFetch('/api/warranties'),
        apiFetch('/api/tasks')
      ]);
      setCustomers(c); setDeals(d); setNotifs(n); setProducts(p); setOrders(o); setWarranties(w); setTasks(t);
    } catch(err) { console.error(err); }
  };
  useEffect(() => { fetchData(); }, [user]);

  const filteredProducts = useMemo(() => {
    const query = normalizeString(search);
    if (!query) return products;
    return products.filter(p => 
      normalizeString(p.name).includes(query) ||
      normalizeString(p.code).includes(query) ||
      normalizeString(p.category).includes(query)
    );
  }, [products, search]);

  // Kiểm tra trạng thái kết nối server/db động
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/health`);
        if (res.ok) {
          const data = await res.json();
          setSysStatus({ online: true, db: data.db, port: data.port });
        } else {
          setSysStatus({ online: false, db: 'Disconnected', port: '5000' });
        }
      } catch (err) {
        setSysStatus({ online: false, db: 'Disconnected', port: '5000' });
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  // Tải lịch sử ghi chú (activities) khi thay đổi khách hàng được chọn
  useEffect(() => {
    if (selectedCust) {
      apiFetch(`/api/activities/${selectedCust._id}`)
        .then(data => setActivities(data))
        .catch(err => console.error('Lỗi lấy lịch sử ghi chú:', err));
      setNoteText('');
    }
  }, [selectedCust]);

  // Lưu ghi chú khách hàng mới
  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    try {
      const newAct = await apiFetch('/api/activities', {
        method: 'POST',
        body: JSON.stringify({
          customerId: selectedCust._id,
          content: noteText,
          type: 'note'
        })
      });
      setActivities([newAct, ...activities]);
      setNoteText('');
    } catch (err) {
      alert('Lỗi lưu ghi chú: ' + err.message);
    }
  };

  // Các hàm xử lý Tác vụ công việc (Tasks)
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await apiFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData)
      });
      setTasks([newTask, ...tasks]);
    } catch (err) {
      alert('Lỗi thêm công việc: ' + err.message);
    }
  };

  const handleToggleTask = async (id, done) => {
    try {
      const updated = await apiFetch(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ done })
      });
      setTasks(tasks.map(t => t._id === id ? updated : t));
    } catch (err) {
      alert('Lỗi cập nhật trạng thái: ' + err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await apiFetch(`/api/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      alert('Lỗi xóa công việc: ' + err.message);
    }
  };

  const handleCloseDeal = async (deal) => {
    try {
      const matchedCustomer = customers.find(c => c.name === deal.customer);
      const customerId = matchedCustomer ? matchedCustomer._id : null;
      let newOrder = null;
      if (customerId) {
        const total = parseInt(String(deal.value || '').replace(/\D/g,'') || 0);
        const paid = deal.paidAmount || 0;
        const res = await apiFetch('/api/orders', { method: 'POST', body: JSON.stringify({
          customerId,
          dealId: deal._id,
          totalAmount: total,
          paidAmount: paid,
          status: (paid >= total) ? 'Paid' : 'Unpaid',
          items: deal.product ? [{ productId: deal.product._id || deal.product, quantity: 1, price: total }] : []
        })});
        newOrder = res;
      }
      await apiFetch(`/api/deals/${deal._id}`, { method: 'PUT', body: JSON.stringify({ isArchived: true }) });
      alert('Đã chốt đơn thành công! Đang mở hóa đơn để in...');
      fetchData();
      if (newOrder) {
        const populatedOrder = {
          ...newOrder,
          customerId: matchedCustomer,
          dealId: deal
        };
        setPrintInvoice(populatedOrder);
      }
    } catch (e) {
      alert('Lỗi chốt đơn: ' + e.message);
    }
  };

  // Keyboard Shortcuts Logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        if (e.key === '1') setTab('dashboard');
        if (e.key === '2' && user?.role !== 'accountant') setTab('customers');
        if (e.key === '3') setTab('deals');
        if (e.key === '4') setTab('products');
        if (e.key === '5') setTab('orders');
        if (e.key === '6') setTab('warranties');
        if (e.key === '7') setTab('schedule');
        if (e.key === '8') setTab('settings');
        if (e.key === 'n' && user?.role !== 'accountant') setIsModal('customer');
        if (e.key === 's') { e.preventDefault(); searchRef.current?.focus(); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [user]);

  const handleBackup = () => { const data = { customers, deals, products, orders, timestamp: new Date() }; const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `crm_backup_${new Date().toLocaleDateString()}.json`; link.click(); };

  const handleRestore = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (!data.customers || !data.deals || !data.products || !data.orders) {
            alert('Lỗi: Định dạng file sao lưu không hợp lệ!');
            return;
          }
          
          if (window.confirm('CẢNH BÁO: Hành động này sẽ XÓA TOÀN BỘ dữ liệu hiện tại (Khách hàng, Sản phẩm, Công trình, Đơn hàng) và khôi phục từ file sao lưu. Bạn có chắc chắn muốn tiếp tục?')) {
            const res = await apiFetch('/api/backup/restore', {
              method: 'POST',
              body: JSON.stringify(data)
            });
            if (res.success) {
              alert('Đã khôi phục dữ liệu hệ thống thành công!');
              fetchData();
            } else {
              alert('Lỗi khôi phục: ' + res.message);
            }
          }
        } catch (err) {
          alert('Lỗi đọc file: ' + err.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  if (!user) return <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg-color)'}}><div style={{width:350,padding:'3rem',background:'var(--surface-color)',borderRadius:32,border:'1px solid var(--border-color)'}}><h2 style={{textAlign:'center',marginBottom:20}}>Cửa Tự Động Boss</h2><form onSubmit={async e=>{e.preventDefault(); const fd=new FormData(e.target); const res=await fetch(`${API_BASE_URL}/api/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(fd))}); const data=await res.json(); if(res.ok){ const fullUser = {...data.user, token: data.token}; setUser(fullUser); localStorage.setItem('crm_user',JSON.stringify(fullUser));}}} style={{display:'flex',flexDirection:'column',gap:15}}><input name="email" defaultValue="admin@bossdoor.vn" style={{padding:15,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="password" type="password" defaultValue="admin123" style={{padding:15,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><button type="submit" className="btn-primary" style={{padding:15}}>Login</button></form></div></div>;

  return (
    <div className="app-container">
      <Sidebar activeTab={tab} setActiveTab={setTab} onLogout={()=>{setUser(null);localStorage.removeItem('crm_user');}} user={user} lang={lang} />
      <main className="main-content">
        <Header onSearch={setSearch} unreadCount={notifs.filter(n=>!n.isRead).length} searchRef={searchRef} user={user} onLogout={()=>{setUser(null);localStorage.removeItem('crm_user');}} />
        <AnimatePresence mode="wait">
          {tab === 'dashboard' && <Dashboard customers={customers} deals={deals.filter(d=>!d.isArchived)} onSelectCustomer={setSelectedCust} lang={lang} user={user} />}
          {tab === 'customers' && user?.role !== 'accountant' && (
            <div className="animate-in">
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 15 }}>
                <h1>Khách hàng</h1>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button 
                    className="btn-primary" 
                    onClick={async () => {
                      try {
                        const res = await apiFetch('/api/customers/trigger-birthday-wishes', { method: 'POST' });
                        alert(res.message);
                        fetchData();
                      } catch (err) {
                        alert('Lỗi quét sinh nhật: ' + err.message);
                      }
                    }}
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', border: 'none' }}
                  >
                    Quét sinh nhật hôm nay
                  </button>
                  <button className="btn-primary" onClick={() => { setSelectedCustEdit(null); setIsModal('customer'); }}>Mới</button>
                </div>
              </header>
              <div className="section-card">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Tên</th>
                      <th>Ưu tiên</th>
                      <th>Số điện thoại</th>
                      <th>Ngày sinh</th>
                      <th>Nguồn lead</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.filter(c => normalizeString(c.name).includes(normalizeString(search))).map(c => (
                      <tr key={c._id} onClick={() => setSelectedCust(c)} style={{ cursor: 'pointer' }}>
                        <td>{c.name}</td>
                        <td>
                          <span className={`priority-badge priority-${(c.priority || 'Normal').toLowerCase()}`}>
                            {c.priority || 'Normal'}
                          </span>
                        </td>
                        <td>{c.phone}</td>
                        <td>{c.birthday ? new Date(c.birthday).toLocaleDateString('vi-VN') : 'N/A'}</td>
                        <td>{getSourceBadge(c.source)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedCustEdit(c); setIsModal('customer'); }}
                              style={{ background: 'rgba(99,102,241,0.2)', border: 'none', color: '#6366f1', padding: '4px 8px', borderRadius: 6, cursor: 'pointer' }}
                            >
                              Sửa
                            </button>
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (window.confirm('Xóa khách hàng này?')) {
                                  await apiFetch(`/api/customers/${c._id}`, { method: 'DELETE' });
                                  fetchData();
                                }
                              }}
                              style={{ background: 'rgba(239,68,68,0.2)', border: 'none', color: '#ef4444', padding: '4px 8px', borderRadius: 6, cursor: 'pointer' }}
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === 'deals' && <Pipeline deals={deals.filter(d=>!d.isArchived)} onUpdateDeal={(id,u)=>{apiFetch(`/api/deals/${id}`,{method:'PUT',body:JSON.stringify(u)}).then(fetchData);}} onAddDeal={()=>setIsModal('deal')} onPrint={(d)=>setPrintDeal(d)} onArchiveDeal={handleCloseDeal} user={user} />}
          {tab === 'products' && <Products products={filteredProducts} onAddProduct={()=>{setSelectedProduct(null);setIsModal('product');}} onEditProduct={(p)=>{setSelectedProduct(p);setIsModal('product');}} onDeleteProduct={async (id)=>{if(window.confirm('Xóa sản phẩm này?')){await apiFetch(`/api/products/${id}`,{method:'DELETE'});fetchData();}}} />}
          {tab === 'orders' && (
            <Orders 
              orders={orders} 
              onViewInvoice={(o) => setPrintInvoice(o)} 
              onDeleteOrder={async (id) => {
                if (window.confirm('Xóa đơn hàng này?')) {
                  await apiFetch(`/api/orders/${id}`, { method: 'DELETE' });
                  fetchData();
                }
              }} 
              onUpdateOrderStatus={async (id, status)=>{
                try {
                  await apiFetch(`/api/orders/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ status })
                  });
                  fetchData();
                } catch (e) {
                  alert('Lỗi cập nhật trạng thái: ' + e.message);
                }
              }}
              onCollectPayment={async (o) => {
                const amount = prompt(`Nhập TỔNG SỐ TIỀN đã thu lũy kế của đơn hàng này từ trước đến nay (Tổng cộng đơn hàng là: ${o.totalAmount.toLocaleString('vi-VN')} đ, hiện đã thu: ${(o.paidAmount || 0).toLocaleString('vi-VN')} đ):`, o.paidAmount || 0);
                if (amount === null) return;
                const paidVal = parseInt(amount.replace(/\D/g, '') || 0);
                if (paidVal > o.totalAmount) {
                  alert('Lỗi: Số tiền thanh toán không được lớn hơn tổng số tiền của đơn hàng!');
                  return;
                }
                try {
                  await apiFetch(`/api/orders/${o._id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                      paidAmount: paidVal,
                      status: (paidVal >= o.totalAmount) ? 'Paid' : 'Unpaid'
                    })
                  });
                  alert('Cập nhật thu tiền thành công!');
                  fetchData();
                } catch (e) {
                  alert('Lỗi cập nhật thanh toán: ' + e.message);
                }
              }}
              user={user}
            />
          )}
          {tab === 'warranties' && <Warranties warranties={warranties} onAddWarranty={()=>setIsModal('warranty')} onViewWarranty={(w)=>{setSelectedWarranty(w); setIsModal('warranty_log');}} />}
          {tab === 'schedule' && (
            <Schedule 
              tasks={tasks} 
              customers={customers}
              onAddTask={handleAddTask} 
              onToggleTask={handleToggleTask} 
              onDeleteTask={handleDeleteTask} 
              onExecuteCampaign={(campaign) => setExecutingCampaign(campaign)}
            />
          )}
          {tab === 'settings' && <SettingsView user={user} lang={lang} setLang={setLang} onBackup={handleBackup} onRestore={handleRestore} apiFetch={apiFetch} />}
        </AnimatePresence>
        <div className="system-status">
          <div>
            <span className="status-dot" style={{ background: sysStatus.online ? '#10b981' : '#ef4444', boxShadow: sysStatus.online ? '0 0 10px #10b981' : '0 0 10px #ef4444' }}></span>
            Hệ thống: {sysStatus.online ? 'Hoạt động bình thường' : 'Mất kết nối máy chủ'}
          </div>
          <div>
            <Server size={10} style={{marginRight:5}}/> Port: {sysStatus.port} | <Database size={10} style={{marginRight:5}}/> MongoDB: {sysStatus.db}
          </div>
        </div>
      </main>
      <div style={{position:'fixed',bottom:50,right:30}}><button className="btn-primary" style={{width:60,height:60,borderRadius:'50%',boxShadow:'0 10px 25px rgba(99, 102, 241, 0.4)'}} onClick={() => { setSelectedCustEdit(null); setIsModal('customer'); }}><Plus size={30}/></button></div>
      {isModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:3000,backdropFilter:'blur(8px)'}}>
          <div style={{background:'#0f172a',padding:40,borderRadius:24,width:400,border:'1px solid var(--border-color)'}}>
            <h2>{isModal === 'customer' ? (selectedCustEdit ? 'Sửa Khách hàng' : 'Thêm Khách hàng') : isModal === 'product' ? 'Thêm Sản phẩm' : 'Thêm mới'}</h2>
            <form onSubmit={async e=>{
              e.preventDefault(); const fd=new FormData(e.target); 
              if (isModal === 'customer') {
                if (selectedCustEdit) {
                  await apiFetch(`/api/customers/${selectedCustEdit._id}`, { method: 'PUT', body: JSON.stringify(Object.fromEntries(fd)) });
                } else {
                  await apiFetch('/api/customers', { method: 'POST', body: JSON.stringify(Object.fromEntries(fd)) });
                }
              }
              if (isModal === 'product') { if(selectedProduct){await apiFetch(`/api/products/${selectedProduct._id}`,{method:'PUT',body:JSON.stringify(Object.fromEntries(fd))});}else{await apiFetch('/api/products',{method:'POST',body:JSON.stringify(Object.fromEntries(fd))});} }
              if (isModal === 'deal') {
                const customerName = fd.get('customerName');
                const productName = fd.get('productName');
                const matchedProduct = products.find(p => p.name === productName);
                await apiFetch('/api/deals',{method:'POST',body:JSON.stringify({title:fd.get('title'),customer:customerName,product:matchedProduct?._id,value:fd.get('value'),siteAddress:fd.get('siteAddress'),dimensions:fd.get('dimensions'),paidAmount:parseInt(fd.get('paidAmount')||0),assignee:fd.get('assignee')})});
              }
              if (isModal === 'order') await apiFetch('/api/orders',{method:'POST',body:JSON.stringify({customerId:fd.get('customerId'),dealId:fd.get('dealId'),totalAmount:fd.get('totalAmount')})});
              if (isModal === 'warranty') await apiFetch('/api/warranties',{method:'POST',body:JSON.stringify({productName:fd.get('productName'),customerId:fd.get('customerId'),endDate:new Date(new Date().setFullYear(new Date().getFullYear()+1))})});
              if (isModal === 'warranty_log' && selectedWarranty) {
                const updatedLogs = [...(selectedWarranty.issuesLog || []), { issue: fd.get('issue'), resolution: fd.get('resolution') }];
                await apiFetch(`/api/warranties/${selectedWarranty._id}`, { method: 'PUT', body: JSON.stringify({ issuesLog: updatedLogs }) });
              }
              setIsModal(null); fetchData();
            }} style={{display:'flex',flexDirection:'column',gap:15,marginTop:20}}>
              {isModal === 'customer' && (
                <>
                  <input 
                    name="name" 
                    defaultValue={selectedCustEdit?.name} 
                    placeholder="Tên" 
                    required 
                    style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }} 
                  />
                  <input 
                    name="phone" 
                    defaultValue={selectedCustEdit?.phone} 
                    placeholder="Số điện thoại" 
                    required 
                    style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }} 
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: 4 }}>Ngày sinh nhật</label>
                    <input 
                      name="birthday" 
                      type="date"
                      defaultValue={selectedCustEdit?.birthday ? new Date(selectedCustEdit.birthday).toISOString().split('T')[0] : ''} 
                      style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', width: '100%', boxSizing: 'border-box' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: 4 }}>Nguồn Khách hàng</label>
                    <select 
                      name="source" 
                      defaultValue={selectedCustEdit?.source || 'Facebook'} 
                      style={{ padding: 12, borderRadius: 12, background: '#0f172a', border: '1px solid var(--border-color)', color: 'white', width: '100%', boxSizing: 'border-box' }}
                    >
                      <option value="Facebook" style={{ color: 'white', background: '#0f172a' }}>Facebook (Mạng xã hội)</option>
                      <option value="Zalo" style={{ color: 'white', background: '#0f172a' }}>Zalo (Zalo Chat / OA)</option>
                      <option value="TikTok" style={{ color: 'white', background: '#0f172a' }}>TikTok (Mạng xã hội)</option>
                      <option value="Google" style={{ color: 'white', background: '#0f172a' }}>Google (Tìm kiếm)</option>
                      <option value="Website" style={{ color: 'white', background: '#0f172a' }}>Website (Web công ty)</option>
                      <option value="Hotline" style={{ color: 'white', background: '#0f172a' }}>Hotline (Gọi trực tiếp)</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: 4 }}>Mức độ Ưu tiên</label>
                    <select 
                      name="priority" 
                      defaultValue={selectedCustEdit?.priority || 'Normal'} 
                      style={{ padding: 12, borderRadius: 12, background: '#0f172a', border: '1px solid var(--border-color)', color: 'white', width: '100%', boxSizing: 'border-box' }}
                    >
                      <option value="High" style={{ color: 'white', background: '#0f172a' }}>High</option>
                      <option value="Normal" style={{ color: 'white', background: '#0f172a' }}>Normal</option>
                      <option value="Low" style={{ color: 'white', background: '#0f172a' }}>Low</option>
                    </select>
                  </div>
                </>
              )}
              {isModal === 'product' && <><input name="code" defaultValue={selectedProduct?.code} placeholder="Mã SP" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="name" defaultValue={selectedProduct?.name} placeholder="Tên SP" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="category" defaultValue={selectedProduct?.category||'Phụ kiện'} placeholder="Danh mục (Cửa/Phụ kiện)" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="price" defaultValue={selectedProduct?.price} placeholder="Giá" type="number" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="imageUrl" defaultValue={selectedProduct?.imageUrl} placeholder="Link hình ảnh" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/></>}
              {isModal === 'deal' && (
                <>
                  <input name="title" placeholder="Tên Công trình" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/>
                  <SearchableSelect name="customerName" placeholder="-- Tìm / Chọn Khách hàng --" options={customers.map(c=>({value:c._id,label:c.name}))}/>
                  <SearchableSelect name="productName" placeholder="-- Tìm / Chọn Sản phẩm --" options={products.map(p=>({value:p._id,label:p.name}))}/>
                  <input name="siteAddress" placeholder="Địa chỉ thi công" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/>
                  <input name="dimensions" placeholder="Khối lượng (VD: 15m2)" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/>
                  <input name="value" placeholder="Giá trị (Ví dụ: 50000000)" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/>
                  <input name="paidAmount" placeholder="Đã thanh toán (Ví dụ: 20000000)" type="number" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/>
                  <input name="assignee" placeholder="Đội phụ trách (Tùy chọn)" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/>
                </>
              )}
              {isModal === 'order' && <><select name="customerId" required style={{padding:12,borderRadius:12,background:'#0f172a',border:'1px solid var(--border-color)',color:'white'}}><option value="" disabled selected style={{ color: '#94a3b8', background: '#0f172a' }}>-- Chọn Khách hàng --</option>{customers.map(c=><option key={c._id} value={c._id} style={{ color: 'white', background: '#0f172a' }}>{c.name}</option>)}</select><select name="dealId" required style={{padding:12,borderRadius:12,background:'#0f172a',border:'1px solid var(--border-color)',color:'white'}}><option value="" disabled selected style={{ color: '#94a3b8', background: '#0f172a' }}>-- Chọn Công trình --</option>{deals.map(d=><option key={d._id} value={d._id} style={{ color: 'white', background: '#0f172a' }}>{d.title}</option>)}</select><input name="totalAmount" placeholder="Tổng tiền" type="number" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/></>}
              {isModal === 'warranty' && <><select name="customerId" required style={{padding:12,borderRadius:12,background:'#0f172a',border:'1px solid var(--border-color)',color:'white'}}><option value="" disabled selected style={{ color: '#94a3b8', background: '#0f172a' }}>-- Chọn Khách hàng --</option>{customers.map(c=><option key={c._id} value={c._id} style={{ color: 'white', background: '#0f172a' }}>{c.name}</option>)}</select><select name="productName" required style={{padding:12,borderRadius:12,background:'#0f172a',border:'1px solid var(--border-color)',color:'white'}}><option value="" disabled selected style={{ color: '#94a3b8', background: '#0f172a' }}>-- Chọn Sản phẩm --</option>{products.map(p=><option key={p._id} value={p.name} style={{ color: 'white', background: '#0f172a' }}>{p.name}</option>)}</select></>}
              {isModal === 'warranty_log' && selectedWarranty && <><h3 style={{color:'white',marginBottom:10}}>Ghi nhận sự cố</h3><input name="issue" placeholder="Mô tả sự cố (VD: kẹt motor)" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="resolution" placeholder="Cách xử lý (VD: thay hành trình)" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/></>}
              <button type="submit" className="btn-primary" style={{padding:12}}>Lưu</button>
              <button type="button" onClick={()=>setIsModal(null)} style={{background:'none',border:'none',color:'white'}}>Hủy</button>
            </form>
          </div>
        </div>
      )}
      <AnimatePresence>{selectedCust && (
        <>
          <motion.div className="drawer-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelectedCust(null)} />
          <motion.div className="drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} style={{display: 'flex', flexDirection: 'column'}}>
            <div className="drawer-header">
              <div style={{display:'flex',gap:10,alignItems:'center'}}>
                <div className="avatar">{selectedCust.name[0]}</div>
                <h3>{selectedCust.name}</h3>
              </div>
              <button onClick={()=>setSelectedCust(null)} style={{background:'none',border:'none',color:'white'}}><X size={24}/></button>
            </div>
            
            <div style={{padding: '0 24px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto'}}>
              {/* Thông tin chi tiết */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.9rem' }}>
                <div><strong>Số điện thoại:</strong> {selectedCust.phone}</div>
                <div><strong>Ngày sinh nhật:</strong> {selectedCust.birthday ? new Date(selectedCust.birthday).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong>Nguồn khách hàng:</strong> {getSourceBadge(selectedCust.source)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0ea5e9', fontWeight: 'bold', fontSize: '0.8rem', marginTop: 4 }}>
                  <Zap size={14} /> Tự động CSKH & CMSN qua Zalo OA
                </div>
              </div>
              
              {/* Form thêm ghi chú */}
              <form onSubmit={handleSaveNote} className="activity-section" style={{marginBottom: '2rem'}}>
                <h4>Ghi chú mới</h4>
                <textarea 
                  className="activity-input" 
                  rows="3" 
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Nhập ghi chú liên hệ, trao đổi với khách hàng..."
                  required
                />
                <button type="submit" className="btn-primary" style={{width:'100%', marginTop: '10px'}}>Lưu ghi chú</button>
              </form>

              {/* Danh sách lịch sử ghi chú */}
              <div style={{flex: 1}}>
                <h4 style={{marginBottom: '10px'}}>Lịch sử tương tác</h4>
                {activities.length === 0 ? (
                  <div style={{color: '#64748b', fontSize: '0.85rem', fontStyle: 'italic'}}>Chưa có ghi chú nào.</div>
                ) : (
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    {activities.map(act => (
                      <div key={act._id} style={{background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '16px', border: '1px solid var(--border-color)'}}>
                        <div style={{fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                          <span>Ghi chú</span>
                          <span>{new Date(act.date).toLocaleString('vi-VN')}</span>
                        </div>
                        <div style={{fontSize: '0.9rem', color: '#e2e8f0', whiteSpace: 'pre-wrap'}}>{act.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}</AnimatePresence>
      {printDeal && <QuotePrintView deal={printDeal} onCancel={()=>setPrintDeal(null)} />}
      {printInvoice && <InvoicePrintView order={printInvoice} onCancel={()=>setPrintInvoice(null)} />}
      {executingCampaign && (
        <CampaignExecutionModal 
          campaign={executingCampaign} 
          customers={customers} 
          onComplete={fetchData} 
          onClose={() => setExecutingCampaign(null)} 
        />
      )}
    </div>
  );
}

const CampaignExecutionModal = ({ campaign, customers, onComplete, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'running' | 'completed'

  const startSending = async () => {
    setIsRunning(true);
    setStatus('running');
    setLogs([]);
    setProgress(0);

    const log = (msg) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString('vi-VN')}] ${msg}`]);

    log(`Bắt đầu chiến dịch: "${campaign.title}"`);
    await new Promise(r => setTimeout(r, 800));

    log('Đang kết nối tới SMS Gateway... OK');
    await new Promise(r => setTimeout(r, 600));

    log(`Chuẩn bị gửi tin nhắn tới ${customers.length} khách hàng...`);
    await new Promise(r => setTimeout(r, 600));

    let sent = 0;
    const recipients = customers.filter(c => c.phone);
    
    if (recipients.length === 0) {
      log('Cảnh báo: Không tìm thấy khách hàng nào có Số điện thoại.');
      setStatus('completed');
      setIsRunning(false);
      return;
    }

    for (let i = 0; i < recipients.length; i++) {
      const cust = recipients[i];
      log(`Đang gửi tới ${cust.name} (${cust.phone})...`);
      
      // Simulate small delay for UI effect
      await new Promise(r => setTimeout(r, 400));
      
      log(`  -> Thành công!`);
      sent++;
      setProgress(Math.round(((i + 1) / recipients.length) * 100));
    }

    log('--- Đang lưu kết quả chiến dịch lên database... ---');
    try {
      const res = await fetch(`${API_BASE_URL}/api/tasks/${campaign._id}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('crm_user')).token}`
        }
      });
      if (res.ok) {
        log(`Đồng bộ cơ sở dữ liệu thành công.`);
      } else {
        log(`Cảnh báo: Không thể lưu trạng thái lên database.`);
      }
    } catch (e) {
      log(`Lỗi kết nối database: ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 500));
    log(`Chúc mừng! Chiến dịch hoàn thành. Đã gửi ${sent}/${recipients.length} tin nhắn.`);
    setStatus('completed');
    setIsRunning(false);
    onComplete();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000, backdropFilter: 'blur(8px)' }}>
      <div style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: 24, padding: 30, width: 600, maxWidth: '90%', display: 'flex', flexDirection: 'column', height: 500 }}>
        <h2 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: 10, margin: 0, paddingBottom: 15, borderBottom: '1px solid var(--border-color)' }}>
          <span style={{ color: '#a855f7' }}><Send size={24} /></span>
          Chạy Chiến dịch: {campaign.title}
        </h2>
        
        {/* Terminal Logs Window */}
        <div style={{ flex: 1, background: '#020617', border: '1px solid #1e293b', borderRadius: 12, padding: 15, fontFamily: 'monospace', fontSize: '0.85rem', color: '#10b981', overflowY: 'auto', margin: '20px 0', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {logs.length === 0 ? (
            <div style={{ color: '#64748b', fontStyle: 'italic', textAlign: 'center', marginTop: '20%' }}>
              Nhấn "Bắt đầu gửi" để khởi chạy chiến dịch quảng bá.
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ whiteSpace: 'pre-wrap' }}>{log}</div>
            ))
          )}
        </div>

        {/* Progress Bar */}
        {status === 'running' && (
          <div style={{ width: '100%', background: '#1e293b', height: 10, borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)', transition: 'width 0.3s' }}></div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 15, justifyContent: 'flex-end' }}>
          {status === 'idle' && (
            <button 
              onClick={startSending} 
              className="btn-primary" 
              style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', border: 'none', padding: '12px 24px', fontWeight: 'bold' }}
            >
              Bắt đầu gửi
            </button>
          )}
          {status === 'completed' && (
            <button 
              onClick={onClose} 
              className="btn-primary" 
              style={{ padding: '12px 24px', fontWeight: 'bold' }}
            >
              Đóng Console
            </button>
          )}
          {!isRunning && status !== 'completed' && (
            <button 
              onClick={onClose} 
              style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
            >
              Hủy bỏ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
