<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;

class LocationController extends Controller
{
    function index(){
        return response()->json(Location::all());
    }

    function store(Request $request){
        return response()->json(Location::create($request->all()));

    }

    function delete($id){
        return Location::destroy($id);
    }
}
