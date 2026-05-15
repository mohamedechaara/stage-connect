<?php
namespace App\Http\Requests\Internship;

use Illuminate\Foundation\Http\FormRequest;

class StoreInternshipRequest extends FormRequest
{
    public function authorize(): bool { return auth()->user()->isEntreprise(); }

    public function rules(): array
    {
        return [
            'title'           => ['required', 'string', 'max:255'],
            'description'     => ['required', 'string'],
            'location'        => ['required', 'string', 'max:255'],
            'type'            => ['required', 'in:presentiel,remote,hybride'],
            'duration_months' => ['required', 'integer', 'min:1', 'max:24'],
            'deadline'        => ['required', 'date', 'after:today'],
        ];
    }
}
