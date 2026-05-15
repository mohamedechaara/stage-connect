<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = ['user_id', 'internship_id', 'status', 'cover_letter'];

    public function stagiaire()  { return $this->belongsTo(User::class, 'user_id'); }
    public function internship() { return $this->belongsTo(Internship::class); }
}
