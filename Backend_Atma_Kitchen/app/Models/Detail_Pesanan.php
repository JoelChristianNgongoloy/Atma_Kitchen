<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail_Pesanan extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'detail_pesanan';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id_produk',
        'id_pesanan',
        'jmlh_produk'
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'id_produk');
    }

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class, 'id_pesanan');
    }

    // Relationship with Detail_Resep
    public function detailResep()
    {
        return $this->hasMany(Detail_Resep::class, 'id_pesanan');
    }

    // Relationship with Detail_Pengadaan
    public function detailPengadaan()
    {
        return $this->hasMany(Detail_Pengadaan::class, 'id_bahan_baku');
    }
}
