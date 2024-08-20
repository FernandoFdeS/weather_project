<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Location;

class LocationController extends Controller
{
    function index(){
        return response()->json(Location::all());
    }

    function store(Request $request){
        $validator = Validator::make($request->all(), [
            'location' => 'required|unique:locations'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 400);
        }

        $location = Location::create($request->all());
        return response()->json($location, 201);
    }

    function delete($id){
        if(Location::destroy($id)){
            return response()->json(['message'=>'successful-delete'],201);
        }

        return response()->json(['error'=>'error-delete'],400);
    }
}
