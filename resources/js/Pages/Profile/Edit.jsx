import AppLayout from '@/Layouts/AppLayout';
import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Edit({ user, avatarUrl, cvUrl }) {
    const isStagiaire = user.role === 'stagiaire';
    const [showForm, setShowForm] = useState(false);

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Mon profil</h1>
                    <p className="text-gray-500 mt-1">
                        {isStagiaire ? 'Complétez votre profil pour postuler' : 'Présentez votre entreprise aux stagiaires'}
                    </p>
                </div>

                <ProfileSummary user={user} avatarUrl={avatarUrl} cvUrl={cvUrl} />

                <div className="flex justify-end mb-6">
                    <button
                        type="button"
                        onClick={() => setShowForm(prev => !prev)}
                        className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                        {showForm ? 'Annuler la modification' : 'Modifier le profil'}
                    </button>
                </div>

                {showForm && (
                    isStagiaire ? <StagiaireForm user={user} avatarUrl={avatarUrl} cvUrl={cvUrl} /> : <EntrepriseForm user={user} avatarUrl={avatarUrl} cvUrl={cvUrl} />
                )}
            </div>
        </AppLayout>
    );
}

function ProfileSummary({ user, avatarUrl, cvUrl }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
            <div className="p-6 md:flex md:items-center md:gap-6">
                <div className="w-28 h-28 rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-4xl text-gray-500">
                            {user.profile?.company_name?.charAt(0) || user.name?.charAt(0)}
                        </span>
                    )}
                </div>

                <div className="mt-4 md:mt-0">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {user.profile?.company_name || user.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {user.role === 'stagiaire' ? 'Stagiaire' : 'Entreprise'}
                    </p>

                    <div className="grid grid-cols-1 gap-2 mt-4 text-sm text-gray-700">
                        {user.profile?.location && (
                            <div><span className="font-semibold">Ville :</span> {user.profile.location}</div>
                        )}
                        {user.profile?.phone && (
                            <div><span className="font-semibold">Téléphone :</span> {user.profile.phone}</div>
                        )}
                        {user.profile?.sector && (
                            <div><span className="font-semibold">Secteur :</span> {user.profile.sector}</div>
                        )}
                        {user.role === 'entreprise' && user.profile?.website && (
                            <div><span className="font-semibold">Site :</span> {user.profile.website}</div>
                        )}
                        {user.role === 'stagiaire' && user.profile?.specialty && (
                            <div><span className="font-semibold">Spécialité :</span> {user.profile.specialty}</div>
                        )}
                    </div>

                    {cvUrl && (
                        <a href={cvUrl} target="_blank" rel="noreferrer" className="inline-flex mt-3 text-sm font-medium text-blue-600 hover:underline">
                            Voir le CV
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Formulaire Stagiaire ──────────────────────────────
function StagiaireForm({ user, avatarUrl, cvUrl }) {
    const [previewAvatar, setPreviewAvatar] = useState(user.profile?.avatar ? avatarUrl : null);
    const { data, setData, post, processing, errors } = useForm({
        phone:           user.profile?.phone           || '',
        bio:             user.profile?.bio             || '',
        location:        user.profile?.location        || '',
        specialty:       user.profile?.specialty       || '',
        graduation_year: user.profile?.graduation_year || '',
        avatar:          null,
        cv_path:         null,
    });

    useEffect(() => {
        return () => {
            if (previewAvatar && previewAvatar.startsWith('blob:')) {
                URL.revokeObjectURL(previewAvatar);
            }
        };
    }, [previewAvatar]);

    function submit(e) {
        e.preventDefault();
        post('/profile', { forceFormData: true });
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 bg-white/20 flex items-center justify-center">
                        {previewAvatar ? (
                            <img src={previewAvatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-3xl">🎓</span>
                        )}
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg">{user.name}</h2>
                        <span className="text-blue-100 text-sm">Stagiaire</span>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="p-6 space-y-5">
                {/* Avatar */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Photo de profil
                    </label>
                    <input type="file" accept="image/*"
                        onChange={e => {
                            const file = e.target.files[0];
                            setData('avatar', file);
                            setPreviewAvatar(file ? URL.createObjectURL(file) : avatarUrl);
                        }}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium hover:file:bg-blue-100 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Téléphone" error={errors.phone}>
                        <input type="text" value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            placeholder="+212 6XX XXX XXX"
                            className={inp(errors.phone)} />
                    </Field>

                    <Field label="Ville" error={errors.location}>
                        <input type="text" value={data.location}
                            onChange={e => setData('location', e.target.value)}
                            placeholder="Casablanca"
                            className={inp(errors.location)} />
                    </Field>
                </div>

                <Field label="Spécialité" error={errors.specialty}>
                    <input type="text" value={data.specialty}
                        onChange={e => setData('specialty', e.target.value)}
                        placeholder="ex: Développement Web, Data Science..."
                        className={inp(errors.specialty)} />
                </Field>

                <Field label="Année de diplôme" error={errors.graduation_year}>
                    <input type="number" min="2020" max="2030"
                        value={data.graduation_year}
                        onChange={e => setData('graduation_year', e.target.value)}
                        placeholder="2025"
                        className={inp(errors.graduation_year)} />
                </Field>

                <Field label="Bio" error={errors.bio}>
                    <textarea value={data.bio}
                        onChange={e => setData('bio', e.target.value)}
                        rows={3}
                        placeholder="Parlez de vous, vos compétences, vos objectifs..."
                        className={inp(errors.bio)} />
                </Field>

                {/* CV Upload */}
                <div className="bg-blue-50 rounded-xl p-4">
                    <label className="block text-sm font-medium text-blue-800 mb-2">
                        📄 CV (PDF uniquement)
                    </label>
                    {user.profile?.cv_path && (
                        <p className="text-xs text-blue-600 mb-2">
                            ✅ CV déjà uploadé
                        </p>
                    )}
                    <input type="file" accept=".pdf"
                        onChange={e => setData('cv_path', e.target.files[0])}
                        className="w-full text-sm text-blue-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-600 file:text-white file:font-medium hover:file:bg-blue-700 transition-all" />
                    {errors.cv_path && <p className="text-red-500 text-xs mt-1">{errors.cv_path}</p>}
                </div>

                <button type="submit" disabled={processing}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60">
                    {processing ? 'Enregistrement...' : 'Enregistrer le profil'}
                </button>
            </form>
        </div>
    );
}

// ─── Formulaire Entreprise ─────────────────────────────
function EntrepriseForm({ user, avatarUrl, cvUrl }) {
    const [previewAvatar, setPreviewAvatar] = useState(user.profile?.avatar ? avatarUrl : null);
    const { data, setData, post, processing, errors } = useForm({
        phone:        user.profile?.phone        || '',
        bio:          user.profile?.bio          || '',
        location:     user.profile?.location     || '',
        company_name: user.profile?.company_name || '',
        website:      user.profile?.website      || '',
        sector:       user.profile?.sector       || '',
        avatar:       null,
    });

    useEffect(() => {
        return () => {
            if (previewAvatar && previewAvatar.startsWith('blob:')) {
                URL.revokeObjectURL(previewAvatar);
            }
        };
    }, [previewAvatar]);

    function submit(e) {
        e.preventDefault();
        post('/profile', { forceFormData: true });
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 bg-white/20 flex items-center justify-center">
                        {previewAvatar ? (
                            <img src={previewAvatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-3xl">🏢</span>
                        )}
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg">
                            {user.profile?.company_name || user.name}
                        </h2>
                        <span className="text-indigo-100 text-sm">Entreprise</span>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="p-6 space-y-5">
                {/* Logo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Logo de l'entreprise
                    </label>
                    <input type="file" accept="image/*"
                        onChange={e => {
                            const file = e.target.files[0];
                            setData('avatar', file);
                            setPreviewAvatar(file ? URL.createObjectURL(file) : avatarUrl);
                        }}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:text-indigo-700 file:font-medium hover:file:bg-indigo-100 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Nom de l'entreprise" error={errors.company_name}>
                        <input type="text" value={data.company_name}
                            onChange={e => setData('company_name', e.target.value)}
                            placeholder="TechMaroc SARL"
                            className={inp(errors.company_name)} />
                    </Field>

                    <Field label="Secteur d'activité" error={errors.sector}>
                        <select value={data.sector}
                            onChange={e => setData('sector', e.target.value)}
                            className={inp(errors.sector)}>
                            <option value="">Choisir...</option>
                            <option>Informatique / Tech</option>
                            <option>Finance / Banque</option>
                            <option>Marketing / Communication</option>
                            <option>Industrie</option>
                            <option>Santé</option>
                            <option>Education</option>
                            <option>Commerce / Retail</option>
                            <option>Autre</option>
                        </select>
                    </Field>

                    <Field label="Téléphone" error={errors.phone}>
                        <input type="text" value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            placeholder="+212 5XX XXX XXX"
                            className={inp(errors.phone)} />
                    </Field>

                    <Field label="Ville" error={errors.location}>
                        <input type="text" value={data.location}
                            onChange={e => setData('location', e.target.value)}
                            placeholder="Casablanca"
                            className={inp(errors.location)} />
                    </Field>
                </div>

                <Field label="Site web" error={errors.website}>
                    <input type="url" value={data.website}
                        onChange={e => setData('website', e.target.value)}
                        placeholder="https://www.entreprise.com"
                        className={inp(errors.website)} />
                </Field>

                <Field label="Description de l'entreprise" error={errors.bio}>
                    <textarea value={data.bio}
                        onChange={e => setData('bio', e.target.value)}
                        rows={4}
                        placeholder="Présentez votre entreprise, votre culture, vos valeurs..."
                        className={inp(errors.bio)} />
                </Field>

                <button type="submit" disabled={processing}
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60">
                    {processing ? 'Enregistrement...' : 'Enregistrer le profil'}
                </button>
            </form>
        </div>
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

const inp = (err) =>
    `w-full border ${err ? 'border-red-300' : 'border-gray-200'} rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white`;