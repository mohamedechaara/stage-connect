<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureRole
{
    public function handle(Request $request, Closure $next, string $role): mixed
    {
        if (! $request->user() || $request->user()->role !== $role) {
            abort(403, 'غير مصرح');
        }
        return $next($request);
    }
}
