<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'city',
        'phone',
        'sector',
        'bio',
        'avatar',
        'location',
        'cv_path',
        'specialty',
        'graduation_year',
        'company_name',
        'website',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}