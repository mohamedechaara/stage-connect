<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user()->load('profile');
        $profile = $user->profile;

        return Inertia::render('Profile/Edit', [
            'user' => $user,
            'avatarUrl' => $profile && $profile->avatar ? asset('storage/' . $profile->avatar) : null,
            'cvUrl' => $profile && $profile->cv_path ? asset('storage/' . $profile->cv_path) : null,
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $profile = $request->user()->profile()->firstOrCreate([]);
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $request->file('avatar')
                ->store('avatars', 'public');
        }

        if ($request->hasFile('cv_path')) {
            $data['cv_path'] = $request->file('cv_path')
                ->store('cvs', 'public');
        }

        $profile->update($data);

        return back()->with('success', 'Profil mis à jour avec succès !');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
