<?php
namespace App\Http\Requests\Internship;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInternshipRequest extends FormRequest
{
    public function authorize(): bool { return auth()->user()->isEntreprise(); }

    public function rules(): array
    {
        return [
            'title'           => ['sometimes', 'string', 'max:255'],
            'description'     => ['sometimes', 'string'],
            'location'        => ['sometimes', 'string', 'max:255'],
            'type'            => ['sometimes', 'in:presentiel,remote,hybride'],
            'duration_months' => ['sometimes', 'integer', 'min:1', 'max:24'],
            'deadline'        => ['sometimes', 'date', 'after:today'],
            'is_active'       => ['sometimes', 'boolean'],
        ];
    }
}
