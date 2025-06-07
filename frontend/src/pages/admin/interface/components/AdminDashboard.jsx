// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Layout } from '../../../../common/Layout.jsx';
// import { DashboardStats } from './DashboardStats.jsx';
// import { StudentsTable } from './StudentsTable.jsx';
// import { DonorsTable } from './DonorsTable.jsx';
// import { PendingVerificationsTable } from './PendingVerificationsTable.jsx';
//
// export function AdminInterface({ onLogout }) {
//     const [activeView, setActiveView] = useState('dashboard');
//
//     const renderView = () => {
//         switch (activeView) {
//             case 'dashboard':
//                 return <DashboardStats />;
//             case 'students':
//                 return <StudentsTable />;
//             case 'donors':
//                 return <DonorsTable />;
//             case 'pending':
//                 return <PendingVerificationsTable />;
//             default:
//                 return <DashboardStats />;
//         }
//     };
//
//     return (
//         <Layout
//             activeView={activeView}
//             onNavigate={setActiveView}
//             userType="admin"
//             onLogout={onLogout}
//         >
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={activeView}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     {renderView()}
//                 </motion.div>
//             </AnimatePresence>
//         </Layout>
//     );
// }
//
// export default AdminInterface;
