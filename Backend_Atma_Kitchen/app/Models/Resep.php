<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resep extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'resep';
    protected $primaryKey = 'id';

    protected $fillable = [
        'nama_resep',
        'id_produk'
    ];

    public function Produk()
    {
        return $this->belongsTo(Produk::class, 'id_produk');
    }
}
