<?php

namespace App\Http\Controllers;

use App\Models\ProjectGallery;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProjectGalleryController extends Controller
{
    public function destroy(ProjectGallery $image)
    {
        $projectId = $image->project_id;
        $image->delete();

        return redirect()->route('projects.edit', $projectId)->with('success', 'Image deleted successfully.');
    }
}
