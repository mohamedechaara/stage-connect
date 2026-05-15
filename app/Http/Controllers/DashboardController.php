<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Internship;

class DashboardController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        if (! $user) {
            abort(403);
        }

        /*
        |--------------------------------------------------------------------------
        | STAGIAIRE
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'stagiaire') {

            $applications = $user->applications()
                ->with('internship.entreprise.profile')
                ->latest()
                ->get();

            return Inertia::render('Stagiaire/Dashboard', [
                'stats' => [
                    'total'           => $applications->count(),
                    'pending'         => $applications->where('status', 'pending')->count(),
                    'accepted'        => $applications->where('status', 'accepted')->count(),
                    'rejected'        => $applications->where('status', 'rejected')->count(),
                    'availableOffers' => Internship::where('is_active', true)->count(),
                ],

                'recentApplications' => $applications->take(5)->values(),
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | ENTREPRISE
        |--------------------------------------------------------------------------
        */

        $internships = $user->internships()
            ->withCount('applications')
            ->latest()
            ->get();

        return Inertia::render('Entreprise/Dashboard', [

            'stats' => [
                'totalOffers'       => $internships->count(),
                'activeOffers'      => $internships->where('is_active', true)->count(),
                'totalApplications' => $internships->sum('applications_count'),

                'pending' => $user->internships()
                    ->join('applications', 'internships.id', '=', 'applications.internship_id')
                    ->where('applications.status', 'pending')
                    ->count(),
            ],

            'recentOffers' => $internships->take(5)->values(),

            'company' => [
                'name'  => $user->name,
                'email' => $user->email,
                'city'  => optional($user->profile)->city,
                'phone' => optional($user->profile)->phone,
                'sector'=> optional($user->profile)->sector,
            ],
        ]);
    }
}