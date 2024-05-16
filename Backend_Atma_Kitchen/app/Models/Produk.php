<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = "produk";
    protected $primaryKey = "id";

    protected $fillable = [
        'nama_produk',
        'stok_produk',
        'deskripsi_produk',
        'harga_produk',
        'foto_produk',
        'status_produk',
        'id_penitip',
    ];

    public function Penitip() {
        return $this->belongsTo(Penitip::class, 'id_penitip');
    }
}
