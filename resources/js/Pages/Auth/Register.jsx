import { useForm, Link, Head } from '@inertiajs/react';

export default function Register() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'stagiaire',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Head title="Register" />

            <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">S</span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Créer un compte
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Rejoignez StagePlatform
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type de compte
                        </label>

                        <div className="grid grid-cols-2 gap-3">

                            <button
                                type="button"
                                onClick={() => setData('role', 'stagiaire')}
                                className={`border rounded-xl p-4 transition ${
                                    data.role === 'stagiaire'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="text-2xl mb-2">🎓</div>
                                <div className="font-medium text-sm">Stagiaire</div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setData('role', 'entreprise')}
                                className={`border rounded-xl p-4 transition ${
                                    data.role === 'entreprise'
                                        ? 'border-indigo-500 bg-indigo-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="text-2xl mb-2">🏢</div>
                                <div className="font-medium text-sm">Entreprise</div>
                            </button>

                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {data.role === 'entreprise'
                                ? "Nom de l'entreprise"
                                : 'Nom complet'}
                        </label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={input(errors.name)}
                            placeholder={
                                data.role === 'entreprise'
                                    ? 'TechMaroc SARL'
                                    : 'Ahmed Benali'
                            }
                        />

                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={input(errors.email)}
                            placeholder="example@email.com"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mot de passe
                        </label>

                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={input(errors.password)}
                            placeholder="********"
                        />

                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmation
                        </label>

                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className={input(errors.password_confirmation)}
                            placeholder="********"
                        />

                        {errors.password_confirmation && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full py-3 rounded-xl text-white font-medium transition ${
                            data.role === 'entreprise'
                                ? 'bg-indigo-600 hover:bg-indigo-700'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {processing ? 'Création...' : 'Créer un compte'}
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Vous avez déjà un compte ?{' '}
                    <Link
                        href="/login"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}

function input(error) {
    return `
        w-full rounded-xl border px-4 py-3 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${error ? 'border-red-300' : 'border-gray-200'}
    `;
}