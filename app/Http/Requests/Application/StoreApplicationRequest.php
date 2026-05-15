<?php
namespace App\Http\Requests\Application;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'internship_id' => ['required', 'exists:internships,id'],
            'cover_letter'  => ['nullable', 'string', 'max:2000'],
            'cv'           => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:2048'],
        ];
    }
}
