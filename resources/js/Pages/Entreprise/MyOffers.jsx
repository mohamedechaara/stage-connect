import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';

export default function MyOffers({ internships }) {
    function deleteOffer(id) {
        if (confirm('Supprimer cette offre ?')) {
            router.delete(`/offres/${id}`);
        }
    }

    return (
        <AppLayout>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mes offres</h1>
                    <p className="text-gray-500 mt-1">{internships.length} offre(s) publiée(s)</p>
                </div>
                <Link href="/offres/creer"
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                    + Nouvelle offre
                </Link>
            </div>

            {internships.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                    <p className="text-gray-400 mb-4">Aucune offre publiée</p>
                    <Link href="/offres/creer"
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                        Publier une offre
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {internships.map(offer => (
                        <div key={offer.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                            offer.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {offer.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        📍 {offer.location} · ⏱ {offer.duration_months} mois · {offer.type}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {offer.applications_count} candidature(s) · Deadline: {new Date(offer.deadline).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`/candidatures/${offer.id}`}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                                        Candidatures
                                    </Link>
                                    <Link href={`/offres/${offer.id}/edit`}
                                        className="text-sm text-gray-600 hover:text-gray-700 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                                        Modifier
                                    </Link>
                                    <button onClick={() => deleteOffer(offer.id)}
                                        className="text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
