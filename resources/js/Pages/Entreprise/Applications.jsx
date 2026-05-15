import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

const statusConfig = {
    pending:  { label: 'En attente', class: 'bg-yellow-100 text-yellow-700' },
    accepted: { label: 'Accepté',    class: 'bg-green-100 text-green-700'  },
    rejected: { label: 'Refusé',     class: 'bg-red-100 text-red-700'      },
};

export default function Applications({ internship, applications }) {
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    function updateStatus(applicationId, status) {
        router.patch(`/candidatures/${applicationId}/${status}`);
    }

    function closeModal() {
        setSelectedCandidate(null);
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
<div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                                        {app.stagiaire?.profile?.avatar ? (
                                            <img
                                                src={`/storage/${app.stagiaire.profile.avatar}`}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-600 font-bold text-lg">
                                                {app.stagiaire?.name?.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900">{app.stagiaire?.name}</p>
                                        <p className="text-sm text-gray-500">{app.stagiaire?.email}</p>
                                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                                            {app.stagiaire?.profile?.specialty && (
                                                <span className="rounded-full bg-gray-100 px-2.5 py-1">
                                                    🎓 {app.stagiaire.profile.specialty}
                                                </span>
                                            )}
                                            {(app.stagiaire?.profile?.city || app.stagiaire?.profile?.location) && (
                                                <span className="rounded-full bg-gray-100 px-2.5 py-1">
                                                    📍 {app.stagiaire.profile.city || app.stagiaire.profile.location}
                                                </span>
                                            )}
                                            {app.stagiaire?.profile?.phone && (
                                                <span className="rounded-full bg-gray-100 px-2.5 py-1">
                                                    📞 {app.stagiaire.profile.phone}
                                                </span>
                                            )}
                                        </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${status.class}`}>
                                            {status.label}
                                        </span>

                                        <button onClick={() => setSelectedCandidate(app)}
                                            className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                            Voir profil
                                        </button>

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

            {selectedCandidate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
                    <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Profil du stagiaire</h2>
                                <p className="text-sm text-gray-500">{selectedCandidate.stagiaire?.name}</p>
                            </div>
                            <button onClick={closeModal}
                                className="text-gray-400 hover:text-gray-700">
                                ✕
                            </button>
                        </div>

                        <div className="px-6 py-6 space-y-5 max-h-[calc(100vh-6rem)] overflow-y-auto">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center text-xl text-gray-600">
                                    {selectedCandidate.stagiaire?.profile?.avatar ? (
                                        <img
                                            src={`/storage/${selectedCandidate.stagiaire.profile.avatar}`}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span>{selectedCandidate.stagiaire?.name?.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{selectedCandidate.stagiaire?.name}</p>
                                    <p className="text-sm text-gray-500">{selectedCandidate.stagiaire?.email}</p>
                                    <p className="text-sm text-gray-500">{selectedCandidate.stagiaire?.profile?.specialty || 'Aucune spécialité renseignée'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DetailItem label="Téléphone" value={selectedCandidate.stagiaire?.profile?.phone} />
                                <DetailItem label="Ville" value={selectedCandidate.stagiaire?.profile?.city || selectedCandidate.stagiaire?.profile?.location} />
                                <DetailItem label="Diplôme" value={selectedCandidate.stagiaire?.profile?.graduation_year} />
                                <DetailItem label="Secteur" value={selectedCandidate.stagiaire?.profile?.sector} />
                            </div>

                            {selectedCandidate.stagiaire?.profile?.bio && (
                                <div className="rounded-2xl bg-gray-50 p-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">À propos</p>
                                    <p className="text-sm text-gray-600 leading-6">{selectedCandidate.stagiaire.profile.bio}</p>
                                </div>
                            )}

                            {selectedCandidate.stagiaire?.profile?.cv_path && (
                                <div className="rounded-2xl bg-gray-50 p-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">CV</p>
                                    <a href={`/storage/${selectedCandidate.stagiaire.profile.cv_path}`} target="_blank" rel="noreferrer"
                                        className="text-sm text-blue-600 hover:underline">
                                        Télécharger le CV
                                    </a>
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button onClick={closeModal}
                                    className="rounded-2xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

function DetailItem({ label, value }) {
    return (
        <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{value || 'Non renseigné'}</p>
        </div>
    );
}
