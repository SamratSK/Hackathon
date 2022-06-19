<?php

namespace App\Http\Controllers;

use App\Constants\Constants;
use App\Constants\Role;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    #region Auth
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed',
            'org_id' => 'required|integer|exists:organizations,id',
            'role' => 'required|integer|min:1|max:2'
        ]);

        User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'role' => $fields['role']
        ]);

        return response([
            'message' => 'User registered successfully.'
        ], 201);
    }

    public function registerAdmin(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed',
            'org_id' => 'integer|exists:organizations,id',
            'role' => 'required|integer|min:1|max:3'
        ]);

        User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'role' => $fields['role']
        ]);

        return response([
            'message' => 'User registered successfully.'
        ], 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        // Check password
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Invalid credentials.'
            ], 401);
        }

        $org = Organization::find($user->org_id);
        unset($user->org_id);
        $user['organization'] = $org;

        $token = $user->createToken(Constants::HASH_SECRET)->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        Auth::user()->tokens()->delete();

        return response([
            'message' => 'Logged out successfully.'
        ], 200);
    }
    #endregion

    #region Update
    public function update(Request $request, $id)
    {
        if (!self::authorized($id))
            return response([
                'message' => 'You are not authorized to perform this operation.'
            ], 404);

        $fields = $request->validate([
            'name' => 'string',
            'email' => 'string|unique:users,email',
            'password' => 'string|confirmed',
        ]);

        $user = User::find($id);

        // Check if the resource is not null
        if ($user === null) {
            return response([
                'message' => 'Unable to find user.'
            ], 400);
        }

        $user->update($request->all([
            'name',
            'email'
        ]));

        $user->password = bcrypt($fields['password']);

        return response([
            'message' => 'The organization was successfully updated.',
            'organization' => $user,
        ], 200);
    }
    #endregion

    #region Delete
    public function delete(Request $request, $id)
    {
        if (!self::authorized($id))
            return response([
                'message' => 'You are not authorized to perform this operation.'
            ], 404);

        $user = User::find($id);

        // Check if the resource is not null
        if ($user === null) {
            return response([
                'message' => 'Unable to find user.'
            ], 400);
        }

        $user->delete();

        return response([
            'message' => 'The user was successfully deleted.',
        ], 200);
    }
    #endregion

    #region Private Functions
    private function authorized($id)
    {
        return Auth::user()->id == $id || Auth::user()->role == Role::ADMIN;
    }
    #endregion
}
