<?php
namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $user  = auth()->user();
        $rules = [
            'phone'    => ['nullable', 'string', 'max:20'],
            'bio'      => ['nullable', 'string', 'max:500'],
            'location' => ['nullable', 'string', 'max:255'],
            'avatar'   => ['nullable', 'image', 'max:2048'],
        ];
        if ($user->isStagiaire()) {
            $rules['cv_path']         = ['nullable', 'file', 'mimes:pdf', 'max:5120'];
            $rules['specialty']       = ['nullable', 'string', 'max:255'];
            $rules['graduation_year'] = ['nullable', 'integer', 'min:2000', 'max:2030'];
        }
        if ($user->isEntreprise()) {
            $rules['company_name'] = ['nullable', 'string', 'max:255'];
            $rules['website']      = ['nullable', 'url', 'max:255'];
            $rules['sector']       = ['nullable', 'string', 'max:255'];
        }
        return $rules;
    }
}
