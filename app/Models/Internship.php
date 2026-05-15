<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    protected $fillable = [
        'user_id', 'title', 'description', 'location',
        'type', 'duration_months', 'deadline', 'is_active',
    ];

    protected function casts(): array
    {
        return ['deadline' => 'date', 'is_active' => 'boolean'];
    }

    public function entreprise()   { return $this->belongsTo(User::class, 'user_id'); }
    public function applications() { return $this->hasMany(Application::class); }
}
