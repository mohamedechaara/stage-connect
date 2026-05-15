<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'city',
        'phone',
        'sector',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}