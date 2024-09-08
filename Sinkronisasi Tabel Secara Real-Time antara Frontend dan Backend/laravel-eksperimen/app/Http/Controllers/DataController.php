<?php

namespace App\Http\Controllers;
use App\Models\Data;
use App\Events\DataUpdated;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataController extends Controller
{
    public function index()
    {
        $data = Data::all();
        return Inertia::render('Dashboard', ['data' => $data]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
        ]);

        $data = Data::create($validated);

        // Emit the event to update the frontend
        event(new DataUpdated($data));

        return redirect()->back(); // Reload the page with the new data
    }
}


