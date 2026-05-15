import { useForm, Link, Head } from '@inertiajs/react';

export default function Login() {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Head title="Login" />

            <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">S</span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Bon retour 👋
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Connectez-vous à votre compte
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">

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
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                                Mot de passe
                            </label>

                            <Link
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-700"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>

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

                    {/* Remember */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />

                        <span className="text-sm text-gray-600">
                            Se souvenir de moi
                        </span>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-3 rounded-xl"
                    >
                        {processing ? 'Connexion...' : 'Se connecter'}
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Vous n'avez pas de compte ?{' '}
                    <Link
                        href="/register"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Créer un compte
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