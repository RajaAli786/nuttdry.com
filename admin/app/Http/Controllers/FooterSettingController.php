<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FooterSetting;
use Illuminate\Support\Facades\Storage;

class FooterSettingController extends Controller
{
    public function index()
    {
        $setting = FooterSetting::first();
        return view('homepage.footer_setting', compact('setting'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'nullable|email',
            'footer_logo' => 'nullable|image',
        ]);

        $setting = FooterSetting::first() ?? new FooterSetting();

        if ($request->hasFile('footer_logo')) {

            // Delete old logo
            if ($setting->footer_logo) {
                $oldPath = config('uploads.path') . '/' . $setting->footer_logo;
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }
        
            $image = $request->file('footer_logo');
        
            $filename = 'footer_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        
            $path = config('uploads.path') . '/footer';
        
            if (!is_dir($path)) {
                mkdir($path, 0755, true);
            }
        
            $image->move($path, $filename);
        
            // save relative path
            $setting->footer_logo = 'footer/' . $filename;
        }
        
        $setting->map_link = $request->input('map_link');
        $setting->fill($request->except(['footer_logo']));
        $setting->save();

        return back()->with('success', 'Footer settings updated successfully!');
    }
}
