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

// --- TRANSLATIONS ---
const translations = {
  vi: { dashboard: 'Bảng điều khiển', customers: 'Khách hàng', deals: 'Công trình', products: 'Sản phẩm', orders: 'Lịch sử Đơn hàng', warranties: 'Bảo hành', schedule: 'Lịch trình', settings: 'Cài đặt', logout: 'Đăng xuất', welcome: 'Chào buổi chiều', revenue: 'Doanh thu', new_cust: 'Khách hàng mới', open_deals: 'Đang thi công', recent: 'Gần đây', priority: 'Ưu tiên', status: 'Trạng thái', add_new: 'Thêm mới', save: 'Lưu', cancel: 'Hủy' },
  en: { dashboard: 'Dashboard', customers: 'Customers', deals: 'Projects', products: 'Products', orders: 'Order History', warranties: 'Warranties', schedule: 'Schedule', settings: 'Settings', logout: 'Logout', welcome: 'Good afternoon', revenue: 'Revenue', new_cust: 'New Customers', open_deals: 'Active Projects', recent: 'Recent', priority: 'Priority', status: 'Status', add_new: 'Add New', save: 'Save', cancel: 'Cancel' }
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
  const menuItems = [{ id: 'dashboard', icon: LayoutDashboard, label: t.dashboard, key: '1' }, { id: 'customers', icon: Users, label: t.customers, key: '2' }, { id: 'deals', icon: Target, label: t.deals, key: '3' }, { id: 'products', icon: FileSpreadsheet, label: t.products, key: '4' }, { id: 'orders', icon: DollarSign, label: t.orders, key: '5' }, { id: 'warranties', icon: Shield, label: t.warranties, key: '6' }, { id: 'schedule', icon: Calendar, label: t.schedule, key: '7' }, { id: 'settings', icon: Settings, label: t.settings, key: '8' }];
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

const Dashboard = ({ customers, deals, onSelectCustomer, lang }) => {
  const t = translations[lang];
  const funnelData = [{ value: deals.length, name: 'Báo giá', fill: '#6366f1' }, { value: deals.filter(d => d.stage === 'Thi công' || d.stage === 'Hoàn thành').length, name: 'Thi công', fill: '#ec4899' }, { value: deals.filter(d => d.stage === 'Hoàn thành').length, name: 'Hoàn thành', fill: '#10b981' }];
  return (
    <div className="animate-in">
      <div className="dashboard-grid">
        <div className="stat-card"><h3>{t.revenue}</h3><div className="stat-value">{deals.filter(d=>d.stage==='Hoàn thành').reduce((s,d)=>s+parseInt(d.value.replace(/\D/g,'')||0),0).toLocaleString('vi-VN')} đ</div></div>
        <div className="stat-card"><h3>{t.new_cust}</h3><div className="stat-value">{customers.length}</div></div>
        <div className="stat-card"><h3>{t.open_deals}</h3><div className="stat-value">{deals.filter(d=>d.stage!=='Hoàn thành').length}</div></div>
      </div>
      <div className="chart-container-row">
        <div className="chart-container"><h3>Sales Funnel</h3><div style={{height:250}}><ResponsiveContainer width="100%" height="100%"><FunnelChart><Tooltip /><Funnel dataKey="value" data={funnelData} isAnimationActive><LabelList position="right" fill="#94a3b8" dataKey="name" /></Funnel></FunnelChart></ResponsiveContainer></div></div>
        <div className="chart-container"><h3>Priority</h3><div style={{height:250}}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{n:'High',v:customers.filter(c=>c.priority==='High').length},{n:'Norm',v:customers.filter(c=>c.priority==='Normal').length},{n:'Low',v:customers.filter(c=>c.priority==='Low').length}]} innerRadius={60} outerRadius={80} dataKey="v" nameKey="n"><Cell fill="#ef4444"/><Cell fill="#6366f1"/><Cell fill="#94a3b8"/></Pie><Tooltip /></PieChart></ResponsiveContainer></div></div>
      </div>
      <div className="section-card"><h2>{t.recent}</h2><table className="data-table"><tbody>{customers.slice(0,5).map(c=>(<tr key={c._id} onClick={()=>onSelectCustomer(c)} style={{cursor:'pointer'}}><td>{c.name}</td><td><span className={`priority-badge priority-${(c.priority||'Normal').toLowerCase()}`}>{c.priority||'Normal'}</span></td><td>{c.status}</td></tr>))}</tbody></table></div>
    </div>
  );
};

const Pipeline = ({ deals, onUpdateDeal, onAddDeal, onPrint, onArchiveDeal }) => {
  const stages = ['Báo giá', 'Thi công', 'Hoàn thành'];
  return (
    <div className="animate-in">
      <header><h1>Tiến độ Công trình</h1><button className="btn-primary" onClick={onAddDeal}><Plus size={18}/> Thêm Công trình</button></header>
      <div className="kanban-board">
        {stages.map(s => (
          <div key={s} className="kanban-column">
            <div className="column-header"><div className="column-title">{s}</div><div style={{fontSize:12, opacity:0.6}}>{deals.filter(d=>d.stage===s).length}</div></div>
            <Reorder.Group axis="y" values={deals.filter(d=>d.stage===s)} onReorder={()=>{}} style={{listStyle:'none',padding:0}}>
              {deals.filter(d=>d.stage===s).map(deal => {
                const total = parseInt(String(deal.value || '').replace(/\D/g,'')||0);
                const debt = total - (deal.paidAmount || 0);
                return (
                <Reorder.Item key={deal._id} value={deal}>
                  <div className="deal-card">
                    <div className="deal-title">{deal.title}</div>
                    <div className="deal-customer"><User size={12} style={{display:'inline',marginRight:4,marginBottom:-2}}/>{deal.customer}</div>
                    <div className="deal-footer" style={{marginTop:'1rem'}}>
                      <span style={{color:'#10b981', fontWeight:'bold', fontSize:'0.9rem'}}>{parseInt(String(deal.value || '').replace(/\D/g,'')||0).toLocaleString('vi-VN')} đ</span>
                      {debt > 0 && s==='Hoàn thành' ? <span style={{color:'#ef4444',fontSize:'0.75rem',fontWeight:'bold'}}>Nợ: {debt.toLocaleString('vi-VN')} đ</span> : null}
                      {s === 'Hoàn thành' ? (
                        <button onClick={()=>onArchiveDeal(deal)} style={{background:'rgba(59, 130, 246, 0.1)',border:'1px solid rgba(59, 130, 246, 0.2)',color:'#3b82f6',padding:'4px 8px',borderRadius:6,fontSize:'0.7rem',display:'flex',alignItems:'center',gap:4}}>Chốt đơn & Lưu LS <CheckCircle2 size={14}/></button>
                      ) : (
                        <button onClick={()=>onUpdateDeal(deal._id,{stage:stages[stages.indexOf(s)+1]||s})} style={{background:'rgba(16, 185, 129, 0.1)',border:'1px solid rgba(16, 185, 129, 0.2)',color:'#10b981',padding:'4px 8px',borderRadius:6,fontSize:'0.7rem',display:'flex',alignItems:'center',gap:4}}>Chuyển bước <ArrowRight size={14}/></button>
                      )}
                    </div>
                    {s==='Báo giá' && <button onClick={()=>onPrint(deal)} style={{width:'100%',marginTop:10,padding:8,fontSize:'0.85rem',fontWeight:'bold'}} className="btn-primary">In Báo Giá PDF</button>}
                  </div>
                </Reorder.Item>
              )})}
            </Reorder.Group>
          </div>
        ))}
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

const Orders = ({ orders, onAddOrder }) => (
  <div className="animate-in">
    <header><h1>Lịch sử Đơn hàng</h1></header>
    <div className="section-card"><table className="data-table"><thead><tr><th>Mã Đơn / Ngày</th><th>Tên Công trình</th><th>Khách hàng</th><th>Tổng tiền</th><th>Trạng thái</th></tr></thead><tbody>{orders.map(o=>(<tr key={o._id}><td><div style={{fontWeight:'bold',color:'#6366f1'}}>#{o._id.slice(-6).toUpperCase()}</div><div style={{fontSize:'0.8rem',color:'#64748b'}}>{new Date(o.createdAt).toLocaleDateString('vi-VN')}</div></td><td>{o.dealId?.title || 'Đơn hàng lẻ'}</td><td>{o.customerId?.name || 'N/A'}</td><td style={{fontWeight:'bold',color:'#10b981'}}>{(o.totalAmount||0).toLocaleString('vi-VN')} đ</td><td><span className={`priority-badge priority-normal`}>{o.status === 'Paid' ? 'Đã thanh toán' : o.status}</span></td></tr>))}</tbody></table></div>
  </div>
);

const Warranties = ({ warranties, onAddWarranty, onViewWarranty }) => (
  <div className="animate-in">
    <header><h1>Quản lý Bảo hành</h1><button className="btn-primary" onClick={onAddWarranty}>Thêm Phiếu</button></header>
    <div className="section-card"><table className="data-table"><thead><tr><th>Khách hàng</th><th>Sản phẩm</th><th>Ngày Hết hạn</th><th>Trạng thái</th></tr></thead><tbody>{warranties.map(w=>(<tr key={w._id} onClick={()=>onViewWarranty(w)} style={{cursor:'pointer'}}><td>{w.customerId?.name || 'N/A'}</td><td>{w.productName}</td><td>{new Date(w.endDate).toLocaleDateString()}</td><td><span className={`priority-badge priority-${w.status==='Active'?'normal':'high'}`}>{w.status}</span></td></tr>))}</tbody></table></div>
  </div>
);

const Schedule = () => {
  const [tasks, setTasks] = useState([{id:1,t:'Gọi điện tư vấn khách VIP',time:'09:30',done:false},{id:2,t:'Gửi báo giá dự án Boss',time:'14:00',done:true}]);
  return (
    <div className="animate-in"><header><h1>Lịch trình công việc</h1></header>
      <div style={{display:'flex',flexDirection:'column',gap:15}}>{tasks.map(x=>(<div key={x.id} className="section-card" style={{display:'flex',alignItems:'center',gap:20,padding:'1.5rem'}}><div onClick={()=>setTasks(tasks.map(y=>y.id===x.id?{...y,done:!y.done}:y))} style={{color:x.done?'#10b981':'#94a3b8',cursor:'pointer'}}><CheckCircle size={28}/></div><div style={{flex:1,textDecoration:x.done?'line-through':'none',opacity:x.done?0.5:1}}><div style={{fontWeight:600}}>{x.t}</div><div style={{fontSize:'0.8rem',color:'var(--text-secondary)'}}><Clock size={12} style={{marginRight:5}}/> {x.time}</div></div></div>))}</div>
    </div>
  );
};

const SettingsView = ({ user, lang, setLang, onBackup }) => (
  <div className="animate-in"><header><h1>Cài đặt hệ thống</h1></header>
    <div className="dashboard-grid">
      <div className="section-card"><h3>Ngôn ngữ</h3><div style={{display:'flex',gap:10,marginTop:15}}><button onClick={()=>setLang('vi')} className="btn-primary" style={{background:lang==='vi'?'':'transparent'}}>Việt</button><button onClick={()=>setLang('en')} className="btn-primary" style={{background:lang==='en'?'':'transparent'}}>English</button></div></div>
      <div className="section-card"><h3>Dữ liệu</h3><p style={{fontSize:'0.8rem',color:'var(--text-secondary)',marginBottom:15}}>Xuất toàn bộ dữ liệu ra file JSON để sao lưu.</p><button onClick={onBackup} className="btn-primary" style={{background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}><CloudDownload size={18} style={{marginRight:8}}/> Sao lưu ngay</button></div>
    </div>
  </div>
);

const QuotePrintView = ({ deal, onCancel }) => {
  if (!deal) return null;
  const today = new Date();
  const dateStr = `Ngày ${today.getDate()} tháng ${today.getMonth()+1} năm ${today.getFullYear()}`;
  
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
            <div style={{width:80, height:80, background:'#1e40af', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize: 32, fontWeight:'bold', borderRadius:8}}>BD</div>
            <div>
              <h2 style={{margin:0, color:'#1e40af', fontSize:'1.4rem'}}>CÔNG TY TNHH BOSS DOOR ĐÀ NẴNG</h2>
              <p style={{margin:'5px 0 0 0', fontSize:'0.9rem'}}>Địa chỉ: 123 Nguyễn Hữu Thọ, Hải Châu, Đà Nẵng</p>
              <p style={{margin:'2px 0 0 0', fontSize:'0.9rem'}}>Hotline: 0905.xxx.xxx - Email: info@bossdoor.vn</p>
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
              <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right'}}>{deal.value}</td>
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
              <td style={{padding:12, border:'1px solid #cbd5e1', textAlign:'right', color:'#dc2626', fontSize:'1.1rem'}}>{deal.value} đ</td>
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

const SearchableSelect = ({ name, placeholder, options }) => {
  const [val, setVal] = useState('');
  const [open, setOpen] = useState(false);
  
  const normalize = (str) => typeof str === 'string' ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';
  
  const filtered = options.filter(o => {
    // Match exact string or normalized string
    return o.label.toLowerCase().includes(val.toLowerCase()) || 
           normalize(o.label).includes(normalize(val));
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
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [printDeal, setPrintDeal] = useState(null);
  const [lang, setLang] = useState('vi'); const [search, setSearch] = useState('');
  const searchRef = useRef(null);

  const apiFetch = async (url, options = {}) => {
    const headers = { 'Content-Type': 'application/json', ...(user ? { 'Authorization': `Bearer ${user.token}` } : {}), ...options.headers };
    const res = await fetch(`http://localhost:5000${url}`, { ...options, headers });
    if (!res.ok) throw new Error('API Error');
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
      const [c, d, n, p, o, w] = await Promise.all([
        apiFetch('/api/customers'), apiFetch('/api/deals'), apiFetch('/api/notifications'), apiFetch('/api/products'), apiFetch('/api/orders'), apiFetch('/api/warranties')
      ]);
      setCustomers(c); setDeals(d); setNotifs(n); setProducts(p); setOrders(o); setWarranties(w);
    } catch(err) { console.error(err); }
  };
  useEffect(() => { fetchData(); }, [user]);

  const handleCloseDeal = async (deal) => {
    try {
      const matchedCustomer = customers.find(c => c.name === deal.customer);
      const customerId = matchedCustomer ? matchedCustomer._id : null;
      if (customerId) {
        await apiFetch('/api/orders', { method: 'POST', body: JSON.stringify({
          customerId,
          dealId: deal._id,
          totalAmount: parseInt(String(deal.value || '').replace(/\D/g,'') || 0),
          status: 'Paid',
          items: deal.product ? [{ productId: deal.product._id || deal.product, quantity: 1, price: parseInt(String(deal.value || '').replace(/\D/g,'') || 0) }] : []
        })});
      }
      await apiFetch(`/api/deals/${deal._id}`, { method: 'PUT', body: JSON.stringify({ isArchived: true }) });
      alert('Đã chốt đơn thành công! Xem lại trong tab Đơn hàng.');
      fetchData();
    } catch (e) {
      alert('Lỗi chốt đơn: ' + e.message);
    }
  };

  // Keyboard Shortcuts Logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        if (e.key === '1') setTab('dashboard');
        if (e.key === '2') setTab('customers');
        if (e.key === '3') setTab('deals');
        if (e.key === '4') setTab('products');
        if (e.key === '5') setTab('orders');
        if (e.key === '6') setTab('warranties');
        if (e.key === '7') setTab('schedule');
        if (e.key === '8') setTab('settings');
        if (e.key === 'n') setIsModal('customer');
        if (e.key === 's') { e.preventDefault(); searchRef.current?.focus(); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBackup = () => { const data = { customers, deals, products, orders, timestamp: new Date() }; const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `crm_backup_${new Date().toLocaleDateString()}.json`; link.click(); };

  if (!user) return <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg-color)'}}><div style={{width:350,padding:'3rem',background:'var(--surface-color)',borderRadius:32,border:'1px solid var(--border-color)'}}><h2 style={{textAlign:'center',marginBottom:20}}>Cửa Tự Động Boss</h2><form onSubmit={async e=>{e.preventDefault(); const fd=new FormData(e.target); const res=await fetch('http://localhost:5000/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(fd))}); const data=await res.json(); if(res.ok){ const fullUser = {...data.user, token: data.token}; setUser(fullUser); localStorage.setItem('crm_user',JSON.stringify(fullUser));}}} style={{display:'flex',flexDirection:'column',gap:15}}><input name="email" defaultValue="admin@bossdoor.vn" style={{padding:15,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="password" type="password" defaultValue="admin123" style={{padding:15,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><button type="submit" className="btn-primary" style={{padding:15}}>Login</button></form></div></div>;

  return (
    <div className="app-container">
      <Sidebar activeTab={tab} setActiveTab={setTab} onLogout={()=>{setUser(null);localStorage.removeItem('crm_user');}} user={user} lang={lang} />
      <main className="main-content">
        <Header onSearch={setSearch} unreadCount={notifs.filter(n=>!n.isRead).length} searchRef={searchRef} user={user} onLogout={()=>{setUser(null);localStorage.removeItem('crm_user');}} />
        <AnimatePresence mode="wait">
          {tab === 'dashboard' && <Dashboard customers={customers} deals={deals.filter(d=>!d.isArchived)} onSelectCustomer={setSelectedCust} lang={lang} />}
          {tab === 'customers' && <div className="animate-in"><header><h1>Khách hàng</h1><button className="btn-primary" onClick={()=>setIsModal('customer')}>Mới</button></header><div className="section-card"><table className="data-table"><thead><tr><th>Tên</th><th>Ưu tiên</th><th>Email</th></tr></thead><tbody>{customers.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())).map(c=>(<tr key={c._id} onClick={()=>setSelectedCust(c)} style={{cursor:'pointer'}}><td>{c.name}</td><td><span className={`priority-badge priority-${(c.priority||'Normal').toLowerCase()}`}>{c.priority||'Normal'}</span></td><td>{c.email}</td></tr>))}</tbody></table></div></div>}
          {tab === 'deals' && <Pipeline deals={deals.filter(d=>!d.isArchived)} onUpdateDeal={(id,u)=>{apiFetch(`/api/deals/${id}`,{method:'PUT',body:JSON.stringify(u)}).then(fetchData);}} onAddDeal={()=>setIsModal('deal')} onPrint={(d)=>setPrintDeal(d)} onArchiveDeal={handleCloseDeal} />}
          {tab === 'products' && <Products products={products} onAddProduct={()=>{setSelectedProduct(null);setIsModal('product');}} onEditProduct={(p)=>{setSelectedProduct(p);setIsModal('product');}} onDeleteProduct={async (id)=>{if(window.confirm('Xóa sản phẩm này?')){await apiFetch(`/api/products/${id}`,{method:'DELETE'});fetchData();}}} />}
          {tab === 'orders' && <Orders orders={orders} onAddOrder={()=>setIsModal('order')} />}
          {tab === 'warranties' && <Warranties warranties={warranties} onAddWarranty={()=>setIsModal('warranty')} onViewWarranty={(w)=>{setSelectedWarranty(w); setIsModal('warranty_log');}} />}
          {tab === 'schedule' && <Schedule />}
          {tab === 'settings' && <SettingsView user={user} lang={lang} setLang={setLang} onBackup={handleBackup} />}
        </AnimatePresence>
        <div className="system-status"><div><span className="status-dot"></span>Hệ thống: Hoạt động bình thường</div><div><Server size={10} style={{marginRight:5}}/> Port: 5000 | <Database size={10} style={{marginRight:5}}/> MongoDB: Connected</div></div>
      </main>
      <div style={{position:'fixed',bottom:50,right:30}}><button className="btn-primary" style={{width:60,height:60,borderRadius:'50%',boxShadow:'0 10px 25px rgba(99, 102, 241, 0.4)'}} onClick={()=>setIsModal('customer')}><Plus size={30}/></button></div>
      {isModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:3000,backdropFilter:'blur(8px)'}}>
          <div style={{background:'#0f172a',padding:40,borderRadius:24,width:400,border:'1px solid var(--border-color)'}}>
            <h2>{isModal === 'customer' ? 'Thêm Khách hàng' : isModal === 'product' ? 'Thêm Sản phẩm' : 'Thêm mới'}</h2>
            <form onSubmit={async e=>{
              e.preventDefault(); const fd=new FormData(e.target); 
              if (isModal === 'customer') await apiFetch('/api/customers',{method:'POST',body:JSON.stringify(Object.fromEntries(fd))});
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
              {isModal === 'customer' && <><input name="name" placeholder="Tên" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="email" placeholder="Email" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/></>}
              {isModal === 'product' && <><input name="code" defaultValue={selectedProduct?.code} placeholder="Mã SP" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="name" defaultValue={selectedProduct?.name} placeholder="Tên SP" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="category" defaultValue={selectedProduct?.category||'Phụ kiện'} placeholder="Danh mục (Cửa/Phụ kiện)" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="price" defaultValue={selectedProduct?.price} placeholder="Giá" type="number" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="imageUrl" defaultValue={selectedProduct?.imageUrl} placeholder="Link hình ảnh" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/></>}
              {isModal === 'deal' && <><input name="title" placeholder="Tên Công trình" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><SearchableSelect name="customerName" placeholder="-- Tìm / Chọn Khách hàng --" options={customers.map(c=>({value:c._id,label:c.name}))}/><SearchableSelect name="productName" placeholder="-- Tìm / Chọn Sản phẩm --" options={products.map(p=>({value:p._id,label:p.name}))}/><input name="siteAddress" placeholder="Địa chỉ thi công" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="dimensions" placeholder="Khối lượng (VD: 15m2)" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="value" placeholder="Giá trị (Ví dụ: 50000000)" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="paidAmount" placeholder="Đã thanh toán (Ví dụ: 20000000)" type="number" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="assignee" placeholder="Đội phụ trách (Tùy chọn)" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/></>}
              {isModal === 'order' && <><select name="customerId" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}><option value="" disabled selected>-- Chọn Khách hàng --</option>{customers.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}</select><select name="dealId" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}><option value="" disabled selected>-- Chọn Công trình --</option>{deals.map(d=><option key={d._id} value={d._id}>{d.title}</option>)}</select><input name="totalAmount" placeholder="Tổng tiền" type="number" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/></>}
              {isModal === 'warranty' && <><select name="customerId" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}><option value="" disabled selected>-- Chọn Khách hàng --</option>{customers.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}</select><select name="productName" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}><option value="" disabled selected>-- Chọn Sản phẩm --</option>{products.map(p=><option key={p._id} value={p.name}>{p.name}</option>)}</select></>}
              {isModal === 'warranty_log' && selectedWarranty && <><h3 style={{color:'white',marginBottom:10}}>Ghi nhận sự cố</h3><input name="issue" placeholder="Mô tả sự cố (VD: kẹt motor)" required style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/><input name="resolution" placeholder="Cách xử lý (VD: thay hành trình)" style={{padding:12,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border-color)',color:'white'}}/></>}
              <button type="submit" className="btn-primary" style={{padding:12}}>Lưu</button>
              <button type="button" onClick={()=>setIsModal(null)} style={{background:'none',border:'none',color:'white'}}>Hủy</button>
            </form>
          </div>
        </div>
      )}
      <AnimatePresence>{selectedCust && (
        <><motion.div className="drawer-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelectedCust(null)} /><motion.div className="drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}}><div className="drawer-header"><div style={{display:'flex',gap:10,alignItems:'center'}}><div className="avatar">{selectedCust.name[0]}</div><h3>{selectedCust.name}</h3></div><button onClick={()=>setSelectedCust(null)} style={{background:'none',border:'none',color:'white'}}><X size={24}/></button></div><div className="activity-section"><h4>Ghi chú</h4><textarea className="activity-input" rows="3" /><button className="btn-primary" style={{width:'100%'}}>Lưu</button></div></motion.div></>
      )}</AnimatePresence>
      {printDeal && <QuotePrintView deal={printDeal} onCancel={()=>setPrintDeal(null)} />}
    </div>
  );
}

export default App;
