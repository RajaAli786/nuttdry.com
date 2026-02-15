<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\HeaderSetting;
use Illuminate\Support\Facades\Storage;

class HeaderSettingController extends Controller
{
    public function index()
    {
        $setting = HeaderSetting::first();
        return view('homepage.header_setting', compact('setting'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'nullable|email',
            'logo' => 'nullable|image',
            'favicon' => 'nullable|image',
        ]);

        $setting = HeaderSetting::first() ?? new HeaderSetting;

        // LOGO
        if ($request->hasFile('logo')) {
        
            // delete old logo
            if ($setting->logo) {
                $oldPath = config('uploads.path') . '/' . $setting->logo;
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }
        
            $image = $request->file('logo');
            $filename = 'logo_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        
            $path = config('uploads.path') . '/header';
        
            if (!is_dir($path)) {
                mkdir($path, 0755, true);
            }
        
            $image->move($path, $filename);
        
            $setting->logo = 'header/' . $filename;
        }
        
        
        // FAVICON
        if ($request->hasFile('favicon')) {
        
            // delete old favicon
            if ($setting->favicon) {
                $oldPath = config('uploads.path') . '/' . $setting->favicon;
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }
        
            $image = $request->file('favicon');
            $filename = 'favicon_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        
            $path = config('uploads.path') . '/header';
        
            if (!is_dir($path)) {
                mkdir($path, 0755, true);
            }
        
            $image->move($path, $filename);
        
            $setting->favicon = 'header/' . $filename;
        }


        if ($request->hasFile('offer_banner')) {
        
            // delete old favicon
            if ($setting->offer_banner) {
                $oldPath = config('uploads.path') . '/' . $setting->offer_banner;
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }
        
            $image = $request->file('offer_banner');
            $filename = 'offer_banner_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        
            $path = config('uploads.path') . '/header';
        
            if (!is_dir($path)) {
                mkdir($path, 0755, true);
            }
        
            $image->move($path, $filename);
        
            $setting->offer_banner = 'header/' . $filename;
        }
        // Fill other fields
        $setting->fill($request->except(['logo', 'favicon', 'offer_banner']));
        $setting->save();

        return back()->with('success', 'Header settings updated successfully!');
    }
}
