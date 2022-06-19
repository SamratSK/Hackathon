<?php

namespace App\Http\Middleware;

use App\Constants\Role;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeacherMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (
            Auth::check() &&
            Auth::user()->role != Role::ADMIN &&
            Auth::user()->role != Role::TEACHER
        ) {
            return response([
                'message' => 'Only teacher or admin can perform this operation.'
            ], 201);
        }

        return $next($request);
    }
}
