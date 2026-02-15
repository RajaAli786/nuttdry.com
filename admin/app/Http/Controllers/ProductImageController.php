<?php
namespace App\Http\Controllers;

use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductImageController extends Controller
{
    public function destroy($id)
    {
        $image = ProductImage::findOrFail($id);
        // Delete file from server
        if (File::exists(public_path('uploads/' . $image->image))) {
            File::delete(public_path('uploads/' . $image->image));
        }

        // Delete record from DB
        $image->delete();

        return back()->with('success', 'Image deleted successfully');
    }
}
