<?php 
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    // GET ALL SLIDERS
    public function index()
    {
        return response()->json([
            'status' => true,
            'data' => Slider::orderBy('sort_order', 'asc')->get()
        ], 200, [
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0'
        ]);
    }

    
}
?>