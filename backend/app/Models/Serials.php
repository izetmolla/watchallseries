<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Serials extends Model
{
    protected $fillable = [
        'serialId', 'title', 'thumbnail','release_date','description','slug','importURL','status',
    ];
}
