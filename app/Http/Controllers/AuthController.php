<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use DB;

class AuthController extends Controller
{
    public function login(Request $request, AuthService $authServ)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        return response()->json($authServ->login($request->email, $request->password));
    }

    public function logout(Request $request)
    {
        $tokens = $request->user()->tokens->pluck('id');

        DB::table('oauth_access_tokens')
            ->whereIn('id', $tokens)
            ->delete();

        DB::table('oauth_refresh_tokens')
            ->whereIn('access_token_id', $tokens)
            ->delete();

        return response()->json(null, 204);
    }
}
