/* Design note: Black Label ERP — dark editorial operations console, Rainha Gold #C9A227 as a restrained signal color, asymmetric dashboard modules, Playfair Display + DM Sans, short motion and high-contrast data hierarchy. */
import { useMemo, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import {
  Activity,
  Archive,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Boxes,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CloudOff,
  CreditCard,
  FileBarChart,
  FileDown,
  Filter,
  Gem,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings2,
  Share2,
  ShieldCheck,
  Smartphone,
  Store,
  UserRound,
  UsersRound,
  Wifi,
  X,
  Camera,
  Moon,
  Sun,
  Save,
} from "lucide-react";

const logo = "/manus-storage/rainha-crown-mark_45f7ac7c.png";
const texture = "/manus-storage/rainha-dashboard-texture_f5713e94.png";
const productStill = "/manus-storage/rainha-product-still-life_09453806.png";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "revendedores", label: "Revendedores", icon: UsersRound },
  { id: "relatorios", label: "Relatório semanal", icon: FileBarChart },
  { id: "pagamentos", label: "Pagamentos", icon: CreditCard },
  { id: "mercadorias", label: "Mercadorias", icon: Boxes },
  { id: "semanas", label: "Semanas", icon: CalendarDays },
  { id: "configuracoes", label: "Configurações", icon: Settings2 },
];

type SellerItem = { item: string; quantity: number; unit: string; total: string; date: string; note: string };
type Seller = { name: string; initials: string; phone: string; total: string; status: string; updated: string; tone: string; avatar?: string; items?: SellerItem[] };

const sellers: Seller[] = [
  { name: "João Carlos", initials: "JC", phone: "(11) 98824-1740", total: "R$ 350,00", status: "Pendente", updated: "Hoje, 09:42", tone: "danger", items: [{ item: "Película iPhone 11", quantity: 5, unit: "R$ 15,00", total: "R$ 75,00", date: "14 ago", note: "" }, { item: "Capa iPhone 11", quantity: 10, unit: "R$ 18,00", total: "R$ 180,00", date: "14 ago", note: "" }, { item: "Carregador Turbo", quantity: 2, unit: "R$ 45,00", total: "R$ 90,00", date: "13 ago", note: "" }] },
  { name: "Maria Oliveira", initials: "MO", phone: "(11) 99718-4206", total: "R$ 640,00", status: "Pago", updated: "Hoje, 08:18", tone: "success" },
  { name: "Carlos Henrique", initials: "CH", phone: "(11) 98122-9031", total: "R$ 120,00", status: "Acordo", updated: "Ontem, 17:26", tone: "warning" },
  { name: "Ana Beatriz", initials: "AB", phone: "(11) 99645-1198", total: "R$ 890,00", status: "Pago", updated: "Ontem, 14:02", tone: "success" },
  { name: "Rafael Souza", initials: "RS", phone: "(11) 98931-2088", total: "R$ 275,00", status: "Pendente", updated: "12 ago, 16:30", tone: "danger" },
];

const weekly = [
  { day: "SEG", value: 42 }, { day: "TER", value: 68 }, { day: "QUA", value: 52 },
  { day: "QUI", value: 78 }, { day: "SEX", value: 88 }, { day: "SÁB", value: 30 },
];

function formatTitle(id: string) {
  return navItems.find((item) => item.id === id)?.label ?? "Dashboard";
}

function initialsFor(name: string) { return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase(); }
function currency(value: number) { return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }

function StatusPill({ status }: { status: string }) {
  const styles = status === "Pago" ? "status-success" : status === "Acordo" ? "status-warning" : "status-danger";
  return <span className={`status-pill ${styles}`}><span className="status-dot" />{status}</span>;
}

function MetricCard({ label, value, detail, icon: Icon, accent, trend }: { label: string; value: string; detail: string; icon: typeof Activity; accent: string; trend?: string }) {
  return (
    <article className="metric-card" style={{ "--metric-accent": accent } as React.CSSProperties}>
      <div className="metric-top"><span className="metric-label">{label}</span><span className="metric-icon"><Icon size={16} /></span></div>
      <div className="metric-value">{value}</div>
      <div className="metric-detail">{trend && <span className="trend-up"><ArrowUpRight size={13} />{trend}</span>}{detail}</div>
    </article>
  );
}

function Dashboard({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div className="page-stack page-enter">
      <section className="hero-panel" style={{ backgroundImage: `linear-gradient(90deg, rgba(15,15,15,.97) 0%, rgba(15,15,15,.82) 52%, rgba(15,15,15,.35) 100%), url(${texture})` }}>
        <div className="hero-copy"><span className="eyebrow light-eyebrow">SEMANA 33 · 11–15 AGO 2026</span><h1>A semana sob controle<span className="gold-dot">.</span></h1><p>Uma visão precisa do que entrou, do que falta e do que move a sua operação hoje.</p><button className="gold-button" onClick={() => onNavigate("revendedores")}><Plus size={16} /> Registrar movimento</button></div>
        <div className="hero-aside"><span className="hero-aside-label">STATUS DA OPERAÇÃO</span><strong><span className="pulse-dot" /> Operação ativa</strong><small>Movimentos atualizados há 2 min</small><div className="hero-divider" /><span className="hero-aside-label">GESTÃO DO DIA</span><strong>84<span className="hero-percent">%</span></strong><small>das tarefas concluídas</small></div>
      </section>

      <section className="metrics-grid">
        <MetricCard label="Revendedores ativos" value="48" detail="vs. 45 na semana anterior" trend="+6,7%" icon={UsersRound} accent="#C9A227" />
        <MetricCard label="Valor da semana" value="R$ 8.420" detail="meta semanal R$ 10.000" trend="+12,4%" icon={CircleDollarSign} accent="#7DBB8B" />
        <MetricCard label="Pedidos registrados" value="126" detail="18 aguardando conferência" icon={Package} accent="#8DA9CB" />
        <MetricCard label="Recebimentos pendentes" value="R$ 2.180" detail="5 revendedores" icon={CreditCard} accent="#D87E76" />
      </section>

      <section className="content-grid">
        <article className="panel weekly-panel"><div className="panel-header"><div><span className="eyebrow">RITMO DA SEMANA</span><h2>Movimentações</h2></div><button className="ghost-button" onClick={() => onNavigate("relatorios")}>Ver relatório <ChevronRight size={15} /></button></div><div className="chart-wrap"><div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-area"><div className="chart-grid-lines"><i /><i /><i /><i /></div><svg viewBox="0 0 700 210" preserveAspectRatio="none" className="chart-line"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#C9A227" stopOpacity=".28" /><stop offset="100%" stopColor="#C9A227" stopOpacity="0" /></linearGradient></defs><path d="M0,144 C58,124 68,80 140,99 S205,136 275,79 S336,115 410,58 S474,88 550,42 S625,74 700,20 L700,210 L0,210 Z" fill="url(#area)" /><path d="M0,144 C58,124 68,80 140,99 S205,136 275,79 S336,115 410,58 S474,88 550,42 S625,74 700,20" fill="none" stroke="#C9A227" strokeWidth="3" /></svg><div className="chart-x">{weekly.map((item) => <span key={item.day}>{item.day}</span>)}</div></div></div><div className="chart-footer"><span><i className="legend-gold" /> Pedidos e recebimentos</span><span className="chart-total">126 movimentações <ArrowUpRight size={14} /></span></div></article>
        <article className="panel finance-panel"><div className="panel-header"><div><span className="eyebrow">RESUMO FINANCEIRO</span><h2>Saldo da semana</h2></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="finance-total">R$ 8.420<span>,00</span></div><div className="finance-progress"><div className="finance-progress-head"><span>Meta semanal</span><strong>84,2%</strong></div><div className="progress-track"><div className="progress-fill" style={{ width: "84.2%" }} /></div></div><div className="finance-rows"><div><span className="finance-icon income"><ArrowDownRight size={15} /></span><span>Recebido</span><strong>R$ 6.240,00</strong></div><div><span className="finance-icon pending"><Activity size={15} /></span><span>A receber</span><strong>R$ 2.180,00</strong></div><div><span className="finance-icon accord"><ShieldCheck size={15} /></span><span>Em acordo</span><strong>R$ 860,00</strong></div></div></article>
      </section>

      <section className="content-grid lower-grid"><article className="panel seller-panel"><div className="panel-header"><div><span className="eyebrow">ATUALIZAÇÕES RECENTES</span><h2>Revendedores</h2></div><button className="ghost-button" onClick={() => onNavigate("revendedores")}>Ver todos <ChevronRight size={15} /></button></div><div className="seller-list">{sellers.slice(0, 4).map((seller) => <div className="seller-row" key={seller.name}><div className="avatar">{seller.initials}</div><div className="seller-main"><strong>{seller.name}</strong><span>{seller.phone}</span></div><div className="seller-total"><strong>{seller.total}</strong><span>{seller.updated}</span></div><StatusPill status={seller.status} /></div>)}</div></article><article className="panel spotlight-panel"><div className="spotlight-image" style={{ backgroundImage: `linear-gradient(0deg, rgba(15,15,15,.8), rgba(15,15,15,.05)), url(${productStill})` }}><span className="eyebrow light-eyebrow">CATÁLOGO EM DESTAQUE</span><div><h2>Novas capas,<br /><em>mesma precisão.</em></h2><button className="light-link" onClick={() => onNavigate("mercadorias")}>Ver mercadorias <ArrowUpRight size={15} /></button></div></div></article></section>
    </div>
  );
}

function Revendedores({ sellers, onSelect, onAdd }: { sellers: Seller[]; onSelect: (seller: Seller) => void; onAdd: (seller: Seller) => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const filtered = useMemo(() => sellers.filter((s) => `${s.name} ${s.phone}`.toLowerCase().includes(query.toLowerCase())), [query, sellers]);
  const saveSeller = () => { if (!name.trim() || !phone.trim()) { toast.error("Preencha nome e telefone"); return; } onAdd({ name: name.trim(), initials: initialsFor(name), phone: phone.trim(), total: "R$ 0,00", status: "Pendente", updated: "Agora", tone: "danger", items: [], avatar: notes }); setName(""); setPhone(""); setNotes(""); setOpen(false); toast.success("Revendedor cadastrado"); };
  return <div className="page-stack page-enter"><div className="page-title-row"><div><span className="eyebrow">BASE DE CLIENTES</span><h1>Revendedores</h1><p>Gerencie a carteira, acompanhe valores e abra o histórico individual.</p></div><button className="gold-button" onClick={() => setOpen(true)}><Plus size={16} /> Novo revendedor</button></div><div className="toolbar"><div className="search-box"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Pesquisar por nome ou telefone" /></div><button className="outline-button"><Filter size={16} /> Filtros</button><button className="outline-button">Esta semana <ChevronDown size={15} /></button></div><article className="panel table-panel"><div className="table-caption"><span>{filtered.length} revendedores encontrados</span><button className="ghost-button">Exportar lista <FileDown size={15} /></button></div><div className="table-scroll"><table><thead><tr><th>Nome</th><th>Telefone</th><th>Total da semana</th><th>Situação</th><th>Última atualização</th><th /></tr></thead><tbody>{filtered.map((seller) => <tr key={seller.name} onClick={() => onSelect(seller)}><td><div className="table-person"><div className="avatar small">{seller.initials}</div><strong>{seller.name}</strong></div></td><td>{seller.phone}</td><td className="money-cell">{seller.total}</td><td><StatusPill status={seller.status} /></td><td className="muted-cell">{seller.updated}</td><td><ChevronRight size={17} className="row-arrow" /></td></tr>)}</tbody></table></div></article>{open && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}><div className="modal-card"><div className="modal-header"><div><span className="eyebrow">NOVO CADASTRO</span><h2>Adicionar revendedor</h2></div><button className="icon-button" onClick={() => setOpen(false)}><X size={18} /></button></div><label>Nome completo<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Juliana Martins" autoFocus /></label><label>Telefone<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(00) 00000-0000" /></label><label>Observações<textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Opcional" rows={3} /></label><div className="modal-actions"><button className="outline-button" onClick={() => setOpen(false)}>Cancelar</button><button className="gold-button" onClick={saveSeller}><Save size={15} /> Salvar revendedor</button></div></div></div>}</div>;
}

function Payments() {
  const [filter, setFilter] = useState("Todos");
  const visible = filter === "Todos" ? sellers : sellers.filter((s) => s.status === filter.slice(0, -1) || s.status === filter);
  return <div className="page-stack page-enter"><div className="page-title-row"><div><span className="eyebrow">CONTROLE DE CAIXA</span><h1>Pagamentos</h1><p>Altere o status e mantenha a semana financeira em ordem.</p></div><button className="gold-button" onClick={() => toast.success("Pagamento registrado") }><Plus size={16} /> Registrar pagamento</button></div><div className="payment-summary"><div><span>Total pago</span><strong className="green-text">R$ 6.240,00</strong><small>24 recebimentos</small></div><div><span>Total pendente</span><strong className="red-text">R$ 2.180,00</strong><small>5 recebimentos</small></div><div><span>Total em acordo</span><strong className="gold-text">R$ 860,00</strong><small>3 acordos ativos</small></div></div><div className="filter-tabs">{["Todos", "Pendentes", "Pagos", "Acordos"].map((item) => <button className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><article className="panel table-panel"><div className="table-scroll"><table><thead><tr><th>Nome</th><th>Telefone</th><th>Valor</th><th>Situação</th><th>Último pagamento</th><th>Observações</th></tr></thead><tbody>{visible.map((seller) => <tr key={seller.name}><td><div className="table-person"><div className="avatar small">{seller.initials}</div><strong>{seller.name}</strong></div></td><td>{seller.phone}</td><td className="money-cell">{seller.total}</td><td><button className="status-button" onClick={() => toast(`Status de ${seller.name}: ${seller.status}`)}><StatusPill status={seller.status} /><ChevronDown size={13} /></button></td><td className="muted-cell">14 ago, 2026</td><td className="muted-cell">{seller.status === "Acordo" ? "Parcelamento combinado" : "—"}</td></tr>)}</tbody></table></div></article></div>;
}

function GenericModule({ id }: { id: string }) {
  const info: Record<string, { eyebrow: string; title: string; desc: string; icon: typeof Archive; items: string[] }> = { relatorios: { eyebrow: "VISÃO CONSOLIDADA", title: "Relatório semanal", desc: "Escolha a semana, filtre por situação e prepare uma leitura simples ou detalhada.", icon: FileBarChart, items: ["Relatório simples", "Relatório detalhado", "Exportar PDF", "Compartilhar"] }, mercadorias: { eyebrow: "ESTOQUE ADMINISTRATIVO", title: "Mercadorias", desc: "Duas lojas, uma operação organizada e um catálogo pronto para crescer.", icon: Boxes, items: ["Loja 01 · Yuri", "Loja 02 · Amanda", "Categorias", "Importar Excel"] }, semanas: { eyebrow: "HISTÓRICO OPERACIONAL", title: "Semanas", desc: "Consulte cada semana exatamente como ela foi fechada.", icon: CalendarDays, items: ["Semana 33 · atual", "Semana 32", "Semana 31", "Semana 30"] }, configuracoes: { eyebrow: "PREFERÊNCIAS DO SISTEMA", title: "Configurações", desc: "Empresa, administrador, semana operacional e sincronização em um só lugar.", icon: Settings2, items: ["Dados da empresa", "Definição da semana", "Backup e restauração", "Tema e sincronização"] } };
  const current = info[id] ?? info.relatorios; const Icon = current.icon;
  return <div className="page-stack page-enter"><div className="page-title-row"><div><span className="eyebrow">{current.eyebrow}</span><h1>{current.title}</h1><p>{current.desc}</p></div><button className="gold-button" onClick={() => toast.success("Ação preparada para este módulo") }><Plus size={16} /> Nova ação</button></div><div className="module-layout"><article className="module-intro panel"><div className="module-icon"><Icon size={26} /></div><h2>Organização que acompanha o ritmo.</h2><p>Este espaço está preparado para receber dados reais, permissões e exportações da operação Rainha das Capas.</p><button className="outline-button" onClick={() => toast("Módulo em preparação", { description: "A interface está pronta para a próxima etapa de integração." })}>Conhecer estrutura <ChevronRight size={15} /></button></article><div className="module-list">{current.items.map((item, index) => <button key={item} className="module-card" onClick={() => toast(`${item} selecionado`)}><span className="module-index">0{index + 1}</span><span><strong>{item}</strong><small>{index === 0 ? "Atualizado hoje" : "Configurar e consultar"}</small></span><ChevronRight size={17} /></button>)}</div></div></div>;
}

function SettingsModule({ profileName, profilePhoto, darkMode, onNameChange, onPhotoChange, onThemeChange }: { profileName: string; profilePhoto?: string; darkMode: boolean; onNameChange: (name: string) => void; onPhotoChange: (photo: string) => void; onThemeChange: (value: boolean) => void }) {
  const [name, setName] = useState(profileName);
  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => onPhotoChange(String(reader.result)); reader.readAsDataURL(file); };
  return <div className="page-stack page-enter"><div className="page-title-row"><div><span className="eyebrow">PREFERÊNCIAS DO SISTEMA</span><h1>Configurações</h1><p>Atualize o perfil que aparece em toda a operação e escolha como visualizar o sistema.</p></div><button className="gold-button" onClick={() => { onNameChange(name.trim() || "Administrador"); toast.success("Perfil atualizado"); }}><Save size={15} /> Salvar alterações</button></div><div className="settings-grid"><article className="panel settings-card"><div className="settings-card-head"><div><span className="eyebrow">ADMINISTRADOR</span><h2>Seu perfil</h2></div><UserRound size={19} /></div><div className="profile-editor"><div className="profile-photo-wrap">{profilePhoto ? <img src={profilePhoto} alt="Foto do perfil" className="profile-photo" /> : <div className="avatar profile-avatar">{initialsFor(profileName)}</div>}<label className="photo-upload"><Camera size={15} /><input type="file" accept="image/*" onChange={handlePhoto} />Escolher foto</label></div><div className="profile-fields"><label>Nome exibido<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do administrador" /></label><p>Este nome será exibido na barra lateral e no avatar do cabeçalho.</p></div></div></article><article className="panel settings-card"><div className="settings-card-head"><div><span className="eyebrow">APARÊNCIA</span><h2>Tema da interface</h2></div>{darkMode ? <Moon size={19} /> : <Sun size={19} />}</div><div className="theme-choice"><button className={!darkMode ? "selected" : ""} onClick={() => onThemeChange(false)}><Sun size={20} /><span><strong>Modo claro</strong><small>Contraste suave para uso durante o dia</small></span>{!darkMode && <Check size={16} />}</button><button className={darkMode ? "selected" : ""} onClick={() => onThemeChange(true)}><Moon size={20} /><span><strong>Modo escuro premium</strong><small>Superfícies grafite e menor luminosidade</small></span>{darkMode && <Check size={16} />}</button></div></article></div></div>;
}

function SellerDetail({ seller, onBack, onAddItem }: { seller: Seller; onBack: () => void; onAddItem: (item: SellerItem) => void }) {
  const [open, setOpen] = useState(false); const [item, setItem] = useState(""); const [quantity, setQuantity] = useState("1"); const [unit, setUnit] = useState(""); const [note, setNote] = useState("");
  const items = seller.items ?? []; const total = items.reduce((sum, row) => sum + Number(row.total.replace(/[^0-9,-]/g, "").replace(".", "").replace(",", ".")), 0);
  const saveItem = () => { const qty = Number(quantity); const price = Number(unit.replace(",", ".")); if (!item.trim() || !qty || !price) { toast.error("Preencha item, quantidade e valor unitário"); return; } onAddItem({ item: item.trim(), quantity: qty, unit: currency(price), total: currency(qty * price), date: "Agora", note }); setItem(""); setQuantity("1"); setUnit(""); setNote(""); setOpen(false); toast.success("Item adicionado e total recalculado"); };
  return <div className="page-stack page-enter"><button className="back-link" onClick={onBack}>← Voltar para revendedores</button><div className="detail-header"><div className="detail-person"><div className="avatar large">{seller.initials}</div><div><span className="eyebrow">PERFIL DO REVENDEDOR</span><h1>{seller.name}</h1><p>{seller.phone} · Cadastrado em 12 ago, 2026</p></div></div><div className="detail-actions"><button className="outline-button" onClick={() => toast.success("PDF preparado para exportação")}><FileDown size={16} /> Emitir PDF</button><button className="gold-button" onClick={() => toast.success("Link de compartilhamento copiado")}><Share2 size={16} /> Compartilhar</button></div></div><section className="detail-metrics"><div><span>Valor total</span><strong>{currency(total)}</strong></div><div><span>Semana atual</span><strong>Semana 33</strong></div><div><span>Situação</span><StatusPill status={seller.status} /></div></section><article className="panel table-panel"><div className="panel-header"><div><span className="eyebrow">MOVIMENTAÇÕES</span><h2>Lista de itens</h2></div><button className="gold-button" onClick={() => setOpen(true)}><Plus size={16} /> Adicionar item</button></div><div className="table-scroll"><table><thead><tr><th>Item</th><th>Quantidade</th><th>Valor unitário</th><th>Valor total</th><th>Data</th><th>Observação</th></tr></thead><tbody>{items.map((row) => <tr key={`${row.item}-${row.date}`}><td><strong>{row.item}</strong></td><td>{row.quantity}</td><td>{row.unit}</td><td className="money-cell">{row.total}</td><td className="muted-cell">{row.date}</td><td className="muted-cell">{row.note || "—"}</td></tr>)}</tbody></table></div></article>{open && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}><div className="modal-card"><div className="modal-header"><div><span className="eyebrow">NOVA MOVIMENTAÇÃO</span><h2>Adicionar item</h2></div><button className="icon-button" onClick={() => setOpen(false)}><X size={18} /></button></div><label>Descrição do item<input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Ex.: Capa iPhone 15" autoFocus /></label><div className="form-row"><label>Quantidade<input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label><label>Valor unitário<input inputMode="decimal" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="18,00" /></label></div><label>Observação<textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Opcional" /></label><div className="modal-actions"><button className="outline-button" onClick={() => setOpen(false)}>Cancelar</button><button className="gold-button" onClick={saveItem}><Save size={15} /> Salvar item</button></div></div></div>}</div>;
}

export default function Home() {
  const [active, setActive] = useState("dashboard");
  const [sellerList, setSellerList] = useState<Seller[]>(sellers);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileName, setProfileName] = useState("Yuri Oliveira");
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>();
  const [darkMode, setDarkMode] = useState(false);
  const navigate = (id: string) => { setSelectedSeller(null); setActive(id); };
  const activeLabel = selectedSeller ? selectedSeller.name : formatTitle(active);
  const addSeller = (seller: Seller) => setSellerList((current) => [...current, seller]);
  const addItem = (item: SellerItem) => { if (!selectedSeller) return; const items = [...(selectedSeller.items ?? []), item]; const next = { ...selectedSeller, items, total: currency(items.reduce((sum, row) => sum + Number(row.total.replace(/[^0-9,-]/g, "").replace(".", "").replace(",", ".")), 0)), updated: "Agora" }; setSellerList((current) => current.map((seller) => seller.name === next.name ? next : seller)); setSelectedSeller(next); };
  return <div className={`app-shell ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"} ${darkMode ? "theme-dark" : ""}`}>
    <aside className="sidebar"><div className="brand"><div className="brand-mark"><img src={logo} alt="" /></div><div><strong>RAINHA</strong><span>DAS CAPAS</span></div></div><div className="workspace-switcher"><div className="store-mark"><Store size={15} /></div><div><strong>Operação principal</strong><small>Anápolis-GO</small></div><ChevronDown size={14} /></div><nav className="main-nav"><span className="nav-caption">MENU PRINCIPAL</span>{navItems.map(({ id, label, icon: Icon }) => <button key={id} className={active === id && !selectedSeller ? "active" : ""} onClick={() => navigate(id)}><Icon size={18} /><span>{label}</span>{id === "pagamentos" && <b className="nav-badge">5</b>}</button>)}</nav><div className="sidebar-bottom"><button className="profile-button"><div className="avatar tiny">{profilePhoto ? <img src={profilePhoto} alt="" className="avatar-image" /> : initialsFor(profileName)}</div><span><strong>{profileName}</strong><small>Administrador</small></span><MoreHorizontal size={16} /></button></div></aside>
    <main className="main-area"><header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setSidebarOpen((v) => !v)}><Menu size={19} /></button><button className="collapse-button" onClick={() => setSidebarOpen((v) => !v)}>{sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}</button><div className="breadcrumb"><span>Rainha das Capas</span><ChevronRight size={14} /><strong>{activeLabel}</strong></div></div><div className="topbar-right"><div className="offline-state"><span className="online-dot" /> Online</div><button className="topbar-icon"><Search size={18} /></button><button className="topbar-icon notification"><Bell size={18} /><i /></button><div className="top-avatar">{profilePhoto ? <img src={profilePhoto} alt="" className="avatar-image" /> : initialsFor(profileName)}</div></div></header><div className="content-area">{selectedSeller ? <SellerDetail seller={selectedSeller} onBack={() => setSelectedSeller(null)} onAddItem={addItem} /> : active === "dashboard" ? <Dashboard onNavigate={navigate} /> : active === "revendedores" ? <Revendedores sellers={sellerList} onSelect={setSelectedSeller} onAdd={addSeller} /> : active === "pagamentos" ? <Payments /> : active === "configuracoes" ? <SettingsModule profileName={profileName} profilePhoto={profilePhoto} darkMode={darkMode} onNameChange={setProfileName} onPhotoChange={setProfilePhoto} onThemeChange={setDarkMode} /> : <GenericModule id={active} />}</div><footer className="app-footer"><span>Rainha das Capas · Gestão Comercial</span><span><CloudOff size={13} /> PWA pronto para uso offline</span></footer></main>
  </div>;
}
