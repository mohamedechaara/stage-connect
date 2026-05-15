import { Link, Head } from '@inertiajs/react';

export default function Dashboard({ stats, recentOffers, company }) {

    return (
        <div className="min-h-screen bg-gray-50">

            <Head title="Entreprise Dashboard" />

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-100 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    <div className="flex items-center gap-10">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold">S</span>
                            </div>

                            <h1 className="text-xl font-bold text-gray-900">
                                StagePlatform
                            </h1>
                        </div>

                        <div className="hidden md:flex items-center gap-6 text-sm">

                            <Link
                                href="/dashboard"
                                className="text-indigo-600 font-medium"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/mes-offres"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Mes offres
                            </Link>

                            <Link
                                href="/mes-offres"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Candidatures
                            </Link>

                            <Link
                                href="/profile"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Profil
                            </Link>

                        </div>
                    </div>

                    <Link
                        href="/offres/creer"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
                    >
                        + Publier une offre
                    </Link>

                </div>
            </nav>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Welcome */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Bonjour, {company?.name} 👋
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Voici un aperçu de vos offres de stage
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                    <StatCard
                        title="Total offres"
                        value={stats?.totalOffers || 0}
                        color="indigo"
                    />

                    <StatCard
                        title="Offres actives"
                        value={stats?.activeOffers || 0}
                        color="green"
                    />

                    <StatCard
                        title="Candidatures"
                        value={stats?.totalApplications || 0}
                        color="blue"
                    />

                    <StatCard
                        title="En attente"
                        value={stats?.pending || 0}
                        color="yellow"
                    />

                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <QuickAction
                        href="/offres/creer"
                        title="Ajouter une offre"
                        desc="Publiez une nouvelle offre de stage"
                        emoji="➕"
                    />

                    <QuickAction
                        href="/profile"
                        title="Modifier profil"
                        desc="Mettez à jour les informations"
                        emoji="👤"
                    />

                    <QuickAction
                        href="/mes-offres"
                        title="Voir candidatures"
                        desc="Consultez les candidatures reçues"
                        emoji="📄"
                    />

                </div>

                {/* Recent Offers + Profile */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Offers */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 overflow-hidden">

                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Dernières offres
                            </h3>

                            <Link
                                href="/mes-offres"
                                className="text-indigo-600 text-sm font-medium"
                            >
                                Voir tout →
                            </Link>
                        </div>

                        <div className="divide-y divide-gray-100">

                            {recentOffers?.length > 0 ? (
                                recentOffers.map((offer) => (
                                    <div
                                        key={offer.id}
                                        className="p-6 flex items-center justify-between"
                                    >

                                        <div>
                                            <h4 className="font-semibold text-gray-900">
                                                {offer.title}
                                            </h4>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {offer.location} • {offer.type}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">

                                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                                offer.is_active
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {offer.is_active ? 'Active' : 'Inactive'}
                                            </span>

                                            <Link
                                                href={`/offres/${offer.id}/edit`}
                                                className="text-sm text-indigo-600 hover:text-indigo-700"
                                            >
                                                Modifier
                                            </Link>

                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center">

                                    <div className="text-5xl mb-4">
                                        📄
                                    </div>

                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        Aucune offre
                                    </h4>

                                    <p className="text-sm text-gray-500 mb-5">
                                        Commencez par publier votre première offre
                                    </p>

                                    <Link
                                        href="/offres/creer"
                                        className="inline-flex bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium"
                                    >
                                        Ajouter une offre
                                    </Link>

                                </div>
                            )}

                        </div>

                    </div>

                    {/* Company Profile */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 h-fit">

                        <div className="flex items-center gap-4 mb-5">

                            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">
                                🏢
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-900">
                                    {company?.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {company?.sector || 'Entreprise'}
                                </p>
                            </div>

                        </div>

                        <div className="space-y-4 text-sm">

                            <div>
                                <p className="text-gray-400 mb-1">Ville</p>
                                <p className="font-medium text-gray-800">
                                    {company?.city || 'Casablanca'}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-400 mb-1">Email</p>
                                <p className="font-medium text-gray-800">
                                    {company?.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-400 mb-1">Téléphone</p>
                                <p className="font-medium text-gray-800">
                                    {company?.phone || '+212 6 00 00 00 00'}
                                </p>
                            </div>

                        </div>

                        <Link
                            href="/profile"
                            className="mt-6 w-full inline-flex justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl text-sm font-medium transition"
                        >
                            Modifier le profil
                        </Link>

                    </div>

                </div>

            </div>
        </div>
    );
}

/* Components */

function StatCard({ title, value, color }) {

    const colors = {
        indigo: 'bg-indigo-100 text-indigo-600',
        green: 'bg-green-100 text-green-600',
        blue: 'bg-blue-100 text-blue-600',
        yellow: 'bg-yellow-100 text-yellow-600',
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold mb-5 ${colors[color]}`}>
                {value}
            </div>

            <h3 className="text-gray-600 font-medium">
                {title}
            </h3>
        </div>
    );
}

function QuickAction({ href, title, desc, emoji }) {
    return (
        <Link
            href={href}
            className="bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-lg transition"
        >
            <div className="text-4xl mb-4">
                {emoji}
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">
                {title}
            </h3>

            <p className="text-sm text-gray-500">
                {desc}
            </p>
        </Link>
    );
}