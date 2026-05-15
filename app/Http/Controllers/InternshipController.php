<?php
namespace App\Http\Controllers;

use App\Http\Requests\Internship\StoreInternshipRequest;
use App\Http\Requests\Internship\UpdateInternshipRequest;
use App\Models\Internship;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class InternshipController extends Controller
{
    public function index(): Response
    {
        $internships = Internship::with('entreprise.profile')
            ->where('is_active', true)
            ->when(request('search'), fn($q) =>
                $q->where('title', 'like', '%'.request('search').'%')
                  ->orWhere('location', 'like', '%'.request('search').'%')
            )
            ->when(request('type'), fn($q) => $q->where('type', request('type')))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Stagiaire/Offers', [
            'internships' => $internships,
            'filters'     => request()->only('search', 'type'),
        ]);
    }

    public function show(Internship $internship): Response
    {
        return Inertia::render('Stagiaire/OfferDetail', [
            'internship' => $internship->load('entreprise.profile'),
            'hasApplied' => $internship->applications()
                ->where('user_id', Auth::id())->exists(),
        ]);
    }

    public function myOffers(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return Inertia::render('Entreprise/MyOffers', [
            'internships' => $user->internships()
                ->withCount('applications')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Entreprise/CreateOffer');
    }

    public function store(StoreInternshipRequest $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $user->internships()->create($request->validated());
        return redirect()->route('offres.my')->with('success', 'تم إضافة العرض بنجاح');
    }

    public function edit(Internship $internship): Response
    {
        if ($internship->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Entreprise/EditOffer', ['internship' => $internship]);
    }

    public function update(UpdateInternshipRequest $request, Internship $internship): RedirectResponse
    {
        if ($internship->user_id !== Auth::id()) {
            abort(403);
        }

        $internship->update($request->validated());
        return redirect()->route('offres.my')->with('success', 'تم التعديل بنجاح');
    }

    public function destroy(Internship $internship): RedirectResponse
    {
        if ($internship->user_id !== Auth::id()) {
            abort(403);
        }

        $internship->delete();
        return redirect()->route('offres.my')->with('success', 'تم الحذف');
    }
}
