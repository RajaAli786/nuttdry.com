<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CkeditorController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('upload')) {

            $image = $request->file('upload');

            $filename = 'editor_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

            $path = config('uploads.path') . '/editor';

            if (!is_dir($path)) {
                mkdir($path, 0755, true);
            }

            $image->move($path, $filename);

            // relative path save
            $url = url('/uploads/editor/' . $filename);

            $funcNum = $request->input('CKEditorFuncNum');

            return response("<script>
                window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', 'Image uploaded successfully');
            </script>");
            }

        return response()->json([
            'uploaded' => 0,
            'error' => ['message' => 'No file uploaded.']
        ]);
    }
}
