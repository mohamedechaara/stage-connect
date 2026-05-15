import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';

const statusConfig = {
    pending:  { label: 'En attente', class: 'bg-yellow-100 text-yellow-700' },
    accepted: { label: 'Accepté',    class: 'bg-green-100 text-green-700'  },
    rejected: { label: 'Refusé',     class: 'bg-red-100 text-red-700'      },
};

export default function Applications({ internship, applications }) {
    function updateStatus(applicationId, status) {
        router.patch(`/candidatures/${applicationId}/${status}`);
    }

    return (
        <AppLayout>
            <div className="mb-6">
                <Link href="/mes-offres" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
                    ← Retour aux offres
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">{internship.title}</h1>
                <p className="text-gray-500 mt-1">{applications.length} candidature(s)</p>
            </div>

            {applications.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                    <p className="text-gray-400">Aucune candidature pour cette offre</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {applications.map(app => {
                        const status = statusConfig[app.status];
                        return (
                            <div key={app.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <span className="text-gray-600 font-bold">
                                                {app.stagiaire?.name?.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{app.stagiaire?.name}</p>
                                            <p className="text-sm text-gray-500">{app.stagiaire?.email}</p>
                                            {app.stagiaire?.profile?.specialty && (
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    🎓 {app.stagiaire.profile.specialty}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${status.class}`}>
                                            {status.label}
                                        </span>

                                        {app.status === 'pending' && (
                                            <>
                                                <button onClick={() => updateStatus(app.id, 'accepted')}
                                                    className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors font-medium">
                                                    Accepter
                                                </button>
                                                <button onClick={() => updateStatus(app.id, 'rejected')}
                                                    className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors font-medium">
                                                    Refuser
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {app.cover_letter && (
                                    <div className="mt-4 bg-gray-50 rounded-xl p-3">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Lettre de motivation</p>
                                        <p className="text-sm text-gray-700">{app.cover_letter}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </AppLayout>
    );
}
