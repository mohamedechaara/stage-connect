<?php
namespace Database\Seeders;

use App\Models\Application;
use App\Models\Internship;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Entreprises ──────────────────────────────
        $entreprisesData = [
            ['name' => 'TechMaroc',  'sector' => 'Informatique', 'location' => 'Casablanca'],
            ['name' => 'InnovateDZ', 'sector' => 'Finance',      'location' => 'Rabat'],
            ['name' => 'DigitalHub', 'sector' => 'Marketing',    'location' => 'Tanger'],
        ];

        $entreprises = [];
        foreach ($entreprisesData as $i => $e) {
            $user = User::create([
                'name'     => $e['name'],
                'email'    => 'entreprise' . ($i + 1) . '@test.com',
                'password' => Hash::make('password123'),
                'role'     => 'entreprise',
            ]);
            $user->profile()->create([
                'company_name' => $e['name'],
                'sector'       => $e['sector'],
                'location'     => $e['location'],
                'bio'          => 'شركة رائدة في مجال ' . $e['sector'],
                'website'      => 'https://www.' . strtolower($e['name']) . '.com',
            ]);
            $entreprises[] = $user;
        }

        // ── Stagiaires ───────────────────────────────
        $stagiairesData = [
            ['name' => 'Ahmed Benali',   'specialty' => 'Développement Web', 'year' => 2024],
            ['name' => 'Sara Alaoui',    'specialty' => 'Data Science',      'year' => 2024],
            ['name' => 'Youssef Karimi', 'specialty' => 'Design UI/UX',      'year' => 2023],
            ['name' => 'Fatima Zahra',   'specialty' => 'Marketing Digital', 'year' => 2025],
        ];

        $stagiaires = [];
        foreach ($stagiairesData as $i => $s) {
            $user = User::create([
                'name'     => $s['name'],
                'email'    => 'stagiaire' . ($i + 1) . '@test.com',
                'password' => Hash::make('password123'),
                'role'     => 'stagiaire',
            ]);
            $user->profile()->create([
                'specialty'       => $s['specialty'],
                'graduation_year' => $s['year'],
                'location'        => 'Maroc',
                'bio'             => 'طالب متحمس في مجال ' . $s['specialty'],
            ]);
            $stagiaires[] = $user;
        }

        // ── Internships ──────────────────────────────
        $offersData = [
            ['title' => 'Développeur Laravel',        'type' => 'presentiel', 'duration' => 3, 'location' => 'Casablanca'],
            ['title' => 'Développeur React.js',       'type' => 'remote',     'duration' => 6, 'location' => 'Remote'],
            ['title' => 'Analyste Data',              'type' => 'hybride',    'duration' => 4, 'location' => 'Rabat'],
            ['title' => 'Designer UI/UX',             'type' => 'presentiel', 'duration' => 3, 'location' => 'Tanger'],
            ['title' => 'Chargé Marketing Digital',   'type' => 'hybride',    'duration' => 6, 'location' => 'Casablanca'],
            ['title' => 'Développeur Mobile Flutter', 'type' => 'remote',     'duration' => 5, 'location' => 'Remote'],
        ];

        $offers = [];
        foreach ($offersData as $i => $o) {
            $internship = Internship::create([
                'user_id'         => $entreprises[$i % count($entreprises)]->id,
                'title'           => $o['title'],
                'description'     => 'نبحث عن متدرب موهوب في مجال ' . $o['title'] . '. ستتمتع بتجربة غنية وستعمل مع فريق محترف.',
                'location'        => $o['location'],
                'type'            => $o['type'],
                'duration_months' => $o['duration'],
                'deadline'        => now()->addMonths(2),
                'is_active'       => true,
            ]);
            $offers[] = $internship;
        }

        // ── Applications ─────────────────────────────
        foreach ($stagiaires as $stagiaire) {
            $picked = collect($offers)->random(2);
            foreach ($picked as $offer) {
                Application::create([
                    'user_id'       => $stagiaire->id,
                    'internship_id' => $offer->id,
                    'status'        => collect(['pending', 'accepted', 'rejected'])->random(),
                    'cover_letter'  => 'أنا مهتم جداً بهذه الفرصة وأعتقد أن مهاراتي تتناسب مع متطلباتكم.',
                ]);
            }
        }
    }
}
