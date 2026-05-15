import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const typeColors = {
    presentiel: 'bg-blue-100 text-blue-700',
    remote: 'bg-green-100 text-green-700',
    hybride: 'bg-purple-100 text-purple-700',
};

export default function OfferDetail({ internship, hasApplied }) {
    const flash = usePage().props.flash ?? {};
    const form = useForm({
        internship_id: internship.id,
        cover_letter: '',
        cv: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post('/candidatures', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('cover_letter', 'cv');
            },
        });
    };

    return (
        <AppLayout>
            <Head title={internship.title} />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{internship.title}</h1>
                    <p className="text-gray-500 mt-1">{internship.entreprise?.profile?.company_name || internship.entreprise?.name}</p>
                </div>
                <Link href="/offres"
                    className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Retour aux offres
                </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                <div className="space-y-6">
                    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    <span className={typeColors[internship.type] || 'bg-gray-200 text-gray-700'}>
                                        {internship.type}
                                    </span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">
                                <p>📍 {internship.location}</p>
                                <p>⏱ {internship.duration_months} mois</p>
                                <p>🗓 Deadline: {new Date(internship.deadline).toLocaleDateString('fr-FR')}</p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-4 text-gray-600 text-sm leading-7">
                            <p>{internship.description}</p>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900">Informations sur l'entreprise</h2>
                        <div className="mt-4 space-y-3 text-sm text-gray-600">
                            <p><span className="font-medium text-gray-800">Nom :</span> {internship.entreprise?.profile?.company_name || internship.entreprise?.name}</p>
                            {internship.entreprise?.profile?.location && (
                                <p><span className="font-medium text-gray-800">Ville :</span> {internship.entreprise.profile.location}</p>
                            )}
                        </div>
                    </section>
                </div>

                <aside className="space-y-6">
                    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900">Candidature</h2>
                        <p className="mt-2 text-sm text-gray-500">Soumettez votre candidature avec une lettre de motivation et un CV.</p>

                        {flash.success && (
                            <div className="mt-4 rounded-2xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">
                                {flash.success}
                            </div>
                        )}

                        {hasApplied ? (
                            <div className="mt-5 rounded-2xl bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
                                Vous avez déjà postulé à cette offre.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                                <input type="hidden" name="internship_id" value={internship.id} />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Votre CV</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => form.setData('cv', e.target.files?.[0] ?? null)}
                                        className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                    {form.errors.cv && <p className="mt-2 text-xs text-red-600">{form.errors.cv}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Lettre de motivation</label>
                                    <textarea
                                        value={form.data.cover_letter}
                                        onChange={(e) => form.setData('cover_letter', e.target.value)}
                                        rows={5}
                                        className="mt-2 w-full rounded-2xl border border-gray-200 px-3 py-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        placeholder="Rédigez un message pour accompagner votre candidature..."
                                    />
                                    {form.errors.cover_letter && <p className="mt-2 text-xs text-red-600">{form.errors.cover_letter}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Postuler maintenant
                                </button>
                            </form>
                        )}
                    </section>
                </aside>
            </div>
        </AppLayout>
    );
}
