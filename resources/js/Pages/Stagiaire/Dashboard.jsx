import AppLayout from '@/Layouts/AppLayout';
import { usePage, Link } from '@inertiajs/react';

const statusColors = {
    pending:  'bg-yellow-100 text-yellow-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
};
const statusLabels = {
    pending: 'En attente', accepted: 'Accepté', rejected: 'Refusé',
};

export default function DashboardStagiaire({ stats, recentApplications }) {
    const { auth } = usePage().props;

    return (
        <AppLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Bonjour, {auth.user.name} 👋
                </h1>
                <p className="text-gray-500 mt-1">Voici un résumé de vos candidatures</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total candidatures" value={stats.total}         color="blue" />
                <StatCard label="En attente"          value={stats.pending}       color="yellow" />
                <StatCard label="Acceptées"           value={stats.accepted}      color="green" />
                <StatCard label="Offres disponibles"  value={stats.availableOffers} color="purple" />
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-900">Candidatures récentes</h2>
                    <Link href="/mes-candidatures"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Voir tout →
                    </Link>
                </div>

                {recentApplications.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <p className="text-gray-500 mb-4">Aucune candidature pour le moment</p>
                        <Link href="/offres"
                            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                            Parcourir les offres
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {recentApplications.map(app => (
                            <div key={app.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-semibold text-sm">
                                            {app.internship?.entreprise?.name?.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">{app.internship?.title}</p>
                                        <p className="text-xs text-gray-400">{app.internship?.entreprise?.name}</p>
                                    </div>
                                </div>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[app.status]}`}>
                                    {statusLabels[app.status]}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

function StatCard({ label, value, color }) {
    const colors = {
        blue:   'bg-blue-50 text-blue-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        green:  'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
    };
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colors[color]}`}>
                <span className="text-lg font-bold">{value}</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
        </div>
    );
}
