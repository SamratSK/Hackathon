<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    #region Create
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'string|required',
        ]);

        $organization = Organization::create([
            'name' => $fields['name']
        ]);

        return response([
            'message' => 'The organization was successfully created.',
            'resource' => $organization
        ], 200);
    }
    #endregion

    #region Read
    public function index()
    {
        return Organization::all();
    }

    public function show($id)
    {
        return Organization::find($id);
    }
    #endregion

    #region Update
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'string'
        ]);

        $organization = Organization::find($id);

        // Check if the resource is not null
        if ($organization === null) {
            return response([
                'message' => 'Unable to find organization.'
            ], 400);
        }

        $organization->update($request->all([
            'name'
        ]));

        return response([
            'message' => 'The organization was successfully updated.',
            'organization' => $organization,
        ], 200);
    }
    #endregion

    #region Delete
    public function destroy(Request $request, $id)
    {
        $organization = Organization::find($id);

        // Check if the resource is not null
        if ($organization === null) {
            return response([
                'message' => 'Unable to find organization.'
            ], 400);
        }

        $organization->delete();

        return response([
            'message' => 'The organization was successfully deleted.',
        ], 200);
    }
    #endregion
}
