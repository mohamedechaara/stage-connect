import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [menuOpen, setMenuOpen] = useState(false);

    const isStagiaire = user?.role === 'stagiaire';
    const isEntreprise = user?.role === 'entreprise';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <span className="font-bold text-gray-900 text-lg">StagePlatform</span>
                        </Link>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/dashboard"
                                className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
                                Dashboard
                            </Link>

                            {isStagiaire && <>
                                <Link href="/offres"
                                    className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
                                    Offres de stage
                                </Link>
                                <Link href="/mes-candidatures"
                                    className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
                                    Mes candidatures
                                </Link>
                            </>}

                            {isEntreprise && <>
                                <Link href="/mes-offres"
                                    className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
                                    Mes offres
                                </Link>
                                <Link href="/offres/creer"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                    + Ajouter offre
                                </Link>
                            </>}
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                                    {user?.profile?.avatar ? (
                                        <img
                                            src={`/storage/${user.profile.avatar}`}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-blue-600 font-semibold text-sm">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-xs text-gray-500">Connecté en tant que</p>
                                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                            isStagiaire ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                            {user?.role}
                                        </span>
                                    </div>
                                    <Link href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        Mon profil
                                    </Link>
                                    <Link href="/logout" method="post" as="button"
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                        Déconnexion
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Flash Message */}
            <FlashMessage />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}

function FlashMessage() {
    const { flash } = usePage().props;
    if (!flash?.success) return null;

    return (
        <div className="bg-green-50 border-b border-green-200 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center gap-2 text-green-700 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {flash.success}
            </div>
        </div>
    );
}
