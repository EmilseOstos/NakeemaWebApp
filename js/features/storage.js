/**
 * storage.js — Central Mock Data & localStorage CRUD for Nakeema
 */

const STORAGE_KEYS = {
    SERVICES: 'nk_services',
    TECHNICIANS: 'nk_technicians',
    NOTIFICATIONS: 'nk_notifications',
    SATISFACTION: 'nk_satisfaction',
    PROFILE: 'nk_profile',
    PREFERENCES: 'nk_preferences',
    MATERIALS: 'nk_materials',
    RECORDS: 'nk_records',
    INITIALIZED: 'nk_initialized'
};

// ========== MOCK DATA ==========
const MOCK_SERVICES = [
    { id: '#O.R.24567', type: 'Reparación Eléctrica', client: 'Emilse Ostos', tech: 'Kelly Ramirez', date: '28 Mar 2026', status: 'En Proceso', priority: 'Alta', address: 'Av. Principal 456, Piso 3, Of. 302', zone: 'Norte - Cedritos', phone: '+573201234567', notes: 'Cambio de cableado principal requerido.' },
    { id: '#O.R.24568', type: 'Mantenimiento Preventivo', client: 'Marcos Suarez', tech: 'Carlos Roa', date: '27 Mar 2026', status: 'Pendiente', priority: 'Media', address: 'Cra 15 #80-20, Apto 501', zone: 'Sur - Kennedy', phone: '+573156789012', notes: 'Revisión general de instalaciones.' },
    { id: '#O.R.24569', type: 'Revisión General', client: 'Luis Muñoz', tech: 'Luis Zea', date: '26 Mar 2026', status: 'Finalizado', priority: 'Baja', address: 'Calle 72 #10-15, Local 3', zone: 'Occidente - Fontibón', phone: '+573189876543', notes: 'Chequeo 10.000 KM completado.' },
    { id: '#O.R.24501', type: 'Mantenimiento Preventivo', client: 'Emilse Ostos', tech: 'Carlos Roa', date: '15 Mar 2026', status: 'Finalizado', priority: 'Media', address: 'Av. Principal 456, Piso 3, Of. 302', zone: 'Norte - Cedritos', phone: '+573201234567', notes: 'Instalación solicitada completada exitosamente.' },
    { id: '#O.R.24489', type: 'Falla de Red Externa', client: 'Emilse Ostos', tech: 'Sin Asignar', date: '02 Mar 2026', status: 'Cancelado', priority: 'Alta', address: 'Av. Principal 456, Piso 3, Of. 302', zone: 'Norte - Cedritos', phone: '+573201234567', notes: 'Cancelado por el cliente.' },
    { id: '#O.R.24570', type: 'Soporte Tecnológico', client: 'Sonia Hernandez', tech: 'Kelly Ramirez', date: '25 Mar 2026', status: 'Pendiente', priority: 'Media', address: 'Diagonal 45 #22-10, Of. 201', zone: 'Centro - Chapinero', phone: '+573112345678', notes: 'Problema con conectividad de red local.' },
    { id: '#O.R.24602', type: 'Revisión General', client: 'Corp. Innova', tech: 'Kelly Ramirez', date: '06 Abr 2026', status: 'Pendiente', priority: 'Media', address: 'Av. Norte 102, Bodega B', zone: 'Norte - Usaquén', phone: '+573209876543', notes: 'Revisión general programada.' },
    { id: '#O.R.24210', type: 'Reparación Eléctrica', client: 'Emilse Ostos', tech: 'Carlos Roa', date: '05 Ene 2026', status: 'Finalizado', priority: 'Baja', address: 'Av. Principal 456, Piso 3, Of. 302', zone: 'Norte - Cedritos', phone: '+573201234567', notes: 'Chequeo 10.000 KM completado sin inconvenientes.' }
];

const MOCK_TECHNICIANS = [
    { name: 'Carlos Roa', specialty: 'Especialista Eléctrico', status: 'Disponible', rating: 4.8, services: 124, phone: '+573201234567', email: 'carlos.roa@nakeema.com', joinDate: '12 Feb 2024' },
    { name: 'Kelly Ramirez', specialty: 'Soporte Técnico Nivel 2', status: 'Ocupado', rating: 4.9, services: 89, phone: '+573156789012', email: 'kelly.ramirez@nakeema.com', joinDate: '05 Mar 2024' },
    { name: 'Luis Zea', specialty: 'Mecánico General', status: 'Inactivo', rating: 4.5, services: 42, phone: '+573189876543', email: 'luis.zea@nakeema.com', joinDate: '20 Ene 2025' },
    { name: 'Camilo Suarez', specialty: 'Técnico de Redes', status: 'Ocupado', rating: 4.7, services: 67, phone: '+573112233445', email: 'camilo.suarez@nakeema.com', joinDate: '10 Jun 2024' },
    { name: 'Royer Marin', specialty: 'Electricista Industrial', status: 'Disponible', rating: 4.6, services: 53, phone: '+573223344556', email: 'royer.marin@nakeema.com', joinDate: '15 Ago 2024' },
    { name: 'Marlon E.', specialty: 'Soporte Nivel 1', status: 'Disponible', rating: 4.4, services: 31, phone: '+573334455667', email: 'marlon.e@nakeema.com', joinDate: '01 Nov 2024' },
    { name: 'Enrique M.', specialty: 'Mecánico Automotriz', status: 'Inactivo', rating: 4.3, services: 28, phone: '+573445566778', email: 'enrique.m@nakeema.com', joinDate: '20 Dic 2024' }
];

const MOCK_NOTIFICATIONS = [
    { id: 1, title: 'Nuevo Servicio Solicitado', message: 'Emilse Ostos ha solicitado un servicio de reparación eléctrica.', time: 'Hace 5 min', read: false, type: 'service' },
    { id: 2, title: 'Actualización de Estado', message: 'El servicio #O.R.24567 cambió a "En Proceso".', time: 'Hace 2 horas', read: false, type: 'update' },
    { id: 3, title: 'Técnico Asignado', message: 'Kelly Ramirez fue asignada al servicio #O.R.24602.', time: 'Hace 1 día', read: true, type: 'assignment' },
    { id: 4, title: 'Servicio Finalizado', message: 'El servicio #O.R.24569 fue completado exitosamente.', time: 'Hace 2 días', read: true, type: 'complete' },
    { id: 5, title: 'Material Solicitado', message: 'Kelly Ramirez solicitó Rollo de Cable 12AWG.', time: 'Hace 3 días', read: true, type: 'material' }
];

const MOCK_SATISFACTION = [
    { id: 1, serviceId: '#O.R.24501', rating: 4, comment: 'Excelente servicio, muy profesional.', date: '16 Mar 2026' },
    { id: 2, serviceId: '#O.R.24210', rating: 5, comment: 'Todo perfecto, muy rápido.', date: '06 Ene 2026' }
];

const MOCK_PROFILE = {
    name: 'Emilse Ostos',
    document: 'CC 1.020.345.678',
    email: 'emilse.ostos@gmail.com',
    phone: '+57 320 123 4567',
    city: 'Bogotá, Colombia',
    type: 'Cliente Premium'
};

const MOCK_PREFERENCES = {
    darkMode: false,
    emailNotifications: true,
    smsAlerts: false,
    autoAssign: true,
    companyName: 'Nakeema Corp',
    companyEmail: 'admin@nakeema.com',
    companyAddress: 'Calle Falsa 123, Ciudad de México'
};

// ========== INIT ==========
export function initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(MOCK_SERVICES));
        localStorage.setItem(STORAGE_KEYS.TECHNICIANS, JSON.stringify(MOCK_TECHNICIANS));
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(MOCK_NOTIFICATIONS));
        localStorage.setItem(STORAGE_KEYS.SATISFACTION, JSON.stringify(MOCK_SATISFACTION));
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(MOCK_PROFILE));
        localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(MOCK_PREFERENCES));
        localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify([]));
        localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify([]));
        localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    }
}

// ========== SERVICES ==========
export function getServices() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES) || '[]');
}

export function getServiceById(id) {
    return getServices().find(s => s.id === id);
}

export function addService(service) {
    const services = getServices();
    service.id = '#O.R.' + Math.floor(Math.random() * 90000 + 10000);
    services.unshift(service);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    addNotification({ title: 'Nuevo Servicio Registrado', message: `Servicio ${service.id} - ${service.type} creado.`, type: 'service' });
    return service;
}

export function updateService(id, updates) {
    const services = getServices();
    const idx = services.findIndex(s => s.id === id);
    if (idx !== -1) {
        Object.assign(services[idx], updates);
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
        addNotification({ title: 'Estado Actualizado', message: `Servicio ${id} actualizado a "${updates.status || ''}".`, type: 'update' });
    }
    return services[idx];
}

export function deleteService(id) {
    const services = getServices().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
}

// ========== TECHNICIANS ==========
export function getTechnicians() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TECHNICIANS) || '[]');
}

export function addTechnician(tech) {
    const techs = getTechnicians();
    techs.unshift(tech);
    localStorage.setItem(STORAGE_KEYS.TECHNICIANS, JSON.stringify(techs));
    return tech;
}

// ========== NOTIFICATIONS ==========
export function getNotifications() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
}

export function addNotification({ title, message, type }) {
    const notifs = getNotifications();
    const newNotif = {
        id: Date.now(),
        title,
        message,
        time: 'Ahora',
        read: false,
        type: type || 'info'
    };
    notifs.unshift(newNotif);
    if (notifs.length > 20) notifs.pop();
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    return newNotif;
}

export function markNotifRead(id) {
    const notifs = getNotifications();
    const n = notifs.find(n => n.id === id);
    if (n) n.read = true;
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
}

export function markAllNotifsRead() {
    const notifs = getNotifications().map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
}

// ========== SATISFACTION ==========
export function getSatisfactionReports() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SATISFACTION) || '[]');
}

export function addSatisfactionReport(report) {
    const reports = getSatisfactionReports();
    report.id = Date.now();
    report.date = new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
    reports.unshift(report);
    localStorage.setItem(STORAGE_KEYS.SATISFACTION, JSON.stringify(reports));
    addNotification({ title: 'Nueva Evaluación', message: `Se recibió una evaluación de ${report.rating} estrellas.`, type: 'complete' });
    return report;
}

// ========== PROFILE ==========
export function getProfile() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || '{}');
}

export function updateProfile(data) {
    const profile = { ...getProfile(), ...data };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    return profile;
}

// ========== PREFERENCES ==========
export function getPreferences() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PREFERENCES) || '{}');
}

export function updatePreferences(data) {
    const prefs = { ...getPreferences(), ...data };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
    return prefs;
}

// ========== MATERIALS ==========
export function getMaterials() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MATERIALS) || '[]');
}

export function addMaterial(material) {
    const materials = getMaterials();
    material.id = Date.now();
    material.date = new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
    material.status = 'Pendiente';
    materials.unshift(material);
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials));
    addNotification({ title: 'Material Solicitado', message: `Se solicitó ${material.name} (x${material.quantity}).`, type: 'material' });
    return material;
}

// ========== RECORDS ==========
export function getRecords() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECORDS) || '[]');
}

export function addRecord(record) {
    const records = getRecords();
    record.id = Date.now();
    record.date = new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
    records.unshift(record);
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
    addNotification({ title: 'Registro Insertado', message: `Registro añadido al servicio ${record.serviceId}.`, type: 'update' });
    return record;
}

// ========== DARK MODE HELPER ==========
export function applyTheme() {
    const prefs = getPreferences();
    if (prefs.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

// ========== TOAST HELPER ==========
export function showToast(message, type = 'success') {
    const existing = document.getElementById('nk-toast');
    if (existing) existing.remove();

    const icon = type === 'success' ? 'bi-check-circle-fill' : type === 'error' ? 'bi-x-circle-fill' : 'bi-info-circle-fill';
    const bgColor = type === 'success' ? '#0da766' : type === 'error' ? '#dc3545' : '#0d6efd';

    const toast = document.createElement('div');
    toast.id = 'nk-toast';
    toast.innerHTML = `<i class="bi ${icon} me-2"></i>${message}`;
    Object.assign(toast.style, {
        position: 'fixed', bottom: '100px', right: '30px', background: bgColor,
        color: 'white', padding: '14px 24px', borderRadius: '12px', fontSize: '14px',
        fontWeight: '600', boxShadow: '0 6px 20px rgba(0,0,0,0.2)', zIndex: '9999',
        display: 'flex', alignItems: 'center', gap: '8px',
        animation: 'fadeInUp 0.3s ease', fontFamily: "'Poppins', sans-serif"
    });
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// Make functions globally available for inline onclick handlers
window.nkStorage = {
    getServices, getServiceById, addService, updateService, deleteService,
    getTechnicians, addTechnician,
    getNotifications, addNotification, markNotifRead, markAllNotifsRead,
    getSatisfactionReports, addSatisfactionReport,
    getProfile, updateProfile,
    getPreferences, updatePreferences,
    getMaterials, addMaterial,
    getRecords, addRecord,
    applyTheme, showToast, initStorage
};
