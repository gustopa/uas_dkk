<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class AIService
{
    public function detectSQLInjection($input)
    {
        // Pastikan Python dan joblib telah diinstal di server
        $modelPath = storage_path('ai_model.pkl');

        if (!file_exists($modelPath)) {
            return false; // Jika model tidak ditemukan, anggap input aman
        }

        // Jalankan skrip Python untuk mendeteksi SQL Injection
        $command = "python3 " . storage_path('detect_sql_injection.py') . " \"$input\"";
        $output = shell_exec($command);

        return trim($output) === "1"; // Jika output "1", berarti input berbahaya
    }
}
