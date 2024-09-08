<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    use HasFactory;

    // Nama tabel di database, jika berbeda dari default plural dari nama model
    protected $table = 'data';

    // Kolom-kolom yang dapat diisi melalui form (mass assignable)
    protected $fillable = [
        'name',
        'email',
    ];
}
