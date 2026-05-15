import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

const typeColors = {
    presentiel: 'bg-blue-100 text-blue-700',
    remote:     'bg-green-100 text-green-700',
    hybride:    'bg-purple-100 text-purple-700',
};

export default function Offers({ internships, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [type,   setType]   = useState(filters.type   || '');

    function applyFilters() {
        router.get('/offres', { search, type }, { preserveState: true, replace: true });
    }

    return (
        <AppLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Offres de stage</h1>
                <p className="text-gray-500 mt-1">{internships.total} offres disponibles</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex gap-3 flex-wrap">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && applyFilters()}
                    className="flex-1 min-w-48 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                    value={type}
                    onChange={e => { setType(e.target.value); router.get('/offres', { search, type: e.target.value }, { preserveState: true, replace: true }); }}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="">Tous les types</option>
                    <option value="presentiel">Présentiel</option>
                    <option value="remote">Remote</option>
                    <option value="hybride">Hybride</option>
                </select>
                <button onClick={applyFilters}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                    Rechercher
                </button>
            </div>

            {/* Offers Grid */}
            {internships.data.length === 0 ? (
                <div className="text-center py-16 text-gray-400">Aucune offre trouvée</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {internships.data.map(offer => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {internships.last_page > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {internships.links.map((link, i) => (
                        <Link key={i} href={link.url || '#'}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : link.url
                                        ? 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AppLayout>
    );
}

function OfferCard({ offer }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">
                        {offer.entreprise?.profile?.company_name?.charAt(0) || offer.entreprise?.name?.charAt(0)}
                    </span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[offer.type]}`}>
                    {offer.type}
                </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{offer.title}</h3>
            <p className="text-sm text-gray-500 mb-1">
                {offer.entreprise?.profile?.company_name || offer.entreprise?.name}
            </p>
            <p className="text-xs text-gray-400 mb-3">
                📍 {offer.location} · ⏱ {offer.duration_months} mois
            </p>
            <p className="text-xs text-gray-500 line-clamp-2 mb-4">{offer.description}</p>
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-gray-400">
                    Deadline: {new Date(offer.deadline).toLocaleDateString('fr-FR')}
                </span>
                <Link href={`/offres/${offer.id}`}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                    Voir l'offre
                </Link>
            </div>
        </div>
    );
}
