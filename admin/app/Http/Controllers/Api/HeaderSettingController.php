<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HeaderSetting;

class HeaderSettingController extends Controller
{
    public function index()
    {
        $data = HeaderSetting::first();

        return response()->json([
            'status' => true,
            'data' => $data
        ], 200, [
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0'
        ]);
    }
    
}
