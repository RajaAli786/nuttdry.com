<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FooterSetting;
use App\Models\Menu;

class FooterController extends Controller
{
    public function index()
    {
        $footer = FooterSetting::first();

        if (!$footer) {
            return response()->json([
                'success' => false,
                'message' => 'Footer data not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'logo' => $footer->footer_logo,
                'about' => $footer->about_text,
                'contact' => [
                    'phone' => $footer->contact_number,
                    'email' => $footer->email,
                    'address' => $footer->address,
                    'timings' => $footer->timings,
                    'whatsapp' => $footer->whatsapp_number,
                ],
                'map_link' => $footer->map_link,
                'social_links' => [
                    'facebook' => $footer->facebook_link,
                    'instagram' => $footer->instagram_link,
                    'youtube' => $footer->youtube_link,
                    'twitter' => $footer->twitter_link,
                    'linkedin' => $footer->linkedin_link,
                ],
                'columns' => [
                    [
                        'title' => $footer->column1_title,
                        'links' => json_decode($footer->column1_links, true),
                    ],
                    [
                        'title' => $footer->column2_title,
                        'links' => json_decode($footer->column2_links, true),
                    ],
                    [
                        'title' => $footer->column3_title,
                        'links' => json_decode($footer->column3_links, true),
                    ],
                ],
                'copyright' => $footer->copyright_text,
            ]
        ]);
    }

    function footerMenus()
    {
        $menus = Menu::where('type', '!=', 0)
            ->whereNull('parent_id')
            ->with('children')
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $menus
        ]);
    }
}
