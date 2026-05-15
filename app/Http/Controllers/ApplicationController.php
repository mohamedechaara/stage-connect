<?php
namespace App\Http\Controllers;

use App\Http\Requests\Application\StoreApplicationRequest;
use App\Models\Application;
use App\Models\Internship;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return Inertia::render('Stagiaire/Applications', [
            'applications' => $user->applications()
                ->with('internship.entreprise.profile')
                ->latest()->get(),
        ]);
    }

    public function store(StoreApplicationRequest $request): RedirectResponse
    {
        $internship = Internship::findOrFail($request->internship_id);

        if (! $internship->is_active) {
            return back()->withErrors(['message' => 'هذا العرض لم يعد متاحاً']);
        }

        if ($internship->applications()->where('user_id', Auth::id())->exists()) {
            return back()->withErrors(['message' => 'Vous avez déjà postulé à cette offre.']);
        }

        if ($request->hasFile('cv')) {
            $profile = $request->user()->profile()->firstOrCreate([]);
            $profile->update([
                'cv_path' => $request->file('cv')->store('cvs', 'public'),
            ]);
        }

        Application::create([
            'user_id'       => Auth::id(),
            'internship_id' => $request->internship_id,
            'cover_letter'  => $request->cover_letter,
        ]);

        return back()->with('success', 'تم إرسال طلبك بنجاح');
    }

    public function show(Internship $internship): Response
    {
        if ($internship->user_id !== Auth::id()) abort(403);

        return Inertia::render('Entreprise/Applications', [
            'internship'   => $internship,
            'applications' => $internship->applications()
                ->with('stagiaire.profile')->latest()->get(),
        ]);
    }

    public function updateStatus(Application $application, string $status): RedirectResponse
    {
        if (! in_array($status, ['accepted', 'rejected'])) abort(422);
        if ($application->internship->user_id !== Auth::id()) abort(403);
        $application->update(['status' => $status]);
        return back()->with('success', 'تم تحديث الحالة');
    }
}
