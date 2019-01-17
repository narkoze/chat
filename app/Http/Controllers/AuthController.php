<?php

namespace App\Http\Controllers;

use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Http\Request;
use App\UserResource;
use App\User;
use DB;

class AuthController extends Controller
{

    public function signin(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $apiClient = DB::table('oauth_clients')->whereId(2)->first();
        if (!$apiClient) {
            return response()->json(['message' => 'API Client not found'], 500);
        }

        try {
            $guzzleClient = new GuzzleClient;
            $tokenRequest = $guzzleClient->post(config('services.passport.endpoint'), [
                'form_params' => [
                    'username' => $request->email,
                    'password' => $request->password,
                    'grant_type' => 'password',
                    'client_id' => $apiClient->id,
                    'client_secret' => $apiClient->secret,
                ],
            ]);
        } catch (RequestException $e) {
            return response()->json($e->getMessage(), $e->getCode());
        }

        return response()->json([
            'token' => json_decode((string) $tokenRequest->getBody(), true),
            'user' => new UserResource(User::whereEmail($request->email)->first()),
        ]);
    }

    public function signout(Request $request)
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
