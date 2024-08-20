<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Location;
use App\Http\Requests\LocationRequest;

class LocationController extends Controller
{
    function index(){
        return response()->json(Location::all());
    }

    function show($location){
        $location =  Location::where('location',$location)->first();
        if($location){
            return response()->json($location, 201);
        }

        return response()->json(['error'=> 'Cidade não encontrada'], 400);
    }

    function store(LocationRequest $request){
        $location = Location::create($request->validated());
        return response()->json($location, 201);
    }

    function delete($id){
        if(Location::destroy($id)){
            return response()->json(['message'=>'Cidade removida dos favoritos'],201);
        }

        return response()->json(['error'=>'Erro ao remover cidaded os favoritos'],400);
    }
}
