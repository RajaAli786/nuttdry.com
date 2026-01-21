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

            // delete old logo if exists
            if ($setting->logo) {
                $oldPath = str_replace('storage/', '', $setting->logo);
                Storage::disk('public')->delete($oldPath);
            }

            // upload new logo
            $path = $request->file('logo')->store('header', 'public');
            $setting->logo = 'storage/' . $path;
        }

        // FAVICON
        if ($request->hasFile('favicon')) {

            // delete old favicon if exists
            if ($setting->favicon) {
                $oldPath = str_replace('storage/', '', $setting->favicon);
                Storage::disk('public')->delete($oldPath);
            }

            // upload new favicon
            $path = $request->file('favicon')->store('header', 'public');
            $setting->favicon = 'storage/' . $path;
        }

        // Fill other fields
        $setting->fill($request->except(['logo', 'favicon']));
        $setting->save();

        return back()->with('success', 'Header settings updated successfully!');
    }
}
