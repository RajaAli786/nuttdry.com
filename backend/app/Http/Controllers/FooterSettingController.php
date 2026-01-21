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

            if ($setting->footer_logo) {
                $oldPath = str_replace('storage/', '', $setting->footer_logo);
                Storage::disk('public')->delete($oldPath);
            }
        
            $path = $request->file('footer_logo')->store('footer', 'public');
        
            $setting->footer_logo = 'storage/' . $path;
        }
        
        $setting->map_link = $request->input('map_link');
        $setting->fill($request->except(['footer_logo']));
        $setting->save();

        return back()->with('success', 'Footer settings updated successfully!');
    }
}
