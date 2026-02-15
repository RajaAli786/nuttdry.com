<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::orderBy('sort_order')->get();
        return view('slider.index', compact('sliders'));
    }

    public function create()
    {
        return view('slider.form');
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image',
        ]);

        $slider = new Slider($request->except('image'));

        if ($request->hasFile('image')) {
        
            $image = $request->file('image');
        
            $filename = 'slider_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        
            $path = config('uploads.path') . '/sliders';
        
            if (!is_dir($path)) {
                mkdir($path, 0755, true);
            }
        
            $image->move($path, $filename);
        
            // save relative path
            $slider->image = 'sliders/' . $filename;
        }
        $slider->sort_order = Slider::max('sort_order') + 1;
        $slider->save();

        return redirect()->route('sliders.index')->with('success', 'Slider added successfully!');
    }

    public function edit($id)
    {
        $slider = Slider::findOrFail($id);
        return view('slider.form', compact('slider'));
    }

    public function update(Request $request, $id)
    {
        $slider = Slider::findOrFail($id);

        if ($request->hasFile('image')) {
        
            $image = $request->file('image');
        
            $filename = 'slider_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        
            $path = config('uploads.path') . '/sliders';
        
            if (!is_dir($path)) {
                mkdir($path, 0755, true);
            }
        
            $image->move($path, $filename);
        
            // save relative path
            $slider->image = 'sliders/' . $filename;
        }

        $slider->fill($request->except('image'));
        $slider->sort_order = $request->sort_order;
        $slider->save();

        return redirect()->route('sliders.index')->with('success', 'Slider updated!');
    }

    public function destroy($id)
    {
        Slider::destroy($id);
        return back()->with('success', 'Slider deleted!');
    }
}
