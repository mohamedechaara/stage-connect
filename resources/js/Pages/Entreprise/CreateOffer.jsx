import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function CreateOffer() {
    const { data, setData, post, processing, errors } = useForm({
        title: '', description: '', location: '',
        type: 'presentiel', duration_months: '', deadline: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/offres');
    }

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-6 flex items-center gap-3">
                    <Link href="/mes-offres" className="text-gray-400 hover:text-gray-600 transition-colors">
                        ← Retour
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Publier une offre</h1>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <Field label="Titre du poste" error={errors.title}>
                            <input type="text" value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="ex: Développeur Laravel"
                                className={inputClass(errors.title)} />
                        </Field>

                        <Field label="Description" error={errors.description}>
                            <textarea value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={4} placeholder="Décrivez le poste..."
                                className={inputClass(errors.description)} />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Localisation" error={errors.location}>
                                <input type="text" value={data.location}
                                    onChange={e => setData('location', e.target.value)}
                                    placeholder="ex: Casablanca"
                                    className={inputClass(errors.location)} />
                            </Field>

                            <Field label="Type" error={errors.type}>
                                <select value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className={inputClass(errors.type)}>
                                    <option value="presentiel">Présentiel</option>
                                    <option value="remote">Remote</option>
                                    <option value="hybride">Hybride</option>
                                </select>
                            </Field>

                            <Field label="Durée (mois)" error={errors.duration_months}>
                                <input type="number" min="1" max="24"
                                    value={data.duration_months}
                                    onChange={e => setData('duration_months', e.target.value)}
                                    placeholder="ex: 3"
                                    className={inputClass(errors.duration_months)} />
                            </Field>

                            <Field label="Date limite" error={errors.deadline}>
                                <input type="date" value={data.deadline}
                                    onChange={e => setData('deadline', e.target.value)}
                                    className={inputClass(errors.deadline)} />
                            </Field>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button type="submit" disabled={processing}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60">
                                {processing ? 'Publication...' : 'Publier l\'offre'}
                            </button>
                            <Link href="/mes-offres"
                                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm flex items-center">
                                Annuler
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
            {children}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

function inputClass(error) {
    return `w-full border ${error ? 'border-red-300' : 'border-gray-200'} rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white`;
}
