<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    // List
    public function index()
    {
        $testimonials = Testimonial::orderBy('sort_order', 'ASC')->get();
        return view('testimonial.index', compact('testimonials'));
    }

    // Create Form
    public function create()
    {
        return view('testimonial.create');
    }

    // Store
    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required',
            'message'    => 'required',
            'image'      => 'nullable|image|max:2048'
        ]);

        $data = $request->all();

        // image upload  

        
        if ($request->hasFile('image')) {

        
            $image = $request->file('image');
        
            $filename = 'testimonial' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        
            $path = config('uploads.path') . '/testimonial';
        
            if (!is_dir($path)) {
                mkdir($path, 0755, true);
            }
        
            $image->move($path, $filename);
        
            // save relative path
            $data->image = 'testimonial/' . $filename;
        }
        
        $data['rating'] = $data['rating'] ?? 0;
        Testimonial::create($data);

        return redirect()->route('testimonial.index')->with('success', 'Testimonial added successfully!');
    }

    // Edit Form
    public function edit($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        return view('testimonial.edit', compact('testimonial'));
    }

    // Update
    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $request->validate([
            'name'       => 'required',
            'message'    => 'required',
            'image'      => 'nullable|image|max:2048'
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {

            // Delete old logo
            if ($testimonial->image) {
                $oldPath = config('uploads.path') . '/' . $testimonial->image;
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }
        
            $image = $request->file('image');
        
            $filename = 'testimonial_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        
            $path = config('uploads.path') . '/testimonial';
        
            if (!is_dir($path)) {
                mkdir($path, 0755, true);
            } 
        
            $image->move($path, $filename);
        
            // save relative path
            $data['image'] = 'testimonial/' . $filename;
        }
        
        $data['rating'] = $data['rating'] ?? 0;
        $testimonial->update($data);

        return redirect()->route('testimonial.index')->with('success', 'Testimonial updated successfully!');
    }

    // Delete
    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return redirect()->route('testimonial.index')->with('success', 'Deleted successfully!');
    }
}
