<?php
namespace App\Http\Requests\Application;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    public function authorize(): bool { return auth()->user()->isStagiaire(); }

    public function rules(): array
    {
        return [
            'internship_id' => ['required', 'exists:internships,id'],
            'cover_letter'  => ['nullable', 'string', 'max:2000'],
        ];
    }
}
