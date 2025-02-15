<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AIService;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function __construct(private AIService $aiService) {}

    public function loginInsecure(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        // ⚠️ QUERY INI RAWAN SQL INJECTION
        $user = DB::select("SELECT * FROM users WHERE name = '$username' AND password = '$password'");

        if (!empty($user)) {
            return response()->json(['message' => 'Login Berhasil']);
        } else {
            return response()->json(['message' => 'Login Gagal']);
        }
    }


    public function loginSecure(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        // Deteksi SQL Injection dengan AI
        $command = "python3 " . storage_path('app/detect_sql_injection.py') . " \"$username\" 2>&1";
        $ai_result = trim(shell_exec($command));
        // dd($ai_result);
        if ($ai_result == "1") {
            return response()->json(['message' => 'Potensi SQL Injection terdeteksi!']);
        }

        // Cek juga password
        // $command = "python3 " . storage_path('app/detect_sql_injection.py') . " \"$password\"";
        // $ai_result = trim(shell_exec($command));

        // if ($ai_result == "1") {
        //     return response()->json(['message' => 'Potensi SQL Injection terdeteksi!']);
        // }

        // Gunakan parameterized query agar lebih aman
        $user = DB::select("SELECT * FROM users WHERE name = ? AND password = ?", [$username, $password]);

        if ($user) {
            return response()->json(['message' => 'Login Berhasil']);
        }
        return response()->json(['message' => 'Login Gagal']);
    }

}
