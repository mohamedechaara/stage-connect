<?php
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Auth routes (Breeze)
require __DIR__.'/auth.php';

Route::get('/', function () {
    return redirect()->route('login');
});
Route::middleware('auth')->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

   // Profile
    Route::get('/profile',  [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    
    // ── Stagiaire ──────────────────────────────────
    Route::middleware('role:stagiaire')->group(function () {
        Route::get('/offres',                    [InternshipController::class, 'index'])->name('offres.index');
        Route::get('/offres/{internship}',       [InternshipController::class, 'show'])->whereNumber('internship')->name('offres.show');
        Route::get('/mes-candidatures',          [ApplicationController::class, 'index'])->name('candidatures.index');
        Route::post('/candidatures',             [ApplicationController::class, 'store'])->name('candidatures.store');
    });

    // ── Entreprise ─────────────────────────────────
    Route::middleware('role:entreprise')->group(function () {
        Route::get('/mes-offres',                        [InternshipController::class, 'myOffers'])->name('offres.my');
        Route::get('/offres/creer',                      [InternshipController::class, 'create'])->name('offres.create');
        Route::post('/offres',                           [InternshipController::class, 'store'])->name('offres.store');
        Route::get('/offres/{internship}/edit',          [InternshipController::class, 'edit'])->whereNumber('internship')->name('offres.edit');
        Route::patch('/offres/{internship}',             [InternshipController::class, 'update'])->whereNumber('internship')->name('offres.update');
        Route::delete('/offres/{internship}',            [InternshipController::class, 'destroy'])->whereNumber('internship')->name('offres.destroy');
        Route::get('/candidatures/{internship}',         [ApplicationController::class, 'show'])->name('candidatures.show');
        Route::patch('/candidatures/{application}/{status}', [ApplicationController::class, 'updateStatus'])->name('candidatures.status');
    });
});
