<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengadaan extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'pengadaan';
    protected $primaryKey = 'id';

    protected $fillable = [
        'harga_pengadaan',
        'tanggal_pengadaan',
    ];
}
