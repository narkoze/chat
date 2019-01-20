<?php

namespace App\Services;

use GuzzleHttp\Exception\ErrorException;
use GuzzleHttp\Client as GuzzleClient;
use App\UserResource;
use App\User;
use DB;
use Exception;

class AuthService
{
    /**
     * Login
     *
     * @param string $email
     * @param string $password
     */
    public function login($email, $password)
    {
        $apiClient = DB::table('oauth_clients')->whereId(2)->first();
        if (!$apiClient) {
            return response()->json(['message' => 'API Client not found'], 500);
        }

        $guzzleClient = new GuzzleClient;
        $tokenRequest = $guzzleClient->post(config('services.passport.endpoint'), [
            'form_params' => [
                'username' => $email,
                'password' => $password,
                'grant_type' => 'password',
                'client_id' => $apiClient->id,
                'client_secret' => $apiClient->secret,
            ],
            'http_errors' => false,
        ]);

        abort_if($tokenRequest->getStatusCode() == 401, 401);

        return [
            'token' => json_decode((string) $tokenRequest->getBody(), true),
            'user' => new UserResource(User::whereEmail($email)->first()),
        ];
    }
}
