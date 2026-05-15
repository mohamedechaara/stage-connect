<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',          // ← زيد هاد السطر
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    // ← زيد هاد الـ helpers والعلاقات
    public function isStagiaire(): bool  { return $this->role === 'stagiaire'; }
    public function isEntreprise(): bool { return $this->role === 'entreprise'; }

    public function profile()      { return $this->hasOne(Profile::class); }
    public function internships()  { return $this->hasMany(Internship::class); }
    public function applications() { return $this->hasMany(Application::class); }
}