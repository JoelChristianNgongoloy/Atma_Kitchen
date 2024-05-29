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

    public function produk() {
        return $this->belongsTo(Produk::class, 'id_produk');
    }

    public function pesanan() {
        return $this->belongsTo(Pesanan::class, 'id_pesanan');
    }
}
