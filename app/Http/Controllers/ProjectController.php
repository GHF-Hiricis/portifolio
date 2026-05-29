<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectGallery;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::all();
        return Inertia::render('projects/index', compact('projects'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('projects/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'link' => 'nullable|url',
            'github_link' => 'nullable|url',
            'status' => 'required|in:active,inactive',
        ]);

        $project = new Project();
        $project->name = $request->name;
        $project->description = $request->description;
        $project->link = $request->link;
        $project->github_link = $request->github_link;
        $project->status = $request->status;
        $project->save();

        $id = $project->id;

        // loop through the uploaded images and save them to the project gallery
        if ($request->hasFile('images')) {
            $this->uploadProjectImages($request->file('images'), $id);
        }

        if($id){
            return redirect()->route('projects.index')->with('success', 'Project created successfully.');
        } else {
            return redirect()->route('projects.create')->with('error', 'Failed to create project.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load('images');
        return Inertia::render('projects/show', compact('project'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $project->load('images');
        return Inertia::render('projects/edit', compact('project'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'link' => 'nullable|url',
            'github_link' => 'nullable|url',
            'status' => 'required|in:active,inactive',
        ]);

        $update = $project->update([
            'name' => $request->name,
            'description' => $request->description,
            'link' => $request->link,
            'github_link' => $request->github_link,
            'status' => $request->status,
        ]);

        // loop through the uploaded images and save them to the project gallery
        if ($request->hasFile('images')) {
            $this->uploadProjectImages($request->file('images'), $project->id);
        }

        if($update){
            return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
        } else {
            return redirect()->route('projects.edit', $project)->with('error', 'Failed to update project.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if($project->delete()){
            return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
        } else {
            return redirect()->route('projects.index')->with('error', 'Failed to delete project.');
        }
    }

    private function uploadProjectImages($images, $projectId)
    {
        foreach ($images as $image) {
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('projects', $imageName, 'public');

            $projectGallery = new ProjectGallery();
            $projectGallery->project_id = $projectId;
            $projectGallery->image = $imageName;
            $projectGallery->path = Storage::url('projects/' . $imageName);
            $projectGallery->save();
        }
    }
}
