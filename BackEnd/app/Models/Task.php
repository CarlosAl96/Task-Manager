<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Task extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'tasks';

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'priority',
        'date',
        'is_completed'
    ];
}
