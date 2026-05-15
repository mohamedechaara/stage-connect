import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

const statusConfig = {
    pending:  { label: 'En attente', class: 'bg-yellow-100 text-yellow-700' },
    accepted: { label: 'Accepté',    class: 'bg-green-100 text-green-700'  },
    rejected: { label: 'Refusé',     class: 'bg-red-100 text-red-700'      },
};

export default function Applications({ applications }) {
    return (
        <AppLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Mes candidatures</h1>
                <p className="text-gray-500 mt-1">{applications.length} candidature(s)</p>
            </div>

            {applications.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                    <p className="text-gray-400 mb-4">Aucune candidature pour le moment</p>
                    <Link href="/offres"
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                        Parcourir les offres
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {applications.map(app => {
                        const status = statusConfig[app.status];
                        return (
                            <div key={app.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">
                                            {app.internship?.entreprise?.name?.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{app.internship?.title}</p>
                                        <p className="text-sm text-gray-500">{app.internship?.entreprise?.name}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            📍 {app.internship?.location} · ⏱ {app.internship?.duration_months} mois
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${status.class}`}>
                                        {status.label}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {new Date(app.created_at).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </AppLayout>
    );
}
